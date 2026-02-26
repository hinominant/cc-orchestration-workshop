import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";
import { RequirementsTemplate } from "@/components/RequirementsTemplate";

export default function IntermediateStep1Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={1}
        title="要求定義と要件定義をつくる"
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
          要求定義書と要件定義書は開発の途中で何度も見返します。
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
                「メールを一括送信するサービスを作って」
              </p>
              <p className="mt-1 text-xs text-red-500">
                → 配信リストの管理は？ テンプレートは？ エラー時はどうする？ AIは全部自分で決めてしまう
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
          つくるもの: メール配信システム
        </h2>
        <p className="text-slate-600 leading-relaxed">
          中級編の題材は「メール配信システム」です。仕組みはシンプルです。
        </p>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700">
                1
              </span>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">配信リストを管理する</span>
                <span className="text-slate-500"> -- 宛先（メールアドレス）のリストを作成・編集する</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm font-bold text-amber-700">
                2
              </span>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">テンプレートを管理する</span>
                <span className="text-slate-500"> -- メールの件名・本文のテンプレートを作成・編集する</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-sm font-bold text-green-700">
                3
              </span>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">一括配信する</span>
                <span className="text-slate-500"> -- テンプレート × リストで一括配信を実行する</span>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-sm font-bold text-purple-700">
                4
              </span>
              <p className="text-sm text-slate-700">
                <span className="font-semibold">配信履歴を確認する</span>
                <span className="text-slate-500"> -- いつ・誰に・何を送ったかを振り返る</span>
              </p>
            </div>
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed">
          シンプルに見えますが、「メールアドレスのバリデーション」「配信失敗時のエラー処理」「テンプレート変数の置換」など、
          本番品質のサービスに必要な要素が詰まっています。
          これらを要求定義書で明確にしていきます。
        </p>

        {/* 要求定義書と要件定義書の違い */}
        <h2 className="text-xl font-bold text-slate-900">
          要求定義書と要件定義書 -- 2つのドキュメントが必要
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h3 className="font-semibold text-blue-800">
              要求定義書（docs/requirements.md）
            </h3>
            <p className="mt-2 text-sm text-blue-700 leading-relaxed">
              「何を作るか」「なぜ作るか」を書く
            </p>
            <p className="mt-1 text-xs text-blue-600">
              ゴール・非ゴール・MUST/SHOULD・制約・受入条件
            </p>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <h3 className="font-semibold text-amber-800">
              要件定義書（docs/specifications.md）
            </h3>
            <p className="mt-2 text-sm text-amber-700 leading-relaxed">
              「具体的にどう動くか」「どんな機能があるか」を書く
            </p>
            <p className="mt-1 text-xs text-amber-600">
              API仕様・データ構造・画面遷移・エラー処理
            </p>
          </div>
        </div>

        <Callout type="warning">
          要求定義書だけだとAIが「具体的にどう作るか」を自分で決めてしまいます。
          要件定義書があると、AIの解釈のブレを大幅に減らせます。
          両方作ることで、AIへの指示精度が格段に上がります。
        </Callout>

        {/* 外部AIで作る理由 */}
        <h2 className="text-xl font-bold text-slate-900">
          外部AI（GPT / Gemini）で作る
        </h2>
        <p className="text-slate-600 leading-relaxed">
          要求定義書と要件定義書は、Claude Code ではなく ChatGPT や Gemini
          などの外部AIと相談しながら作ります。
          Claude Code は日本語の文書生成にやや課題があるため、
          日本語の仕様書作成は他のAIのほうが得意です。
        </p>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-700">使い分けのポイント</p>
          <div className="mt-2 space-y-2">
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-sm text-slate-400">--</span>
              <p className="text-sm text-slate-600">
                <span className="font-medium">要求定義・要件定義の作成</span>: 外部AI（GPT / Gemini）がおすすめ
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="mt-0.5 text-sm text-slate-400">--</span>
              <p className="text-sm text-slate-600">
                <span className="font-medium">コードの実装・テスト</span>: Claude Code が最強
              </p>
            </div>
          </div>
        </div>

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
                  外部AIと相談しながら要求定義書を作る
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  ChatGPT や Gemini（ブラウザ版でOK）を開いて、
                  「こういうサービスを作りたいんだけど」と相談してみましょう。
                  下のテンプレートの7項目を埋める形で要求定義書を作ります。
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
                  続けて要件定義書も作る
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  要求定義書ができたら、同じAIに「この要求定義書をもとに要件定義書を作ってください」と頼みます。
                  API仕様・データ構造・画面の動きなど、より具体的な仕様を書き出してもらいましょう。
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
                  docs/ に保存する
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  書き上がったドキュメントをプロジェクトに保存します。
                  要求定義書は docs/requirements.md、要件定義書は docs/specifications.md として保存してください。
                  Claude Code に「docs/ にこのファイルを保存して」と頼んでもOKです。
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

        {/* 外部AIへの相談例 */}
        <h2 className="text-xl font-bold text-slate-900">
          外部AIへの相談例
        </h2>
        <p className="text-slate-600 leading-relaxed">
          ChatGPT や Gemini に以下のように聞いてみましょう。
        </p>

        <CodeBlock
          code={`メール配信システムを作りたいです。
以下の機能を持つシステムの要求定義書を作ってください。

- 配信リスト（宛先リスト）の管理
- メールテンプレート（件名・本文）の管理
- テンプレート×リストで一括配信
- 配信履歴の確認

Luna標準フォーマット（7つのセクション）で書いてください。`}
          language="text"
          filename="外部AIへの相談例（要求定義書）"
        />

        <CodeBlock
          code={`この要求定義書をもとに、要件定義書を作ってください。

以下の内容を含めてください:
- API仕様（エンドポイント・リクエスト・レスポンス）
- データ構造（配信リスト・テンプレート・配信履歴）
- エラー処理の方針
- バリデーションルール`}
          language="text"
          filename="外部AIへの相談例（要件定義書）"
        />

        {/* テンプレート */}
        <h2 className="text-xl font-bold text-slate-900">
          要求定義書テンプレート
        </h2>
        <p className="text-slate-600 leading-relaxed">
          以下の7つのセクションを埋めていきます。
          各セクションの「記入例」はメール配信システムの例です。
          自分のプロジェクトに合わせて書き換えてください。
        </p>

        <RequirementsTemplate />

        <Callout type="info">
          要求定義書と要件定義書はこの後の全ステップで参照する「プロジェクトの北極星」です。
          保存したら、次のステップで「誰がこの仕事をやるか」を決めていきます。
        </Callout>
      </StepLayout>
    </div>
  );
}
