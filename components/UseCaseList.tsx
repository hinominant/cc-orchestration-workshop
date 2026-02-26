const useCases = [
  {
    id: "UC1",
    title: "Webhook受信とイベント正規化",
    description:
      "外部プロバイダーからのWebhookを受信し、共通イベントスキーマへ正規化してパイプラインに流す。",
    priority: "MUST" as const,
  },
  {
    id: "UC2",
    title: "ルールベースのイベント振り分け",
    description:
      "イベントの種類・優先度に応じて2つ以上の処理パスへルーティングする。",
    priority: "MUST" as const,
  },
  {
    id: "UC3",
    title: "Slack通知",
    description:
      "処理結果（成功/失敗）をSlackチャンネルへステータス付きで通知する。",
    priority: "MUST" as const,
  },
  {
    id: "UC4",
    title: "冪等性保証",
    description:
      "同一event_idのイベントが複数回到着しても、処理は1回だけ実行される。",
    priority: "MUST" as const,
  },
  {
    id: "UC5",
    title: "リトライとDead Letter Queue",
    description:
      "一時的な障害時に指数バックオフでリトライし、上限超過時はDLQへ退避する。",
    priority: "SHOULD" as const,
  },
  {
    id: "UC6",
    title: "構造化ログとメトリクス出力",
    description:
      "JSON構造化ログと処理件数・レイテンシ等のメトリクスを出力し、観測可能にする。",
    priority: "SHOULD" as const,
  },
];

function PriorityBadge({ priority }: { priority: "MUST" | "SHOULD" }) {
  if (priority === "MUST") {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
        MUST
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
      SHOULD
    </span>
  );
}

export function UseCaseList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {useCases.map((uc) => (
        <div
          key={uc.id}
          className="rounded-xl border border-slate-200 p-5 transition-colors hover:border-amber-300"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-xs font-bold text-amber-700">
              {uc.id}
            </span>
            <PriorityBadge priority={uc.priority} />
          </div>
          <h3 className="font-semibold text-slate-900">{uc.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
            {uc.description}
          </p>
        </div>
      ))}
    </div>
  );
}
