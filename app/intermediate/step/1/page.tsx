import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { RequirementsTemplate } from "@/components/RequirementsTemplate";

export default function IntermediateStep1Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={1}
        title="要求定義をつくる"
        duration="40分"
        prevStep={0}
        nextStep={2}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          AIに仕事を任せるとき、曖昧な指示は曖昧な成果物を生みます。
          要求定義書は「AIへの最高の指示書」です。
          このステップでは、何を作るかを言語化して、AIが迷わず動ける土台をつくります。
        </p>

        <Callout type="info">
          要求定義書は開発の途中で何度も見返します。
          最初から完璧でなくていいので、まず全項目を埋めましょう。
        </Callout>

        {/* なぜ要求定義が必要か */}
        <h2 className="text-xl font-bold text-slate-900">
          なぜ要求定義書をつくるのか
        </h2>

        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              NG
            </span>
            <div>
              <p className="font-semibold text-red-800">曖昧な指示</p>
              <p className="mt-1 text-sm text-red-600">
                「Webhookを受け取ってSlackに通知するサービスを作って」
              </p>
              <p className="mt-1 text-xs text-red-500">
                → 署名検証は？ エラー時はどうする？ 同じイベントが2回来たら？ AIは全部自分で決めてしまう
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
              OK
            </span>
            <div>
              <p className="font-semibold text-green-800">要求定義書がある場合</p>
              <p className="mt-1 text-sm text-green-600">
                ゴール・非ゴール・MUST/SHOULD・制約・受入条件が明文化されている
              </p>
              <p className="mt-1 text-xs text-green-500">
                → AIはあなたの意図通りに動く。判断に迷ったら要求定義書を参照できる
              </p>
            </div>
          </div>
        </div>

        {/* 題材の紹介 */}
        <h2 className="text-xl font-bold text-slate-900">
          つくるもの: Event Orchestration Service（EOS）
        </h2>
        <p className="text-slate-600 leading-relaxed">
          中級編の題材は「EOS」というサービスです。仕組みはシンプルです。
        </p>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700">
                1
              </span>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Webhook を受信する</span>
                <span className="text-slate-500"> -- 外部サービスからの通知を受け取る</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm font-bold text-amber-700">
                2
              </span>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">ルールで振り分ける</span>
                <span className="text-slate-500"> -- イベントの種類に応じて処理を分ける</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-sm font-bold text-green-700">
                3
              </span>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">Slack に通知する</span>
                <span className="text-slate-500"> -- 処理結果を Slack チャンネルに送る</span>
              </p>
            </div>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed">
          シンプルに見えますが、「署名検証」「重複排除」「エラー処理」など、
          本番品質のサービスに必要な要素が詰まっています。
          これらを要求定義書で明確にしていきます。
        </p>

        {/* 進め方 */}
        <h2 className="text-xl font-bold text-slate-900">進め方</h2>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                1
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  AIと相談しながら考える
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  ChatGPT や Claude（ブラウザ版でOK）を開いて、
                  「こういうサービスを作りたいんだけど、どう思う？」と相談してみましょう。
                  Claude Code を使う必要はありません。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                2
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  テンプレートの各項目を埋める
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  下のテンプレートを見ながら、各項目を自分の言葉で埋めていきます。
                  スターターリポジトリの templates/requirements.md にも同じテンプレートが入っています。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                3
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  完璧じゃなくていい。まず全項目を埋める
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  空欄を残すより、仮でもいいから全部書いたほうがAIの精度が上がります。
                  開発を進めながら修正していくのが自然な進め方です。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-600">
                4
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  docs/requirements.md として保存する
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  書き上がった要求定義書を docs/requirements.md に保存します。
                  Claude Code に頼んでもいいし、自分でコピペしてもOKです。
                </p>
              </div>
            </div>
          </div>
        </div>

        <Callout type="tip">
          完璧に書く必要はありません。
          AIと対話しながら磨いていくのが正しい進め方です。
          「書いてみたら矛盾に気づいた」も大事な学びです。
        </Callout>

        {/* テンプレート */}
        <h2 className="text-xl font-bold text-slate-900">
          要求定義書テンプレート
        </h2>
        <p className="text-slate-600 leading-relaxed">
          以下の7つのセクションを埋めていきます。
          各セクションの「記入例」は EOS の例です。
          自分のプロジェクトに合わせて書き換えてください。
        </p>

        <RequirementsTemplate />

        {/* Claude Code で生成する */}
        <h2 className="text-xl font-bold text-slate-900">
          Claude Code で要求定義書を生成する
        </h2>
        <p className="text-slate-600 leading-relaxed">
          テンプレートの内容がある程度固まったら、Claude Code に要求定義書のファイルを作ってもらいましょう。
        </p>

        <CodeBlock
          code={`templates/requirements.md のテンプレートを参考に、
docs/requirements.md を作成してください。

EOSは「Webhookを受信→ルールで振り分け→Slack通知」するサービスです。
MUST要件とSHOULD要件を分けて書いてください。`}
          language="text"
          filename="Claude Code への指示例"
        />

        <p className="text-slate-600 leading-relaxed">
          AIが生成したものを確認して、自分の意図と違う部分があれば修正の指示を出しましょう。
          「ゴールにダッシュボードUIは含めないでください」
          「受入条件にテスト全件パスを追加してください」
          のように、具体的に伝えるのがコツです。
        </p>

        <Callout type="info">
          要求定義書はこの後の全ステップで参照する「プロジェクトの北極星」です。
          保存したら、次のステップで「誰がこの仕事をやるか」を決めていきます。
        </Callout>
      </StepLayout>
    </div>
  );
}
