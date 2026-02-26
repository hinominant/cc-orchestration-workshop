export function RequirementsTemplate() {
  const sections = [
    {
      emoji: "1",
      title: "プロジェクト概要",
      description: "プロジェクト名・目的・背景・期待成果をまとめる",
      example:
        "目的: 配信リストの管理からメール一括送信までを効率化するシステムを作る\n背景: 現状、メール配信をExcelの宛先リストとメーラーで手作業で行っている\n期待成果: 配信リスト管理→テンプレート作成→一括配信が一つのシステムで完結する",
    },
    {
      emoji: "2",
      title: "ゴール / 非ゴール",
      description: "やること・やらないことを明確に線引き",
      example:
        "ゴール: 配信リスト管理、メールテンプレート管理、一括配信実行\n非ゴール: リアルタイム開封トラッキング、A/Bテスト、マーケティング分析ダッシュボード",
    },
    {
      emoji: "3",
      title: "要求（やりたいこと）",
      description: "「〜したい」「〜を改善したい」で書く。機能ではなく目的ベース",
      example:
        "・メール配信先のリストを作成・編集したい（★★★）\n・メールのテンプレート（件名＋本文）を管理したい（★★★）\n・テンプレート×リストで一括配信したい（★★★）\n・配信履歴を確認したい（★★☆）",
    },
    {
      emoji: "4",
      title: "MUST / SHOULD",
      description: "必須要件と、あれば嬉しい要件を分ける",
      example:
        "MUST: 配信リストCRUD、テンプレートCRUD、一括配信実行、メールアドレス形式バリデーション\nSHOULD: 配信履歴一覧、テスト送信（自分宛に1通だけ送る）、配信予約",
    },
    {
      emoji: "5",
      title: "制約・前提",
      description: "技術制約、予算、期限、既存システムとの関係",
      example:
        "・Hono + TypeScript で実装\n・本番のメールサーバーは使わない（ローカル開発はコンソール出力で代替）\n・配信先データはJSONファイルまたはインメモリで管理",
    },
    {
      emoji: "6",
      title: "非機能要件",
      description: "パフォーマンス・セキュリティ・可用性の基準",
      example:
        "セキュリティ: APIキーは環境変数経由、配信リストのバリデーション\n信頼性: 配信失敗時のエラーハンドリング\n観測性: 配信結果のログ出力",
    },
    {
      emoji: "7",
      title: "受入条件",
      description: "「これができたら完了」の基準をチェックリストで",
      example:
        "□ 配信リストを作成・編集・削除できる\n□ メールテンプレートを作成・編集・削除できる\n□ テンプレート×リストで一括配信できる\n□ テストが全件パスする\n□ 要求定義→組織設計→完成物を説明できる",
    },
  ];

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div
          key={section.title}
          className="rounded-lg border border-slate-200 p-4"
        >
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
              {section.emoji}
            </span>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">{section.title}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {section.description}
              </p>
              <div className="mt-3 rounded-md bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-400">記入例</p>
                <p className="mt-1 whitespace-pre-line text-sm text-slate-600">
                  {section.example}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
