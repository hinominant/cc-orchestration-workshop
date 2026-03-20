import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function EngineerStep2Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={2}
        title="パーミッションとセキュリティ"
        duration="25分"
        prevStep={1}
        nextStep={3}
        courseBase="/engineer/step"
        courseLabel="エンジニア"
        topHref="/engineer"
        accentColor="bg-engineer"
      >
        <p className="text-slate-600 leading-relaxed">
          Claude Code のセキュリティアーキテクチャを理解し、
          プロジェクトに適切な権限設定を構築します。
        </p>

        {/* なぜセキュリティが重要か */}
        <h2 className="text-xl font-bold text-slate-900">なぜセキュリティが重要か</h2>

        <p className="text-slate-600 leading-relaxed">
          Claude Code はターミナルコマンドの実行・ファイルの読み書きができるツールです。
          これは強力な機能である一方、適切に制限しなければリスクになります。
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h3 className="font-semibold text-red-800">リスク例</h3>
            <ul className="mt-2 space-y-1 text-sm text-red-700">
              <li>- .env / .ssh / credentials への不正アクセス</li>
              <li>- rm -rf による意図しないファイル削除</li>
              <li>- git push --force による履歴破壊</li>
              <li>- curl でのデータ外部送信（プロンプトインジェクション）</li>
            </ul>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <h3 className="font-semibold text-emerald-800">防御策</h3>
            <ul className="mt-2 space-y-1 text-sm text-emerald-700">
              <li>- サンドボックスによるOS隔離</li>
              <li>- 3層パーミッション（deny/ask/allow）</li>
              <li>- PreToolUse Hooks</li>
              <li>- ネットワークホワイトリスト</li>
            </ul>
          </div>
        </div>

        {/* サンドボックス */}
        <h2 className="text-xl font-bold text-slate-900">サンドボックス</h2>

        <p className="text-slate-600 leading-relaxed">
          Claude Code の最も基本的なセキュリティ層です。
          OS レベルでプロセスを隔離し、許可されたパス・ネットワーク以外へのアクセスをブロックします。
        </p>

        <CodeBlock
          code={`# サンドボックスの状態確認（Claude Code 内で）
/sandbox

# macOS: Seatbelt（sandbox-exec）
# Linux: Bubble Wrap（bwrap）`}
          language="text"
        />

        {/* パーミッション設定 */}
        <h2 className="text-xl font-bold text-slate-900">パーミッション設定</h2>

        <p className="text-slate-600 leading-relaxed">
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">.claude/settings.json</code> で
          3層のパーミッションを定義します。評価順序は <strong>deny → ask → allow</strong>（deny が最優先）。
        </p>

        <CodeBlock
          code={`{
  "permissions": {
    "allow": [
      "Read",
      "Glob",
      "Grep",
      "Bash(git status)",
      "Bash(git diff)",
      "Bash(git log)",
      "Bash(npm test)",
      "Bash(npm run typecheck)",
      "Bash(npx vitest)"
    ],
    "ask": [
      "Write",
      "Edit",
      "Bash(git add)",
      "Bash(git commit)",
      "Bash(npm install)",
      "Bash(npm run dev)"
    ],
    "deny": [
      "Bash(sudo)",
      "Bash(su )",
      "Bash(rm -rf)",
      "Bash(curl)",
      "Bash(wget)",
      "Bash(git push)",
      "Bash(git reset)",
      "Read(.env)",
      "Read(.env.*)",
      "Write(.env)",
      "Write(.env.*)",
      "Read(**/*.pem)",
      "Read(**/*.key)",
      "WebFetch"
    ]
  }
}`}
          language="json"
          filename=".claude/settings.json"
        />

        <Callout type="warning">
          パーミッション設定はパターンマッチです。
          <code className="rounded bg-amber-100 px-1 py-0.5 text-xs font-mono">Bash(rm -rf)</code> は
          コマンドに &quot;rm -rf&quot; を含むすべてのBash実行をブロックします。
        </Callout>

        {/* Hooks */}
        <h2 className="text-xl font-bold text-slate-900">Hooks（PreToolUse / PostToolUse）</h2>

        <p className="text-slate-600 leading-relaxed">
          パーミッション設定だけではカバーしきれないチェックを、カスタムスクリプトで実現します。
          ツール実行の前後にフックを挟めます。
        </p>

        <CodeBlock
          code={`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/pre-bash-check.sh"
          }
        ]
      }
    ]
  }
}`}
          language="json"
          filename=".claude/settings.json（hooks部分）"
        />

        <CodeBlock
          code={`#!/bin/bash
# .claude/hooks/pre-bash-check.sh
# Bash ツール実行前のバリデーション

INPUT=$(cat -)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# 本番環境への接続をブロック
if echo "$COMMAND" | grep -qiE '(production|prod\\.)|DATABASE_URL'; then
  echo "BLOCK: 本番環境への接続は禁止されています"
  exit 2
fi

exit 0`}
          language="bash"
          filename=".claude/hooks/pre-bash-check.sh"
        />

        <Callout type="info">
          フックの終了コード: <code className="rounded bg-blue-100 px-1 py-0.5 text-xs font-mono">0</code> = 許可、
          <code className="rounded bg-blue-100 px-1 py-0.5 text-xs font-mono">2</code> = ブロック（エラーメッセージ付き）。
        </Callout>

        {/* 実践 */}
        <h2 className="text-xl font-bold text-slate-900">実践: セキュリティ設定を構築する</h2>

        <p className="text-slate-600 leading-relaxed">
          以下の指示で、プロジェクトにセキュリティ設定を追加しましょう。
        </p>

        <CodeBlock
          code={`このプロジェクトに .claude/settings.json を作成して。
以下のルールで3層パーミッションを設定して：

allow: ファイル読み取り、git status/diff/log、テスト実行
ask: ファイル書き込み、git add/commit、npm install
deny: sudo、rm -rf、curl/wget、git push、.env アクセス

また、PreToolUse Hook で本番環境への接続をブロックするスクリプトも作成して。`}
          language="text"
          filename="Claude Code への指示"
        />

        <p className="text-slate-600 leading-relaxed">
          設定後、<code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">/permissions</code> で
          設定が正しく反映されていることを確認してください。
        </p>
      </StepLayout>
    </div>
  );
}
