const components = [
  {
    id: "ingress",
    label: "Ingress",
    description: "Webhook受信・署名検証・正規化",
    color: "bg-blue-100 border-blue-300 text-blue-800",
    iconColor: "bg-blue-500",
  },
  {
    id: "orchestrator",
    label: "Orchestrator",
    description: "ルールベース振り分け・チェーン制御",
    color: "bg-amber-100 border-amber-300 text-amber-800",
    iconColor: "bg-amber-500",
  },
  {
    id: "workers",
    label: "Workers",
    description: "業務ロジック実行・agent-orchestrator連携",
    color: "bg-purple-100 border-purple-300 text-purple-800",
    iconColor: "bg-purple-500",
  },
  {
    id: "notifier",
    label: "Notifier",
    description: "Slack通知・メール送信・外部API呼び出し",
    color: "bg-green-100 border-green-300 text-green-800",
    iconColor: "bg-green-500",
  },
  {
    id: "storage",
    label: "Storage",
    description: "イベントログ・冪等性キー・DLQ",
    color: "bg-slate-100 border-slate-300 text-slate-800",
    iconColor: "bg-slate-500",
  },
];

function Arrow() {
  return (
    <div className="flex justify-center py-1">
      <svg
        className="h-6 w-6 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
        />
      </svg>
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <div className="my-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-slate-500">
          EOS コンポーネント構成図
        </h3>

        {/* External source */}
        <div className="mb-2 flex justify-center">
          <div className="rounded-lg border-2 border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500">
            外部プロバイダー（Webhook送信元）
          </div>
        </div>

        <Arrow />

        {/* Components */}
        <div className="space-y-2">
          {components.map((comp, i) => (
            <div key={comp.id}>
              <div
                className={`flex items-center gap-4 rounded-lg border p-4 ${comp.color}`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white ${comp.iconColor}`}
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold">{comp.label}</p>
                  <p className="text-sm opacity-80">{comp.description}</p>
                </div>
              </div>
              {i < components.length - 1 && <Arrow />}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            データフロー
          </p>
          <ol className="space-y-1 text-sm text-slate-600">
            <li>1. 外部プロバイダーが Webhook を Ingress に送信</li>
            <li>2. Ingress が署名検証・正規化し Orchestrator へ転送</li>
            <li>3. Orchestrator がルールに基づき適切な Worker を選択</li>
            <li>4. Worker が処理を実行し結果を Notifier へ渡す</li>
            <li>5. 全ステップのログを Storage に永続化</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
