#!/usr/bin/env node
'use strict';

/**
 * Debug Guard (グローバル版) — ~/.claude/hooks/debug-guard.js
 *
 * 由来: ARIS の .claude/hooks/debug-guard.js (2026-05 の写しが追跡されずに置かれていた → 2026-11-05 にここで追跡)。
 * ARIS-1982 (11-05) で ARIS 側と同じく次を直した版:
 *   - 「確認」は Claude Code の形 (hookSpecificOutput.additionalContext) で文面を渡す (旧 ask_user は検証で落ちていた)
 *   - .claude/ の承認は、今動いている設定 (cwd/.claude/ と ~/.claude/) への書き込みだけ (別の worktree・読むだけでは鳴らない)
 *   - プロジェクトが settings で自分の debug-guard を登録しているときは何もしない (二重防止・ファイルがあるだけでは任せない)
 */

/**
 * Debug Guard — PreToolUse Hook v2
 *
 * デバッグ時の品質を物理ブロックで強制する。
 *
 * 設計方針:
 * - 「調査」は常に許可（読み取り系コマンド、プロセス確認等）
 * - 「修正」は検索+レビュー後のみ許可（状態を変えるコマンド）
 * - 判断つかない場合はfail-open（調査を止めないことを優先）
 * - .context/ 配下と .claude/ 配下の操作は常に許可（デッドロック防止）
 *
 * フラグファイル:
 * - .context/debug-mode    → デバッグモード有効
 * - .context/debug-reviewed → レビュー実行済み
 */

const fs = require('fs');
const path = require('path');

const DEBUG_FLAG = path.join(process.cwd(), '.context', 'debug-mode');
const REVIEW_FLAG = path.join(process.cwd(), '.context', 'debug-reviewed');
const TOOL_LOG = path.join(process.cwd(), '.context', 'tool-log.jsonl');

// === 修正系ツール ===
const MODIFICATION_TOOLS = ['Edit', 'Write'];

