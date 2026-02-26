import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

export default function IntermediateStep2Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={2}
        title="アーキテクチャ設計"
        duration="30分"
        prevStep={1}
        nextStep={3}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          要求定義書ができたら、次はアーキテクチャ設計です。
          EOSは5つのコンポーネントで構成されます。
          各コンポーネントの責務を明確に分離することで、変更に強い設計になります。
        </p>

        {/* コンポーネント構成図 */}
        <h2 className="text-xl font-bold text-slate-900">コンポーネント構成図</h2>
        <p className="text-slate-600 leading-relaxed">
          EOSは以下の5つのコンポーネントで構成します。
          イベントは上から下へ流れ、各コンポーネントが1つの責務を担います。
        </p>

        <ArchitectureDiagram />

        {/* 各コンポーネントの責務 */}
        <h2 className="text-xl font-bold text-slate-900">各コンポーネントの責務</h2>

        <div className="space-y-6">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-semibold text-blue-800">1. Ingress（入口）</h3>
            <p className="mt-2 text-sm text-blue-700 leading-relaxed">
              外部プロバイダーからのHTTPリクエストを受け取る最初の入口です。
              署名検証・タイムスタンプ確認・ペイロードの正規化を担当します。
              プロバイダーごとのフォーマット差異をここで吸収し、以降のコンポーネントは共通スキーマだけを扱います。
            </p>
            <div className="mt-3 rounded-md bg-blue-100 p-3">
              <p className="text-xs font-medium text-blue-800">担当するファイル</p>
              <p className="mt-1 text-sm font-mono text-blue-700">
                src/adapters/webhook-provider.ts, src/security/signature.ts
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
            <h3 className="font-semibold text-amber-800">2. Orchestrator（指揮者）</h3>
            <p className="mt-2 text-sm text-amber-700 leading-relaxed">
              正規化されたイベントを受け取り、ルール定義に基づいて適切なWorkerへ振り分けます。
              ルール定義は外部ファイル（YAML/JSON）で管理し、コード変更なしに振り分けロジックを変更できるようにします。
              agent-orchestrator との連携ポイントもここです。
            </p>
            <div className="mt-3 rounded-md bg-amber-100 p-3">
              <p className="text-xs font-medium text-amber-800">担当するファイル</p>
              <p className="mt-1 text-sm font-mono text-amber-700">
                src/orchestrator/router.ts, rules/default.yml
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-purple-200 bg-purple-50 p-5">
            <h3 className="font-semibold text-purple-800">3. Router（振り分け・実行）</h3>
            <p className="mt-2 text-sm text-purple-700 leading-relaxed">
              Orchestratorが振り分けたイベントに対して、実際の処理ロジックを実行するコンポーネントです。
              ルール定義に基づいてイベントを処理し、結果を返します。
              agent-orchestrator のエージェントチェーンをここで活用し、複雑な処理を分解・実行します。
            </p>
            <div className="mt-3 rounded-md bg-purple-100 p-3">
              <p className="text-xs font-medium text-purple-800">担当するファイル</p>
              <p className="mt-1 text-sm font-mono text-purple-700">
                src/orchestrator/router.ts
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-green-200 bg-green-50 p-5">
            <h3 className="font-semibold text-green-800">4. Notifier（通知者）</h3>
            <p className="mt-2 text-sm text-green-700 leading-relaxed">
              Workerの処理結果を外部サービスへ通知します。
              Slack Webhookへの通知が主な責務ですが、将来的にメールやPush通知にも拡張可能な設計にします。
            </p>
            <div className="mt-3 rounded-md bg-green-100 p-3">
              <p className="text-xs font-medium text-green-800">担当するファイル</p>
              <p className="mt-1 text-sm font-mono text-green-700">
                src/adapters/slack-notifier.ts
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <h3 className="font-semibold text-slate-800">5. Reliability / Observability（信頼性・観測性）</h3>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              冪等性チェック・リトライ・DLQ（Dead Letter Queue）で信頼性を確保し、
              構造化ログ・メトリクスで観測性を提供します。
              講座ではローカルファイル（JSON）を使いますが、本番ではデータベースに置き換える想定です。
            </p>
            <div className="mt-3 rounded-md bg-slate-100 p-3">
              <p className="text-xs font-medium text-slate-600">担当するファイル</p>
              <p className="mt-1 text-sm font-mono text-slate-700">
                src/reliability/idempotency.ts, src/reliability/dlq.ts, src/observability/logger.ts
              </p>
            </div>
          </div>
        </div>

        <Callout type="info">
          なぜ5つに分けるのか？ 1つのファイルに全部書くこともできますが、
          「プロバイダーを追加するときにどこを触るか？」が明確な設計のほうが、
          チーム開発や保守が圧倒的に楽になります。
        </Callout>

        {/* データフロー */}
        <h2 className="text-xl font-bold text-slate-900">イベントのライフサイクル</h2>
        <p className="text-slate-600 leading-relaxed">
          1つのイベントがEOSを通過する流れを追ってみましょう。
          この流れが要求定義書のUC1-UC3に対応しています。
        </p>

        <CodeBlock
          code={`// イベントのライフサイクル

1. [Provider A] --HTTP POST--> [Ingress]
   ペイロード: { "action": "payment.completed", "data": {...} }
   ヘッダー: X-Signature: sha256=abc123...

2. [Ingress] --署名検証 OK--> [正規化]
   共通スキーマ: {
     event_id: "evt_20260226_001",
     provider: "provider-a",
     type: "payment.completed",
     payload: { ... },
     received_at: "2026-02-26T10:00:00Z",
     metadata: {}
   }

3. [Orchestrator] --ルール照合-->
   ルール: type="payment.*" → notify + 優先処理
   ルール: type="user.*"    → notify + 標準処理

4. [Router] --処理実行-->
   結果: { event_id: "evt_20260226_001", status: "success", actions: [...] }

5. [Notifier] --Slack通知-->
   メッセージ: "[成功] payment.completed - 決済確認完了"

6. [Reliability] --永続化-->
   冪等性キー記録 + イベントログ`}
          language="text"
          filename="イベントライフサイクル"
        />

        {/* 共通イベントスキーマ */}
        <h2 className="text-xl font-bold text-slate-900">共通イベントスキーマ</h2>
        <p className="text-slate-600 leading-relaxed">
          すべてのコンポーネントが扱う共通のデータ構造です。
          TypeScriptの型定義として実装します。
        </p>

        <CodeBlock
          code={`// src/types/event.ts

export interface EOSEvent {
  /** 一意なイベントID（冪等性キーとして使用） */
  event_id: string;

  /** イベント送信元プロバイダー名 */
  provider: string;

  /** イベント種別（例: "payment.completed"） */
  type: string;

  /** プロバイダー固有のペイロード */
  payload: Record<string, unknown>;

  /** イベント受信タイムスタンプ（ISO 8601） */
  received_at: string;

  /** メタデータ */
  metadata?: Record<string, unknown>;
}

export interface ProcessingResult {
  /** イベントID */
  event_id: string;

  /** 処理ステータス */
  status: "success" | "failure" | "skipped";

  /** 実行されたアクションの結果 */
  actions: ActionResult[];

  /** 処理完了タイムスタンプ */
  processed_at: string;

  /** 処理にかかった時間（ミリ秒） */
  duration_ms: number;
}

export interface ActionResult {
  /** アクション名 */
  action: string;

  /** アクションの結果 */
  status: "success" | "failure";

  /** 詳細情報 */
  detail?: string;
}`}
          language="typescript"
          filename="src/types/event.ts"
        />

        {/* 技術選定 */}
        <h2 className="text-xl font-bold text-slate-900">技術選定の考え方</h2>
        <p className="text-slate-600 leading-relaxed">
          アーキテクチャ設計では「何を使うか」も重要な判断です。
          EOSでは以下の方針で技術を選定します。
        </p>

        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                1
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">HTTPサーバー: Hono</h3>
                <p className="mt-1 text-sm text-slate-600">
                  軽量で高速なWebフレームワーク。TypeScript完全対応。
                  Webhook受信のエンドポイントを定義するのに最適です。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                2
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">エージェント連携: agent-orchestrator</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Orchestrator/Workerの処理チェーンで活用します。
                  ルールに基づく分岐とエージェント協調を実現します。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                3
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">ルール定義: YAML</h3>
                <p className="mt-1 text-sm text-slate-600">
                  イベントの振り分けルールを外部ファイルで管理します。
                  コード変更なしにルーティングを変更可能にします。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                4
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">ストレージ: ローカルJSON（→将来DB）</h3>
                <p className="mt-1 text-sm text-slate-600">
                  講座ではファイルベースのストレージを使い、将来的にデータベースに移行可能な
                  インターフェースで設計します。
                </p>
              </div>
            </div>
          </div>
        </div>

        <Callout type="tip">
          技術選定で大事なのは「なぜそれを選んだか」を説明できることです。
          「流行っているから」ではなく、「この要件にはこの特性が合うから」と言えるようにしましょう。
        </Callout>

        {/* agent-orchestrator の配置 */}
        <h2 className="text-xl font-bold text-slate-900">agent-orchestrator の配置場所</h2>
        <p className="text-slate-600 leading-relaxed">
          agent-orchestrator は主に Orchestrator コンポーネントで使います。
          エージェントチェーンを使って、ルール適用→Worker選択→結果集約の流れを制御します。
        </p>

        <CodeBlock
          code={`// agent-orchestrator の活用ポイント

1. Orchestrator でのチェーン制御
   - Sherpa: イベント分析・処理パス決定
   - Builder/Artisan: Worker実行
   - Radar: 結果検証

2. ルール定義の外部化
   - rules/default.yml で振り分けルールを管理
   - Orchestratorがルールを読み込み、動的にチェーンを構成

3. エラー時の分岐
   - Worker失敗 → リトライチェーン
   - リトライ上限超過 → DLQチェーン`}
          language="text"
          filename="agent-orchestrator配置計画"
        />

        {/* ディレクトリ構成 */}
        <h2 className="text-xl font-bold text-slate-900">ディレクトリ構成</h2>
        <p className="text-slate-600 leading-relaxed">
          設計を反映したプロジェクトのディレクトリ構成です。
        </p>

        <CodeBlock
          code={`cc-workshop-intermediate-starter/
├── .claude/
│   └── agents/            # エージェント定義
├── docs/
│   └── requirements.md    # 要求定義書
├── rules/
│   └── default.yml        # ルーティングルール
├── src/
│   ├── adapters/          # Ingress + Notifier
│   │   ├── webhook-provider.ts
│   │   └── slack-notifier.ts
│   ├── orchestrator/      # Orchestrator
│   │   └── router.ts
│   ├── reliability/       # 信頼性（冪等性・リトライ・DLQ）
│   │   ├── idempotency.ts
│   │   ├── retry.ts
│   │   └── dlq.ts
│   ├── observability/     # 観測性（ログ・メトリクス）
│   │   ├── logger.ts
│   │   └── metrics.ts
│   ├── security/          # セキュリティ
│   │   ├── signature.ts
│   │   └── audit-log.ts
│   ├── types/             # 型定義
│   │   └── event.ts
│   ├── __tests__/         # テスト
│   │   ├── signature.test.ts
│   │   ├── idempotency.test.ts
│   │   └── router.test.ts
│   └── index.ts           # エントリポイント（Hono）
├── .env.example
├── CLAUDE.md
├── package.json
└── tsconfig.json`}
          language="text"
          filename="プロジェクト構成"
        />

        <Callout type="info">
          この構成は「変更理由の近さ」で分類しています。
          プロバイダー追加時は adapters/ だけ、ルール変更時は rules/ だけを触れば済みます。
          これが「責務の分離」の効果です。
        </Callout>
      </StepLayout>
    </div>
  );
}
