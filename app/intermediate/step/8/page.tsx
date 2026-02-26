import { StepLayout } from "@/components/StepLayout";
import { Callout } from "@/components/Callout";
import { Rubric } from "@/components/Rubric";

export default function IntermediateStep8Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={8}
        title="発表/レビュー"
        duration="20分"
        prevStep={7}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 p-6 sm:p-8">
          <p className="text-center text-2xl font-bold text-slate-800 sm:text-3xl">
            おめでとうございます
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            要求定義から設計・実装・運用設計まで、一気通貫でサービスを構築しました
          </p>
        </div>

        {/* 合格基準 */}
        <h2 className="text-xl font-bold text-slate-900">合格基準</h2>
        <p className="text-slate-600 leading-relaxed">
          中級編の修了条件は「要求定義→設計→運用」の流れを説明できることです。
          コードの完成度だけでなく、「なぜその判断をしたか」を言語化できることが重要です。
        </p>

        <div className="my-6 space-y-3">
          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
            <h3 className="font-semibold text-green-800">説明できること</h3>
            <ul className="mt-2 space-y-2 text-sm text-green-700">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">1</span>
                EOSが何をするサービスか（1分以内で説明）
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">2</span>
                5つのコンポーネントとそれぞれの責務
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">3</span>
                冪等性・リトライ・DLQがなぜ必要か
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">4</span>
                障害が発生したときの対応手順
              </li>
            </ul>
          </div>
        </div>

        {/* 口頭質問例 */}
        <h2 className="text-xl font-bold text-slate-900">口頭質問の例</h2>
        <p className="text-slate-600 leading-relaxed">
          発表後、講師やレビュアーから以下のような質問が想定されます。
          答えを準備しておきましょう。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900">
              Q: プロバイダーを1個追加するなら、どこを触りますか？
            </h3>
            <div className="mt-3 rounded-md bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-500">回答のポイント:</p>
              <p className="mt-1 text-sm text-slate-700">
                src/adapters/ に新しいアダプターファイルを追加し、IngressAdapter を実装する。
                src/index.ts にエンドポイントを追加する。
                Orchestrator や Worker は変更不要。
                ルール定義（rules/routing.yaml）に新プロバイダー用のルールを追加する。
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900">
              Q: なぜ署名検証に timingSafeEqual を使うのですか？
            </h3>
            <div className="mt-3 rounded-md bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-500">回答のポイント:</p>
              <p className="mt-1 text-sm text-slate-700">
                通常の文字列比較（===）は、不一致が見つかった時点で処理を終了するため、
                比較にかかる時間から正しい文字列の長さや一致部分を推測できる（タイミング攻撃）。
                timingSafeEqual は常に全文字を比較するため、処理時間から情報が漏洩しない。
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900">
              Q: DLQに溜まったイベントはどう対処しますか？
            </h3>
            <div className="mt-3 rounded-md bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-500">回答のポイント:</p>
              <p className="mt-1 text-sm text-slate-700">
                まず last_error を確認して失敗原因を特定する。
                バグが原因ならコードを修正してからリトライ。
                外部サービス障害が原因なら復旧を待ってリトライ。
                markReprocessed で処理済みマークを付けてDLQから除外する。
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900">
              Q: ルール定義をYAMLにした理由は？
            </h3>
            <div className="mt-3 rounded-md bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-500">回答のポイント:</p>
              <p className="mt-1 text-sm text-slate-700">
                ルーティングの変更はビジネスロジックの変更であり、コード変更を伴うべきではない。
                YAMLなら非エンジニアでも読み書きでき、PRレビューでの差分も見やすい。
                コンパイルやデプロイなしにルーティングを変更できる。
              </p>
            </div>
          </div>
        </div>

        {/* ルーブリック */}
        <h2 className="text-xl font-bold text-slate-900">評価ルーブリック</h2>
        <p className="text-slate-600 leading-relaxed">
          発表は以下の5軸で評価されます。
          各軸で「合格」以上を満たすことが修了条件です。
        </p>

        <Rubric />

        <Callout type="info">
          「優秀」を目指す必要はありません。
          「合格」ラインを確実にクリアすることが大事です。
          ただし、設計判断の「なぜ」を説明できることは「良」以上の基準です。
          日頃から「なぜそうしたか」を意識する習慣をつけましょう。
        </Callout>

        {/* KPT */}
        <h2 className="text-xl font-bold text-slate-900">KPT（振り返り）</h2>
        <p className="text-slate-600 leading-relaxed">
          中級編全体を振り返って、以下の3つの観点で考えてみましょう。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                K
              </span>
              <div>
                <h3 className="font-semibold text-blue-800">
                  Keep（良かったこと）
                </h3>
                <p className="mt-1 text-sm text-blue-600">
                  中級編で「これは良かった」「身についた」と思ったことは何ですか？
                  要求定義の書き方、設計の考え方、信頼性パターンなど。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                P
              </span>
              <div>
                <h3 className="font-semibold text-amber-800">
                  Problem（困ったこと）
                </h3>
                <p className="mt-1 text-sm text-amber-600">
                  難しかったところ、時間がかかったところ、わかりにくかった部分はありますか？
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                T
              </span>
              <div>
                <h3 className="font-semibold text-green-800">
                  Try（次にやりたいこと）
                </h3>
                <p className="mt-1 text-sm text-green-600">
                  中級編の学びを活かして、次に挑戦してみたいことは何ですか？
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 中級編で学んだこと */}
        <h2 className="text-xl font-bold text-slate-900">中級編で学んだこと</h2>

        <div className="space-y-3">
          {[
            {
              step: "STEP 1",
              title: "要求定義",
              description: "「何を作るか」を曖昧さなく言語化する技術。AIへの最高の指示書。",
              color: "bg-amber-50",
              textColor: "text-amber-800",
              subColor: "text-amber-600",
            },
            {
              step: "STEP 2",
              title: "アーキテクチャ設計",
              description: "責務の分離。変更理由が同じものを近くに、異なるものを遠くに。",
              color: "bg-blue-50",
              textColor: "text-blue-800",
              subColor: "text-blue-600",
            },
            {
              step: "STEP 3-4",
              title: "実装",
              description: "Adapterパターンで外部連携を抽象化。ルール外部化で柔軟性を確保。",
              color: "bg-purple-50",
              textColor: "text-purple-800",
              subColor: "text-purple-600",
            },
            {
              step: "STEP 5",
              title: "信頼性",
              description: "冪等性・リトライ・DLQ。障害は起きる前提で設計する。",
              color: "bg-red-50",
              textColor: "text-red-800",
              subColor: "text-red-600",
            },
            {
              step: "STEP 6",
              title: "観測性",
              description: "構造化ログ・メトリクス・アラート。見えないものは改善できない。",
              color: "bg-green-50",
              textColor: "text-green-800",
              subColor: "text-green-600",
            },
            {
              step: "STEP 7",
              title: "セキュリティ・運用",
              description: "シークレット管理・権限分離・PII保護。「動く」と「安全に運用できる」は別。",
              color: "bg-slate-50",
              textColor: "text-slate-800",
              subColor: "text-slate-600",
            },
          ].map((item) => (
            <div key={item.step} className={`flex items-start gap-3 rounded-lg p-4 ${item.color}`}>
              <span className={`mt-0.5 shrink-0 text-xs font-bold ${item.textColor}`}>
                {item.step}
              </span>
              <div>
                <p className={`font-semibold ${item.textColor}`}>{item.title}</p>
                <p className={`mt-1 text-sm ${item.subColor}`}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 次のステップ */}
        <h2 className="text-xl font-bold text-slate-900">次のステップ</h2>
        <p className="text-slate-600 leading-relaxed">
          中級編が完了しました。ここからの学びの方向性を3つ提案します。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                1
              </span>
              <div>
                <h3 className="font-semibold text-slate-800">
                  今回のEOSを発展させる
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  新しいプロバイダーの追加、データベース連携、
                  CI/CDパイプラインの構築など、実際のプロダクトに近づけてみましょう。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-300 text-sm font-bold text-white">
                2
              </span>
              <div>
                <h3 className="font-semibold text-slate-800">
                  上級編（予定）: 分散システムとスケーリング
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  メッセージキュー（Redis/RabbitMQ）、水平スケーリング、
                  分散トレーシング、カナリアデプロイなど。
                </p>
                <span className="mt-2 inline-block rounded-full bg-slate-200 px-3 py-0.5 text-xs font-semibold text-slate-600">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-300 text-sm font-bold text-white">
                3
              </span>
              <div>
                <h3 className="font-semibold text-slate-800">
                  自分の業務にAgent Orchestratorを適用する
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  中級編で学んだ要求定義→設計→実装→運用の流れを、
                  自分の実業務に適用してみましょう。
                </p>
              </div>
            </div>
          </div>
        </div>

        <Callout type="tip">
          中級編で最も重要な学びは「なぜそうするのか」を考える習慣です。
          技術やツールは変わっていきますが、設計の考え方は普遍的です。
          「要求定義→設計→実装→運用」のサイクルを回す力は、どんなプロジェクトでも活かせます。
        </Callout>
      </StepLayout>
    </div>
  );
}
