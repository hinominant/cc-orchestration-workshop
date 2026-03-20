import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function EngineerStep5Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={5}
        title="実践: バックエンドサービス構築"
        duration="60分"
        prevStep={4}
        nextStep={6}
        courseBase="/engineer/step"
        courseLabel="エンジニア"
        topHref="/engineer"
        accentColor="bg-engineer"
      >
        <p className="text-slate-600 leading-relaxed">
          ここまで学んだ知識を総動員して、エージェントチームで TypeScript バックエンドサービスを構築します。
          あなたはプロジェクトマネージャーとして方向性を指示し、AIチームが開発を進めます。
        </p>

        {/* 題材 */}
        <h2 className="text-xl font-bold text-slate-900">構築するサービス</h2>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="font-bold text-emerald-900">Event Orchestration Service（EOS）</h3>
          <p className="mt-2 text-sm text-emerald-700">
            外部 Webhook を受信し、ルールベースで振り分け・処理・Slack 通知を行うオーケストレーションサービス。
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-xs text-emerald-800">TypeScript</span>
            <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-xs text-emerald-800">Hono</span>
            <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-xs text-emerald-800">Vitest</span>
            <span className="rounded-full bg-emerald-200 px-2 py-0.5 text-xs text-emerald-800">HMAC署名検証</span>
          </div>
        </div>

        {/* 機能一覧 */}
        <h2 className="text-xl font-bold text-slate-900">実装する機能</h2>

        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">1</span>
              <h3 className="font-semibold text-slate-900">Webhook 受信 + 署名検証</h3>
            </div>
            <p className="ml-8 mt-1 text-sm text-slate-500">
              HMAC-SHA256 + timingSafeEqual でリクエストの真正性を検証
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">2</span>
              <h3 className="font-semibold text-slate-900">YAML ルールベース振り分け</h3>
            </div>
            <p className="ml-8 mt-1 text-sm text-slate-500">
              イベントタイプに基づいて処理先を動的に決定
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">3</span>
              <h3 className="font-semibold text-slate-900">冪等性保証 + リトライ</h3>
            </div>
            <p className="ml-8 mt-1 text-sm text-slate-500">
              event_id ベースの重複排除、指数バックオフリトライ、Dead Letter Queue
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">4</span>
              <h3 className="font-semibold text-slate-900">構造化ログ + メトリクス</h3>
            </div>
            <p className="ml-8 mt-1 text-sm text-slate-500">
              JSON 構造化ログ、成功/失敗カウント、平均レイテンシ
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">5</span>
              <h3 className="font-semibold text-slate-900">PII マスキング + 監査ログ</h3>
            </div>
            <p className="ml-8 mt-1 text-sm text-slate-500">
              ログに個人情報を出力しない。セキュリティ操作を追跡
            </p>
          </div>
        </div>

        {/* 開発の進め方 */}
        <h2 className="text-xl font-bold text-slate-900">開発の進め方</h2>

        <Callout type="info">
          スターターリポジトリを使う方法と、ゼロから構築する方法の2つがあります。
          時間に余裕がある場合はゼロから、効率重視の場合はスターターをおすすめします。
        </Callout>

        <h3 className="text-lg font-semibold text-slate-800">方法A: スターターリポジトリを使う</h3>
        <CodeBlock
          code={`# スターターリポジトリをFork
# https://github.com/hinominant/cc-workshop-intermediate-starter

git clone https://github.com/YOUR_NAME/cc-workshop-intermediate-starter.git
cd cc-workshop-intermediate-starter
npm install
claude`}
          language="bash"
        />

        <h3 className="text-lg font-semibold text-slate-800">方法B: ゼロから構築する</h3>
        <CodeBlock
          code={`以下のバックエンドサービスを構築してください。

## サービス概要
Event Orchestration Service (EOS)
- 外部Webhookを受信し、ルールベースで振り分け・処理・通知する

## 技術スタック
- TypeScript strict mode
- Hono (HTTPサーバー)
- Vitest (テスト)
- YAML (ルール定義)

## 必要な機能
1. POST /webhook エンドポイント（HMAC-SHA256署名検証付き）
2. YAMLルールベースのイベント振り分け
3. event_idベースの冪等性保証
4. 指数バックオフリトライ + Dead Letter Queue
5. 構造化JSONログ + メトリクス
6. PIIマスキング + 監査ログ

## 開発手順
Sherpa にタスク分解を依頼し、Artisan が実装、Radar がテスト、
最後に Sentinel がセキュリティ監査を行う流れで進めてください。`}
          language="text"
          filename="Claude Code への指示"
        />

        {/* エージェントチェーン */}
        <h2 className="text-xl font-bold text-slate-900">実行チェーン</h2>

        <div className="space-y-2">
          <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-200 text-xs font-bold text-blue-800">1</span>
            <p className="text-sm text-blue-800"><strong>Sherpa</strong>: 5つの機能を Atomic Step に分解</p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-purple-200 bg-purple-50 p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-200 text-xs font-bold text-purple-800">2</span>
            <p className="text-sm text-purple-800"><strong>Artisan</strong>: 各ステップを実装（署名検証 → ルーティング → 冪等性 → ...）</p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800">3</span>
            <p className="text-sm text-amber-800"><strong>Radar</strong>: 各実装後にテスト実行 + カバレッジ確認</p>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-200 text-xs font-bold text-red-800">4</span>
            <p className="text-sm text-red-800"><strong>Sentinel</strong>: 全実装完了後にセキュリティ監査</p>
          </div>
        </div>

        <Callout type="warning">
          開発中に Claude Code から質問されることがあります。
          技術的な判断（使用するライブラリ、アーキテクチャの選択など）は、
          あなたのエンジニアとしての知識で方向性を指示してください。
        </Callout>

        <Callout type="tip">
          <strong>うまくいかないとき</strong>: テストが通らない、エラーが出る場合は
          そのままエラー内容を Claude Code に伝えてください。
          「npm test が失敗する。修正して」のように簡潔な指示で十分です。
        </Callout>
      </StepLayout>
    </div>
  );
}
