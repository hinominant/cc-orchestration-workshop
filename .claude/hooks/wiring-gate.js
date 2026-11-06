#!/usr/bin/env node
'use strict';
/**
 * wiring-gate — commit で増えた「作っただけで配線していない」もの (孤児) を知らせる・止める (WIRING-001 v2・ARIS-1982)
 *
 * PreToolUse(Bash)。実行される `git commit` のとき (引用符の中・echo / grep の引数は除く)、対象のリポの
 * scripts/orphan-scanner.js --staged を回す。段階は .claude/wiring-gate.json の mode:
 *   notify (既定) : additionalContext で知らせるだけ。一度知らせたキーは <git の共通ディレクトリ>/wiring-gate/seen.json に覚え、
 *                   2 回目からは「既知 N 件」の 1 行だけ (同じことを言い続けると読まれなくなる)
 *   enforce       : permissionDecision=deny。★ask にしない (_autonomous.js が autonomous-mode で ask を approve に変える)。
 *                   抜け道は .claude/wiring-allow.json に理由付きで書いた項目だけ
 *   off           : 何もしない
 * 発火のたびに <git の共通ディレクトリ>/wiring-gate/log.jsonl に 1 行 (誤検知を数えて enforce に上げる判断の材料・_common/WIRING_CHECK.md)。
 * ★状態は作業ツリーに置かない (配布先の .context が追跡されていると、記録が変更に紛れ込む)。worktree でもリポで 1 つに集まる。
 *
 * デッドロックしない: scanner が無い・失敗・時間切れ (WIRING_GATE_TIMEOUT_MS・既定 5 秒) は commit を通す。
 * ただし log に 1 行残す (黙って壊れたまま気づかないのを防ぐ)。git のリポの外・壊れた入力は何もしない。
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

function readInput() {
  try { return JSON.parse(fs.readFileSync(0, 'utf8')); } catch { return null; }
}

// ─── 実行される git commit と、その対象のディレクトリ ─────────────────────
/** 引用符を意識した字句: 語 (引用符の中身は語の一部で、実行されない) と演算子 */
function tokenize(s) {
  const out = [];
  let buf = '', inWord = false, q = null;
  const end = () => { if (inWord) out.push(buf); buf = ''; inWord = false; };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) {
      if (c === q) q = null;
      else if (c === '\\' && q === '"' && i + 1 < s.length) buf += s[++i];
      else buf += c;
      continue;
    }
    if (c === "'" || c === '"') { q = c; inWord = true; continue; }
    if (c === '\\' && i + 1 < s.length) { buf += s[++i]; inWord = true; continue; }
    if (/\s/.test(c) && c !== '\n') { end(); continue; }
    if (c === '\n' || c === ';' || c === '&' || c === '|' || c === '(' || c === ')') { end(); out.push({ op: c }); continue; }
    buf += c; inWord = true;
  }
  end();
  return out;
}

function expandDir(p, base) {
  if (!p) return base;
  if (p === '~' || p.startsWith('~/')) p = path.join(os.homedir(), p.slice(1));
  return path.resolve(base, p);
}

/** 実行される git commit の対象のディレクトリ (無ければ空の配列) */
function commitTargets(command, cwd) {
  const toks = tokenize(command);
  const targets = [];
  let dir = cwd;
  let seg = [];
  const flush = () => {
    let i = 0;
    while (i < seg.length && /^[A-Za-z_][A-Za-z0-9_]*=/.test(seg[i])) i++;   // VAR=x の前置き
    const w = seg.slice(i);
    if (w[0] === 'cd') dir = expandDir(w[1], dir);
    else if (w[0] === 'git') {
      let d = dir, j = 1;
      while (j < w.length && w[j].startsWith('-')) {
        if (w[j] === '-C') { d = expandDir(w[j + 1], d); j += 2; }
        else if (w[j] === '-c') j += 2;
        else j += 1;
      }
      if (w[j] === 'commit') targets.push(d);
    }
    seg = [];
  };
  for (const t of toks) {
    if (typeof t === 'object') flush(); else seg.push(t);
  }
  flush();
  return targets;
}

// ─── 状態 ─────────────────────────────────────────────────────────
function readJson(p, fallback) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch { return fallback; }
}

/** 状態の置き場: <git の共通ディレクトリ>/wiring-gate (作業ツリーの外・worktree でも共通) */
function stateDir(root) {
  const r = spawnSync('git', ['rev-parse', '--git-common-dir'], { cwd: root, encoding: 'utf8' });
  if (r.status !== 0 || !r.stdout.trim()) return null;
  return path.join(path.resolve(root, r.stdout.trim()), 'wiring-gate');
}