// === 常に許可（デッドロック防止 + 調査系） ===
// .context/ → 無条件スルー（フラグ操作、デッドロック防止）
// .claude/hooks/, .claude/skills/ → isNeedsUserApproval()で処理（ask_user）
function isAlwaysAllowed(toolName, toolInput) {
  // Edit/Write: .context/ 配下のみ無条件許可
  if ((toolName === 'Edit' || toolName === 'Write') && toolInput?.file_path) {
    const fp = toolInput.file_path;
    if (fp.includes('.context/')) return true;
    // .claude/ はここでは許可しない（ask_userで処理）
  }

  // Bash: .context/ に触れる単文だけ無条件に通す (自己修復の道・デッドロック防止)。
  //   ARIS-1982 (11-06): 以前は「先頭が読む系 (git status 等)」や「.context/ を含む」だけで、
  //   `&&`・`;`・`|` の後ろの変更まで素通りしていた。読む系の一覧は外した
  //   (変更と読めない Bash は isStateChangingBash で false になり、もともと fail-open で通る)。
  if (toolName === 'Bash') {
    const cmd = String(toolInput?.command || '');
    if (/\.context\//.test(cmd) && !/\.context\/\.\./.test(cmd) && !/[;&|\n`]|\$\(/.test(cmd)) return true;
  }

  return false;
}

// === 明確に状態を変えるBashコマンド ===
function isStateChangingBash(cmd) {
  const patterns = [
    /\bkill\s+\d/,
    /\bkill\s+-[^0]/,
    /\bpkill\b/,
    /\bkillall\b/,
    /\blaunchctl\s+(unload|load|remove|bootout|bootstrap|kickstart|disable|enable)\b/,
    /\bchmod\s/,
    /\bchown\s/,
    /\bsed\s.*-i/,
    /\bsudo\b/,
    // ARIS-1982 (11-06): 旧 `git\s+(…|merge|…)\b` は読むだけの `git merge-base` を merge と読んでいた (`-` で \b が成り立つ)。
    //   サブコマンドの後ろは空白か終わりだけにし、`git -C dir`・`-c k=v`・`--no-pager` 等の前置きも越える。
    //   stash は list/show 以外 (素の stash・pop・push・drop・clear・apply) を変更と見る。
    /\bgit(?:\s+(?:-[Cc]\s+\S+|--no-pager|--(?:git-dir|work-tree)(?:=|\s+)\S+))*\s+(?:commit|push|reset|checkout|switch|restore|rebase|merge|cherry-pick|revert|clean|am)(?![\w-])/,
    /\bgit(?:\s+(?:-[Cc]\s+\S+|--no-pager|--(?:git-dir|work-tree)(?:=|\s+)\S+))*\s+stash(?![\w-])(?!\s+(?:list|show)\b)/,
    /\bnpm\s+(install|uninstall|update)\b/,
    /\bpip\s+(install|uninstall)\b/,
    /\bbrew\s+(install|uninstall|update|upgrade)\b/,
    /\bsystemctl\s+(start|stop|restart|enable|disable)\b/,
  ];
  return patterns.some(p => p.test(cmd));
}

// === 今動いている設定 (.claude/) の修正はユーザー承認が必要 ===
// ARIS-1982 (11-04): 以前は「.claude/(hooks|skills|settings) を含む」かつ「mv|rm|cp|sed|tee|> の文字がある」で鳴り、
//   sed -n・2>&1・別の worktree の .claude/ の編集にも鳴っていた。今動いている設定 = セッションの cwd の .claude/ と
//   ~/.claude/ への書き込みだけにする (worktree の中は merge とレビューを経て初めて効く)。
// hooks/・skills/ の中と settings(.local).json だけ (~/.claude/hooks-retired-… や settings.json.before は今動いていない)
const LIVE_CFG_RE = /\.claude\/(?:(?:hooks|skills)(?:\/|$)|settings(?:\.local)?\.json$)/;
const WRITE_TOOLS_CFG = new Set(['Edit', 'Write', 'MultiEdit', 'NotebookEdit']);

// macOS の /var → /private/var のような別名で比較がずれないよう、実在する一番深い親まで realpath で解決する
function realish(p) {
  let cur = path.resolve(p);
  const rest = [];
  for (let i = 0; i < 64; i++) {
    try { return path.join(fs.realpathSync(cur), ...rest.reverse()); } catch {}
    const parent = path.dirname(cur);
    if (parent === cur) break;
    rest.push(path.basename(cur));
    cur = parent;
  }
  return path.resolve(p);
}

function liveConfigRoots() {
  const roots = [path.join(process.cwd(), '.claude')];
  const home = process.env.HOME || require('os').homedir();
  if (home) roots.push(path.join(home, '.claude'));
  return roots.map(r => realish(r) + path.sep);
}

function isLiveConfigPath(p, baseDir) {
  if (!p) return false;
  let s = String(p).replace(/^['"]|['"]$/g, '');
  const home = process.env.HOME || require('os').homedir();
  if (s.startsWith('~/')) s = path.join(home, s.slice(2));
  const abs = realish(path.isAbsolute(s) ? path.normalize(s) : path.resolve(baseDir || process.cwd(), s));
  if (!LIVE_CFG_RE.test(abs.split(path.sep).join('/'))) return false;
  return liveConfigRoots().some(r => abs.startsWith(r));
}

// ── Bash が今動いている設定 (.claude/) を書き換えうるか (ARIS-1982・11-05 その 2・設計 v3) ──
// 経緯: v1 は「書き込みの形がどこかにある」かつ「設定のパスがどこかにある」で鳴り、読むだけでも鳴った (このセッションで 677 回)。
//   v2 は「書き込みの形を数え上げて、その行き先を見る」にしたが、第三者監査のたびに漏れが出た (文の頭・コメント・
//   バックスラッシュ・<<<・glob・export…)。シェルの書き方は数え切れないので、数え上げは必ず漏れる。
// v3 の設計: 向きを逆にする。設定に触れる文 (.claude を含む・設定の根の中で動く) は、
//   **読むだけだと示せたときだけ黙る**。示せない形・読み取れない形は鳴らす (分からないときは鳴らす側)。
//   - 読むだけ = 読むだけのコマンド (cat・grep・ls・git log…)・sed/awk/find/tar/git は書かない形のときだけ・
//     cp/rsync/install/ln/tee は行き先が設定でないとき (元が設定でもよい)・インラインのコードは書き込みの関数が無いとき。
//     リダイレクトの先が設定なら読むだけではない。
//   - 設定でない .claude: 別の worktree の .claude (cd の先で解決する)・~/.claude/projects 等のデータの場所・
//     ~/.claude/hooks-retired-… と settings.json.before のような控え。
//   - 消す形 (rm・mv の元・chmod/chown) で設定の根の親 (ホーム) を指すときも鳴らす。
// Claude Code 自身も .claude への書き込みに確認を出すので、この hook は文面だけの 2 枚目 (止めない)。
const READ_ONLY_CMDS = new Set([
  'cat', 'head', 'tail', 'less', 'more', 'grep', 'egrep', 'fgrep', 'rg', 'ag', 'ls', 'stat', 'file', 'wc', 'diff', 'cmp',
  'jq', 'yq', 'sort', 'uniq', 'cut', 'tr', 'nl', 'column', 'paste', 'comm', 'md5', 'md5sum', 'shasum', 'sha256sum', 'cksum',
  'xxd', 'od', 'strings', 'hexdump', 'echo', 'printf', 'true', 'false', 'test', '[', '[[', 'pwd', 'realpath', 'readlink',
  'basename', 'dirname', 'which', 'type', 'whereis', 'date', 'sleep', 'tree', 'du', 'df', 'ps', 'pgrep', 'lsof', 'id',
  'whoami', 'hostname', 'uname', 'printenv', 'mkdir', 'tmux', 'bat', 'fd', 'plutil',
]);
// 読むだけのコマンドの、書き込むオプション (3 回目の監査 11-05)
const WRITE_OPTS = { sort: /^(-[a-zA-Z]*o|--output)/, tree: /^-o/, less: /^(-o|-O|--log-file|--LOG-FILE)/, diff: /^--output/,
  uniq: /^$/, jq: /^$/, grep: /^$/, echo: /^$/ };
const COPY_CMDS = new Set(['cp', 'rsync', 'install', 'ln', 'scp', 'ditto', 'tee']);
const DESTROY_CMDS = new Set(['rm', 'rmdir', 'unlink', 'chmod', 'chown', 'shred', 'mv']);
const GIT_READ = new Set(['add', 'commit', 'push', 'status', 'log', 'diff', 'show', 'blame', 'ls-files', 'ls-tree', 'rev-parse', 'grep', 'shortlog',
  'describe', 'cat-file', 'reflog', 'fetch', 'remote', 'config', 'branch', 'tag', 'worktree', 'check-ignore', 'name-rev', 'merge-base']);
const ASSIGN_CMDS = new Set(['export', 'declare', 'local', 'readonly', 'typeset']);
const PREFIX_OPTS = {
  sudo: new Set(['-u', '-g', '-C', '-h', '-p']), env: new Set(['-u', '-C', '-S', '--chdir', '--unset']),
  nice: new Set(['-n']), timeout: new Set(['-s', '-k', '--signal', '--kill-after']), stdbuf: new Set(['-i', '-o', '-e']),
  nohup: new Set(), command: new Set(), exec: new Set(['-a']), builtin: new Set(), time: new Set(), caffeinate: new Set(['-t', '-w']),
};
const HEAD_KEYWORDS = new Set(['if', 'then', 'else', 'elif', 'do', 'while', 'until', 'time', '!', '{', '}', '(', ')', 'fi', 'done']);
const SHELLS = new Set(['bash', 'sh', 'zsh', 'dash', 'ksh']);
const INTERPS = new Set(['python', 'python3', 'node', 'perl', 'ruby']);
const CODE_WRITES_RE = /\bopen\((?:[^()]|\([^()]*\))*,\s*['"][wax]|\.write(?:_text|_bytes)?\(|writeFile|appendFile|copyFile|renameSync|unlinkSync|rmSync|cpSync|mkdirSync|fs\.promises|\.rename\(|shutil\.|os\.(?:remove|unlink|rename|replace|makedirs|mkdir|chmod|system)|subprocess|child_process|execSync|spawnSync|\.(?:unlink|rename|touch|chmod)\(|json\.dump\(|fs\.(?:write|append|copy|rename|unlink|rm)/;
// .claude のあとが「データの場所」なら設定ではない
const CFG_DATA_RE = /^(?:projects|todos|shell-snapshots|statsig|plans|file-history|ide|logs|telegram-history|channels|plugins\/cache|hooks-retired[^/]*|session-env|debug|downloads|cache|backups)(?:\/|$)/;
// .claude を含む語 (前は区切りまで・後ろは区切りまで)。.claude.json は含めない
const CFG_TOKEN_RE = /[^\s'"`;|&()<>=]*\.claude(?![\w.-])[^\s'"`;|&()<>]*/g;
const GLOB_RE = /[*?[\]{}]/;

// glob の 1 部品が .claude に当たりうるか (.clau?e・.[c]laude・.cl*)
function globCouldBeClaude(comp) {
  // パスの部品らしい短い語だけ (grep の正規表現 [^"]{0,40}… を glob と見ない)
  if (!/^[.[*?{][^\s]{0,15}$/.test(comp)) return false;
  try {
    const re = comp.replace(/[.+^$()|\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.').replace(/\{([^}]*)\}/g, (m, x) => '(' + x.split(',').join('|') + ')');
    return new RegExp('^' + re + '$').test('.claude');
  } catch { return false; }
}

const _realCache = new Map();
function realishCached(p) { if (!_realCache.has(p)) _realCache.set(p, realish(p)); return _realCache.get(p); }

// 語の正規化: 引用符とバックスラッシュを外す (.clau\de・.claude/"settings.json" も同じ語に)
function plain(s) { return String(s).replace(/\\(.)/g, '$1').replace(/['"]/g, ''); }

// 文に分ける。引用符・バックスラッシュ・$(…)・# のコメント を見分ける。読めない形は 1 つの文に残る (= 鳴る側)
function splitStatements(s) {
  const out = []; let cur = ''; let q = null; let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '\\' && q !== "'") { cur += ch + (s[i + 1] || ''); i++; continue; }
    if (q) { cur += ch; if (ch === q) q = null; continue; }
    if (ch === "'" || ch === '"' || ch === '`') { q = ch; cur += ch; continue; }
    if (ch === '#' && (i === 0 || /[\s;&|(]/.test(s[i - 1])) && !depth) {   // コメントは行末まで捨てる
      while (i < s.length && s[i] !== '\n') i++;
      out.push(cur); cur = ''; continue;
    }
    if (ch === '$' && s[i + 1] === '(') { depth++; cur += '$('; i++; continue; }   // ( を 2 回数えない
    if (depth) { if (ch === '(') depth++; if (ch === ')') depth--; cur += ch; continue; }
    if (ch === '\n' || ch === ';') { out.push(cur); cur = ''; continue; }
    if ((ch === '&' || ch === '|') && s[i + 1] === ch) { out.push(cur); cur = ''; i++; continue; }
    if (ch === '|' && s[i - 1] !== '>') { out.push(cur); cur = ''; continue; }
    if (ch === '&' && s[i + 1] !== '>' && s[i - 1] !== '>' && s[i - 1] !== '<') { out.push(cur); cur = ''; continue; }
    cur += ch;
  }
  out.push(cur);
  return out.map(x => x.trim()).filter(Boolean);
}

function shellWords(s) {
  const out = []; let cur = ''; let q = null; let has = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '\\' && q !== "'") { cur += s[i + 1] || ''; i++; has = true; continue; }
    if (q !== "'" && ((ch === '$' && s[i + 1] === '(') || ch === '`')) {   // $(…)・`…` は 1 語の一部 (中の空白で切らない)
      let j = i + 1;
      if (ch === '`') { j = s.indexOf('`', i + 1); j = j < 0 ? s.length : j + 1; }
      else { let d = 0; for (; j < s.length; j++) { if (s[j] === '(') d++; else if (s[j] === ')') { d--; if (!d) { j++; break; } } } }
      cur += s.slice(i, j); i = j - 1; has = true; continue;
    }
    if (q) { if (ch === q) q = null; else cur += ch; continue; }
    if (ch === "'" || ch === '"') { q = ch; has = true; continue; }
    if (/\s/.test(ch)) { if (cur || has) out.push(cur); cur = ''; has = false; continue; }
    cur += ch;
  }
  if (cur || has) out.push(cur);
  return out;
}

// $(…) と `…` の中身 (一重引用符の中は文面)
function substitutions(s) {
  const out = []; let q = null;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '\\' && q !== "'") { i++; continue; }
    if (q === "'") { if (ch === "'") q = null; continue; }
    if (ch === "'" && q !== '"') { q = "'"; continue; }
    if (ch === '"') { q = q === '"' ? null : '"'; continue; }
    if (ch === '`') { const e = s.indexOf('`', i + 1); if (e > i) { out.push(s.slice(i + 1, e)); i = e; } continue; }
    if (ch === '$' && s[i + 1] === '(' && s[i + 2] !== '(') {
      let d = 1; let j = i + 2;
      for (; j < s.length && d; j++) { if (s[j] === '(') d++; else if (s[j] === ')') d--; }
      out.push(s.slice(i + 2, j - 1)); i = j - 1;
    }
  }
  return out;
}

// ヒアドキュメントの本文を外す。引用符の中の <<・<<< (ヒアストリング)・$((x<<y)) はヒアドキュメントではない
function stripHeredocs(s) {
  const out = []; let end = null; const bodies = [];
  for (const line of s.split('\n')) {
    if (end !== null) { if (line.trim() === end) end = null; else bodies.push(line); continue; }
    const blank = line.replace(/\\./g, '__').replace(/'[^']*'|"(?:[^"\\]|\\.)*"/g, m => '_'.repeat(m.length))
      .replace(/\$\(\((?:[^()]|\([^()]*\))*\)\)/g, m => '_'.repeat(m.length));
    const m = blank.match(/(^|[^<])<<-?[ \t]*\\?(['"]?)([A-Za-z_][\w-]*)\2(?!<)/);
    if (m && !/<<</.test(blank.slice(m.index, m.index + m[0].length + 1))) {
      const at = m.index + m[1].length;
      const em = line.slice(at).match(/<<-?[ \t]*\\?(['"]?)([A-Za-z_][\w-]*)\1/);
      if (!em) { out.push(line); continue; }                           // 読めない形は本文扱いにしない (= 中も見る)
      end = em[2];
      out.push(line.slice(0, at) + ' ' + line.slice(at + m[0].length - m[1].length));
      continue;
    }
    out.push(line);
  }
  return [out.join('\n'), bodies.join('\n')];
}

function expandHome(t, home) {
  return t.replace(/^~(?=\/|$)/, home).replace(/^\$\{?HOME\}?(?=\/|$)/, home);
}
function expandVars(t, vars) {
  return t.replace(/\$\{?([A-Za-z_]\w*)\}?/g, (m, n) => (n in vars ? vars[n] : m));
}

// 引用符の外のリダイレクト。返り値: [先の一覧, リダイレクトを外した文]
function scanRedirects(st) {
  const targets = []; let rest = ''; let q = null;
  for (let i = 0; i < st.length; i++) {
    const ch = st[i];
    if (ch === '\\' && q !== "'") { rest += ch + (st[i + 1] || ''); i++; continue; }
    if (q) { rest += ch; if (ch === q) q = null; continue; }
    if (ch === "'" || ch === '"') { q = ch; rest += ch; continue; }
    if (ch === '>') {
      let j = i + 1;
      if (st[j] === '>' || st[j] === '|' || st[j] === '&') j++;
      while (st[j] === ' ' || st[j] === '\t') j++;
      let t = ''; let tq = null;
      while (j < st.length) {                         // 引用符・バックスラッシュ混じりの語を 1 語として読む
        const c = st[j];
        if (c === '\\' && tq !== "'") { t += st[j + 1] || ''; j += 2; continue; }
        if (tq) { if (c === tq) tq = null; else t += c; j++; continue; }
        if (c === "'" || c === '"') { tq = c; j++; continue; }
        if (/[\s;|&<>()]/.test(c)) break;
        t += c; j++;
      }
      if (!/^\d+$/.test(t) && t !== '-') targets.push(t);   // >&2 は先ではない
      rest = rest.replace(/&?\d?$/, '') + ' ';
      i = j - 1;
      continue;
    }
    rest += ch;
  }
  return [targets, rest];
}

function bashWritesLiveConfig(cmd, depth = 0, startCwd = process.cwd(), inheritedVars = null) {
  const home = process.env.HOME || require('os').homedir() || '';
  const roots = liveConfigRoots().map(r => r.slice(0, -1));          // 1 回だけ (realpath を何度もしない)
  const insideRoot = (abs) => { const a = realishCached(abs); return roots.some(r => a === r || a.startsWith(r + path.sep)); };
  const rootOrAncestor = (abs) => { const a = realishCached(abs); return roots.some(r => a === r || r.startsWith(a.endsWith(path.sep) ? a : a + path.sep)); };
  const raw = String(cmd).replace(/\d?>&\d(?!\w)/g, ' ').replace(/&?\d?>>?\s*\/dev\/null\b/g, ' ');
  const cfgAnywhere = /\.claude(?![\w.-])/.test(plain(raw)) || /['"]\.claude['"]/.test(raw);
  // 早く抜けてよいのは、.claude が無く、組み立て (glob・$・\・`) も場所の移動も消す形も無いときだけ
  if (!cfgAnywhere && !insideRoot(startCwd) && !/[*?[\]{}$`\\]|\bcd\b|\bpushd\b|\benv\b|\brm\b|\bmv\b|\bchmod\b|\bchown\b|\bshred\b/.test(raw)) return false;
  if (depth > 3) return cfgAnywhere;                                   // 深すぎて読めない = 分からない

  let cwd = startCwd; let cwdKnown = true; let prev = cwd; const stack = [];
  const vars = Object.assign({ HOME: home }, inheritedVars || {});
  const resolve = (t0) => {
    const t = expandVars(expandHome(plain(t0), home), vars);
    if (/\$/.test(t)) return null;
    const e = expandHome(t, home);
    if (!path.isAbsolute(e) && !cwdKnown) return null;
    return path.resolve(cwd, e);
  };
  // 語が「今動いている設定」を指すか: true / false / null (分からない)
  const cfgOf = (tok) => {
    let p0 = expandVars(expandHome(plain(tok), home), vars);
    if (!p0.includes('$')) p0 = path.posix.normalize(p0);           // ~/.claude/projects/../hooks を hooks として見る
    // 名前の途中の glob (.clau?e・.[c]laude) が .claude に当たりうるなら分からない
    if (p0.split('/').some(c => GLOB_RE.test(c) && globCouldBeClaude(c))) return null;
    const idx = p0.search(/\.claude(?![\w.-])/);
    if (idx < 0) return false;
    if (/^~[^/]/.test(p0)) return null;                               // ~user/.claude = 別の人のホム (分からない)
    const after = p0.slice(idx + '.claude'.length).replace(/^\/+/, '');
    if (CFG_DATA_RE.test(after)) return false;
    if (/^settings(?!(?:\.local)?\.json$)[^/*?[{]*$/.test(after) && !GLOB_RE.test(after)) return false;   // settings.json.before 等の控え
    if (GLOB_RE.test(p0.slice(0, idx))) return null;                 // */.claude のように根の前が glob = 分からない
    const base = resolve(p0.slice(0, idx + '.claude'.length));
    if (base === null) return null;
    if (!insideRoot(base)) return false;                              // 別の worktree の .claude
    return true;
  };
  // 語の中の部分も見る (of=.claude/…・--output=…・sed の 's/a/b/w .claude/…')。分からないときも触れると見る
  const touchesCfg = (tok) => {
    if (cfgOf(tok) !== false) return true;
    const p = expandVars(expandHome(plain(tok), home), vars);
    return (p.match(CFG_TOKEN_RE) || []).concat(p.split(/[=,:]/).slice(1)).some(t => t && t !== tok && cfgOf(t) !== false);
  };
  // 行き先の判定: 語そのもの、または cd の先で解決した絶対パスが設定か (cd ~/.claude; cp x hooks/)
  const destCfg = (d) => {
    const c = cfgOf(d);
    if (c !== false) return c;
    const a = resolve(d);
    return a === null ? (cfgAnywhere ? null : false) : cfgOf(a);
  };

  // 設定の話か (データの場所 ~/.claude/projects 等だけなら違う)。引用符で組み立てる '.claude' は設定の話と見る
  const cfgTalk = /['"]\.claude['"]/.test(raw) || (plain(raw).match(CFG_TOKEN_RE) || []).some(t => cfgOf(t) !== false);
  const funcs = {};
  const [noHeredoc, bodies] = stripHeredocs(raw);
  const codeWrites = CODE_WRITES_RE.test(raw);
  // インラインのコードの中の設定のパス。'.claude' を部品で組み立てる形・HOME + '/.claude/…' は ~ からと見る
  const codeTouchesCfg = () => /['"]\.claude['"]/.test(raw) ||
    (raw.match(/[^\s'"`<>|;&()=,+\[\]]*\.claude(?![\w.-])[^\s'"`<>|;&(),\]]*/g) || []).some(t => t.startsWith('/.claude') || cfgOf(t) !== false);
  for (const st of splitStatements(noHeredoc)) {
    if (substitutions(st).some(s => bashWritesLiveConfig(s, depth + 1, cwd, vars))) return true;
    const [redirs, rest] = scanRedirects(st);
    let w = shellWords(rest.replace(/<<<\s*\S+/g, ' ').replace(/<\s*\S+/g, ' '));
    let stCwd = null;
    for (;;) {
      while (w.length && /^[({!]+$/.test(w[0])) w.shift();
      if (w.length && /^[({]+./.test(w[0])) w[0] = w[0].replace(/^[({]+/, '');
      if (w.length && HEAD_KEYWORDS.has(w[0])) { w.shift(); continue; }
      if (w.length && /^[A-Za-z_]\w*=/.test(w[0])) {
        const a = w.shift(); const k = a.slice(0, a.indexOf('='));
        vars[k] = expandVars(expandHome(plain(a.slice(k.length + 1)), home), vars);
        continue;
      }
      const p = w.length && w[0].replace(/^\\/, '');
      if (p === 'uv' && w[1] === 'run') {             // uv run [opts] X … は X … として読む
        w.splice(0, 2);
        while (w.length && w[0].startsWith('-')) { const o = w.shift(); if (['--with', '--python', '-p', '--project', '--directory', '--group', '--extra', '--env-file'].includes(o)) w.shift(); }
        continue;
      }
      if (p && PREFIX_OPTS[p]) {
        w.shift();
        while (w.length && w[0].startsWith('-')) {
          const o = w.shift();
          if (p === 'env' && (o === '-C' || o === '--chdir') && w.length) stCwd = w[0];
          if (p === 'env' && o.startsWith('--chdir=')) stCwd = o.slice(8);
          if (PREFIX_OPTS[p].has(o)) w.shift();
        }
        if (p === 'timeout' && w.length && /^\d/.test(w[0])) w.shift();
        if (p === 'env') while (w.length && /^[A-Za-z_]\w*=/.test(w[0])) w.shift();
        continue;
      }
      break;
    }
    while (w.length && /^[)}]+$/.test(w[w.length - 1])) w.pop();
    // シェル関数の定義 t() { tmux …; } → 以後 t は tmux と読む。for/case/select の頭は一覧を並べるだけ
    if (w.length && /^[A-Za-z_][\w-]*\(\)$/.test(w[0])) {
      const body = w.slice(1).filter(x => x !== '{');
      if (body.length) funcs[w[0].slice(0, -2)] = body[0].split('/').pop();
      continue;
    }
    if (w.length && /^(for|case|select)$/.test(w[0])) continue;
    if (w.length && funcs[w[0]]) w[0] = funcs[w[0]];
    if (!w.length) { if (redirs.some(touchesCfg) || (redirs.length && insideRoot(cwd))) return true; continue; }
    if (/^\$/.test(w[0])) w[0] = expandVars(plain(w[0]), vars);   // T=/opt/homebrew/bin/tmux; $T … は tmux として読む
    const name = w[0].replace(/^\\/, '').split('/').pop();
    const args = w.slice(1);
    const nonOpt = args.filter(a => !a.startsWith('-'));

    // 場所を変える文
    if (name === 'cd' || name === 'pushd') {
      const t = nonOpt[0];
      const r = !t || t === '~' ? home : t === '-' ? prev : resolve(t);
      if (name === 'pushd') stack.push(cwd);
      prev = cwd;
      if (r === null) { cwdKnown = !cfgAnywhere; if (!cwdKnown) cwd = roots[roots.length - 1]; }   // 分からない cd: 設定の話なら根の中にいると見る
      else { cwd = r; cwdKnown = true; }
      continue;
    }
    if (name === 'popd') { if (stack.length) { prev = cwd; cwd = stack.pop(); } continue; }
    if (ASSIGN_CMDS.has(name)) {
      for (const a of nonOpt) if (a.includes('=')) { const k = a.slice(0, a.indexOf('=')); vars[k] = expandVars(expandHome(plain(a.slice(k.length + 1)), home), vars); }
      continue;
    }
    if (name === 'eval') { if (bashWritesLiveConfig(args.join(' '), depth + 1, cwd, vars)) return true; continue; }
    if (SHELLS.has(name)) {
      const i = args.findIndex(a => /^-[a-zA-Z]*c$/.test(a));
      if (i >= 0) { if (args[i + 1] && bashWritesLiveConfig(args[i + 1], depth + 1, cwd, vars)) return true; continue; }
      if (bodies && (bodies.includes('.claude') || insideRoot(cwd))) return true;   // sh <<EOF の本文は実行される
    }

    // インラインのコード: 書き込みの関数があり、コードの中で設定に触れるなら鳴らす (読むだけは黙る)
    if (INTERPS.has(name)) {
      const inline = args.some(a => /^-[a-zA-Z]*[ce]$|^-p$/.test(a) || a === '-') || (name !== 'perl' && bodies && !nonOpt.length);
      if (name === 'perl' && args.some(a => /^-[a-zA-Z]*i/.test(a)) && (w.some(touchesCfg) || insideRoot(cwd))) return true;
      if (inline && codeWrites && codeTouchesCfg()) return true;   // その文の時点の cd の先で解決する
    }
    // xargs: 渡される先が分からない。書くコマンドに渡していて、設定の話なら鳴らす
    if (name === 'xargs' || name === 'parallel') {
      const sub = nonOpt.find(a => !/^\d+$/.test(a));
      if (cfgAnywhere && sub && !READ_ONLY_CMDS.has(sub.split('/').pop())) return true;
      continue;
    }

    const savedCwd = cwd; const savedKnown = cwdKnown;
    if (stCwd) { const r = resolve(stCwd); if (r === null) { cwdKnown = false; } else cwd = r; }
    const restore = () => { cwd = savedCwd; cwdKnown = savedKnown; };

    // 消す形: 設定の根の親 (ホーム) を指すときも当たり
    if (DESTROY_CMDS.has(name)) {
      const ts = name === 'mv' ? nonOpt.slice(0, -1) : nonOpt;
      if (ts.some(t => { const a = resolve(t); return a === null ? cfgAnywhere : rootOrAncestor(a); })) return true;
    }

    // この文が設定に触れるか (.claude を含む語・リダイレクト先・根の中で動く)
    const here = !cwdKnown || (insideRoot(cwd) && cfgOf(cwd) !== false);   // ~/.claude/projects/… の中は設定の外
    // 空白を含む引数 (コミットの文面・PR の本文・echo の文) は文面。sed/awk のスクリプト・コードの引数・ssh の中身は除く
    const scriptish = name === 'sed' || name === 'awk' || name === 'gawk' || INTERPS.has(name) || SHELLS.has(name) || name === 'ssh';
    const cfgWords = w.filter(x => (scriptish || !/\s/.test(x)) && touchesCfg(x));
    // 行き先の分からない語: 展開できない変数。$(…)・`…` の語は、中で .claude に触れるときだけ (gh pr create --body "$(cat …)" は違う)
    const varWords = w.filter(x => {
      if (!/\$|`/.test(expandVars(plain(x), vars))) return false;
      if (/^(\$\(|`)/.test(x) || /^--?[\w-]+=?\$\(/.test(x)) return /\.claude/.test(x);
      return true;
    });
    const redirHits = redirs.filter(t => touchesCfg(t) || (here && !path.isAbsolute(expandHome(plain(t), home)) && !/^\/dev\//.test(t)) || (cfgAnywhere && /\$/.test(expandVars(plain(t), vars))));
    if (redirHits.length) return true;
    // スクリプトのファイルを動かす (node .claude/hooks/x.js・python3 ~/.claude/hooks/lib/y.py・bash t.sh): ファイルは読まれるだけ。
    //   引数の側に設定が出てくるときだけ中身が分からないので鳴らす
    if ((INTERPS.has(name) || SHELLS.has(name)) && nonOpt.length && !args.some(a => /^-[a-zA-Z]*[ce]$|^-p$/.test(a) || a === '-')) {
      const scriptAt = w.indexOf(nonOpt[0]);
      if (!w.slice(scriptAt + 1).some(x => cfgOf(x) === true)) { restore(); continue; }
      return true;
    }
    if (!cfgWords.length && !here && !(cfgTalk && varWords.length && !READ_ONLY_CMDS.has(name))) { restore(); continue; }

    // 触れる文は、読むだけだと示せたときだけ黙る
    if (!readOnly(name, args, nonOpt, w)) return true;
    restore();
  }
  return false;

  function readOnly(name, args, nonOpt, w) {
    if (name === 'ssh') {
      // 別の機械の設定はこの機械の設定ではない。自分自身 (localhost) に入るときだけ中身を見られないので鳴らす
      const valued = new Set(['-o', '-p', '-i', '-l', '-F', '-J', '-L', '-R', '-D', '-E', '-S', '-W', '-b', '-c', '-m', '-O', '-Q', '-w']);
      let host = null;
      for (let i = 0; i < args.length; i++) { if (valued.has(args[i])) { i++; continue; } if (args[i].startsWith('-')) continue; host = args[i]; break; }
      const h = String(host || '').replace(/^.*@/, '');
      return !!h && !/^(localhost|127\.\d+\.\d+\.\d+|::1)$/i.test(h) && h !== require('os').hostname();
    }
    if (READ_ONLY_CMDS.has(name)) return !(WRITE_OPTS[name] && args.some(a => a.startsWith('-') && WRITE_OPTS[name].test(a) && WRITE_OPTS[name].source !== '^$'));
    // sed の w コマンド・awk の > / system() はスクリプトの中で書く
    if (name === 'sed') return !args.some(a => /^-[a-zA-Z]*i/.test(a) || a.startsWith('--in-place') || /(^|[\s;{}\/])w\s|(^|[\s;{}])e(\s|$)/.test(a));
    if (name === 'awk' || name === 'gawk') return !args.some(a => /inplace/.test(a) || /[^>]>|\bsystem\s*\(|\|\s*"|print\s*\|/.test(a) && !a.startsWith('-'));
    if (name === 'find') {
      if (args.some(a => ['-delete', '-fprint', '-fprint0', '-fprintf', '-fls'].includes(a))) return false;
      return args.every((a, i) => !['-exec', '-execdir', '-ok', '-okdir'].includes(a) || READ_ONLY_CMDS.has(String(args[i + 1] || '').split('/').pop()));
    }
    if (name === 'git') {
      const ci = args.indexOf('-C');
      const rest = nonOpt.filter(a => ci < 0 || a !== args[ci + 1]);
      const sub = rest[0];
      if (args.some(a => /^--output/.test(a))) return false;           // git log/diff --output=…
      if (sub === 'stash') return ['list', 'show'].includes(rest[1]);
      if (sub === 'config') return args.some(a => /^(--get|--get-all|--get-regexp|--list|-l|--show-origin|--name-only)$/.test(a)) && !args.some(a => /^--(file|unset|add|replace-all|rename-section|remove-section)/.test(a) && !/^--(get|list)/.test(a));
      if (sub === 'branch' || sub === 'tag' || sub === 'remote' || sub === 'worktree') {
        return !args.some(a => /^-[a-zA-Z]*[dDmM]$|^--(delete|move|unset|add|remove|replace-all)/.test(a)) && !['add', 'remove', 'prune', 'set-url', 'rename', 'move'].includes(rest[1]);
      }
      return GIT_READ.has(sub);
    }
    if (name === 'tar') {
      const create = args.some(a => /^-?[a-zA-Z]*c[a-zA-Z]*$/.test(a) && !a.startsWith('--') || a === '--create') && !args.some(a => /^-?[a-zA-Z]*x/.test(a) && !a.startsWith('--') || a === '--extract');
      const fi = args.findIndex(a => /^-[a-zA-Z]*f$/.test(a) || a === '--file');
      const fEq = args.find(a => a.startsWith('--file='));
      return create && !(fi >= 0 && destCfg(args[fi + 1] || '') !== false) && !(fEq && destCfg(fEq.slice(7)) !== false);
    }
    if (INTERPS.has(name)) {
      const inline = args.some(a => /^-[a-zA-Z]*[ce]$|^-p$/.test(a) || a === '-') || (bodies && !args.some(a => !a.startsWith('-')));
      if (args.includes('--check') || args.includes('--version') || args.includes('-V') || args.includes('-v')) return true;
      if (!inline) return false;                                        // スクリプトのファイルは中身が分からない
      return !codeWrites;
    }
    if (COPY_CMDS.has(name)) {
      const ti = args.findIndex(a => a === '-t' || a === '--target-directory');
      const tEq = args.find(a => a.startsWith('--target-directory='));
      let ops = nonOpt;
      if (name === 'install' && args.includes('-m')) { const mv = args[args.indexOf('-m') + 1]; ops = ops.filter(a => a !== mv); }
      const dest = name === 'tee' ? null : ti >= 0 ? args[ti + 1] : tEq ? tEq.split('=').slice(1).join('=') : ops[ops.length - 1];
      const dests = name === 'tee' ? ops : [dest];
      const srcs = name === 'tee' ? [] : ops.filter(a => a !== dest);
      for (const d of dests) {
        const c = destCfg(d);
        if (c === null) return false;
        if (c === true) {
          // 行き先が設定の根そのもの: 置くものが設定の名前 (hooks・skills・settings…) か、中身ごと (bk/・bk/.) なら書き込み
          const a = resolve(d);
          if (a !== null && roots.includes(realishCached(a))) {
            if (srcs.some(s => /\/\.?$/.test(s) || /^(hooks|skills|settings(\.local)?\.json|\.claude)$/.test(path.basename(plain(s))))) return false;
            continue;
          }
          return false;
        }
        if (dest !== null && srcs.length) {                              // 宛先/元の名前 が設定になるか (cp settings.json ~/.claude/)
          for (const s of srcs) {
            const da = resolve(d); if (da === null) return false;
            const j = path.join(da, path.basename(plain(s)));
            if (cfgOf(j) === true && /\.claude\/(?:hooks|skills)(?:\/|$)|\.claude\/settings(?:\.local)?\.json$/.test(j)) return false;
          }
        }
      }
      return true;
    }
    return false;
  }
}

function needsUserApproval(toolName, toolInput, shellCwd) {
  if (WRITE_TOOLS_CFG.has(toolName)) {
    const fp = toolInput?.file_path || toolInput?.notebook_path || '';
    return isLiveConfigPath(fp, process.cwd());
  }
  if (toolName === 'Bash') {
    try { return bashWritesLiveConfig(toolInput?.command || '', 0, shellCwd || process.cwd()); }
    catch { return /\.claude/.test(String(toolInput?.command || '')); }   // 読めずに落ちたら、設定の話なら鳴らす (黙って通さない)
  }
  return false;
}

function isModificationTool(toolName, toolInput) {
  // 常に許可リストに該当 → スルー (Edit/Write の .context/ だけ。Bash は下で判定)
  if (isAlwaysAllowed(toolName, toolInput)) return false;

  if (MODIFICATION_TOOLS.includes(toolName)) return true;

  if (toolName === 'Bash') {
    const cmd = (toolInput?.command || '');
    if (isStateChangingBash(cmd)) return true;
    // 判断つかない → fail-open
    return false;
  }
  return false;
}

// === ログ・フラグ読み取り ===
const RESEARCH_TOOLS = ['WebSearch', 'WebFetch'];
const REVIEW_TOOLS = ['Agent'];

function getInput() {
  return JSON.parse(fs.readFileSync(0, 'utf8'));
}

function isDebugMode() {
  return fs.existsSync(DEBUG_FLAG);
}

function isReviewed() {
  return fs.existsSync(REVIEW_FLAG);
}

function readRecentToolLog(minutes = 30) {
  if (!fs.existsSync(TOOL_LOG)) return [];
  const cutoff = new Date(Date.now() - minutes * 60 * 1000).toISOString();
  const lines = fs.readFileSync(TOOL_LOG, 'utf8').trim().split('\n').filter(Boolean);
  return lines
    .map(line => { try { return JSON.parse(line); } catch { return null; } })
    .filter(entry => entry && entry.timestamp >= cutoff);
}

function hasRecentResearch(entries) {
  return entries.some(e => RESEARCH_TOOLS.includes(e.tool));
}

function hasRecentReview(entries) {
  return entries.some(e => REVIEW_TOOLS.includes(e.tool));
}

function countRecentModifications(entries) {
  return entries.filter(e => {
    if (MODIFICATION_TOOLS.includes(e.tool)) return true;
    if (e.tool === 'Bash') return isStateChangingBash(e.input_summary || '');
    return false;
  }).length;
}

// ARIS-1982 (11-05): Claude Code の形で「確認を求める」文面を渡す (止めない)。旧版は top-level の decision に ask_user という値を出していて、
//   Claude Code の検証で落ち、毎回「Hook JSON output validation failed」になっていた (止まらず・聞かず・文面も届かない)。
//   今動いている設定 (.claude/) への書き込みは Claude Code 自身が Edit/Write/Bash のどれでも確認を出すので、ここは文面だけ。
function runningAsGlobalCopy() {
  try {
    const home = process.env.HOME || require('os').homedir();
    // __filename は symlink を解いた先になる。起動されたパス (argv[1]) のディレクトリで見る
    //   (リポの .claude/hooks/debug-guard.js がグローバルへの symlink でも、リポの写しとして振る舞う・監査 11-05)
    const invoked = path.resolve(process.argv[1] || __filename);
    return fs.realpathSync(path.dirname(invoked)) === fs.realpathSync(path.join(home, '.claude', 'hooks'));
  } catch { return false; }
}

function projectRegistersDebugGuard(dir) {
  const proj = path.join(dir, '.claude', 'hooks', 'debug-guard.js');
  if (!fs.existsSync(proj)) return false;
  // ホームで開いたセッションでは「プロジェクトの」debug-guard がグローバルの自分自身になる。自分には任せない (再監査 11-05)
  try { if (fs.realpathSync(proj) === fs.realpathSync(process.argv[1] || __filename)) return false; } catch { return false; }
  for (const f of ['settings.json', 'settings.local.json']) {
    try {
      const d = JSON.parse(fs.readFileSync(path.join(dir, '.claude', f), 'utf8'));
      for (const g of ((d.hooks || {}).PreToolUse || [])) {
        for (const h of (g.hooks || [])) {
          if (/(^|[\s/])\.claude\/hooks\/debug-guard\.js(\s|$)/.test(String(h.command || ''))) return true;
        }
      }
    } catch { /* 読めない settings は登録なしと見る */ }
  }
  return false;
}

function askOut(obj) {
  const msg = `[debug-guard] ${String((obj && (obj.reason || obj.message)) || '').trim()}`.slice(0, 9000);
  return { hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: msg } };
}

// === メイン ===
function main() {
  const input = getInput();

  // プロジェクトが自分の debug-guard を登録している (ARIS 等) ときは、そちらに任せて二重に鳴らさない。
  //   ファイルがあるだけでは任せない (名前だけの空のファイルで止められないように・再監査 11-05): settings が登録していること
  //   ★任せるのはグローバルの写し (~/.claude/hooks で動いている) のときだけ。同じファイルを各リポに配った
  //     写しが「自分が登録されている」を見て自分に任せると、何も見ずに黙る (ARIS-1982・11-05 その 2)
  if (runningAsGlobalCopy() && projectRegistersDebugGuard(process.cwd())) {
    /* 言うことが無いときは何も出さない (decision "approve" は allow と読まれ確認を飛ばしうる・ARIS-1982) */
    return;
  }
  const { tool_name, tool_input } = input;

  // .claude/ 配下への修正はユーザー承認（デバッグモード関係なく常に）
  if (needsUserApproval(tool_name, tool_input, input.cwd)) {
    const target = tool_input?.file_path || tool_input?.command || '';
    console.log(JSON.stringify(askOut({
      reason: '🔒 HOOK GUARD: 今動いている設定 (.claude/) の修正にはユーザー承認が必要です。\n' +
        '対象: ' + (typeof target === 'string' ? target.substring(0, 100) : '') + '\n' +
        '承認する場合はYes、拒否する場合はNoを選択してください。'
    })));
    return;
  }

  if (!isModificationTool(tool_name, tool_input)) {
    /* 言うことが無いときは何も出さない (decision "approve" は allow と読まれ確認を飛ばしうる・ARIS-1982) */
    return;
  }

  const recentEntries = readRecentToolLog(30);

  // デバッグモード: 検索+レビューなしの修正をブロック
  if (isDebugMode()) {
    // Fail-open: tool-log.jsonl が無い or 過去30分のエントリが 0 件の場合
    // = logger 側が止まっている可能性が高いため、仕組みがデッドロックしないよう通す。
    // CLAUDE.md「仕組みがデッドロックしたら人間の承認で突破可能にする」原則適用。
    // ARIS-895: post-tool-use が matcher=Bash|Edit|Write のため WebSearch/WebFetch が
    // そもそもログされない構造的バグがあった。その再発事象でも deadlock しない。
    //
    // ★2026-08-06: この fail-open は ~/.claude 側にだけ入っており、settings.json が
    //   実際に起動する**本ファイルには入っていなかった**。テストが Path.home() を
    //   見ていたため 4 ヶ月間その乖離に誰も気づけなかった
    //   (tests/test_hooks/test_debug_guard_fail_open.py を repo 側へ向け直した)。
    if (recentEntries.length === 0) {
      process.stderr.write(
        '⚠ DEBUG GUARD: tool-log.jsonl に直近30分のエントリがありません。' +
        'logger が止まっている可能性があります。fail-open で通過します。' +
        '\n'
      );
      /* 言うことが無いときは何も出さない (decision "approve" は allow と読まれ確認を飛ばしうる・ARIS-1982) */
      return;
    }

    if (!hasRecentResearch(recentEntries)) {
      console.log(JSON.stringify({
        decision: 'block',
        reason: '🔍 DEBUG GUARD [検索未実行]: デバッグモード中。修正の前にWebSearch/WebFetchで外部情報を調べてください。'
      }));
      return;
    }
    if (!isReviewed() && !hasRecentReview(recentEntries)) {
      console.log(JSON.stringify({
        decision: 'block',
        reason: '👥 DEBUG GUARD [レビュー未実行]: デバッグモード中。修正の前にマルチ視点Agent/レビューAgentを実行してください。'
      }));
      return;
    }
  }

  // 対処療法検知
  const modCount = countRecentModifications(recentEntries);
  if (modCount >= 3 && !hasRecentResearch(recentEntries) && !hasRecentReview(recentEntries)) {
    console.log(JSON.stringify(askOut({
      reason: '⚠️ DEBUG GUARD [対処療法検知]: 直近30分で' + modCount + '回修正、外部検索/レビュー0回。対処療法の積み重ねになっていませんか？'
    })));
    return;
  }

  /* 言うことが無いときは何も出さない (decision "approve" は allow と読まれ確認を飛ばしうる・ARIS-1982) */
}

main();
