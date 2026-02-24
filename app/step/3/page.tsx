import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Step3Page() {
  const promptTemplate = `〇〇のWebサイトを作ってください。
ターゲットは〇〇で、〇〇という課題を解決します。
必要なページ: トップページ、〇〇ページ、〇〇ページ
デザインは〇〇な雰囲気で。`;

  const exampleCafe = `地域の猫カフェ紹介サイトを作ってください。
ターゲットは猫好きな20〜30代で、近くの猫カフェが見つからないという課題を解決します。
必要なページ: トップページ、カフェ一覧ページ、おすすめポイントページ
デザインはかわいくて温かみのある雰囲気で。`;

  const exampleTeam = `社内チーム紹介サイトを作ってください。
ターゲットは新入社員で、チームメンバーの顔と役割がわからないという課題を解決します。
必要なページ: トップページ、メンバー紹介ページ、チームの目標ページ
デザインはプロフェッショナルで清潔感のある雰囲気で。`;

  const examplePortfolio = `フリーランスデザイナーのポートフォリオサイトを作ってください。
ターゲットはクライアント企業で、実績を確認したいという課題を解決します。
必要なページ: トップページ、実績一覧ページ、お問い合わせページ
デザインはミニマルでスタイリッシュな雰囲気で。`;

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={3}
        title="あなたのサービスを作ろう"
        duration="40分"
        prevStep={2}
        nextStep={4}
      >
        <div className="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 sm:p-8">
          <p className="text-center text-xl font-bold text-slate-800 sm:text-2xl">
            アイデアを伝えるだけで、サービスが出来上がる
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            エージェントチームが自動で設計・実装・検証を行います
          </p>
        </div>

        <div className="rounded-lg border-l-4 border-purple-400 bg-purple-50 p-4">
          <p className="text-sm font-semibold text-purple-800">
            このSTEPが講座の核心です
          </p>
          <p className="mt-1 text-sm text-purple-700">
            40分かけてじっくり進めます。焦らず、まずはアイデアを整理してからClaude Codeに伝えましょう。
          </p>
        </div>

        {/* Phase 1: アイデアを考える */}
        <h2 className="text-xl font-bold text-slate-900">
          Phase 1: サービスアイデアを考える
        </h2>
        <p className="text-slate-600 leading-relaxed">
          以下の3つの質問に答えるだけで、アイデアが整理できます。
          紙やメモ帳に書き出してみてください。
        </p>

        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">
              誰のためのサービス？
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              例: 猫好きな人、新入社員、フリーランス、地域の住民...
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">
              どんな課題を解決する？
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              例: 情報が見つからない、チームのことがわからない、実績を見せたい...
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">
              どんなページが必要？
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              例: トップページ、一覧ページ、詳細ページ、お問い合わせページ...
            </p>
          </div>
        </div>

        {/* アイデア例 */}
        <h2 className="text-xl font-bold text-slate-900">
          迷ったらこのアイデア例を参考に
        </h2>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-4 text-center">
            <div className="mb-2 text-2xl font-bold text-amber-500" aria-hidden="true">
              Cat
            </div>
            <p className="text-sm font-medium text-slate-700">
              猫カフェ紹介サイト
            </p>
            <p className="mt-1 text-xs text-slate-500">
              地域の猫カフェ情報をまとめる
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 text-center">
            <div className="mb-2 text-2xl font-bold text-blue-500" aria-hidden="true">
              Team
            </div>
            <p className="text-sm font-medium text-slate-700">
              チーム紹介サイト
            </p>
            <p className="mt-1 text-xs text-slate-500">
              メンバーの顔と役割を紹介
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 text-center">
            <div className="mb-2 text-2xl font-bold text-violet-500" aria-hidden="true">
              Work
            </div>
            <p className="text-sm font-medium text-slate-700">
              ポートフォリオサイト
            </p>
            <p className="mt-1 text-xs text-slate-500">
              実績を見せるサイト
            </p>
          </div>
        </div>

        {/* Phase 2: Claude Codeに伝える */}
        <h2 className="text-xl font-bold text-slate-900">
          Phase 2: Claude Codeにアイデアを伝える
        </h2>
        <p className="text-slate-600 leading-relaxed">
          スターターリポジトリのフォルダでClaude Codeを起動し、
          以下のテンプレートを参考に、自分のアイデアを伝えてください。
        </p>

        <div className="rounded-lg border-2 border-purple-200 bg-purple-50/50 p-5">
          <h3 className="mb-2 font-bold text-purple-800">テンプレート</h3>
          <CodeBlock code={promptTemplate} language="prompt" />
          <p className="mt-2 text-xs text-purple-600">
            「〇〇」の部分を自分のアイデアに置き換えてください
          </p>
        </div>

        <h3 className="text-lg font-semibold text-slate-900">入力例</h3>

        <div className="space-y-4">
          <div className="rounded-lg border border-amber-200 bg-amber-50/30 p-4">
            <p className="mb-2 text-xs font-semibold text-amber-700">例1: 猫カフェサイト</p>
            <CodeBlock code={exampleCafe} language="prompt" />
          </div>
          <div className="rounded-lg border border-blue-200 bg-blue-50/30 p-4">
            <p className="mb-2 text-xs font-semibold text-blue-700">例2: チーム紹介サイト</p>
            <CodeBlock code={exampleTeam} language="prompt" />
          </div>
          <div className="rounded-lg border border-violet-200 bg-violet-50/30 p-4">
            <p className="mb-2 text-xs font-semibold text-violet-700">例3: ポートフォリオサイト</p>
            <CodeBlock code={examplePortfolio} language="prompt" />
          </div>
        </div>

        {/* Phase 3: 確認 */}
        <h2 className="text-xl font-bold text-slate-900">
          Phase 3: 結果を確認する
        </h2>
        <p className="text-slate-600 leading-relaxed">
          エージェントチームの作業が完了したら、ローカルで表示を確認しましょう。
        </p>

        <CodeBlock code="npm run dev" language="bash" />
        <p className="text-sm text-slate-600">
          ブラウザで{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-700">
            http://localhost:3000
          </code>{" "}
          を開いて、サービスが表示されるか確認します。
        </p>

        <Callout type="warning">
          エラーが出ても大丈夫です。エージェントが自動で修正を試みます。
          それでもうまくいかない場合は、エラーメッセージをClaude Codeに貼り付けて
          「このエラーを修正してください」と伝えてください。
        </Callout>

        {/* フォールバック */}
        <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5">
          <h3 className="mb-2 font-bold text-amber-800">
            うまくいかない場合のフォールバック
          </h3>
          <p className="text-sm text-amber-700">
            もしエラーが解消しない場合は、以下のコマンドで初期状態に戻してやり直せます。
          </p>
          <CodeBlock code={`git checkout .
git clean -fd`} language="bash" />
          <p className="mt-2 text-sm text-amber-700">
            それでも難しい場合は、スターターリポジトリのデフォルトページをそのままデプロイしても大丈夫です。
            講師に声をかけてください。
          </p>
        </div>

        <Callout type="tip">
          最初は簡単なものでOKです。完成させることが目的です。
          「こんなシンプルでいいの？」と思うくらいがちょうどいいです。
        </Callout>

        <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
          <p className="text-lg font-semibold text-slate-700">
            ブラウザにサービスが表示されましたか？
          </p>
          <p className="mt-1 text-sm text-slate-500">
            表示を確認できたら、次はカスタマイズに進みます
          </p>
        </div>
      </StepLayout>
    </div>
  );
}
