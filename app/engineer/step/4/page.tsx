import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function EngineerStep4Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={4}
        title="オーケストレーション構成"
        duration="30分"
        prevStep={3}
        nextStep={5}
        courseBase="/engineer/step"
        courseLabel="エンジニア"
        topHref="/engineer"
        accentColor="bg-engineer"
      >
        <p className="text-slate-600 leading-relaxed">
          複数エージェントの連携パターン、並列実行、ファイルオーナーシップを理解し、
          効率的なオーケストレーション構成を設計します。
        </p>

        {/* Hub-spoke モデル */}
        <h2 className="text-xl font-bold text-slate-900">Hub-spoke モデル</h2>

        <p className="text-slate-600 leading-relaxed">
          エージェント間の通信は必ずオーケストレーター（Nexus）を経由します。
          エージェント同士が直接やり取りしない理由：
        </p>

        <div className="space-y-2">
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-sm text-slate-700"><strong>責任の明確化</strong>: 誰が何を指示したか追跡可能</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-sm text-slate-700"><strong>競合防止</strong>: 同じファイルへの同時書き込みを防ぐ</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-sm text-slate-700"><strong>品質管理</strong>: すべての成果物がチェックポイントを通る</p>
          </div>
        </div>

        <CodeBlock
          code={`# 実行フロー例

ユーザー: 「認証APIを実装して」
    ↓
Nexus（オーケストレーター）
    ├→ Sherpa: タスク分解
    │   └→ 3つのAtomic Stepに分割
    ↓
Nexus: ステップ1をArtisanに割り当て
    ├→ Artisan: JWT認証ミドルウェア実装
    │   └→ 完了報告
    ↓
Nexus: Radarに検証依頼
    ├→ Radar: テスト実行 + カバレッジ確認
    │   └→ PASS（カバレッジ85%）
    ↓
Nexus: ステップ2をArtisanに割り当て
    ...（以下繰り返し）
    ↓
Nexus: 全ステップ完了後、Sentinelに最終監査依頼
    ├→ Sentinel: OWASP Top 10チェック
    │   └→ 問題なし
    ↓
完了`}
          language="text"
          filename="実行フロー"
        />

        {/* 並列実行 */}
        <h2 className="text-xl font-bold text-slate-900">並列実行（Rally パターン）</h2>

        <p className="text-slate-600 leading-relaxed">
          独立したタスクは並列に実行できます。Claude Code の Agent ツールは
          独立したメッセージ配列でサブプロセスを生成するため、コンテキストの汚染がありません。
        </p>

        <CodeBlock
          code={`# 並列実行が可能なケース

タスクA: src/routes/auth.ts の実装
タスクB: src/routes/health.ts の実装
タスクC: src/db/schema.prisma の設計

→ A, B, C は別ファイルなので並列実行可能

# 並列実行ができないケース

タスクD: src/services/user.ts の実装
タスクE: src/services/user.ts のテスト追加

→ 同じファイルを触るので順次実行が必要`}
          language="text"
        />

        {/* ファイルオーナーシップ */}
        <h2 className="text-xl font-bold text-slate-900">ファイルオーナーシップ</h2>

        <p className="text-slate-600 leading-relaxed">
          並列実行の鍵は「ファイルオーナーシップ」です。
          各エージェントが排他的に書き込めるファイルを宣言し、競合を防ぎます。
        </p>

        <CodeBlock
          code={`# ファイルオーナーシップ宣言の例

Agent: Artisan-Auth
  exclusive_write: src/routes/auth.ts, src/middleware/jwt.ts
  shared_read: src/types/, src/db/

Agent: Artisan-Health
  exclusive_write: src/routes/health.ts
  shared_read: src/types/

Agent: Radar-Tests
  exclusive_write: src/__tests__/
  shared_read: src/  (全ソースを読み取り専用)`}
          language="text"
          filename="ファイルオーナーシップ"
        />

        <Callout type="warning">
          <strong>exclusive_write が被ってはいけません。</strong>
          同じファイルを2つのエージェントが同時に書き換えると、
          後から書いた方が先の変更を上書きしてしまいます。
        </Callout>

        {/* 実行モード */}
        <h2 className="text-xl font-bold text-slate-900">実行モード</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">GUIDED（推奨）</h3>
            <p className="mt-1 text-sm text-slate-500">
              各ステップの実行前に確認を挟む。
              学習段階や重要なプロジェクトで使用。
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">AUTORUN</h3>
            <p className="mt-1 text-sm text-slate-500">
              ask パーミッションのみ確認。
              信頼できるタスクで使用。
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">AUTORUN_FULL</h3>
            <p className="mt-1 text-sm text-slate-500">
              確認なしで自動実行。
              十分にテストされた定型タスクのみ。
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">INTERACTIVE</h3>
            <p className="mt-1 text-sm text-slate-500">
              すべての操作で確認。
              デバッグや調査時に使用。
            </p>
          </div>
        </div>

        {/* agent-orchestrator の導入 */}
        <h2 className="text-xl font-bold text-slate-900">agent-orchestrator の導入</h2>

        <p className="text-slate-600 leading-relaxed">
          エージェント定義を一から書くのも学習になりますが、
          実務ではスターターセットを導入して、プロジェクトに合わせてカスタマイズするのが効率的です。
        </p>

        <CodeBlock
          code={`agent-orchestratorを導入してください。
https://github.com/Luna-company/agent-orchestrator-starter の README を読んで、
このプロジェクトにエージェントチームをセットアップしてください。`}
          language="text"
          filename="Claude Code への指示"
        />

        <p className="text-slate-600 leading-relaxed">
          導入後、<code className="rounded bg-slate-100 px-1 py-0.5 text-xs font-mono">.claude/agents/</code> 配下に
          エージェント定義が生成されます。
          各ファイルを読み、プロジェクトの技術スタックに合わせてカスタマイズしてください。
        </p>

        <Callout type="tip">
          STEP 3 で手動作成したエージェント定義と、agent-orchestrator が生成したものを比較してみてください。
          差分から、実運用で必要な考慮点が見えてきます。
        </Callout>
      </StepLayout>
    </div>
  );
}
