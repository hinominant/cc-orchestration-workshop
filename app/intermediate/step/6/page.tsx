import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function IntermediateStep6Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={6}
        title="観測性"
        duration="30分"
        prevStep={5}
        nextStep={7}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          サービスを運用するには「今、何が起きているか」を把握する必要があります。
          観測性（Observability）は、ログ・メトリクス・アラートの3つで構成されます。
          このSTEPでは、EOSに構造化ログとメトリクスを組み込み、異常を検知する仕組みを作ります。
        </p>

        <Callout type="info">
          「ログなんて console.log でいいのでは？」と思うかもしれません。
          しかし、100件のイベントを処理している中で1件だけ失敗したとき、
          console.log の山から該当行を見つけるのは非常に困難です。
          構造化ログなら event_id で即座にフィルタできます。
        </Callout>

        {/* 構造化ログ */}
        <h2 className="text-xl font-bold text-slate-900">1. 構造化ログ</h2>
        <p className="text-slate-600 leading-relaxed">
          構造化ログとは、JSON形式で出力するログです。
          キーと値のペアで情報を整理するため、ツールによる検索・集計が容易になります。
        </p>

        <div className="my-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
            <h3 className="mb-2 font-semibold text-red-800">非構造化ログ</h3>
            <pre className="overflow-x-auto text-xs text-red-700">
{`[INFO] Processing payment event
[ERROR] Failed to notify slack
[INFO] Event completed in 234ms`}
            </pre>
            <p className="mt-2 text-xs text-red-600">
              人間は読めるが、ツールで検索・集計しにくい
            </p>
          </div>
          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
            <h3 className="mb-2 font-semibold text-green-800">構造化ログ</h3>
            <pre className="overflow-x-auto text-xs text-green-700">
{`{"level":"info","event_id":"evt_001",
 "provider":"a","status":"processing"}
{"level":"error","event_id":"evt_001",
 "component":"notifier","error":"timeout"}
{"level":"info","event_id":"evt_001",
 "status":"completed","duration_ms":234}`}
            </pre>
            <p className="mt-2 text-xs text-green-600">
              event_id でフィルタすれば1つのイベントの全ログを追える
            </p>
          </div>
        </div>

        <CodeBlock
          code={`// src/observability/logger.ts

export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  [key: string]: unknown;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

export class StructuredLogger {
  private readonly minLevel: LogLevel;
  private readonly context: Record<string, unknown>;

  constructor(
    minLevel: LogLevel = "info",
    context: Record<string, unknown> = {}
  ) {
    this.minLevel = minLevel;
    this.context = context;
  }

  /**
   * コンテキストを追加した子ロガーを生成
   * 例: logger.child({ event_id: "evt_001" })
   */
  child(additionalContext: Record<string, unknown>): StructuredLogger {
    return new StructuredLogger(this.minLevel, {
      ...this.context,
      ...additionalContext,
    });
  }

  debug(message: string, data?: Record<string, unknown>): void {
    this.log("debug", message, data);
  }

  info(message: string, data?: Record<string, unknown>): void {
    this.log("info", message, data);
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.log("warn", message, data);
  }

  error(message: string, data?: Record<string, unknown>): void {
    this.log("error", message, data);
  }

  private log(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>
  ): void {
    if (LOG_LEVELS[level] < LOG_LEVELS[this.minLevel]) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...this.context,
      ...data,
    };

    const output = JSON.stringify(entry);

    if (level === "error") {
      console.error(output);
    } else if (level === "warn") {
      console.warn(output);
    } else {
      console.log(output);
    }
  }
}

/** アプリケーション全体で共有するロガーインスタンス */
export const logger = new StructuredLogger(
  (process.env.LOG_LEVEL as LogLevel) ?? "info",
  { service: "eos" }
);`}
          language="typescript"
          filename="src/observability/logger.ts"
        />

        <h3 className="text-lg font-semibold text-slate-900">ログの使い方</h3>
        <p className="text-slate-600 leading-relaxed">
          Orchestrator でのログ使用例です。
          child() メソッドで event_id をコンテキストに追加すると、
          そのイベントに関するすべてのログに event_id が自動付与されます。
        </p>

        <CodeBlock
          code={`// Orchestrator での使用例

import { logger } from "../observability/logger";

async process(event: EOSEvent): Promise<ProcessingResult> {
  // event_id 付きの子ロガーを生成
  const log = logger.child({
    event_id: event.event_id,
    provider: event.provider,
    type: event.type,
  });

  log.info("Processing started");

  // 冪等性チェック
  const isDuplicate = await this.deps.checkIdempotency(event.event_id);
  if (isDuplicate) {
    log.info("Duplicate event, skipping");
    return { success: true, message: "Skipped", duration_ms: 0 };
  }

  // Worker 実行
  try {
    const result = await worker.execute(event);
    log.info("Processing completed", {
      success: result.success,
      duration_ms: result.duration_ms,
    });
    return result;
  } catch (error) {
    log.error("Processing failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}`}
          language="typescript"
          filename="ログ使用例"
        />

        {/* メトリクス */}
        <h2 className="text-xl font-bold text-slate-900">2. メトリクス</h2>
        <p className="text-slate-600 leading-relaxed">
          メトリクスは、サービスの健全性を数値で表す指標です。
          「成功率」「処理時間」「DLQ滞留数」などを計測し、異常を定量的に検知します。
        </p>

        <CodeBlock
          code={`// src/observability/metrics.ts

interface MetricSnapshot {
  /** 処理成功件数 */
  success_count: number;
  /** 処理失敗件数 */
  failure_count: number;
  /** 重複スキップ件数 */
  duplicate_count: number;
  /** DLQ投入件数 */
  dlq_count: number;
  /** 処理時間の合計（ミリ秒） */
  total_duration_ms: number;
  /** 処理時間の最大値（ミリ秒） */
  max_duration_ms: number;
  /** メトリクス計測開始時刻 */
  started_at: string;
}

export class MetricsCollector {
  private successCount = 0;
  private failureCount = 0;
  private duplicateCount = 0;
  private dlqCount = 0;
  private totalDurationMs = 0;
  private maxDurationMs = 0;
  private readonly startedAt: string;

  constructor() {
    this.startedAt = new Date().toISOString();
  }

  /** 処理成功を記録 */
  recordSuccess(durationMs: number): void {
    this.successCount++;
    this.recordDuration(durationMs);
  }

  /** 処理失敗を記録 */
  recordFailure(durationMs: number): void {
    this.failureCount++;
    this.recordDuration(durationMs);
  }

  /** 重複スキップを記録 */
  recordDuplicate(): void {
    this.duplicateCount++;
  }

  /** DLQ投入を記録 */
  recordDLQ(): void {
    this.dlqCount++;
  }

  /** 現在のメトリクススナップショットを取得 */
  snapshot(): MetricSnapshot {
    return {
      success_count: this.successCount,
      failure_count: this.failureCount,
      duplicate_count: this.duplicateCount,
      dlq_count: this.dlqCount,
      total_duration_ms: this.totalDurationMs,
      max_duration_ms: this.maxDurationMs,
      started_at: this.startedAt,
    };
  }

  /** 処理件数合計 */
  get totalProcessed(): number {
    return this.successCount + this.failureCount;
  }

  /** 失敗率（0-1） */
  get failureRate(): number {
    if (this.totalProcessed === 0) return 0;
    return this.failureCount / this.totalProcessed;
  }

  /** 平均処理時間（ミリ秒） */
  get avgDurationMs(): number {
    if (this.totalProcessed === 0) return 0;
    return this.totalDurationMs / this.totalProcessed;
  }

  private recordDuration(durationMs: number): void {
    this.totalDurationMs += durationMs;
    if (durationMs > this.maxDurationMs) {
      this.maxDurationMs = durationMs;
    }
  }
}

/** アプリケーション全体で共有するメトリクスインスタンス */
export const metrics = new MetricsCollector();`}
          language="typescript"
          filename="src/observability/metrics.ts"
        />

        {/* アラートポリシー */}
        <h2 className="text-xl font-bold text-slate-900">3. アラートポリシー</h2>
        <p className="text-slate-600 leading-relaxed">
          メトリクスを計測するだけでは不十分です。
          閾値を超えたら自動的に通知する「アラートポリシー」を定義します。
        </p>

        <div className="my-6 space-y-3">
          {[
            {
              name: "高失敗率アラート",
              condition: "失敗率が 5% を超えた場合",
              action: "Slack に警告通知",
              severity: "warning",
              color: "border-amber-200 bg-amber-50",
            },
            {
              name: "DLQ 滞留アラート",
              condition: "DLQ の未処理件数が 10 を超えた場合",
              action: "Slack にエラー通知",
              severity: "error",
              color: "border-red-200 bg-red-50",
            },
            {
              name: "高レイテンシアラート",
              condition: "平均処理時間が 5秒 を超えた場合",
              action: "Slack に警告通知",
              severity: "warning",
              color: "border-amber-200 bg-amber-50",
            },
          ].map((alert) => (
            <div key={alert.name} className={`rounded-lg border p-4 ${alert.color}`}>
              <h3 className="font-semibold text-slate-900">{alert.name}</h3>
              <div className="mt-2 grid gap-2 sm:grid-cols-2 text-sm">
                <div>
                  <span className="font-medium text-slate-600">条件: </span>
                  <span className="text-slate-700">{alert.condition}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">アクション: </span>
                  <span className="text-slate-700">{alert.action}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <CodeBlock
          code={`// src/observability/alerts.ts

import type { NotifierAdapter } from "../adapters/types";
import type { MetricsCollector } from "./metrics";
import { logger } from "./logger";

export interface AlertPolicy {
  name: string;
  description: string;
  check: (metrics: MetricsCollector) => boolean;
  severity: "warning" | "error";
}

const DEFAULT_POLICIES: AlertPolicy[] = [
  {
    name: "high-failure-rate",
    description: "失敗率が5%を超えている",
    check: (m) => m.totalProcessed >= 10 && m.failureRate > 0.05,
    severity: "warning",
  },
  {
    name: "high-latency",
    description: "平均処理時間が5秒を超えている",
    check: (m) => m.totalProcessed >= 5 && m.avgDurationMs > 5000,
    severity: "warning",
  },
];

/**
 * メトリクスをチェックしてアラートを発火
 * 定期的に呼び出す（例: 1分ごと）
 */
export async function checkAlerts(
  metrics: MetricsCollector,
  notifier: NotifierAdapter,
  dlqPendingCount: number,
  policies: AlertPolicy[] = DEFAULT_POLICIES
): Promise<void> {
  // DLQ滞留チェック（動的に追加）
  const allPolicies = [
    ...policies,
    {
      name: "dlq-backlog",
      description: \`DLQ未処理件数が10を超えている（現在: \${dlqPendingCount}件）\`,
      check: () => dlqPendingCount > 10,
      severity: "error" as const,
    },
  ];

  for (const policy of allPolicies) {
    if (policy.check(metrics)) {
      logger.warn(\`Alert triggered: \${policy.name}\`, {
        policy: policy.name,
        severity: policy.severity,
      });

      await notifier.send({
        status: policy.severity === "error" ? "failure" : "warning",
        title: \`[ALERT] \${policy.name}\`,
        body: policy.description,
        event_id: "system-alert",
        provider: "eos-monitor",
        timestamp: new Date().toISOString(),
      });
    }
  }
}`}
          language="typescript"
          filename="src/observability/alerts.ts"
        />

        <Callout type="tip">
          アラートは「多すぎず少なすぎず」が重要です。
          何でもアラートにすると「狼少年」になり、本当に重要なアラートが埋もれます。
          まずは「失敗率」と「DLQ滞留」の2つから始めましょう。
        </Callout>

        {/* メトリクスエンドポイント */}
        <h2 className="text-xl font-bold text-slate-900">メトリクスエンドポイント</h2>
        <p className="text-slate-600 leading-relaxed">
          HTTPエンドポイントでメトリクスを公開すると、外部ツール（Grafana等）から監視できます。
        </p>

        <CodeBlock
          code={`// src/index.ts にメトリクスエンドポイントを追加

import { metrics } from "./observability/metrics";

app.get("/metrics", (c) => {
  const snapshot = metrics.snapshot();
  return c.json({
    ...snapshot,
    failure_rate: metrics.failureRate,
    avg_duration_ms: metrics.avgDurationMs,
    total_processed: metrics.totalProcessed,
  });
});

// ヘルスチェックエンドポイント
app.get("/health", (c) => {
  const isHealthy = metrics.failureRate < 0.1; // 失敗率10%未満
  return c.json(
    { status: isHealthy ? "healthy" : "degraded" },
    isHealthy ? 200 : 503
  );
});`}
          language="typescript"
          filename="src/index.ts（追加分）"
        />

        {/* 実践 */}
        <h2 className="text-xl font-bold text-slate-900">実践: Claude Code に観測性を実装させる</h2>

        <CodeBlock
          code={`# Claude Code への指示例

"観測性の機能を実装してください:

1. src/observability/logger.ts - JSON構造化ログ
   - child() で event_id/provider をコンテキスト追加
   - ログレベル: debug/info/warn/error
2. src/observability/metrics.ts - メトリクス収集
   - 成功/失敗カウント、処理時間、DLQ件数
   - failureRate, avgDurationMs のゲッター
3. src/observability/alerts.ts - アラートポリシー
   - 失敗率5%超 → Slack警告
   - DLQ未処理10件超 → Slackエラー
4. /metrics エンドポイントと /health エンドポイントの追加

そして、Orchestrator の process メソッドにログ出力とメトリクス記録を組み込んでください。"`}
          language="text"
          filename="Claude Code への指示"
        />

        <Callout type="info">
          観測性は「運用を始めてから」ではなく「実装時に」組み込むものです。
          後付けだと、障害が起きてから「ログがなくて原因がわからない」という事態になります。
        </Callout>
      </StepLayout>
    </div>
  );
}
