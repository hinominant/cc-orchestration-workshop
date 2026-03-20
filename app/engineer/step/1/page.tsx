import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function EngineerStep1Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={1}
        title="基本操作と CLAUDE.md"
        duration="20分"
        prevStep={0}
        nextStep={2}
        courseBase="/engineer/step"
        courseLabel="エンジニア"
        topHref="/engineer"
        accentColor="bg-engineer"
      >
        <p className="text-slate-600 leading-relaxed">
          Claude Code の CLI操作とスラッシュコマンドをマスターし、
          プロジェクトの「指示書」である CLAUDE.md の設計思想を理解します。
        </p>

        {/* スラッシュコマンド */}
        <h2 className="text-xl font-bold text-slate-900">主要スラッシュコマンド</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 pr-4 text-left font-semibold text-slate-900">コマンド</th>
                <th className="py-2 text-left font-semibold text-slate-900">用途</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4"><code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">/help</code></td>
                <td className="py-2">ヘルプ表示</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4"><code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">/status</code></td>
                <td className="py-2">読み込まれた設定ファイル・モデル情報を確認</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4"><code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">/permissions</code></td>
                <td className="py-2">現在のパーミッション設定を確認</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4"><code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">/sandbox</code></td>
                <td className="py-2">サンドボックスの状態を確認</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4"><code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">/compact</code></td>
                <td className="py-2">コンテキストを圧縮して会話を継続</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4"><code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">/clear</code></td>
                <td className="py-2">会話履歴をクリア</td>
              </tr>
              <tr>
                <td className="py-2 pr-4"><code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">/fast</code></td>
                <td className="py-2">高速モードの切り替え</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CLAUDE.md */}
        <h2 className="text-xl font-bold text-slate-900">CLAUDE.md の設計思想</h2>

        <p className="text-slate-600 leading-relaxed">
          CLAUDE.md はプロジェクトのルートに置く「Claude Code への指示書」です。
          Claude Code 起動時に自動で読み込まれ、すべての応答に影響します。
        </p>

        <Callout type="info">
          CLAUDE.md は「知識の格納庫」ではなく「ルーティングテーブル」として設計します。
          「何をどこで見ればよいか」を最短で辿れるフラグ立てが最も効果的です。
        </Callout>

        <CodeBlock
          code={`# My Backend Service

## Project Overview
- TypeScript + Hono バックエンド API
- テスト: Vitest
- DB: PostgreSQL (Prisma ORM)

## Key Rules
- すべての出力は日本語
- テストなしのコードは未完成
- Conventional Commits を使用
- セキュリティ: 外部入力は必ずバリデーション

## Architecture
- src/routes/   → API エンドポイント
- src/services/ → ビジネスロジック
- src/db/       → Prisma スキーマ・マイグレーション

## Agent Team
| Agent    | Role         |
|----------|-------------|
| Sherpa   | タスク分解   |
| Artisan  | 実装         |
| Radar    | テスト・検証  |
| Sentinel | セキュリティ監査 |`}
          language="markdown"
          filename="CLAUDE.md の例"
        />

        <h3 className="text-lg font-semibold text-slate-800">CLAUDE.md のベストプラクティス</h3>

        <div className="space-y-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <h4 className="font-semibold text-emerald-800">DO: 方針とルールを書く</h4>
            <p className="mt-1 text-sm text-emerald-700">技術スタック、コーディング規約、テスト方針、エージェント構成</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <h4 className="font-semibold text-emerald-800">DO: 構造のポインタを書く</h4>
            <p className="mt-1 text-sm text-emerald-700">「認証周りは src/auth/ を見ろ」「API仕様は docs/api.md」</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h4 className="font-semibold text-red-800">DON&apos;T: 大量のコードや知識を書く</h4>
            <p className="mt-1 text-sm text-red-700">コードはコードベースに、ドキュメントはdocs/ に。CLAUDE.md はポインタだけ</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <h4 className="font-semibold text-red-800">DON&apos;T: 秘密情報を書く</h4>
            <p className="mt-1 text-sm text-red-700">APIキー、トークン、パスワードは絶対に含めない</p>
          </div>
        </div>

        {/* 設定ファイルの階層 */}
        <h2 className="text-xl font-bold text-slate-900">設定ファイルの階層</h2>

        <p className="text-slate-600 leading-relaxed">
          Claude Code は複数の設定レイヤーを持ちます。優先度の高い順に：
        </p>

        <CodeBlock
          code={`# 設定の優先度（高→低）
1. Managed Settings（組織管理者が設定、ユーザー上書き不可）
2. .claude/settings.json（プロジェクトローカル、git管理可能）
3. ~/.claude/settings.json（ユーザーグローバル）
4. CLAUDE.md（プロジェクトルート）
5. ~/.claude/CLAUDE.md（ユーザーグローバル指示）`}
          language="text"
          filename="設定の優先度"
        />

        <Callout type="tip">
          チームで共有する設定は <code className="rounded bg-green-100 px-1 py-0.5 text-xs font-mono">.claude/settings.json</code> に、
          個人の好みは <code className="rounded bg-green-100 px-1 py-0.5 text-xs font-mono">~/.claude/settings.json</code> に分けるのが推奨です。
        </Callout>

        {/* 実践 */}
        <h2 className="text-xl font-bold text-slate-900">実践: CLAUDE.md を書いてみる</h2>

        <p className="text-slate-600 leading-relaxed">
          STEP 0 で作成したプロジェクトに CLAUDE.md を作成しましょう。
        </p>

        <CodeBlock
          code={`Claude Code で以下を実行してください：

「このプロジェクトの CLAUDE.md を作成して。
技術スタックは TypeScript + Hono + Vitest。
日本語出力、Conventional Commits、テスト必須のルールを入れて。」`}
          language="text"
          filename="Claude Code への指示"
        />

        <p className="text-slate-600 leading-relaxed">
          生成された CLAUDE.md を確認し、不足があれば追記してください。
          次のステップでは、この設定にセキュリティレイヤーを追加します。
        </p>
      </StepLayout>
    </div>
  );
}
