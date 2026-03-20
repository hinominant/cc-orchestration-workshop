import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

const articles = [
  {
    title: "Claude Code 公式ドキュメント",
    url: "https://docs.anthropic.com/en/docs/claude-code/overview",
    description: "Anthropic公式のClaude Codeガイド。基本概念からベストプラクティスまで網羅。",
    required: true,
  },
  {
    title: "Learn Claude Code（ShareAI）",
    url: "https://learn.shareai.run/ja/",
    description: "Claude Codeの内部アーキテクチャを段階的に学ぶ。Agent Loop・Tools・Subagents・Team Protocols など12セッション構成。",
    required: false,
  },
  {
    title: "Claude Code セキュリティ設定 10選",
    url: "https://qiita.com/miruky/items/51db293a7a7d0d277a5d",
    description: "サンドボックス・パーミッション・Hooks・組織ポリシーなど、実務で必須のセキュリティ設定を網羅。",
    required: true,
  },
];

export default function PreparationPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-50 to-white px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            事前準備・セットアップガイド
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            講座を始める前に必要な準備をすべて行います
          </p>
        </div>
      </section>

      {/* Claude Codeとは */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">Claude Code とは</h2>

          <p className="text-slate-600 leading-relaxed">
            Claude Code は Anthropic が提供する<strong>ターミナルベースのAIアシスタント</strong>です。
            コードの読み書き、ターミナルコマンドの実行、Git操作、ファイル検索など、
            開発作業に必要なすべての操作をAIに委任できます。
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900">従来のAIツール</h3>
              <p className="mt-2 text-sm text-slate-500">チャットでコードを生成 → 手動でコピペ → 手動で実行</p>
              <p className="mt-1 text-xs text-slate-400">人間がすべての操作を行う</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <h3 className="font-semibold text-emerald-900">Claude Code</h3>
              <p className="mt-2 text-sm text-emerald-700">指示を出す → AIが自律的にファイル操作・コマンド実行・検証まで行う</p>
              <p className="mt-1 text-xs text-emerald-600">人間は方向性の指示と確認に集中</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 p-5">
            <h3 className="mb-3 font-semibold text-slate-900">この講座での使い方</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              本講座では Claude Code を単体で使うのではなく、
              <strong>複数のAIエージェントをチームとして編成し、オーケストレーション（指揮）する</strong>ことを学びます。
              計画役・実装役・検証役・監査役といった専門エージェントを定義し、
              プロジェクト全体を自動で回す仕組みを構築します。
            </p>
          </div>
        </div>
      </section>

      {/* 読んでおくべき記事 */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">事前に読んでおくべき記事</h2>
          <p className="mb-6 text-sm text-slate-500">
            講座の理解度が大幅に変わります。特に「必読」マークの記事は必ず目を通してください。
          </p>

          <div className="space-y-4">
            {articles.map((article) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-slate-400 hover:shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary">
                      {article.title}
                    </h3>
                    {article.required && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                        必読
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{article.description}</p>
                </div>
                <svg className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Mac セットアップ */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">セットアップ手順</h2>

          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
              Mac
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">1. Homebrew のインストール（未導入の場合）</h3>
                <p className="mb-2 text-sm text-slate-600">
                  Macのパッケージマネージャーです。既にインストール済みの場合はスキップしてください。
                </p>
                <CodeBlock code={`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`} language="bash" />
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">2. Git のインストール</h3>
                <CodeBlock code="brew install git" language="bash" />
                <p className="mt-1 text-xs text-slate-500">Xcode Command Line Tools に含まれている場合もあります。</p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">3. Node.js のインストール</h3>
                <CodeBlock code="brew install node" language="bash" />
                <p className="mt-1 text-xs text-slate-500">LTS版（v18以上）が推奨です。</p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">4. Claude Code のインストール</h3>
                <CodeBlock code="npm install -g @anthropic-ai/claude-code" language="bash" />
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">5. 動作確認</h3>
                <CodeBlock code={`git --version
node -v
claude --version`} language="bash" />
                <p className="mt-1 text-xs text-slate-500">すべてバージョン番号が表示されれば成功です。</p>
              </div>
            </div>
          </div>

          {/* Windows セットアップ */}
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-700">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
              </svg>
              Windows
            </div>

            <Callout type="info">
              PowerShell を<strong>管理者権限</strong>で開いてコマンドを実行してください。
            </Callout>

            <div className="space-y-4">
              <div className="rounded-lg border border-slate-200 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">1. Git for Windows</h3>
                <CodeBlock code="winget install --id Git.Git -e --source winget" language="powershell" />
                <p className="mt-1 text-xs text-slate-500">
                  WinGetが使えない場合は{" "}
                  <a href="https://gitforwindows.org/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary-dark">
                    gitforwindows.org
                  </a>{" "}
                  からダウンロード。インストール後、PowerShellを再起動。
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">2. Node.js</h3>
                <CodeBlock code="winget install --id OpenJS.NodeJS.LTS -e --source winget" language="powershell" />
                <p className="mt-1 text-xs text-slate-500">
                  WinGetが使えない場合は{" "}
                  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary-dark">
                    nodejs.org
                  </a>{" "}
                  からLTS版をダウンロード。
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">3. Claude Code</h3>
                <CodeBlock code="npm install -g @anthropic-ai/claude-code" language="powershell" />
              </div>

              <div className="rounded-lg border border-slate-200 p-4">
                <h3 className="mb-2 font-semibold text-slate-900">4. 動作確認</h3>
                <CodeBlock code={`git --version
node -v
claude --version`} language="powershell" />
              </div>
            </div>
          </div>

          {/* GitHub アカウント */}
          <div className="rounded-xl border border-slate-200 p-5">
            <h3 className="mb-2 font-semibold text-slate-900">GitHub アカウント</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              講座ではGitHub にコードをプッシュし、Vercel でデプロイします。
              まだアカウントがない場合は{" "}
              <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary-dark">
                github.com/signup
              </a>{" "}
              から作成してください。
            </p>
            <div className="mt-3">
              <p className="text-xs font-medium text-slate-700 mb-1">GitHub CLI のインストール（推奨）</p>
              <CodeBlock code="brew install gh  # Mac の場合" language="bash" />
              <CodeBlock code="winget install --id GitHub.cli  # Windows の場合" language="powershell" />
            </div>
          </div>
        </div>
      </section>

      {/* セキュリティ */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">セキュリティ設定ガイド</h2>
          <p className="mb-6 text-sm text-slate-500">
            Claude Code はターミナルコマンドの実行やファイルアクセスが可能なツールです。
            便利さと安全性を両立するため、以下の設定を理解しておくことが重要です。
          </p>

          {/* セキュリティ 10項目 */}
          <div className="space-y-4">
            <div className="rounded-xl border border-red-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">1</span>
                <h3 className="font-semibold text-slate-900">サンドボックスを有効にする</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                OS レベルでプロセスを隔離し、ファイルシステムやネットワークへのアクセスを制限します。
                macOS では Seatbelt、Linux では Bubble Wrap を使用。
                Claude Code 内で <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">/sandbox</code> コマンドで状態を確認できます。
              </p>
              <p className="mt-2 text-xs text-red-600 font-medium">最も重要な基本設定です。</p>
            </div>

            <div className="rounded-xl border border-red-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700">2</span>
                <h3 className="font-semibold text-slate-900">サンドボックスの迂回を防ぐ</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">allowUnsandboxedCommands: false</code> を設定して、
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">dangerouslyDisableSandbox</code> パラメータによる迂回を完全にブロックします。
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">3</span>
                <h3 className="font-semibold text-slate-900">危険なコマンドをブロックする</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">permissions.deny</code> で
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">rm -rf</code>、
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">curl</code>、
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">wget</code>、
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">git push</code> などをブロック。
                評価順序は deny → ask → allow（deny が最優先）。
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">4</span>
                <h3 className="font-semibold text-slate-900">機密ファイルへのアクセスを制限する</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">.env</code>、
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">*.pem</code>、
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">*.key</code> などの
                シークレットファイルをdenyルールとサンドボックスの <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">denyRead</code> の両方でブロック。
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">5</span>
                <h3 className="font-semibold text-slate-900">ネットワークアクセスを制限する</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                ホワイトリスト方式でアクセス可能なドメインを制限し、プロンプトインジェクション攻撃によるデータ流出リスクを低減。
                必要なドメイン（github.com、npmレジストリなど）のみ許可。
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">6</span>
                <h3 className="font-semibold text-slate-900">バイパスモードを無効化する</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">--dangerously-skip-permissions</code> フラグの使用を禁止。
                チーム環境では Managed Settings に配置してユーザーが上書きできないようにする。
              </p>
            </div>

            <div className="rounded-xl border border-blue-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">7</span>
                <h3 className="font-semibold text-slate-900">PreToolUse Hooks で安全チェックを追加する</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                ツール実行前にバリデーションスクリプトを挟む仕組み（Hooks）。
                カスタムスクリプトで <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">rm -rf</code> や本番環境アクセスをブロックできる。
              </p>
              <CodeBlock
                code={`// .claude/settings.json の hooks 設定例
{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "bash .claude/hooks/pre-bash-check.sh"
      }]
    }]
  }
}`}
                language="json"
                filename=".claude/settings.json"
              />
            </div>

            <div className="rounded-xl border border-blue-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">8</span>
                <h3 className="font-semibold text-slate-900">パーミッションを定期的に監査する</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">/permissions</code> で蓄積された「常に許可」ルールを確認し、
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">/status</code> で読み込まれた設定ファイルを検証。
                不要な許可が増えていないか定期チェック。
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">9</span>
                <h3 className="font-semibold text-slate-900">開発コンテナを使う</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                コンテナ内で Claude Code を実行することで、最も安全な隔離環境を実現。
                Anthropicが提供するリファレンスdevcontainer実装を活用すれば、
                ファイアウォールによるネットワーク制御やホストマシンの隔離が可能。
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-600">10</span>
                <h3 className="font-semibold text-slate-900">Managed Settings で組織ポリシーを強制する</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                サーバーマネージド設定（Claude.aiコンソール経由）またはエンドポイントマネージド設定（MDM配布）で
                組織全体にポリシーを適用。
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">allowManagedPermissionRulesOnly</code>、
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">allowManagedHooksOnly</code>、
                <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">allowManagedDomainsOnly</code> で管理統制。
              </p>
            </div>
          </div>

          <Callout type="tip">
            チームで導入する場合は、まず 1〜4 を確立し、その後 5 以降を段階的に導入するのが推奨です。
            利便性とセキュリティのバランスを意識した設定を心がけましょう。
          </Callout>
        </div>
      </section>

      {/* 本講座で使うパーミッション設定 */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">本講座で使うパーミッション設定</h2>

          <p className="text-slate-600 leading-relaxed mb-4">
            講座のスターターリポジトリには、以下の3層パーミッション設定が含まれています（DCP: Double Confirmation Protocol 準拠）。
          </p>

          <div className="space-y-4">
            <div className="rounded-lg border border-green-200 bg-green-50 p-4">
              <h3 className="font-semibold text-green-800">自動許可（allow）</h3>
              <ul className="mt-2 space-y-1 text-sm text-green-700">
                <li>- ファイルの読み取り（Read, Glob, Grep）</li>
                <li>- git status / diff / log / branch</li>
                <li>- テスト実行（npm test, vitest）</li>
                <li>- 型チェック（tsc --noEmit）</li>
              </ul>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-semibold text-amber-800">確認して実行（ask）</h3>
              <ul className="mt-2 space-y-1 text-sm text-amber-700">
                <li>- ファイルの書き込み・編集（Write, Edit）</li>
                <li>- git add / commit</li>
                <li>- npm install / npm run dev</li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-800">絶対禁止（deny）</h3>
              <ul className="mt-2 space-y-1 text-sm text-red-700">
                <li>- sudo / su（管理者権限）</li>
                <li>- .env / .ssh / 秘密情報へのアクセス</li>
                <li>- git push / reset（破壊的操作）</li>
                <li>- curl / wget（外部通信）</li>
                <li>- rm -rf（再帰削除）</li>
              </ul>
            </div>
          </div>

          <Callout type="warning">
            Claude Code は必ず<strong>プロジェクトフォルダの中で起動</strong>してください。
            ホームディレクトリ（~）で起動すると、書類・SSH鍵・クラウドの認証情報など
            すべてのファイルにアクセスできる状態になり、事故のリスクが高まります。
          </Callout>
        </div>
      </section>

      {/* 準備物チェックリスト */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">準備物チェックリスト</h2>

          <div className="space-y-3">
            {[
              { item: "Git がインストールされている", command: "git --version" },
              { item: "Node.js v18以上がインストールされている", command: "node -v" },
              { item: "Claude Code がインストールされている", command: "claude --version" },
              { item: "GitHub アカウントを持っている", command: "gh auth status（CLIの場合）" },
              { item: "必読記事を読んだ", command: null },
            ].map((check) => (
              <div key={check.item} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-slate-300">
                    <span className="text-xs text-slate-400" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{check.item}</span>
                </div>
                {check.command && (
                  <p className="ml-9 mt-1 text-xs text-slate-500">
                    確認コマンド: <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">{check.command}</code>
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-xl font-bold text-slate-900">準備ができたらコースを選びましょう</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/step/0"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              初級編
            </Link>
            <Link
              href="/intermediate"
              className="inline-flex items-center gap-2 rounded-lg bg-intermediate px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              中級編
            </Link>
            <Link
              href="/engineer"
              className="inline-flex items-center gap-2 rounded-lg bg-engineer px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
            >
              エンジニア編
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
