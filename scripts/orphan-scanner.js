#!/usr/bin/env node
'use strict';
/**
 * orphan-scanner — この変更で増えた「作っただけで配線していない」もの (孤児) を数える (WIRING-001 v2・ARIS-1982)。
 *
 * 使い方:
 *   node scripts/orphan-scanner.js --staged        staged の差分 (commit の門 wiring-gate が使う)
 *   node scripts/orphan-scanner.js --base <ref>    <ref> と HEAD の merge-base から作業ツリーまでの差分 (phase の advance が使う)
 *   node scripts/orphan-scanner.js                 --base を origin の既定の枝で
 * 出力: 標準出力と <git の共通ディレクトリ>/wiring-gate/orphans-report.json に (作業ツリーには置かない: 配布先で紛れ込ませない)
 *   {mode, categories, base, orphans:[{category,file,line,symbol?,reason,key}], undetermined:[...], allowed:[...], skipped?}
 * 終了コード: 0 (孤児があっても 0。判断は呼び出し側)・使い方の誤り 2
 *
 * ★基準ファイルを持たない (v1 の init 時の写しは、やり直し・worktree・名前変更で抜けた)。git の差分に出たものだけを候補にする:
 *   - 足されたトップレベル関数 (Python / JS)
 *   - 消された行に出た名前のうち、トップレベル関数の定義があるもの (最後の呼び出し元を消して孤児を作る形)
 *   - 足した hook / skill (配布元のリポだけ)
 * 既にあった孤児は見えない (要件どおり「この変更で増えたもの」)。
 *
 * カテゴリと誤検知の芽は docs/specs/wiring-001_orphan_prevention.md v2 の 3 節。
 * 静的な文字列の照合なので、動的な呼び出し (getattr・文字列で組み立てた名前) は見えない。
 * デコレータ付き (フレームワークが呼ぶ) とありふれた名前は「未判定」に分け、孤児とは言わない。
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SCHED_RE = /^(archive|sync|cleanup|daily|hourly|weekly|cron)_/;
const COMMON_NAMES = new Set([
  'main', 'run', 'handler', 'handle', 'setup', 'teardown', 'init', 'start', 'stop', 'index', 'default',
  'app', 'create_app', 'cli', 'execute', 'process', 'callback', 'render', 'get', 'post', 'put', 'patch',
  'delete', 'lambda_handler', 'configure', 'register', 'plugin', 'activate', 'deactivate',
]);
// フレームワークが名前で呼ぶ入口 (Next.js の app router / pages・route handler・middleware 等)。
// 実測 2026-11-06: crew の dashboard (Next.js) で page.tsx の既定の export と generateStaticParams を孤児と言っていた
const FRAMEWORK_NAMES = new Set([
  'generateStaticParams', 'generateMetadata', 'generateViewport', 'generateImageMetadata', 'getServerSideProps',
  'getStaticProps', 'getStaticPaths', 'getInitialProps', 'middleware', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE',
  'HEAD', 'OPTIONS', 'loader', 'action', 'meta', 'links',
]);
const EXPORT_DEFAULT = /^export\s+default\s/;
const CODE_EXT = new Set(['.py', '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx']);
const DOC_EXT = new Set(['.md', '.txt', '.rst', '.adoc']);
const NEVER_CALLERS = [/^\.context\//, /^\.claude\/wiring-allow\.json$/, /(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml|uv\.lock|poetry\.lock)$/];
const ALL_CATEGORIES = ['dead_code', 'scheduler_missing', 'hook_missing', 'skill_missing'];

// ─── 引数 ─────────────────────────────────────────────────────────
function parseArgs(argv) {
  const a = { staged: false, base: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--staged') a.staged = true;
    else if (argv[i] === '--base') { a.base = argv[++i]; if (!a.base) usage(); }
    else usage();
  }
  return a;
}
function usage() {
  process.stderr.write('usage: orphan-scanner.js [--staged | --base <ref>]\n');
  process.exit(2);
}

// ─── git ──────────────────────────────────────────────────────────
function git(root, args, opts = {}) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, stdio: ['ignore', 'pipe', 'ignore'], ...opts });
}
function tryGit(root, args) {
  try { return git(root, args); } catch (e) { return e.status === 1 && typeof e.stdout === 'string' ? e.stdout : null; }
}

function resolveBase(root, ref) {
  const candidates = ref ? [ref] : [];
  if (!ref) {
    const head = (tryGit(root, ['symbolic-ref', '-q', '--short', 'refs/remotes/origin/HEAD']) || '').trim();
    if (head) candidates.push(head);
    candidates.push('origin/main', 'origin/master', 'main', 'master');
  }
  for (const c of candidates) {
    const mb = (tryGit(root, ['merge-base', c, 'HEAD']) || '').trim();
    if (/^[0-9a-f]{40}$/.test(mb)) return mb;
  }
  return null;
}

// ─── ファイルの種類 ─────────────────────────────────────────────────
const ext = f => path.extname(f).toLowerCase();
const isCode = f => CODE_EXT.has(ext(f));
function isTest(f) {
  const b = path.basename(f);
  return /(^|\/)(tests?|__tests__|spec)\//.test(f)
    || /^test_.*\.py$/.test(b) || /_test\.py$/.test(b) || b === 'conftest.py'
    || /\.(test|spec)\.[cm]?[jt]sx?$/.test(b);
}
const isDoc = f => DOC_EXT.has(ext(f));
// hino-orchestrator が配った写し (.claude/ の hook・scripts)。中の関数は配布元の持ち物で、配布先の孤児ではない
// (実測 2026-11-06: crew の .claude/hooks/quality-gate-enforcer.js の generateNonce を孤児と言っていた)
// ★配布先の scripts/ にも写しがある (install.sh・同期で配る phase-transition.js / orphan-scanner.js / epic-manager.js)。
//   配布先ではこれも写し。配布元 (_templates/hooks のあるリポ) では scripts/ は自分のコードなので数える (配布前レビュー 11-06)
const DISTRIBUTED_SCRIPTS = /^scripts\/(phase-transition|orphan-scanner|epic-manager)\.js$/;
let IS_SOURCE_REPO = false;
const isDistributedCopy = f => /^\.claude\//.test(f) || (!IS_SOURCE_REPO && DISTRIBUTED_SCRIPTS.test(f));
// 生成物・同梱物 (追跡されていても自分で書いたコードではない) は候補にしない
const isVendored = f => /(^|\/)(dist|build|vendor|node_modules|\.venv|venv|site-packages|\.next|out|coverage)\//.test(f) || /\.min\.js$/.test(f);
const neverCaller = f => NEVER_CALLERS.some(re => re.test(f));

// ─── 差分 ─────────────────────────────────────────────────────────
/** git diff -U0 を {file: {added: [{line, text}], removed: [text], status}} に */
function parseDiff(text) {
  const files = {};
  let cur = null;
  let newLine = 0;
  let fromNull = false;
  for (const raw of text.split(/\r?\n/)) {
    if (raw.startsWith('diff --git ')) { cur = null; fromNull = false; continue; }
    if (raw.startsWith('--- ')) {
      const p = raw.slice(4).trim();
      fromNull = p === '/dev/null';
      // 消されたファイルは +++ が /dev/null なので、消された行は旧名で受ける
      if (!fromNull) { const f = p.replace(/^a\//, ''); cur = files[f] || (files[f] = { added: [], removed: [], isNew: false }); }
      continue;
    }
    if (raw.startsWith('+++ ')) {
      const p = raw.slice(4).trim();
      if (p === '/dev/null') continue;              // 消したファイル: 旧名の cur のまま
      const f = p.replace(/^b\//, '');
      cur = files[f] || (files[f] = { added: [], removed: [], isNew: false });
      if (fromNull) cur.isNew = true;               // 新しく足したファイル
      continue;
    }
    const h = raw.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
    if (h) { newLine = Number(h[1]); continue; }
    if (!cur) continue;
    if (raw.startsWith('+')) { cur.added.push({ line: newLine, text: raw.slice(1) }); newLine++; }
    else if (raw.startsWith('-')) cur.removed.push(raw.slice(1));
  }
  return files;
}

// ─── 定義 ─────────────────────────────────────────────────────────
const PY_DEF = /^(?:async\s+)?def\s+([A-Za-z_]\w*)\s*\(/;
const JS_FN = /^(?:export\s+(?:default\s+)?)?(?:async\s+)?function\s*\*?\s*([A-Za-z_$][\w$]*)\s*\(/;
const JS_CONST = /^(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s+)?(?:function\b|\([^)]*\)\s*=>|[A-Za-z_$][\w$]*\s*=>)/;

function defName(file, text) {
  const re = ext(file) === '.py' ? [PY_DEF] : [JS_FN, JS_CONST];
  for (const r of re) {
    const m = text.match(r);
    if (m) return m[1];
  }
  return null;
}

/** 追跡中のコードファイルのトップレベル定義を全部 (name → [{file, line}]) */
function allDefs(root) {
  const out = tryGit(root, ['grep', '-n', '-I', '-E',
    '^(async[[:space:]]+)?def[[:space:]]|^(export[[:space:]]+(default[[:space:]]+)?)?(async[[:space:]]+)?function|^(export[[:space:]]+)?(const|let|var)[[:space:]]',
    '--', ...[...CODE_EXT].map(e => `*${e}`)]) || '';
  const map = new Map();
  for (const l of out.split(/\r?\n/)) {
    const m = l.match(/^(.+?):(\d+):(.*)$/);
    if (!m) continue;
    const [, file, line, text] = m;
    if (isTest(file) || isVendored(file)) continue;
    const name = defName(file, text);
    if (!name) continue;
    if (!map.has(name)) map.set(name, []);
    map.get(name).push({ file, line: Number(line) });
  }
  return map;
}

// ─── 呼び出し元 ─────────────────────────────────────────────────────
const fileCache = new Map();
function lines(root, file) {
  if (!fileCache.has(file)) {
    let t = '';
    try { t = fs.readFileSync(path.join(root, file), 'utf8'); } catch {}
    fileCache.set(file, t.split(/\r?\n/));
  }
  return fileCache.get(file);
}

/** 定義の本体の行の範囲 [start, end] (1 始まり)。次のトップレベルの行の手前まで */
function bodyRange(root, file, defLine) {
  const ls = lines(root, file);
  let end = ls.length;
  for (let i = defLine; i < ls.length; i++) {
    const t = ls[i];
    if (t === '' || /^\s/.test(t)) continue;
    if (/^[}\])]/.test(t)) continue;                 // JS の閉じ括弧
    if (/^(#|\/\/|\/\*|\*)/.test(t)) continue;       // コメント
    end = i;                                         // i は 0 始まり = 1 始まりの i 行目の手前
    break;
  }
  return [defLine, end];
}

function stripComment(file, text) {
  if (ext(file) === '.py') return text.replace(/(^|\s)#.*$/, '');
  return text.replace(/(^|\s)\/\/.*$/, '').replace(/\/\*.*?\*\//g, '');
}

const IMPORT_LINE = /^\s*(from\s+\S+\s+import\b|import\s|export\s*\{|module\.exports\b|exports\.\w+\s*=|__all__\s*=|const\s*\{[^}]*\}\s*=\s*require\(|const\s+\w+\s*=\s*require\()/;

function isDecorated(root, file, defLine) {
  if (ext(file) !== '.py') return false;
  const ls = lines(root, file);
  for (let i = defLine - 2; i >= 0; i--) {
    const t = ls[i];
    if (t.trim() === '') continue;
    return /^@/.test(t);
  }
  return false;
}

/** 呼び出し元の数 (テスト・文書・自分の本体・コメント・import / export だけの行・別の同名定義は数えない) */
function callerCount(root, name, def) {
  const out = tryGit(root, ['grep', '-n', '-I', '-w', '-F', '-e', name]) || '';
  const [bStart, bEnd] = bodyRange(root, def.file, def.line);
  let n = 0;
  for (const l of out.split(/\r?\n/)) {
    const m = l.match(/^(.+?):(\d+):(.*)$/);
    if (!m) continue;
    const [, file, lineStr, text] = m;
    const line = Number(lineStr);
    if (isTest(file) || isDoc(file) || neverCaller(file)) continue;
    if (file === def.file && line >= bStart && line <= bEnd) continue;
    if (isCode(file)) {
      const code = stripComment(file, text);
      if (!new RegExp(`(^|[^\\w$])${name.replace(/\$/g, '\\$')}([^\\w$]|$)`).test(code)) continue;
      if (IMPORT_LINE.test(code)) continue;
      if (defName(file, code) === name) continue;
    }
    n++;
  }
  return n;
}

// ─── hook / skill (配布元のリポだけ) ────────────────────────────────
function readText(root, rel) {
  try { return fs.readFileSync(path.join(root, rel), 'utf8'); } catch { return ''; }
}

function hookMissing(root, file) {
  const base = path.basename(file);
  if (base.startsWith('_') || isTest(file)) return false;
  if (!/\.(js|sh|py|cjs|mjs)$/.test(base)) return false;
  const settings = ['_templates/settings.json', '.claude/settings.json', '.claude/settings.local.json'].map(f => readText(root, f)).join('\n');
  if (settings.includes(base)) return false;
  // 他の hook から require / source されるもの (共通部) は登録が無くてよい
  const stem = base.replace(/\.[^.]+$/, '');
  const dir = path.dirname(file);
  const others = (tryGit(root, ['ls-files', '--', dir]) || '').split(/\r?\n/).filter(f => f && f !== file);
  return !others.some(f => {
    const t = readText(root, f);
    return new RegExp(`(require\\(\\s*['"\`]\\./${stem}(\\.[a-z]+)?['"\`]|source\\s+\\S*${base}|\\./${base})`).test(t);
  });
}

function skillMissing(root, file) {
  const base = path.basename(file);
  const stem = base.replace(/\.md$/, '');
  const refFiles = [
    ...(tryGit(root, ['ls-files', '--', 'commands', '.claude/commands', '_templates/commands']) || '').split(/\r?\n/),
    'skill-triggers.json', '_templates/skill-triggers.json', '.claude/skill-triggers.json', 'CLAUDE.md', '_templates/CLAUDE_PROJECT.md',
  ].filter(Boolean);
  const re = new RegExp(`(^|[^\\w-])${stem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\.md)?([^\\w-]|$)`);
  return !refFiles.some(f => f !== file && re.test(readText(root, f)));
}

// ─── 本体 ─────────────────────────────────────────────────────────
function loadJson(root, rel) {
  try { return JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8')); } catch { return null; }
}

function keyOf(o) { return o.symbol ? `${o.category}:${o.file}:${o.symbol}` : `${o.category}:${o.file}`; }

function scan(root, args) {
  const config = loadJson(root, '.claude/wiring-gate.json') || {};
  const mode = ['off', 'notify', 'enforce'].includes(config.mode) ? config.mode : 'notify';
  const isSource = fs.existsSync(path.join(root, '_templates', 'hooks'));
  IS_SOURCE_REPO = isSource;
  let categories = Array.isArray(config.categories) ? config.categories.filter(c => ALL_CATEGORIES.includes(c))
    : ['dead_code', 'scheduler_missing', 'hook_missing', 'skill_missing'];
  if (!isSource) categories = categories.filter(c => c !== 'hook_missing' && c !== 'skill_missing');

  const result = { mode, categories, base: null, orphans: [], undetermined: [], allowed: [] };
  if (mode === 'off') {
    result.skipped = `mode=off${config.reason ? `: ${config.reason}` : ''}`;
    return result;
  }

  let diffText;
  if (args.staged) {
    result.base = 'staged';
    diffText = tryGit(root, ['diff', '--cached', '-U0', '--no-color', '--no-ext-diff', '-M']);
  } else {
    const mb = resolveBase(root, args.base);
    if (!mb) { result.skipped = `比べる元 (merge-base) を決められない: ${args.base || 'origin の既定の枝'}`; return result; }
    result.base = mb;
    diffText = tryGit(root, ['diff', mb, '-U0', '--no-color', '--no-ext-diff', '-M']);
  }
  if (diffText == null) { result.skipped = 'git diff に失敗'; return result; }
  const diff = parseDiff(diffText);

  // 候補の関数: 足された定義 + 消された行に出た名前のうち定義があるもの
  const cands = new Map(); // name → def {file, line}
  const wantDead = categories.includes('dead_code') || categories.includes('scheduler_missing');
  let defs = null;
  if (wantDead) {
    for (const [file, d] of Object.entries(diff)) {
      if (!isCode(file) || isTest(file) || isVendored(file) || isDistributedCopy(file)) continue;
      for (const a of d.added) {
        const name = defName(file, a.text);
        if (name && !cands.has(name)) cands.set(name, { file, line: a.line });
      }
    }
    const removedNames = new Set();
    for (const [file, d] of Object.entries(diff)) {
      if (isTest(file) || isDoc(file)) continue;
      for (const r of d.removed) {
        if (isCode(file) && defName(file, r)) continue; // 定義そのものを消した行は候補にしない
        for (const m of r.matchAll(/[A-Za-z_$][\w$]*/g)) removedNames.add(m[0]);
      }
    }
    if (removedNames.size) {
      defs = allDefs(root);
      for (const name of removedNames) {
        if (cands.has(name) || !defs.has(name)) continue;
        const list = defs.get(name).filter(x => !isDistributedCopy(x.file));
        if (list.length === 1) cands.set(name, list[0]);
      }
    }
  }

  const allow = (loadJson(root, '.claude/wiring-allow.json') || []).filter(e => e && typeof e.reason === 'string' && e.reason.trim());
  const allowed = o => allow.some(e => e.category === o.category && (!e.file || e.file === o.file) && (o.symbol ? e.symbol === o.symbol : !e.symbol || e.symbol === o.file));
  const push = o => {
    o.key = keyOf(o);
    if (!categories.includes(o.category)) return;
    if (allowed(o)) result.allowed.push(o); else result.orphans.push(o);
  };

  for (const [name, found0] of cands) {
    let def = found0;
    if (name.startsWith('_') || /^test_?/i.test(name) || isTest(def.file)) continue;
    // 定義が今のツリーに無い (消した) ものは数えない
    const cur = lines(root, def.file);
    if (!cur[def.line - 1] || defName(def.file, cur[def.line - 1]) !== name) {
      const found = cur.findIndex(t => defName(def.file, t) === name);
      if (found < 0) continue;
      def = { file: def.file, line: found + 1 };
    }
    if (isDecorated(root, def.file, def.line)) {
      result.undetermined.push({ file: def.file, line: def.line, symbol: name, reason: 'デコレータ付き (フレームワークが呼ぶ形)' });
      continue;
    }
    if (EXPORT_DEFAULT.test(cur[def.line - 1] || '') || FRAMEWORK_NAMES.has(name)) {
      result.undetermined.push({ file: def.file, line: def.line, symbol: name, reason: 'フレームワークが呼ぶ入口 (既定の export・Next.js 等の決まった名前)' });
      continue;
    }
    if (COMMON_NAMES.has(name) || name.length <= 3) {
      result.undetermined.push({ file: def.file, line: def.line, symbol: name, reason: 'ありふれた名前 (呼び出し元を名前で決められない)' });
      continue;
    }
    if (callerCount(root, name, def) > 0) continue;
    if (SCHED_RE.test(name)) {
      push({ category: 'scheduler_missing', file: def.file, line: def.line, symbol: name, reason: '定期実行の名前なのに、どこからも呼ばれていない (スケジューラ・ランナーに無い)' });
    } else {
      push({ category: 'dead_code', file: def.file, line: def.line, symbol: name, reason: 'テスト以外から呼ばれていない' });
    }
  }

  if (isSource) {
    // ★新しく足したファイルだけ (既にある未登録の hook を、別の直しで触っただけで鳴らさない・実測 2026-11-06 hino で 18 件)。
    //   .claude/ は _templates の写しなので見ない (同じものを 2 回言わない)
    for (const [file, d] of Object.entries(diff)) {
      if (!d.isNew || !fs.existsSync(path.join(root, file))) continue;
      if (/^_templates\/hooks\/[^/]+$/.test(file) && hookMissing(root, file)) {
        push({ category: 'hook_missing', file, line: 1, reason: 'settings.json に登録が無い (他の hook からも読まれていない)' });
      }
      if (/^(skills|_templates\/skills)\/[^/]+\.md$/.test(file) && skillMissing(root, file)) {
        push({ category: 'skill_missing', file, line: 1, reason: 'commands・skill-triggers.json・CLAUDE.md のどこからも参照されていない' });
      }
    }
  }

  const byPos = (a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line);
  result.orphans.sort(byPos);
  result.undetermined.sort(byPos);
  return result;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const top = tryGit(process.cwd(), ['rev-parse', '--show-toplevel']);
  let result;
  if (!top) {
    result = { mode: 'notify', categories: [], base: null, orphans: [], undetermined: [], allowed: [], skipped: 'git のリポの外' };
  } else {
    const root = top.trim();
    result = scan(root, args);
    try {
      const common = (tryGit(root, ['rev-parse', '--git-common-dir']) || '').trim();
      if (common) {
        const dir = path.join(path.resolve(root, common), 'wiring-gate');
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, 'orphans-report.json'), JSON.stringify({ scanned_at: new Date().toISOString(), ...result }, null, 2));
      }
    } catch {}
  }
  process.stdout.write(JSON.stringify(result) + '\n');
}

if (require.main === module) main();

module.exports = { parseDiff, defName, isTest };
