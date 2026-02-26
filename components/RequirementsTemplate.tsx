export function RequirementsTemplate() {
  const sections = [
    {
      emoji: "1",
      title: "プロジェクト概要",
      description: "プロジェクト名・目的・背景・期待成果をまとめる",
      example:
        "目的: 外部イベントを自動で振り分け・通知する仕組みを作り、手作業を削減する\n背景: 現状、Webhook受信を手動で確認→Slackに転送している\n期待成果: イベント受信→自動振り分け→Slack通知が人手なしで回る",
    },
    {
      emoji: "2",
      title: "ゴール / 非ゴール",
      description: "やること・やらないことを明確に線引き",
      example:
        "ゴール: Webhook受信→ルールベース振り分け→Slack通知\n非ゴール: ダッシュボードUI、複数DB対応、本番インフラ構築",
    },
    {
      emoji: "3",
      title: "要求（やりたいこと）",
      description: "「〜したい」「〜を改善したい」で書く。機能ではなく目的ベース",
      example:
        "・外部サービスからのWebhookを安全に受け取りたい（★★★）\n・イベントの種類に応じて自動で処理を分けたい（★★★）\n・処理結果をSlackにリアルタイム通知したい（★★★）\n・同じイベントが二重処理されないようにしたい（★★☆）",
    },
    {
      emoji: "4",
      title: "MUST / SHOULD",
      description: "必須要件と、あれば嬉しい要件を分ける",
      example:
        "MUST: Webhook受信、署名検証、ルール分岐、Slack通知\nSHOULD: リトライ、失敗イベント隔離、構造化ログ",
    },
    {
      emoji: "5",
      title: "制約・前提",
      description: "技術制約、予算、期限、既存システムとの関係",
      example:
        "・Hono + TypeScript で実装\n・本番DBは使わない（ローカル開発のみ）\n・Slack Webhook URLはテスト用を使用",
    },
    {
      emoji: "6",
      title: "非機能要件",
      description: "パフォーマンス・セキュリティ・可用性の基準",
      example:
        "セキュリティ: HMAC署名検証、秘密情報はenvから読む\n信頼性: 重複排除、リトライ\n観測性: 構造化ログ出力",
    },
    {
      emoji: "7",
      title: "受入条件",
      description: "「これができたら完了」の基準をチェックリストで",
      example:
        "□ Webhookを受信して正しくパースできる\n□ ルールに基づいてイベントが振り分けられる\n□ Slackに通知が届く\n□ テストが全件パスする\n□ 要求定義→設計→運用を説明できる",
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
