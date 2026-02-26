import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function IntermediateStep5Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={5}
        title="信頼性"
        duration="45分"
        prevStep={4}
        nextStep={6}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          「動く」サービスと「信頼できる」サービスの違いは、障害時の振る舞いにあります。
          このSTEPでは、冪等性・リトライ・DLQ（Dead Letter Queue）の3つの信頼性パターンを実装します。
        </p>

        <Callout type="info">
          Webhookは「最低1回配信（at-least-once）」が一般的です。
          つまり、同じイベントが2回以上届くことは「普通」です。
          これに備えないと、二重課金や二重通知が発生します。
        </Callout>

        {/* 冪等性 */}
        <h2 className="text-xl font-bold text-slate-900">1. 冪等性（Idempotency）</h2>
        <p className="text-slate-600 leading-relaxed">
          冪等性とは「同じ操作を何回実行しても結果が同じ」という性質です。
          event_id をキーとして処理済みかどうかを確認し、重複処理を防ぎます。
        </p>

        <div className="my-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
            <h3 className="font-semibold text-red-800">冪等性なし</h3>
            <div className="mt-2 space-y-1 text-sm text-red-700">
              <p>1回目: 決済完了通知 → 処理実行</p>
              <p>2回目: 決済完了通知 → 再度処理実行</p>
              <p className="font-bold">結果: 二重課金が発生</p>
            </div>
          </div>
          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
            <h3 className="font-semibold text-green-800">冪等性あり</h3>
            <div className="mt-2 space-y-1 text-sm text-green-700">
              <p>1回目: 決済完了通知 → 処理実行 → ID記録</p>
              <p>2回目: 決済完了通知 → ID重複 → スキップ</p>
              <p className="font-bold">結果: 安全に重複を排除</p>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// src/reliability/idempotency.ts

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

interface IdempotencyRecord {
  event_id: string;
  processed_at: string;
  result_summary: string;
}

export class IdempotencyStore {
  private readonly filePath: string;
  private records: Map<string, IdempotencyRecord>;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.records = new Map();
    this.load();
  }

  /**
   * イベントが処理済みかチェック
   * @returns true = 処理済み（スキップすべき）
   */
  async isDuplicate(eventId: string): Promise<boolean> {
    return this.records.has(eventId);
  }

  /**
   * 処理完了を記録
   */
  async record(eventId: string, resultSummary: string): Promise<void> {
    this.records.set(eventId, {
      event_id: eventId,
      processed_at: new Date().toISOString(),
      result_summary: resultSummary,
    });
    this.save();
  }

  /**
   * 記録済みの結果を取得
   */
  async getRecord(eventId: string): Promise<IdempotencyRecord | null> {
    return this.records.get(eventId) ?? null;
  }

  private load(): void {
    if (!existsSync(this.filePath)) {
      return;
    }
    try {
      const data = readFileSync(this.filePath, "utf-8");
      const parsed = JSON.parse(data) as IdempotencyRecord[];
      for (const record of parsed) {
        this.records.set(record.event_id, record);
      }
    } catch {
      // ファイルが壊れている場合は空で初期化
      this.records = new Map();
    }
  }

  private save(): void {
    const dir = dirname(this.filePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    const data = Array.from(this.records.values());
    writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }
}`}
          language="typescript"
          filename="src/reliability/idempotency.ts"
        />

        <Callout type="warning">
          講座ではファイルベースのストレージを使いますが、本番環境では
          Redis や データベースのユニーク制約を使うのが一般的です。
          ファイルベースは並行アクセスに弱いため、あくまで学習用です。
        </Callout>

        {/* リトライ */}
        <h2 className="text-xl font-bold text-slate-900">2. リトライ（Retry with Exponential Backoff）</h2>
        <p className="text-slate-600 leading-relaxed">
          一時的な障害（ネットワークタイムアウト、外部API一時停止など）で処理が失敗した場合、
          自動的にリトライします。ただし、やみくもにリトライすると障害を悪化させるため、
          指数バックオフ（間隔を徐々に長くする）を使います。
        </p>

        <div className="my-6 rounded-lg border border-slate-200 p-5">
          <h3 className="mb-3 font-semibold text-slate-900">指数バックオフの動き</h3>
          <div className="space-y-2">
            {[
              { attempt: 1, delay: "1秒", elapsed: "1秒後" },
              { attempt: 2, delay: "2秒", elapsed: "3秒後" },
              { attempt: 3, delay: "4秒", elapsed: "7秒後" },
              { attempt: 4, delay: "8秒", elapsed: "15秒後" },
              { attempt: 5, delay: "---", elapsed: "上限到達 → DLQ へ" },
            ].map((row) => (
              <div key={row.attempt} className="flex items-center gap-4 rounded-md bg-slate-50 px-4 py-2">
                <span className="w-16 text-sm font-medium text-slate-600">
                  {row.attempt}回目
                </span>
                <span className="w-20 text-sm text-slate-600">{row.delay}</span>
                <span className="text-sm text-slate-500">{row.elapsed}</span>
              </div>
            ))}
          </div>
        </div>

        <CodeBlock
          code={`// src/reliability/retry.ts

