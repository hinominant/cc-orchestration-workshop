const axes = [
  {
    id: "requirements",
    label: "要求定義",
    weight: "30%",
    criteria: {
      pass: "Luna標準フォーマットに沿った要求定義書がある。ゴール・非ゴール・MUST/SHOULDが書かれている",
      good: "AIと相談しながら要求定義を磨き上げ、制約条件と受入条件が具体的に書かれている",
      excellent:
        "非機能要件まで網羅し、要求定義書だけ読めば何を作るか誰でも理解できる",
    },
  },
  {
    id: "organization",
    label: "組織設計",
    weight: "20%",
    criteria: {
      pass: "エージェントチームに監査役（Sentinel）が含まれている。テスト2回+外部監査のルールがある",
      good: "各エージェントの役割分担が明確で、CLAUDE.mdにチーム方針が書かれている",
      excellent:
        "チーム構成の「なぜ」を説明でき、別の題材でもチームを設計できる",
    },
  },
  {
    id: "completion",
    label: "完成度",
    weight: "30%",
    criteria: {
      pass: "サービスが起動し、基本的な動作（配信リスト管理→テンプレート管理→一括配信）ができる。テストが通る",
      good: "テスト2回実行+外部監査をパスしている。エラー時の挙動も確認済み",
      excellent:
        "配信エラーハンドリングやバリデーション強化まで実装されている",
    },
  },
  {
    id: "presentation",
    label: "発表・説明",
    weight: "20%",
    criteria: {
      pass: "要求定義→組織設計→完成物の流れを1分で説明できる",
      good: "「なぜその組織設計にしたか」「なぜ監査が必要か」を説明できる",
      excellent:
        "質問（例: エージェントを追加するなら？）に具体的に回答できる",
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
            評価ルーブリック（4軸）
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
