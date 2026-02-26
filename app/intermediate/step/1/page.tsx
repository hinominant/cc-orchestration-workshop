import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { UseCaseList } from "@/components/UseCaseList";
import { RequirementsTemplate } from "@/components/RequirementsTemplate";

export default function IntermediateStep1Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={1}
        title="要求定義を書く"
        duration="20分"
        prevStep={0}
        nextStep={2}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          中級編の本丸はここです。いきなりコードを書くのではなく、まず「何を作るのか」を言語化します。
          要求定義書は設計・実装・テスト・運用すべての判断基準になる、プロジェクトの土台です。
        </p>

        <Callout type="info">
          「要求定義って面倒では？」と思うかもしれません。
          しかし、AIエージェントに仕事を任せるとき、曖昧な指示は曖昧な成果物を生みます。
          要求定義書は「AIへの最高の指示書」です。
        </Callout>

        {/* テンプレート */}
        <h2 className="text-xl font-bold text-slate-900">要求定義書テンプレート</h2>
        <p className="text-slate-600 leading-relaxed">
          EOSの要求定義書は以下の8セクションで構成します。
          各セクションの役割と記述例を確認してから、自分の言葉で書いてみましょう。
        </p>

        <RequirementsTemplate />

        <Callout type="tip">
          完璧に書く必要はありません。まず埋めてみて、設計・実装のフェーズで修正していくのが自然な進め方です。
          「書いてみたら矛盾に気づいた」も大事な学びです。
        </Callout>

        {/* ユースケース詳細 */}
        <h2 className="text-xl font-bold text-slate-900">ユースケース一覧</h2>
        <p className="text-slate-600 leading-relaxed">
          EOSでは6つのユースケースを定義しています。
          UC1-UC4が必須（MUST）、UC5-UC6は推奨（SHOULD）です。
        </p>

        <UseCaseList />

        {/* UC1-UC4 詳細ガイド */}
        <h2 className="text-xl font-bold text-slate-900">MUST ユースケースの書き方ガイド</h2>

        <div className="space-y-6">
          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="mb-2 font-semibold text-slate-900">UC1: Webhook受信とイベント正規化</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              外部プロバイダーからのHTTP POSTを受け取り、署名を検証し、共通スキーマに変換する処理です。
              ここを明確にしておくと、プロバイダー追加時の作業が予測可能になります。
            </p>
            <CodeBlock
              code={`// UC1 の要求定義例
ユースケース名: Webhook受信とイベント正規化
アクター: 外部プロバイダーA
事前条件: プロバイダーのWebhook URLが設定済み
主シナリオ:
  1. プロバイダーAがHTTP POSTでWebhookを送信
  2. Ingressが署名を検証（HMAC-SHA256）
  3. タイムスタンプの有効期限を確認（5分以内）
  4. ペイロードを共通イベントスキーマに正規化
  5. 正規化イベントをOrchestratorへ転送
  6. HTTPステータス200を返却
代替シナリオ:
  2a. 署名検証失敗 → 401を返却、ログに記録
  3a. タイムスタンプ期限切れ → 403を返却
事後条件: イベントがパイプラインに投入されている`}
              language="text"
              filename="UC1の記述例"
            />
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="mb-2 font-semibold text-slate-900">UC2: ルールベースのイベント振り分け</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              イベントの種類や優先度に応じて処理パスを分岐させます。
              ルールは外部ファイル（YAML/JSON）で定義し、コード変更なしに振り分けを変更可能にします。
            </p>
            <CodeBlock
              code={`// UC2 の要求定義例
ユースケース名: ルールベースのイベント振り分け
アクター: Orchestrator（内部）
事前条件: 正規化イベントがOrchestratorに到着
主シナリオ:
  1. イベントのtype/priorityを参照
  2. ルール定義ファイルと照合
  3. マッチしたルールに従いWorkerを選択
  4. 選択されたWorkerにイベントを転送
代替シナリオ:
  2a. マッチするルールなし → デフォルトWorkerへ
  2b. ルール定義ファイルが読めない → エラーログ出力、処理停止
事後条件: イベントが適切なWorkerに到達している`}
              language="text"
              filename="UC2の記述例"
            />
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="mb-2 font-semibold text-slate-900">UC3: Slack通知</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              処理結果をSlackチャンネルへ通知します。
              成功/失敗の判別ができるメッセージフォーマットを定義しましょう。
            </p>
            <CodeBlock
              code={`// UC3 の要求定義例
ユースケース名: Slack通知
アクター: Notifier（内部）
事前条件: Workerから処理結果を受信
主シナリオ:
  1. 処理結果（成功/失敗/警告）を受信
  2. ステータスに応じたメッセージをフォーマット
  3. Slack Webhook URLへHTTP POSTで送信
  4. 送信結果をログに記録
代替シナリオ:
  3a. Slack送信失敗 → 3回リトライ後、エラーログ出力
事後条件: Slackチャンネルに通知メッセージが表示されている`}
              language="text"
              filename="UC3の記述例"
            />
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="mb-2 font-semibold text-slate-900">UC4: 冪等性保証</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              同じイベントが2回以上到着しても、処理は1回だけ実行されることを保証します。
              Webhookは通信障害時に再送されることがあるため、これは必須の要件です。
            </p>
            <CodeBlock
              code={`// UC4 の要求定義例
ユースケース名: 冪等性保証
アクター: Storage（内部）
事前条件: イベントがIngressに到着
主シナリオ:
  1. event_idでStorageを検索
  2. 未処理の場合: 処理を実行し、event_idを記録
  3. 処理済みの場合: 既存の結果を返却（再処理しない）
代替シナリオ:
  1a. event_idが存在しない → バリデーションエラー
事後条件: 同一event_idに対する処理は1回のみ実行されている`}
              language="text"
              filename="UC4の記述例"
            />
          </div>
        </div>

        {/* SHOULD ユースケース概要 */}
        <h2 className="text-xl font-bold text-slate-900">SHOULD ユースケース（概要）</h2>
        <p className="text-slate-600 leading-relaxed">
          UC5（リトライとDLQ）とUC6（構造化ログとメトリクス）は推奨機能です。
          時間に余裕がある場合に取り組みます。詳細はSTEP 5とSTEP 6で扱います。
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">UC5: リトライとDLQ</h3>
            <p className="mt-1 text-sm text-slate-600">
              一時的な障害で処理が失敗した場合、指数バックオフでリトライします。
              上限回数を超えた場合はDead Letter Queue（DLQ）に退避し、手動対応できるようにします。
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">UC6: 構造化ログとメトリクス</h3>
            <p className="mt-1 text-sm text-slate-600">
              JSON形式の構造化ログを出力し、処理件数やレイテンシなどのメトリクスを計測します。
              障害調査や性能改善の基盤になります。
            </p>
          </div>
        </div>

        {/* 非機能要件チェックリスト */}
        <h2 className="text-xl font-bold text-slate-900">非機能要件チェックリスト</h2>
        <p className="text-slate-600 leading-relaxed">
          要求定義書には「何をするか」だけでなく「どれくらいの品質で」を定義する非機能要件が必要です。
          以下の項目を参考に、最低3つは定義してください。
        </p>

        <div className="space-y-2">
          {[
            {
              category: "パフォーマンス",
              items: [
                "Webhook受信からWorker実行完了まで3秒以内",
                "同時10リクエストを処理可能",
              ],
            },
            {
              category: "可用性",
              items: [
                "想定稼働率: 99.5%",
                "計画メンテナンス時のダウンタイム手順を定義",
              ],
            },
            {
              category: "セキュリティ",
              items: [
                "すべてのシークレットは環境変数経由",
                "Webhook署名検証を必須化",
                "PII（個人情報）をログに出力しない",
              ],
            },
            {
              category: "運用性",
              items: [
                "構造化ログ（JSON）で出力",
                "エラー率閾値超過時にアラート発火",
                "DLQの手動リトライ手順を文書化",
              ],
            },
          ].map((group) => (
            <div
              key={group.category}
              className="rounded-lg border border-slate-200 p-4"
            >
              <h3 className="mb-2 font-semibold text-slate-900">
                {group.category}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Callout type="tip">
          要求定義書が書けたら、次のSTEPで設計に進みます。
          要求定義書はこの後もずっと参照するので、docs/requirements.md として保存しておきましょう。
        </Callout>

        {/* 実践 */}
        <h2 className="text-xl font-bold text-slate-900">実践: Claude Codeで要求定義書を生成する</h2>
        <p className="text-slate-600 leading-relaxed">
          テンプレートと例を参考に、Claude Codeに要求定義書の下書きを依頼しましょう。
          自分の言葉で修正・加筆するのがポイントです。
        </p>

        <CodeBlock
          code={`# Claude Code 内で実行
"EOSの要求定義書を docs/requirements.md に作成してください。
テンプレート（目的/スコープ/UC/データ設計/外部IF/非機能/運用/DoD）に従い、
UC1-UC4はMUST、UC5-UC6はSHOULDとして記述してください。"`}
          language="text"
          filename="Claude Codeへの指示例"
        />

        <Callout type="warning">
          AIが生成した要求定義書はあくまで「下書き」です。
          自分のプロジェクトに合わせて必ず修正してください。
          「AIが書いたから正しい」とは限りません。
        </Callout>
      </StepLayout>
    </div>
  );
}