export interface RetryConfig {
  /** 最大リトライ回数 */
  maxRetries: number;
  /** 初回リトライまでの待機時間（ミリ秒） */
  baseDelayMs: number;
  /** 最大待機時間（ミリ秒） */
  maxDelayMs: number;
  /** リトライ対象とする条件（trueならリトライ） */
  shouldRetry?: (error: Error) => boolean;
}

const DEFAULT_CONFIG: RetryConfig = {
  maxRetries: 4,
  baseDelayMs: 1000,
  maxDelayMs: 30000,
};

/**
 * 指数バックオフでリトライを実行する
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: Partial<RetryConfig> = {}
): Promise<T> {
  const opts = { ...DEFAULT_CONFIG, ...config };
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // リトライ対象外のエラーは即座に投げる
      if (opts.shouldRetry && !opts.shouldRetry(lastError)) {
        throw lastError;
      }

      // 最後の試行で失敗した場合はリトライしない
      if (attempt === opts.maxRetries) {
        break;
      }

      // 指数バックオフ + ジッター（ランダム要素）
      const delay = Math.min(
        opts.baseDelayMs * Math.pow(2, attempt) + Math.random() * 1000,
        opts.maxDelayMs
      );

      console.log(
        \`[Retry] Attempt \${attempt + 1}/\${opts.maxRetries} failed. \\
Retrying in \${Math.round(delay)}ms...\`
      );

      await sleep(delay);
    }
  }

  throw lastError ?? new Error("All retries exhausted");
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 一時的なエラーかどうかを判定
 * ネットワークエラーや5xx系はリトライ対象
 */
export function isTransientError(error: Error): boolean {
  const message = error.message.toLowerCase();
  return (
    message.includes("timeout") ||
    message.includes("econnrefused") ||
    message.includes("econnreset") ||
    message.includes("503") ||
    message.includes("502") ||
    message.includes("429")
  );
}`}
          language="typescript"
          filename="src/reliability/retry.ts"
        />

        <Callout type="tip">
          ジッター（ランダム要素）を加える理由は「雷群問題（Thundering Herd）」の防止です。
          複数のクライアントが同時に障害から復旧すると、全員が同じタイミングでリトライし、
          サーバーに再度負荷がかかります。ランダムなずれを入れることで分散させます。
        </Callout>

        {/* DLQ */}
        <h2 className="text-xl font-bold text-slate-900">3. DLQ（Dead Letter Queue）</h2>
        <p className="text-slate-600 leading-relaxed">
          リトライ上限を超えても処理できないイベントを、DLQ に退避します。
          DLQ は「処理不能イベントの隔離場所」です。
          エンジニアが後から原因を調査し、手動で再処理できるようにします。
        </p>

        <div className="my-6 rounded-lg border border-red-200 bg-red-50 p-5">
          <h3 className="font-semibold text-red-800">なぜ DLQ が必要か？</h3>
          <ul className="mt-2 space-y-2 text-sm text-red-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              リトライを無限に繰り返すとシステム全体のリソースを圧迫する
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              失敗イベントが他の正常イベントの処理を妨げる（ヘッドオブラインブロッキング）
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
              バグが原因の場合、リトライしても成功しない（修正が必要）
            </li>
          </ul>
        </div>

        <CodeBlock
          code={`// src/reliability/dlq.ts

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import type { EOSEvent } from "../types/event";

export interface DLQEntry {
  /** DLQエントリの一意ID */
  dlq_id: string;
  /** 元のイベント */
  event: EOSEvent;
  /** 最後のエラーメッセージ */
  last_error: string;
  /** リトライ回数 */
  retry_count: number;
  /** DLQ投入日時 */
  queued_at: string;
  /** 手動リトライ済みか */
  reprocessed: boolean;
}

export class DeadLetterQueue {
  private readonly filePath: string;
  private entries: DLQEntry[];

  constructor(filePath: string) {
    this.filePath = filePath;
    this.entries = [];
    this.load();
  }

