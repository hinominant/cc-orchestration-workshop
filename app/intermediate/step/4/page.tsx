import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function IntermediateStep4Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={4}
        title="開発をすすめる"
        duration="60分"
        prevStep={3}
        nextStep={5}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          あなたの仕事は「コードを書くこと」ではなく「方向を決めること」です。
          Claude Code が実装を進めている間、あなたは開発の舵取りに集中してください。
        </p>

        <Callout type="info">
          この STEP が中級編で最も長い時間（60分）です。
          焦らず、Claude Code との対話を楽しんでください。
        </Callout>

        {/* このSTEPの過ごし方 */}
        <h2 className="text-xl font-bold text-slate-900">この STEP の過ごし方</h2>
        <p className="text-slate-600 leading-relaxed">
          Claude Code が実装を進めている間、あなたがやることは3つだけです。
        </p>

        <div className="my-6 space-y-4">
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                1
              </span>
              <div>
                <h3 className="font-semibold text-blue-800">質問に答える</h3>
                <p className="mt-1 text-sm text-blue-700">
                  Claude Code から「メールテンプレートのフォーマットはどうしますか？」
                  「配信失敗時のエラーハンドリングはどうしますか？」といった質問が来ます。
                  要求定義書を見ながら答えてください。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                2
              </span>
              <div>
                <h3 className="font-semibold text-amber-800">進捗を確認する</h3>
                <p className="mt-1 text-sm text-amber-700">
                  途中で「現在の進捗を教えて」と聞くと、
                  何が完了して何が残っているか教えてくれます。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border-2 border-purple-200 bg-purple-50 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                3
              </span>
              <div>
                <h3 className="font-semibold text-purple-800">方向修正する</h3>
                <p className="mt-1 text-sm text-purple-700">
                  「やっぱりこの機能は後回しで」「通知のメッセージはもっとシンプルにして」など、
                  途中で方針を変えたい場合は遠慮なく伝えてください。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* よくある質問パターン */}
        <h2 className="text-xl font-bold text-slate-900">よくある質問パターンと答え方</h2>
        <p className="text-slate-600 leading-relaxed">
          Claude Code から来る質問にはパターンがあります。
          慌てなくて大丈夫です。以下を参考にしてください。
        </p>

        <div className="my-6 space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200">
                <span className="text-xs font-bold text-slate-600">Q</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  「○○の仕様はどうしますか？」
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  → 要求定義書（docs/requirements.md）と要件定義書（docs/specifications.md）を見て答える。
                  書いてあればその通り伝え、書いてなければ「おまかせで」と答えて OK。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200">
                <span className="text-xs font-bold text-slate-600">Q</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  「○○と△△のどちらにしますか？」
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  → どちらでもよければ「おまかせで」。
                  こだわりがあれば「○○でお願いします」と伝える。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200">
                <span className="text-xs font-bold text-slate-600">Q</span>
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  「エラーが発生しました」
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  → 「修正してください」でOK。
                  エラーの内容を理解する必要はありません。Claude Code が自分で直します。
                </p>
              </div>
            </div>
          </div>
        </div>

        <Callout type="tip">
          「おまかせで」は魔法の言葉です。判断に困ったら使いましょう。
          ただし、要求定義に関わる重要な判断（機能の追加・削除など）は自分で決めてください。
        </Callout>

        {/* 便利な指示フレーズ */}
        <h2 className="text-xl font-bold text-slate-900">便利な指示フレーズ</h2>
        <p className="text-slate-600 leading-relaxed">
          開発中に使える指示フレーズをまとめました。
          コピーしてそのまま使ってください。
        </p>

        <div className="my-6 space-y-2">
          <div className="rounded-md bg-slate-50 px-4 py-3">
            <p className="text-sm font-mono text-slate-700">現在の進捗を教えてください</p>
            <p className="mt-1 text-xs text-slate-500">→ 完了した作業と残りの作業を教えてくれます</p>
          </div>
          <div className="rounded-md bg-slate-50 px-4 py-3">
            <p className="text-sm font-mono text-slate-700">docs/requirements.md と docs/specifications.md を再度確認して、方針を修正してください</p>
            <p className="mt-1 text-xs text-slate-500">→ 方向がおかしいと感じたときに使います</p>
          </div>
          <div className="rounded-md bg-slate-50 px-4 py-3">
            <p className="text-sm font-mono text-slate-700">あなたの判断でお願いします</p>
            <p className="mt-1 text-xs text-slate-500">→ わからない質問が来たときに使います</p>
          </div>
          <div className="rounded-md bg-slate-50 px-4 py-3">
            <p className="text-sm font-mono text-slate-700">現在の状況を教えてください</p>
            <p className="mt-1 text-xs text-slate-500">→ 開発が止まっているように見えるときに使います</p>
          </div>
        </div>

        {/* 困ったときの対処法 */}
        <h2 className="text-xl font-bold text-slate-900">困ったときの対処法</h2>

        <div className="my-6 space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">開発が止まっている</h3>
            <p className="mt-1 text-sm text-slate-600">
              → 「現在の状況を教えてください」と入力してください。
              何か問題があれば Claude Code が教えてくれます。
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">方向がおかしい</h3>
            <p className="mt-1 text-sm text-slate-600">
              → 「docs/requirements.md と docs/specifications.md を再度確認して、方針を修正してください」と伝えましょう。
              要求定義書と要件定義書が正しい方向への道しるべになります。
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">わからない質問が来た</h3>
            <p className="mt-1 text-sm text-slate-600">
              → 「あなたの判断でお願いします」で大丈夫です。
              Claude Code は合理的な判断をしてくれます。
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">エラーが大量に出ている</h3>
            <p className="mt-1 text-sm text-slate-600">
              → パニックにならないでください。「エラーを修正してください」と一言伝えるだけで、
              Claude Code が自分でエラーを分析して修正します。
            </p>
          </div>
        </div>

        {/* やってはいけないこと */}
        <h2 className="text-xl font-bold text-slate-900">やってはいけないこと</h2>

        <div className="my-6 space-y-3">
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
            <h3 className="font-semibold text-red-800">コードを直接編集する</h3>
            <p className="mt-2 text-sm text-red-700">
              VS Code やエディタでコードを直接書き換えないでください。
              修正が必要な場合は、Claude Code に「ここを修正して」と指示しましょう。
              あなたがコードを触ると、Claude Code が混乱する原因になります。
            </p>
          </div>

          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
            <h3 className="font-semibold text-red-800">要求定義にない機能を追加する</h3>
            <p className="mt-2 text-sm text-red-700">
              「ついでにこの機能も」と思っても、今回のスコープ内に留めてください。
              機能追加は開発時間を大幅に伸ばします（スコープクリープ）。
              追加したい場合は、今の実装が完了してから別途依頼しましょう。
            </p>
          </div>

          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4">
            <h3 className="font-semibold text-red-800">テストをスキップする</h3>
            <p className="mt-2 text-sm text-red-700">
              「テストは後でいいから先に進めて」は禁止です。
              テストなしで進めると、後で大きな問題が見つかり、かえって時間がかかります。
            </p>
          </div>
        </div>

        <Callout type="warning">
          コードを直接編集しないでください。
          修正が必要な場合は、Claude Code に「ここを修正して」と指示しましょう。
        </Callout>

        {/* まとめ */}
        <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-amber-800">この STEP のまとめ</h3>
          <ul className="mt-2 space-y-2 text-sm text-amber-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              あなたの役割は「方向を決める人」。コードは Claude Code が書く
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              質問には要求定義書を参考に答える。わからなければ「おまかせで」
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              コードの直接編集・機能追加・テストスキップは禁止
            </li>
          </ul>
        </div>
      </StepLayout>
    </div>
  );
}
