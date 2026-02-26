const axes = [
  {
    id: "requirements",
    label: "要求定義",
    weight: "20%",
    criteria: {
      pass: "UC1-UC4が具体的に記述され、非機能要件が3項目以上定義されている",
      good: "UC5-UC6も記述され、DoD（完了定義）が定量的",
      excellent:
        "運用設計まで含め、要求間のトレーサビリティが取れている",
    },
  },
  {
    id: "architecture",
    label: "設計",
    weight: "20%",
    criteria: {
      pass: "5コンポーネントの責務が分離され、データフローが説明できる",
      good: "拡張ポイント（新プロバイダー追加等）が設計に組み込まれている",
      excellent:
        "障害シナリオ（コンポーネント障害時の振る舞い）まで設計されている",
    },
  },
  {
    id: "implementation",
    label: "実装",
    weight: "30%",
    criteria: {
      pass: "UC1-UC4が動作し、ルール定義が外部ファイル化されている",
      good: "冪等性・リトライ・DLQが実装されている",
      excellent:
        "構造化ログ・メトリクス・アラートまで実装されている",
    },
  },
  {
    id: "operations",
    label: "運用品質",
    weight: "20%",
    criteria: {
      pass: "構造化ログが出力され、シークレットが安全に管理されている",
      good: "アラートポリシーが定義され、インシデント手順がREADMEに記載",
      excellent:
        "環境分離（dev/stg/prod）とPII マスキングが実装されている",
    },
  },
  {
    id: "presentation",
    label: "発表・説明",
    weight: "10%",
    criteria: {
      pass: "要求定義→設計→運用の流れを説明できる",
      good: "設計判断の理由（なぜその構成にしたか）を説明できる",
      excellent:
        "口頭質問（プロバイダー追加時の影響範囲等）に具体的に回答できる",
    },
  },
];

const levelColors = {
  pass: "bg-green-50 border-green-200 text-green-700",
  good: "bg-blue-50 border-blue-200 text-blue-700",
  excellent: "bg-purple-50 border-purple-200 text-purple-700",
};

const levelLabels = {
  pass: "合格",
  good: "良",
  excellent: "優秀",
};

export function Rubric() {
  return (
    <div className="my-6">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="font-semibold text-slate-900">
            評価ルーブリック（5軸）
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            各軸で「合格」以上を満たすことが修了条件です
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {axes.map((axis) => (
            <div key={axis.id} className="px-6 py-5">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-semibold text-slate-900">{axis.label}</h4>
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                  配点 {axis.weight}
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {(
                  Object.entries(axis.criteria) as [
                    keyof typeof levelColors,
                    string,
                  ][]
                ).map(([level, text]) => (
                  <div
                    key={level}
                    className={`rounded-lg border p-3 ${levelColors[level]}`}
                  >
                    <p className="mb-1 text-xs font-bold uppercase">
                      {levelLabels[level]}
                    </p>
                    <p className="text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
