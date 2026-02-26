const roles = [
  {
    id: "you",
    label: "あなた",
    role: "プロジェクトオーナー",
    description: "要求定義を作り、方向を決める。コードは書かない",
    color: "bg-amber-100 border-amber-300 text-amber-800",
    iconColor: "bg-amber-500",
    icon: "PO",
  },
  {
    id: "sherpa",
    label: "Sherpa",
    role: "計画・タスク分解",
    description: "要求定義を読み、実装計画を立てて作業を分解する",
    color: "bg-blue-100 border-blue-300 text-blue-800",
    iconColor: "bg-blue-500",
    icon: "計画",
  },
  {
    id: "builder",
    label: "Builder / Artisan",
    role: "実装チーム",
    description: "計画に沿ってコードを書く。バックエンド・フロントエンド両対応",
    color: "bg-purple-100 border-purple-300 text-purple-800",
    iconColor: "bg-purple-500",
    icon: "実装",
  },
  {
    id: "radar",
    label: "Radar",
    role: "テスト（2回実行）",
    description: "テストを2回実行して安定性を確認。不安定なテストも検出する",
    color: "bg-green-100 border-green-300 text-green-800",
    iconColor: "bg-green-500",
    icon: "検証",
  },
  {
    id: "sentinel",
    label: "Sentinel（監査役）",
    role: "外部監査 ← 必須",
    description:
      "セキュリティ・設計整合性・エッジケースを第三者視点でチェック",
    color: "bg-red-100 border-red-300 text-red-800",
    iconColor: "bg-red-500",
    icon: "監査",
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
          エージェントチーム 組織図
        </h3>

        {/* Roles */}
        <div className="space-y-2">
          {roles.map((role, i) => (
            <div key={role.id}>
              <div
                className={`flex items-center gap-4 rounded-lg border p-4 ${role.color}`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${role.iconColor}`}
                >
                  {role.icon}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{role.label}</p>
                    <span className="rounded-full bg-white/50 px-2 py-0.5 text-xs font-medium">
                      {role.role}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm opacity-80">
                    {role.description}
                  </p>
                </div>
              </div>
              {i < roles.length - 1 && <Arrow />}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
            品質ゲート（必須条件）
          </p>
          <ul className="space-y-1 text-sm text-slate-600">
            <li>1. テストを最低2回実行して安定性を確認する</li>
            <li>2. 外部監査（Sentinel）で第三者チェックを通す</li>
            <li>3. 両方パスしないと「完了」にしない</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
