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
        {/* お祝いバナー */}
        <div className="rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-6 sm:p-8">
          <p className="text-center text-2xl font-bold text-slate-800 sm:text-3xl">
            おめでとうございます
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            要求定義から組織設計、開発、品質担保まで、一気通貫でサービスを構築しました
          </p>
        </div>

        {/* 合格基準 */}
        <h2 className="text-xl font-bold text-slate-900">合格基準</h2>
        <p className="text-slate-600 leading-relaxed">
          「要求定義 → 組織設計 → 完成物」の流れを説明できることが修了条件です。
          コードの完成度ではなく、「なぜそう決めたか」を言語化できることが重要です。
        </p>

        <div className="my-6 rounded-lg border-2 border-green-200 bg-green-50 p-5">
          <h3 className="font-semibold text-green-800">説明できること</h3>
          <ul className="mt-3 space-y-3 text-sm text-green-700">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">1</span>
              <div>
                <p className="font-medium">何を作ったか</p>
                <p className="text-green-600">要求定義の概要を説明できる</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">2</span>
              <div>
                <p className="font-medium">誰が作ったか</p>
                <p className="text-green-600">エージェントチームの構成と役割分担を説明できる</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">3</span>
              <div>
                <p className="font-medium">どう品質を担保したか</p>
                <p className="text-green-600">テスト2回 + 外部監査のプロセスを説明できる</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">4</span>
              <div>
                <p className="font-medium">次に改善するとしたら何か</p>
                <p className="text-green-600">振り返りと次のアクションを考えられる</p>
              </div>
            </li>
          </ul>
        </div>

        {/* 質問の例 */}
        <h2 className="text-xl font-bold text-slate-900">質問の例</h2>
        <p className="text-slate-600 leading-relaxed">
          発表後、こんな質問が来るかもしれません。答えを考えておきましょう。
        </p>

        <div className="my-6 space-y-4">
          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900">
              Q: エージェントを1つ追加するなら？
            </h3>
            <div className="mt-3 rounded-md bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-500">回答のポイント:</p>
              <p className="mt-1 text-sm text-slate-700">
                .claude/agents/ に定義ファイルを追加し、CLAUDE.md にチーム構成を追記する。
                新しいエージェントの「役割」と「他のエージェントとの関係」を明確にすることが大切。
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900">
              Q: なぜ監査役が必要？
            </h3>
            <div className="mt-3 rounded-md bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-500">回答のポイント:</p>
              <p className="mt-1 text-sm text-slate-700">
                実装者だけでは見落としがある。
                第三者の目が品質を上げる。
                人間の組織でも「作った人」と「チェックする人」は分けるのが基本。
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900">
              Q: テストを2回実行する理由は？
            </h3>
            <div className="mt-3 rounded-md bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-500">回答のポイント:</p>
              <p className="mt-1 text-sm text-slate-700">
                1回目で通っても、不安定なテスト（タイミング依存等）を検出するため。
                「たまたま通った」を防ぎ、安定して動くことを保証する。
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-900">
              Q: 要件定義書がなかったらどうなる？
            </h3>
            <div className="mt-3 rounded-md bg-slate-50 p-3">
              <p className="text-sm font-medium text-slate-500">回答のポイント:</p>
              <p className="mt-1 text-sm text-slate-700">
                要求定義書だけでは「何を作るか」はわかるが「どう動くべきか」の基準がない。
                監査時にも「正しく実装されているか」を判断する基準がなくなる。
                要件定義書があるからこそ、実装と仕様のズレを検出できる。
              </p>
            </div>
          </div>
        </div>

        {/* 評価ルーブリック */}
        <h2 className="text-xl font-bold text-slate-900">評価ルーブリック</h2>
        <p className="text-slate-600 leading-relaxed">
          発表は以下の軸で評価されます。
          各軸で「合格」以上を満たすことが修了条件です。
        </p>

        <Rubric />

        <Callout type="info">
          「優秀」を目指す必要はありません。「合格」を確実にクリアしましょう。
          大事なのは技術力ではなく「プロジェクトの進め方」です。
        </Callout>

        {/* KPT */}
        <h2 className="text-xl font-bold text-slate-900">KPT（振り返り）</h2>
        <p className="text-slate-600 leading-relaxed">
          中級編全体を振り返って、以下の3つの観点で考えてみましょう。
        </p>

        <div className="my-6 space-y-4">
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
                  中級編で「身についた」と思ったことは？
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
                  難しかったこと、わかりにくかったことは？
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
                  この学びを活かして次にやりたいことは？
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 中級編で学んだこと */}
        <h2 className="text-xl font-bold text-slate-900">中級編で学んだこと</h2>

        <div className="my-6 space-y-3">
          {[
            {
              step: "STEP 1",
              title: "要求定義",
              description: "AIへの最高の指示書を作る技術",
              color: "bg-amber-50",
              textColor: "text-amber-800",
              subColor: "text-amber-600",
            },
            {
              step: "STEP 2",
              title: "組織設計",
              description: "誰が何をやるか、品質をどう担保するか",
              color: "bg-blue-50",
              textColor: "text-blue-800",
              subColor: "text-blue-600",
            },
            {
              step: "STEP 3-4",
              title: "開発",
              description: "Claude Codeに任せ、方向を調整する技術",
              color: "bg-purple-50",
              textColor: "text-purple-800",
              subColor: "text-purple-600",
            },
            {
              step: "STEP 5",
              title: "品質担保",
              description: "テスト2回 + 外部監査",
              color: "bg-red-50",
              textColor: "text-red-800",
              subColor: "text-red-600",
            },
            {
              step: "STEP 6-7",
              title: "仕上げ",
              description: "セキュリティ・ドキュメント整備・Vercelデプロイ",
              color: "bg-green-50",
              textColor: "text-green-800",
              subColor: "text-green-600",
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

        <div className="my-6 space-y-4">
          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                1
              </span>
              <div>
                <h3 className="font-semibold text-slate-800">
                  今回のサービスを発展させる
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  機能追加、開封トラッキング対応、データベース連携など、実際のプロダクトに近づけてみましょう。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                2
              </span>
              <div>
                <h3 className="font-semibold text-slate-800">
                  自分の業務にAgent Orchestratorを適用する
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  中級編で学んだ「要求定義 → 組織設計 → 品質担保」の流れを、
                  自分の実業務に適用してみましょう。
                </p>
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
                  上級編（予定）
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  より高度なエージェント協調、並列実行、大規模プロジェクトへの適用など。
                </p>
                <span className="mt-2 inline-block rounded-full bg-slate-200 px-3 py-0.5 text-xs font-semibold text-slate-600">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>

        <Callout type="tip">
          中級編で最も重要な学びは「なぜそうするのか」を考える習慣です。
          技術やツールは変わっていきますが、
          「要求定義 → 組織設計 → 品質担保」の考え方はどんなプロジェクトでも活かせます。
        </Callout>
      </StepLayout>
    </div>
  );
}