  /**
   * 処理不能イベントをDLQに投入
   */
  async enqueue(
    event: EOSEvent,
    lastError: string,
    retryCount: number
  ): Promise<DLQEntry> {
    const entry: DLQEntry = {
      dlq_id: \`dlq_\${Date.now()}_\${Math.random().toString(36).slice(2, 8)}\`,
      event: { ...event, metadata: { ...event.metadata, dlq: true } },
      last_error: lastError,
      retry_count: retryCount,
      queued_at: new Date().toISOString(),
      reprocessed: false,
    };

    this.entries.push(entry);
    this.save();

    console.error(
      \`[DLQ] Event \${event.event_id} moved to DLQ after \${retryCount} retries: \${lastError}\`
    );

    return entry;
  }

  /**
   * DLQ内のエントリ一覧を取得
   */
  async list(includeReprocessed = false): Promise<DLQEntry[]> {
    if (includeReprocessed) {
      return [...this.entries];
    }
    return this.entries.filter((e) => !e.reprocessed);
  }

  /**
   * DLQエントリを再処理済みとしてマーク
   */
  async markReprocessed(dlqId: string): Promise<void> {
    const entry = this.entries.find((e) => e.dlq_id === dlqId);
    if (entry) {
      entry.reprocessed = true;
      this.save();
    }
  }

  /**
   * DLQ内の未処理件数
   */
  async pendingCount(): Promise<number> {
    return this.entries.filter((e) => !e.reprocessed).length;
  }

  private load(): void {
    if (!existsSync(this.filePath)) {
      return;
    }
    try {
      const data = readFileSync(this.filePath, "utf-8");
      this.entries = JSON.parse(data);
    } catch {
      this.entries = [];
    }
  }

  private save(): void {
    const dir = dirname(this.filePath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(this.filePath, JSON.stringify(this.entries, null, 2));
  }
}`}
          language="typescript"
          filename="src/reliability/dlq.ts"
        />

        {/* 3パターンの統合 */}
        <h2 className="text-xl font-bold text-slate-900">3パターンの統合</h2>
        <p className="text-slate-600 leading-relaxed">
          冪等性・リトライ・DLQは独立した概念ですが、組み合わせて使うことで
          堅牢なイベント処理パイプラインになります。
        </p>

        <CodeBlock
          code={`// 信頼性パターンの統合フロー

イベント到着
  │
  ├─ [冪等性チェック] ─── 処理済み → 既存結果を返却（スキップ）
  │
  ├─ [Worker 実行]
  │    │
  │    ├─ 成功 → 結果記録 → 通知 → 完了
  │    │
  │    └─ 失敗
  │         │
  │         ├─ [リトライ判定] ─── 一時的エラー → 指数バックオフでリトライ
  │         │                     永続的エラー → DLQへ
  │         │
  │         └─ [リトライ上限] ─── 4回失敗 → DLQへ退避
  │
  └─ [DLQ]
       │
       └─ エンジニアが原因調査 → 修正 → 手動再処理`}
          language="text"
          filename="信頼性パターン統合フロー"
        />

        <Callout type="info">
          この3つのパターンは、AWS SQS + Lambda、Google Cloud Pub/Sub、
          RabbitMQ など、多くのメッセージ処理システムで使われている基本パターンです。
          ここで学んだ考え方は、どのクラウドサービスでも応用できます。
        </Callout>

        {/* 実践 */}
        <h2 className="text-xl font-bold text-slate-900">実践: Claude Code に信頼性機能を実装させる</h2>

        <CodeBlock
          code={`# Claude Code への指示例

"信頼性の3パターンを実装してください:

1. src/reliability/idempotency.ts - event_id ベースの重複排除
2. src/reliability/retry.ts - 指数バックオフ + ジッター
3. src/reliability/dlq.ts - 処理不能イベントの隔離

要件:
- 冪等性ストアはファイルベース（data/idempotency.json）
- リトライは最大4回、初回1秒、最大30秒
- DLQエントリには元イベント、エラー内容、リトライ回数を含む
- DLQの一覧取得と手動再処理マーク機能を持つ

そして、src/orchestrator/router.ts の process メソッドに
冪等性チェック → リトライ → DLQ退避を組み込んでください。"`}
          language="text"
          filename="Claude Code への指示"
        />

        <Callout type="tip">
          実装後、同じ event_id のイベントを2回送って、2回目がスキップされることを確認しましょう。
          また、意図的にエラーを起こして DLQ に退避されることも確認してみてください。
        </Callout>
      </StepLayout>
    </div>
  );
}