function appendLog(root, entry) {
  try {
    const dir = stateDir(root);
    if (!dir) return;
    fs.mkdirSync(dir, { recursive: true });
    fs.appendFileSync(path.join(dir, 'log.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), repo: path.basename(root), ...entry }) + '\n');
  } catch {}
}

function repoRoot(dir) {
  const r = spawnSync('git', ['rev-parse', '--show-toplevel'], { cwd: dir, encoding: 'utf8' });
  return r.status === 0 ? r.stdout.trim() : null;
}

const line = o => `- ${o.category} ${o.file}:${o.line}${o.symbol ? ` ${o.symbol}` : ''} — ${o.reason}`;

function check(root) {
  const cfg = readJson(path.join(root, '.claude', 'wiring-gate.json'), {}) || {};
  const mode = ['off', 'notify', 'enforce'].includes(cfg.mode) ? cfg.mode : 'notify';
  if (mode === 'off') return null;

  const scanner = path.join(root, 'scripts', 'orphan-scanner.js');
  if (!fs.existsSync(scanner)) { appendLog(root, { mode, decision: 'pass', error: 'scanner_missing' }); return null; }
  const timeout = Number(process.env.WIRING_GATE_TIMEOUT_MS) || 5000;
  const r = spawnSync(process.execPath, [scanner, '--staged'], { cwd: root, encoding: 'utf8', timeout, maxBuffer: 16 * 1024 * 1024 });
  if (r.error && r.error.code === 'ETIMEDOUT') { appendLog(root, { mode, decision: 'pass', error: 'scanner_timeout' }); return null; }
  let res = null;
  if (r.status === 0) { try { res = JSON.parse(r.stdout); } catch {} }
  if (!res || !Array.isArray(res.orphans)) { appendLog(root, { mode, decision: 'pass', error: 'scanner_failed' }); return null; }
  if (res.skipped) return null;

  const orphans = res.orphans;
  const nAllowed = (res.allowed || []).length;
  const nUndetermined = (res.undetermined || []).length;
  if (!orphans.length && !nAllowed && !nUndetermined) return null;
  const keys = orphans.map(o => o.key);
  const base = { mode, keys, allowed: nAllowed, undetermined: nUndetermined };

  if (!orphans.length) { appendLog(root, { ...base, decision: 'pass', new_keys: [] }); return null; }

  if (mode === 'enforce') {
    appendLog(root, { ...base, decision: 'deny', new_keys: keys });
    return { hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: [
        `【配線の門 (WIRING-001・enforce)】この commit で増えた孤児 ${orphans.length} 件。作っただけで呼び出し元・登録が無い:`,
        ...orphans.map(line),
        '直し方: 呼び出し元を作る・スケジューラ / settings.json に登録する・使わないなら消す。',
        '意図して残すなら .claude/wiring-allow.json に {category, file, symbol, reason} を理由付きで書く (理由の無い項目は効かない)。手順: _common/WIRING_CHECK.md',
      ].join('\n'),
    } };
  }

  // notify: 新規は名前を出し、既知は件数だけ
  const sdir = stateDir(root);
  const seenPath = sdir ? path.join(sdir, 'seen.json') : null;
  const seen = (seenPath && readJson(seenPath, {})) || {};
  const fresh = orphans.filter(o => !seen[o.key]);
  const known = orphans.length - fresh.length;
  for (const o of fresh) seen[o.key] = new Date().toISOString();
  if (seenPath) { try { fs.mkdirSync(path.dirname(seenPath), { recursive: true }); fs.writeFileSync(seenPath, JSON.stringify(seen, null, 2)); } catch {} }
  appendLog(root, { ...base, decision: 'notify', new_keys: fresh.map(o => o.key) });

  const msg = [];
  if (fresh.length) {
    msg.push(`【配線の確かめ (WIRING-001・知らせるだけ)】この commit で増えた孤児 ${fresh.length} 件。作っただけで呼び出し元・登録が無い:`);
    msg.push(...fresh.map(line));
    msg.push('直し方: 呼び出し元を作る・スケジューラ / settings.json に登録する・使わないなら消す。意図して残すなら .claude/wiring-allow.json に理由付きで。手順: _common/WIRING_CHECK.md');
  }
  if (known) msg.push(`配線の確かめ: ほか既知 ${known} 件 (前に知らせたもの・まだ配線されていない)`);
  return { hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: msg.join('\n') } };
}

function main() {
  const input = readInput();
  if (!input || input.tool_name !== 'Bash') return;
  const command = (input.tool_input && input.tool_input.command) || '';
  if (!/\bgit\b/.test(command) || !/\bcommit\b/.test(command)) return;
  const cwd = input.cwd || process.cwd();
  let out = null;
  for (const d of commitTargets(command, cwd)) {
    const root = repoRoot(d);
    if (!root) continue;
    const r = check(root);
    if (r && (!out || r.hookSpecificOutput.permissionDecision === 'deny')) out = r;
  }
  if (out) process.stdout.write(JSON.stringify(out));
}

try { main(); } catch { /* 門の故障で作業を止めない */ }
process.exit(0);
