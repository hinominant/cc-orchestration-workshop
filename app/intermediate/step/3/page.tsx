import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function IntermediateStep3Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={3}
        title="Provider Adapter 実装"
        duration="45分"
        prevStep={2}
        nextStep={4}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          設計が固まったら、いよいよ実装に入ります。
          まずは外部との接続部分である Provider Adapter（Ingress と Notifier）を作ります。
          Adapter パターンを使うことで、プロバイダーの追加・変更がシステム全体に影響しない設計になります。
        </p>

        {/* Adapterパターンの説明 */}
        <h2 className="text-xl font-bold text-slate-900">Adapter パターンとは</h2>
        <p className="text-slate-600 leading-relaxed">
          Adapter パターンは、外部サービスの固有フォーマットを共通インターフェースに変換するデザインパターンです。
          EOSでは、プロバイダーごとに異なるWebhookフォーマットを共通の EOSEvent に変換します。
        </p>

        <div className="rounded-lg border border-slate-200 p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-lg bg-red-100 p-3">
                <p className="text-2xl font-bold text-red-600">A</p>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-700">Provider A</p>
              <p className="text-xs text-slate-500">独自フォーマット</p>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-slate-300" />
                <div className="rounded-lg bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                  Adapter
                </div>
                <div className="h-px w-8 bg-slate-300" />
              </div>
            </div>
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-lg bg-blue-100 p-3">
                <p className="text-2xl font-bold text-blue-600">EOS</p>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-700">共通スキーマ</p>
              <p className="text-xs text-slate-500">EOSEvent 型</p>
            </div>
          </div>
        </div>

        <Callout type="info">
          新しいプロバイダー（例: GitHub Webhook）を追加するとき、
          Adapter を1つ追加するだけで済みます。Orchestrator や Worker は変更不要です。
          これがSTEP 2で設計した「責務の分離」の効果です。
        </Callout>

        {/* Provider A: Webhook受信 */}
        <h2 className="text-xl font-bold text-slate-900">Provider A: Webhook受信アダプター</h2>
        <p className="text-slate-600 leading-relaxed">
          Provider AのWebhookを受信するHTTPエンドポイントを実装します。
          Honoを使ってルーティングを定義し、署名検証とタイムスタンプチェックを行います。
        </p>

        <h3 className="text-lg font-semibold text-slate-900">共通型定義</h3>
        <p className="text-slate-600 leading-relaxed">
          まず、すべてのアダプターが実装する共通インターフェースを定義します。
        </p>

        <CodeBlock
          code={`// Adapter パターンの共通インターフェース設計
// スターターリポジトリでは各ファイルに直接実装しますが、
// 以下のインターフェースを設計指針として参照してください。

import type { EOSEvent } from "../types/event";

/**
 * Webhook受信アダプターの共通インターフェース
 * 新しいプロバイダーを追加する際はこのインターフェースを実装する
 */
export interface IngressAdapter {
  /** プロバイダー名 */
  readonly provider: string;

  /** 署名を検証する */
  verifySignature(payload: string, signature: string): boolean;

  /** タイムスタンプが有効期限内かチェック（デフォルト5分） */
  isTimestampValid(timestamp: string, maxAgeMs?: number): boolean;

  /** プロバイダー固有のペイロードを共通スキーマに変換 */
  normalize(rawPayload: Record<string, unknown>): EOSEvent;
}

/**
 * 通知アダプターの共通インターフェース
 */
export interface NotifierAdapter {
  /** 通知先の名前 */
  readonly name: string;

  /** 通知を送信する */
  send(message: NotificationMessage): Promise<NotifyResult>;
}

export interface NotificationMessage {
  status: "success" | "failure" | "warning";
  title: string;
  body: string;
  event_id: string;
  provider: string;
  timestamp: string;
}

export interface NotifyResult {
  success: boolean;
  error?: string;
}`}
          language="typescript"
          filename="Adapter共通インターフェース（設計パターン）"
        />

        <h3 className="text-lg font-semibold text-slate-900">署名検証（HMAC-SHA256）</h3>
        <p className="text-slate-600 leading-relaxed">
          Webhook受信時に最も重要なのが署名検証です。
          プロバイダーが送信したリクエストが本物であることを、HMAC-SHA256で確認します。
          これを省略すると、誰でも偽のWebhookを送りつけることができてしまいます。
        </p>

        <CodeBlock
          code={`// src/adapters/webhook-provider.ts

import { createHmac, timingSafeEqual } from "node:crypto";
import type { EOSEvent } from "../types/event";

const DEFAULT_MAX_AGE_MS = 5 * 60 * 1000; // 5分

export class WebhookProvider {
  readonly provider = "webhook";
  private readonly secret: string;

  constructor(secret: string) {
    if (!secret) {
      throw new Error("Webhook secret is required");
    }
    this.secret = secret;
  }

  /**
   * HMAC-SHA256 で署名を検証する
   * timing-safe comparison を使い、タイミング攻撃を防止
   */
  verifySignature(payload: string, signature: string): boolean {
    const expected = createHmac("sha256", this.secret)
      .update(payload)
      .digest("hex");

    const expectedPrefixed = \`sha256=\${expected}\`;

    // 長さが異なる場合は即座に false（タイミング攻撃対策）
    if (signature.length !== expectedPrefixed.length) {
      return false;
    }

    return timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedPrefixed)
    );
  }

  /**
   * タイムスタンプの有効期限をチェック（リプレイ攻撃防止）
   */
  isTimestampValid(
    timestamp: string,
    maxAgeMs: number = DEFAULT_MAX_AGE_MS
  ): boolean {
    const eventTime = new Date(timestamp).getTime();
    const now = Date.now();

    if (isNaN(eventTime)) {
      return false;
    }

    return Math.abs(now - eventTime) <= maxAgeMs;
  }

  /**
   * Webhook のペイロードを共通スキーマに正規化
   */
  normalize(rawPayload: Record<string, unknown>): EOSEvent {
    return {
      event_id: String(rawPayload.id ?? crypto.randomUUID()),
      provider: this.provider,
      type: String(rawPayload.action ?? "unknown"),
      payload: rawPayload,
      received_at: new Date().toISOString(),
      metadata: {},
    };
  }
}`}
          language="typescript"
          filename="src/adapters/webhook-provider.ts"
        />

        <Callout type="warning">
          署名検証では必ず <code className="rounded bg-amber-100 px-1 py-0.5 text-xs font-mono">timingSafeEqual</code> を使ってください。
          通常の文字列比較（===）はタイミング攻撃に対して脆弱です。
          文字を1文字ずつ比較するため、不一致の位置が処理時間から推測できてしまいます。
        </Callout>

        <h3 className="text-lg font-semibold text-slate-900">タイムスタンプ検証（リプレイ攻撃防止）</h3>
        <p className="text-slate-600 leading-relaxed">
          署名検証だけでは不十分です。過去の正当なリクエストを再送する「リプレイ攻撃」を防ぐため、
          タイムスタンプが現在時刻から5分以内であることを確認します。
        </p>

        <CodeBlock
          code={`// リプレイ攻撃の流れ

1. 攻撃者が正当なWebhookリクエストを傍受
2. 署名は有効（本物のリクエストなので）
3. 1時間後に同じリクエストを再送
4. タイムスタンプ検証がなければ → 処理されてしまう
5. タイムスタンプ検証があれば → 期限切れで拒否される`}
          language="text"
          filename="リプレイ攻撃と防止策"
        />

        {/* HTTPエンドポイント */}
        <h3 className="text-lg font-semibold text-slate-900">Hono でエンドポイントを定義</h3>
        <p className="text-slate-600 leading-relaxed">
          Adapter をHTTPエンドポイントと接続します。
          Hono のルーティングでWebhook受信を処理します。
        </p>

        <CodeBlock
          code={`// src/index.ts（Webhook受信部分の抜粋）

import { Hono } from "hono";
import { WebhookProvider } from "./adapters/webhook-provider";

const app = new Hono();
const webhookProvider = new WebhookProvider(
  process.env.WEBHOOK_SECRET!
);

app.post("/webhook", async (c) => {
  const body = await c.req.text();
  const signature = c.req.header("x-signature") ?? "";
  const timestamp = c.req.header("x-timestamp") ?? "";

  // 1. 署名検証
  if (!webhookProvider.verifySignature(body, signature)) {
    return c.json({ error: "Invalid signature" }, 401);
  }

  // 2. タイムスタンプ検証
  if (!webhookProvider.isTimestampValid(timestamp)) {
    return c.json({ error: "Timestamp expired" }, 403);
  }

  // 3. 正規化
  const payload = JSON.parse(body);
  const event = webhookProvider.normalize(payload);

  // 4. Orchestratorへ転送（次のSTEPで実装）
  // await orchestrator.process(event);

  return c.json({ received: event.event_id }, 200);
});

export default app;`}
          language="typescript"
          filename="src/index.ts"
        />

        {/* Provider B: Slack通知 */}
        <h2 className="text-xl font-bold text-slate-900">Provider B: Slack通知アダプター</h2>
        <p className="text-slate-600 leading-relaxed">
          処理結果をSlackに通知するアダプターです。
          Webhook URLへHTTP POSTでメッセージを送信します。
        </p>

        <CodeBlock
          code={`// src/adapters/slack-notifier.ts

import type { NotifierAdapter, NotificationMessage, NotifyResult } from "./types";

const STATUS_EMOJI: Record<string, string> = {
  success: "white_check_mark",
  failure: "x",
  warning: "warning",
};

const STATUS_COLOR: Record<string, string> = {
  success: "#22c55e",
  failure: "#ef4444",
  warning: "#f59e0b",
};

export class SlackNotifier implements NotifierAdapter {
  readonly name = "slack";
  private readonly webhookUrl: string;

  constructor(webhookUrl: string) {
    if (!webhookUrl) {
      throw new Error("Slack Webhook URL is required");
    }
    this.webhookUrl = webhookUrl;
  }

  async send(message: NotificationMessage): Promise<NotifyResult> {
    const emoji = STATUS_EMOJI[message.status] ?? "question";
    const color = STATUS_COLOR[message.status] ?? "#6b7280";

    const slackPayload = {
      attachments: [
        {
          color,
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                text: [
                  \`:\${emoji}: *\${message.title}*\`,
                  message.body,
                  \`> Provider: \${message.provider} | Event: \${message.event_id}\`,
                  \`> Time: \${message.timestamp}\`,
                ].join("\\n"),
              },
            },
          ],
        },
      ],
    };

    try {
      const response = await fetch(this.webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slackPayload),
      });

      if (!response.ok) {
        return {
          success: false,
          error: \`Slack API returned \${response.status}\`,
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}`}
          language="typescript"
          filename="src/adapters/slack-notifier.ts"
        />

        <Callout type="tip">
          Slack通知のメッセージフォーマットは Block Kit を使うとリッチな表示ができます。
          ここでは最小限の実装にしていますが、カスタマイズしてみてください。
        </Callout>

        {/* 実践 */}
        <h2 className="text-xl font-bold text-slate-900">実践: Claude Codeに Adapter を実装させる</h2>
        <p className="text-slate-600 leading-relaxed">
          ここまでの設計を Claude Code に伝えて、Adapter の実装を依頼しましょう。
        </p>

        <CodeBlock
          code={`# Claude Code への指示例

"Adapter を実装してください:
1. src/adapters/webhook-provider.ts - HMAC-SHA256署名検証 + タイムスタンプチェック + 正規化
2. src/adapters/slack-notifier.ts - Slack Webhook通知
3. src/security/signature.ts - 署名検証のユーティリティ

要件:
- 署名検証は timingSafeEqual を使う
- タイムスタンプの有効期限は5分
- Slackメッセージは成功/失敗でアイコンと色を変える
- すべての秘密情報は process.env 経由で読み込む（WEBHOOK_SECRET, SLACK_WEBHOOK_URL）"`}
          language="text"
          filename="Claude Code への指示"
        />

        <Callout type="info">
          実装が完了したら、次のSTEPで Orchestrator を実装し、
          Adapter と Worker を接続します。
        </Callout>
      </StepLayout>
    </div>
  );
}
