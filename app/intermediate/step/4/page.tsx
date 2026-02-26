import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function IntermediateStep4Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={4}
        title="Orchestration 実装"
        duration="60分"
        prevStep={3}
        nextStep={5}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          EOSの心臓部である Orchestrator を実装します。
          イベントを受け取り、ルール定義に基づいて適切な Worker に振り分け、
          結果を集約して Notifier に渡す、一連の処理チェーンを構築します。
        </p>

        <Callout type="info">
          このSTEPは中級編で最も時間がかかります（60分）。
          焦らず1つずつ進めてください。
          agent-orchestrator のエージェントチェーンとの接続がポイントです。
        </Callout>

        {/* 処理チェーンフロー */}
        <h2 className="text-xl font-bold text-slate-900">処理チェーンフロー</h2>
        <p className="text-slate-600 leading-relaxed">
          Orchestrator は以下の流れでイベントを処理します。
          各ステップが独立しているため、途中で失敗しても影響範囲が限定されます。
        </p>

        <div className="my-6 space-y-3">
          {[
            {
              step: 1,
              label: "冪等性チェック",
              description: "event_id で重複を確認。処理済みならスキップ",
              color: "border-slate-300 bg-slate-50",
            },
            {
              step: 2,
              label: "ルール照合",
              description: "イベントの type/priority をルール定義と照合",
              color: "border-amber-300 bg-amber-50",
            },
            {
              step: 3,
              label: "Worker 選択・実行",
              description: "マッチしたルールに基づき Worker を呼び出し",
              color: "border-purple-300 bg-purple-50",
            },
            {
              step: 4,
              label: "結果集約",
              description: "Worker の処理結果を標準フォーマットに集約",
              color: "border-blue-300 bg-blue-50",
            },
            {
              step: 5,
              label: "通知・永続化",
              description: "Notifier に通知 + Storage にログを記録",
              color: "border-green-300 bg-green-50",
            },
          ].map((item) => (
            <div key={item.step} className={`flex items-center gap-4 rounded-lg border p-4 ${item.color}`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                {item.step}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{item.label}</p>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ルール定義の外部化 */}
        <h2 className="text-xl font-bold text-slate-900">ルール定義の外部化（YAML）</h2>
        <p className="text-slate-600 leading-relaxed">
          イベントの振り分けルールをYAMLファイルで定義します。
          コードを変更せずにルーティングを変更できるのが利点です。
        </p>

        <CodeBlock
          code={`# rules/default.yml

rules:
  - name: "payment-events"
    description: "決済関連イベントを優先処理"
    match:
      type: "payment.*"
    action:
      worker: "priority-worker"
      notify: true
      priority: "high"

  - name: "user-events"
    description: "ユーザー操作イベントを標準処理"
    match:
      type: "user.*"
    action:
      worker: "default-worker"
      notify: true
      priority: "normal"

  - name: "system-events"
    description: "システムイベントをログのみ"
    match:
      type: "system.*"
    action:
      worker: "default-worker"
      notify: false
      priority: "low"

# マッチしなかった場合のデフォルト
default:
  worker: "default-worker"
  notify: true
  priority: "normal"`}
          language="yaml"
          filename="rules/default.yml"
        />

        <Callout type="tip">
          ルール定義をYAMLにする理由は「非エンジニアでも読み書きできる」からです。
          運用担当者がルーティングを変更する場面を想定しています。
        </Callout>

        {/* ルール読み込み */}
        <h2 className="text-xl font-bold text-slate-900">ルール読み込みの実装</h2>
        <p className="text-slate-600 leading-relaxed">
          YAMLファイルを読み込み、TypeScriptの型付きオブジェクトに変換する処理です。
        </p>

        <CodeBlock
          code={`// src/orchestrator/rules.ts

import { readFileSync } from "node:fs";
import { parse } from "yaml";

export interface RoutingRule {
  name: string;
  description: string;
  match: {
    type: string;
    provider?: string;
  };
  action: {
    worker: string;
    notify: boolean;
    priority: "high" | "normal" | "low";
  };
}

export interface RoutingConfig {
  rules: RoutingRule[];
  default: {
    worker: string;
    notify: boolean;
    priority: "high" | "normal" | "low";
  };
}

/**
 * ルール定義ファイルを読み込む
 * アプリ起動時に1回読み込み、メモリにキャッシュする
 */
export function loadRoutingRules(filePath: string): RoutingConfig {
  const content = readFileSync(filePath, "utf-8");
  const config = parse(content) as RoutingConfig;

  if (!config.rules || !Array.isArray(config.rules)) {
    throw new Error("Invalid routing config: 'rules' must be an array");
  }

  if (!config.default) {
    throw new Error("Invalid routing config: 'default' is required");
  }

  return config;
}

/**
 * イベントの type にマッチするルールを検索
 * ワイルドカード（*）をサポート
 */
export function findMatchingRule(
  config: RoutingConfig,
  eventType: string,
  eventProvider?: string
): RoutingRule | null {
  for (const rule of config.rules) {
    // type のワイルドカードマッチ
    const pattern = rule.match.type.replace("*", ".*");
    const regex = new RegExp(\`^\${pattern}$\`);

    if (!regex.test(eventType)) {
      continue;
    }

    // provider が指定されていればそれもチェック
    if (rule.match.provider && rule.match.provider !== eventProvider) {
      continue;
    }

    return rule;
  }

  return null;
}`}
          language="typescript"
          filename="src/orchestrator/rules.ts"
        />

        {/* Orchestrator メインロジック */}
        <h2 className="text-xl font-bold text-slate-900">Orchestrator メインロジック</h2>
        <p className="text-slate-600 leading-relaxed">
          ルール照合→Worker選択→結果集約を行うOrchestratorの本体です。
          agent-orchestrator のチェーン制御パターンを参考にしています。
        </p>

        <CodeBlock
          code={`// src/orchestrator/router.ts

import type { EOSEvent, ProcessingResult, ActionResult } from "../types/event";
import {
  type RoutingConfig,
  type RoutingRule,
  findMatchingRule,
} from "./rules";

export interface OrchestratorDeps {
  config: RoutingConfig;
  notifier: { send(message: Record<string, unknown>): Promise<{ success: boolean }> };
  checkIdempotency: (eventId: string) => Promise<boolean>;
  recordEvent: (event: EOSEvent, result: ProcessingResult) => Promise<void>;
}

export class EventOrchestrator {
  private readonly deps: OrchestratorDeps;

  constructor(deps: OrchestratorDeps) {
    this.deps = deps;
  }

  /**
   * イベントを処理するメインパイプライン
   */
  async process(event: EOSEvent): Promise<ProcessingResult> {
    const startTime = Date.now();

    // Step 1: 冪等性チェック
    const isDuplicate = await this.deps.checkIdempotency(event.event_id);
    if (isDuplicate) {
      return {
        event_id: event.event_id,
        status: "skipped",
        actions: [],
        processed_at: new Date().toISOString(),
        duration_ms: Date.now() - startTime,
      };
    }

    // Step 2: ルール照合
    const rule = findMatchingRule(
      this.deps.config,
      event.type,
      event.provider
    );

    const shouldNotify =
      rule?.action.notify ?? this.deps.config.default.notify;

    // Step 3: 処理実行
    const actions: ActionResult[] = [];
    let overallStatus: "success" | "failure" = "success";

    try {
      // ルールに基づいた処理を実行
      actions.push({
        action: \`process_\${event.type}\`,
        status: "success",
        detail: \`Event \${event.type} processed\`,
      });
    } catch (error) {
      overallStatus = "failure";
      actions.push({
        action: \`process_\${event.type}\`,
        status: "failure",
        detail: error instanceof Error ? error.message : "Unknown error",
      });
    }

    // Step 4: 結果集約
    const result: ProcessingResult = {
      event_id: event.event_id,
      status: overallStatus,
      actions,
      processed_at: new Date().toISOString(),
      duration_ms: Date.now() - startTime,
    };

    // Step 5: 通知 + 永続化
    if (shouldNotify) {
      await this.deps.notifier.send({
        status: overallStatus === "success" ? "success" : "failure",
        title: \`\${event.type} - \${overallStatus === "success" ? "成功" : "失敗"}\`,
        body: actions.map(a => a.detail).join(", "),
        event_id: event.event_id,
        provider: event.provider,
        timestamp: event.received_at,
      });
    }

    await this.deps.recordEvent(event, result);

    return result;
  }
}`}
          language="typescript"
          filename="src/orchestrator/router.ts"
        />

        {/* 処理ロジックの拡張例 */}
        <h2 className="text-xl font-bold text-slate-900">処理ロジックの拡張例</h2>
        <p className="text-slate-600 leading-relaxed">
          ルール定義で指定された処理を router.ts 内で分岐して実行します。
          イベントの種類に応じて異なるアクションを実行する例です。
        </p>

        <CodeBlock
          code={`// src/orchestrator/router.ts 内の処理分岐例

// ルールに基づいてイベント種別ごとの処理を分岐
function processEvent(event: EOSEvent, rule: RoutingRule | null): ActionResult {
  const priority = rule?.action.priority ?? "normal";

  if (priority === "high") {
    // 優先度の高いイベント（決済など）
    console.log(\`[Router] High-priority processing: \${event.type}\`);
    return {
      action: \`priority_process_\${event.type}\`,
      status: "success",
      detail: \`High-priority event \${event.type} processed\`,
    };
  }

  // 標準処理
  console.log(\`[Router] Default processing: \${event.type}\`);
  return {
    action: \`default_process_\${event.type}\`,
    status: "success",
    detail: \`Event \${event.type} processed\`,
  };
}`}
          language="typescript"
          filename="src/orchestrator/router.ts（処理分岐部分）"
        />

        {/* 結果の標準化 */}
        <h2 className="text-xl font-bold text-slate-900">実行結果の標準化</h2>
        <p className="text-slate-600 leading-relaxed">
          すべての処理は ProcessingResult 型で結果を返します。
          これにより、Orchestrator は処理の詳細を知らなくても結果を統一的に扱えます。
        </p>

        <CodeBlock
          code={`// 実行結果のフロー

Router.process(event)
  ↓ ProcessingResult を返す
  ↓ status に応じて通知先を決定
Notifier.send(message)
  ↓ 成功/失敗/警告のメッセージ
Reliability.record(event, result)
  ↓ 冪等性キー記録 + イベントログ

// ProcessingResult の構造
{
  event_id: string;                        // イベントID
  status: "success" | "failure" | "skipped"; // 処理ステータス
  actions: ActionResult[];                  // 実行されたアクション
  processed_at: string;                    // 処理完了時刻
  duration_ms: number;                     // 処理時間（ミリ秒）
}`}
          language="text"
          filename="結果標準化フロー"
        />

        <Callout type="info">
          Orchestrator は「指揮者」です。自分では業務ロジックを持たず、
          ルールに基づいて処理を振り分け、結果を集約するだけです。
          この分離が、テストのしやすさと拡張性を生みます。
        </Callout>

        {/* 実践 */}
        <h2 className="text-xl font-bold text-slate-900">実践: Claude Code に Orchestrator を実装させる</h2>
        <p className="text-slate-600 leading-relaxed">
          ここまでの設計を Claude Code に伝えて、Orchestrator の実装を依頼しましょう。
        </p>

        <CodeBlock
          code={`# Claude Code への指示例

"Orchestrator を実装してください:

1. rules/default.yml - 3つ以上のルーティングルール
2. src/orchestrator/router.ts - メインパイプライン
   - 冪等性チェック → ルール照合 → 処理実行 → 通知 → 永続化
   - イベント種別ごとの処理分岐

要件:
- ルール定義は YAML（rules/default.yml）で外部化
- ワイルドカードマッチをサポート
- ProcessingResult 型で結果を返す（event_id, status, actions, processed_at, duration_ms）
- エラー時も結果を記録する"`}
          language="text"
          filename="Claude Code への指示"
        />

        <Callout type="tip">
          実装後、src/index.ts を更新して Adapter → Orchestrator → Notifier が
          一連のパイプラインとして接続されていることを確認してください。
        </Callout>
      </StepLayout>
    </div>
  );
}
