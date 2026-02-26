import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function IntermediateStep7Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={7}
        title="セキュリティ・運用仕上げ"
        duration="30分"
        prevStep={6}
        nextStep={8}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          実装が完了したら、本番運用を想定したセキュリティ対策と運用設計で仕上げます。
          「動く」コードを「安全に運用できる」コードにする最終ステップです。
        </p>

        {/* シークレット管理 */}
        <h2 className="text-xl font-bold text-slate-900">1. シークレット管理のベストプラクティス</h2>
        <p className="text-slate-600 leading-relaxed">
          STEP 0 で基本ルールを学びましたが、ここではより具体的なベストプラクティスを確認します。
        </p>

        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">環境変数の読み込みを1箇所にまとめる</h3>
            <p className="mt-1 text-sm text-slate-600">
              process.env をコード中のあちこちで直接参照するのではなく、
              設定ファイルに集約して型安全にアクセスします。
            </p>
          </div>
        </div>

        <CodeBlock
          code={`// src/config.ts

interface AppConfig {
  /** Webhook の署名検証シークレット */
  webhookSecret: string;
  /** Slack Webhook URL */
  slackWebhookUrl: string;
  /** データ保存先パス */
  storagePath: string;
  /** 実行環境 */
  nodeEnv: "development" | "staging" | "production";
  /** ログレベル */
  logLevel: "debug" | "info" | "warn" | "error";
}

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(
      \`Missing required environment variable: \${key}\`
    );
  }
  return value;
}

export function loadConfig(): AppConfig {
  return {
    webhookSecret: requireEnv("WEBHOOK_SECRET"),
    slackWebhookUrl: requireEnv("SLACK_WEBHOOK_URL"),
    storagePath: process.env.STORAGE_PATH ?? "./data/events",
    nodeEnv: (process.env.NODE_ENV as AppConfig["nodeEnv"]) ?? "development",
    logLevel: (process.env.LOG_LEVEL as AppConfig["logLevel"]) ?? "info",
  };
}`}
          language="typescript"
          filename="src/config.ts"
        />

        <Callout type="warning">
          <code className="rounded bg-amber-100 px-1 py-0.5 text-xs font-mono">requireEnv()</code> で
          必須の環境変数が未設定ならアプリ起動時に即座にエラーになります。
          「動いているのに通知が来ない」と悩むより、起動しない方が安全です。
        </Callout>

        {/* 権限分離 */}
        <h2 className="text-xl font-bold text-slate-900">2. 権限分離</h2>
        <p className="text-slate-600 leading-relaxed">
          本番環境では「誰が何をできるか」を明確に分離します。
          最小権限の原則に従い、必要な権限だけを付与します。
        </p>

        <div className="my-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="font-semibold text-blue-800">実行ロール</h3>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>- Webhook受信・処理実行</li>
              <li>- ログ出力</li>
              <li>- Slack通知送信</li>
              <li>- ストレージ読み書き</li>
            </ul>
            <p className="mt-2 text-xs text-blue-600">
              アプリケーション自体が持つ権限
            </p>
          </div>
          <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
            <h3 className="font-semibold text-purple-800">管理ロール</h3>
            <ul className="mt-2 space-y-1 text-sm text-purple-700">
              <li>- ルール定義の変更</li>
              <li>- DLQ の手動再処理</li>
              <li>- 環境変数の変更</li>
              <li>- デプロイ操作</li>
            </ul>
            <p className="mt-2 text-xs text-purple-600">
              運用担当者のみが持つ権限
            </p>
          </div>
        </div>

        {/* 監査ログ */}
        <h2 className="text-xl font-bold text-slate-900">3. 監査ログ</h2>
        <p className="text-slate-600 leading-relaxed">
          「誰が」「いつ」「何を」操作したかを記録する監査ログです。
          管理操作（ルール変更、DLQ再処理など）を記録します。
        </p>

        <CodeBlock
          code={`// src/security/audit-log.ts

import { logger } from "../observability/logger";

export type AuditAction =
  | "rule_updated"
  | "dlq_reprocessed"
  | "config_changed"
  | "manual_event_injected";

interface AuditEntry {
  action: AuditAction;
  actor: string;
  target: string;
  detail: string;
  timestamp: string;
}

/**
 * 監査対象の操作を記録する
 * 通常のログとは別に、改ざん防止のため追記専用で記録する
 */
export function auditLog(
  action: AuditAction,
  actor: string,
  target: string,
  detail: string
): void {
  const entry: AuditEntry = {
    action,
    actor,
    target,
    detail,
    timestamp: new Date().toISOString(),
  };

  // 監査ログは常に出力（ログレベルに関係なく）
  logger.info("AUDIT", {
    audit: true,
    ...entry,
  });
}

// 使用例:
// auditLog("dlq_reprocessed", "admin@example.com", "dlq_001", "手動再処理実行");
// auditLog("rule_updated", "admin@example.com", "default.yml", "payment ルール追加");`}
          language="typescript"
          filename="src/security/audit-log.ts"
        />

        {/* PIIマスキング */}
        <h2 className="text-xl font-bold text-slate-900">4. PII・機密データのマスキング</h2>
        <p className="text-slate-600 leading-relaxed">
          ログに個人情報（PII: Personally Identifiable Information）を出力してはいけません。
          メールアドレス、電話番号、クレジットカード番号などは自動マスキングします。
        </p>

        <CodeBlock
          code={`// src/observability/masking.ts

const MASKING_PATTERNS: Array<{
  name: string;
  pattern: RegExp;
  replacement: string;
}> = [
  {
    name: "email",
    pattern: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g,
    replacement: "***@***.***",
  },
  {
    name: "phone-jp",
    pattern: /0\\d{1,4}-?\\d{1,4}-?\\d{3,4}/g,
    replacement: "***-****-****",
  },
  {
    name: "credit-card",
    pattern: /\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}/g,
    replacement: "****-****-****-****",
  },
];

/**
 * 文字列内のPII情報をマスキング
 */
export function maskPII(input: string): string {
  let result = input;
  for (const { pattern, replacement } of MASKING_PATTERNS) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

/**
 * オブジェクト内のPII情報を再帰的にマスキング
 */
export function maskObject(
  obj: Record<string, unknown>
): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      result[key] = maskPII(value);
    } else if (typeof value === "object" && value !== null) {
      result[key] = maskObject(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }

  return result;
}`}
          language="typescript"
          filename="src/observability/masking.ts"
        />

        <Callout type="warning">
          PII がログに出力されると、ログ収集サービス・ログファイルのバックアップなど、
          あらゆる場所にPIIが拡散します。
          「ログに出してはいけないもの」は実装時にマスキングしてください。
        </Callout>

        {/* 環境分離 */}
        <h2 className="text-xl font-bold text-slate-900">5. 環境分離（dev/stg/prod）</h2>
        <p className="text-slate-600 leading-relaxed">
          開発（dev）・ステージング（stg）・本番（prod）の3環境を分離します。
          各環境で異なる設定を使い、本番データに影響を与えないようにします。
        </p>

        <CodeBlock
          code={`# 環境ごとの設定例

# .env.development
NODE_ENV=development
WEBHOOK_SECRET=dummy-secret-for-dev
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/DEV/CHANNEL
STORAGE_PATH=./data/dev
LOG_LEVEL=debug

# .env.staging
NODE_ENV=staging
WEBHOOK_SECRET=staging-secret
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/STG/CHANNEL
STORAGE_PATH=./data/staging
LOG_LEVEL=info

# .env.production
NODE_ENV=production
WEBHOOK_SECRET=（本番シークレット：環境変数で注入）
SLACK_WEBHOOK_URL=（本番Webhook URL：環境変数で注入）
STORAGE_PATH=/var/data/eos
LOG_LEVEL=warn`}
          language="bash"
          filename="環境別設定"
        />

        {/* インシデント対応 */}
        <h2 className="text-xl font-bold text-slate-900">6. インシデント対応手順</h2>
        <p className="text-slate-600 leading-relaxed">
          障害が発生したときに慌てないよう、対応手順を事前にREADMEに記載します。
          トリアージ（優先度判定）→調査→対応→振り返りの流れを定義します。
        </p>

        <CodeBlock
          code={`## インシデント対応手順（README.md に記載）

### トリアージ（最初の5分）
1. アラート内容を確認（Slackチャンネル）
2. 影響範囲を判定:
   - 全イベント停止 → 緊急（Sev1）
   - 特定プロバイダーのみ停止 → 重大（Sev2）
   - 処理遅延のみ → 通常（Sev3）

### 調査
1. \`/health\` エンドポイントで生死確認
2. \`/metrics\` で失敗率・レイテンシを確認
3. 構造化ログで event_id を追跡:
   \`cat data/events/*.json | jq 'select(.event_id == "evt_xxx")'\`
4. DLQ を確認:
   \`cat data/dlq.json | jq '.[] | select(.reprocessed == false)'\`

### 対応
- Sev1: サービス再起動 → 原因調査
- Sev2: 該当プロバイダーのAdapterを確認
- Sev3: メトリクスを継続監視

### 振り返り（インシデント解決後24時間以内）
1. タイムライン作成（いつ何が起きたか）
2. 根本原因分析（5つのなぜ）
3. 再発防止策の策定
4. 対応手順の更新`}
          language="markdown"
          filename="README.md（インシデント対応セクション）"
        />

        {/* 運用チェックリスト */}
        <h2 className="text-xl font-bold text-slate-900">7. 運用チェックリスト</h2>
        <p className="text-slate-600 leading-relaxed">
          リリース前に確認すべき項目をチェックリスト形式でまとめます。
        </p>

        <div className="space-y-2">
          {[
            {
              category: "セキュリティ",
              items: [
                "すべてのシークレットが環境変数経由で読み込まれている",
                "コード内にハードコードされた秘密情報がない",
                "Webhook署名検証が有効になっている",
                "PIIマスキングがログ出力に適用されている",
                ".env が .gitignore に含まれている",
              ],
            },
            {
              category: "信頼性",
              items: [
                "冪等性チェックが実装されている",
                "リトライ（指数バックオフ）が実装されている",
                "DLQが実装され、手動再処理手順が文書化されている",
                "エラー時もイベントログが記録される",
              ],
            },
            {
              category: "観測性",
              items: [
                "構造化ログが JSON 形式で出力されている",
                "event_id でログをフィルタできる",
                "/health エンドポイントが動作する",
                "/metrics エンドポイントが動作する",
                "アラートポリシーが定義されている",
              ],
            },
            {
              category: "運用",
              items: [
                "README にインシデント対応手順が記載されている",
                "環境分離（dev/stg/prod）の設定がある",
                "監査ログが管理操作を記録している",
                "必須の環境変数が未設定だとアプリが起動しない",
              ],
            },
          ].map((group) => (
            <div key={group.category} className="rounded-lg border border-slate-200 p-4">
              <h3 className="mb-2 font-semibold text-slate-900">{group.category}</h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1.5 h-3 w-3 shrink-0 rounded border border-slate-300 bg-white" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Callout type="tip">
          このチェックリストを docs/operations-checklist.md として保存しておくと、
          リリース前のレビュー時に使えます。
          Claude Code に生成させて、プロジェクトに合わせて修正しましょう。
        </Callout>

        {/* 実践 */}
        <h2 className="text-xl font-bold text-slate-900">実践: Claude Code にセキュリティ・運用機能を実装させる</h2>

        <CodeBlock
          code={`# Claude Code への指示例

"セキュリティと運用の仕上げを行ってください:

1. src/config.ts - 環境変数の一元管理（未設定で起動エラー）
2. src/security/audit-log.ts - 管理操作の監査ログ
3. src/observability/masking.ts - PII自動マスキング
   - メールアドレス、電話番号、クレジットカード番号
4. ロガーにマスキングを組み込む
5. README.md にインシデント対応手順を追記
6. docs/operations-checklist.md を作成

要件:
- requireEnv() で必須環境変数をチェック
- 監査ログは通常ログとは別に記録
- PIIマスキングは再帰的に適用"`}
          language="text"
          filename="Claude Code への指示"
        />
      </StepLayout>
    </div>
  );
}
