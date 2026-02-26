const sections = [
  {
    id: "purpose",
    label: "目的",
    description: "このサービスが解決する課題と達成したいゴール",
    example:
      "複数プロバイダーからのイベントを統一的に処理し、適切なアクションを自動実行する",
  },
  {
    id: "scope",
    label: "スコープ",
    description: "対象範囲と対象外の境界を明確にする",
    example: "対象: Webhook受信・ルーティング・通知 / 対象外: UI、認証基盤",
  },
  {
    id: "usecase",
    label: "ユースケース（UC）",
    description: "UC1-UC4（MUST）+ UC5-UC6（SHOULD）の具体的なシナリオ",
    example: "UC1: プロバイダーAからWebhookを受信 → 正規化 → パイプライン投入",
  },
  {
    id: "data",
    label: "データ設計",
    description: "イベントスキーマ・保存するデータの構造",
    example:
      "共通イベント: { event_id, provider, type, payload, timestamp, status }",
  },
  {
    id: "external",
    label: "外部インターフェース",
    description: "連携先の一覧（プロバイダー、通知先、ストレージ）",
    example: "IN: Provider A Webhook / OUT: Slack Webhook, ログストレージ",
  },
  {
    id: "nonfunctional",
    label: "非機能要件",
    description: "パフォーマンス・可用性・セキュリティ等の品質要件",
    example:
      "レイテンシ < 3秒 / 可用性 99.5% / シークレット外部管理 / 冪等性保証",
  },
  {
    id: "operations",
    label: "運用設計",
    description: "監視・アラート・インシデント対応の方針",
    example:
      "構造化ログ出力 / 失敗率5%超でSlackアラート / DLQ手動リトライ手順",
  },
  {
    id: "dod",
    label: "完了定義（DoD）",
    description: "「完成」と判断するための具体的な基準",
    example:
      "全UCのE2Eテスト通過 / 非機能要件チェックリスト全項目OK / レビュー合格",
  },
];

export function RequirementsTemplate() {
  return (
    <div className="my-6">
      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="font-semibold text-slate-900">
            要求定義書テンプレート
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            以下の8セクションを順に埋めていくことで、要求定義書が完成します
          </p>
        </div>
        <div className="divide-y divide-slate-100">
          {sections.map((section, i) => (
            <div key={section.id} className="px-6 py-4">
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">
                    {section.label}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-600">
                    {section.description}
                  </p>
                  <div className="mt-2 rounded-md bg-slate-50 px-3 py-2">
                    <p className="text-xs font-medium text-slate-500">
                      記述例:
                    </p>
                    <p className="mt-0.5 text-sm text-slate-700">
                      {section.example}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
