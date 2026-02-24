import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Step3Page() {
  const templateOrganize = `# 整理役に聞く
「[あなたのサービスアイデア]について、目的・ターゲット・提供価値を整理してください」`;

  const templateCritique = `# 批判役に聞く
「上記の整理結果について、弱点・曖昧点・失敗リスクを指摘してください」`;

  const templateExecute = `# 実行役に聞く
「批判を踏まえて、MVP（最小限の機能）の一覧を定義してください」`;

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={3}
        title="サービス設計"
        duration="40分"
        prevStep={2}
        nextStep={4}
      >
        <div className="rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-6 sm:p-8">
          <p className="text-center text-xl font-bold text-slate-800 sm:text-2xl">
            あなたのサービスを設計しましょう
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            整理・批判・実行の3分業を実際に体験します
          </p>
        </div>

        <div className="rounded-lg border-l-4 border-purple-400 bg-purple-50 p-4">
          <p className="text-sm font-semibold text-purple-800">
            このSTEPが講座の核心です
          </p>
          <p className="mt-1 text-sm text-purple-700">
            40分かけてじっくり進めます。焦らず、1つずつ確実にやっていきましょう。
          </p>
        </div>

        {/* サービス例 */}
        <h2 className="text-xl font-bold text-slate-900">
          サービスのアイデア例
        </h2>
        <p className="text-slate-600 leading-relaxed">
          何を作ればいいか迷ったら、以下を参考にしてください。
          大事なのは「完成させること」なので、シンプルなものでOKです。
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-4 text-center">
            <div className="mb-2 text-2xl" aria-hidden="true">
              Q&amp;A
            </div>
            <p className="text-sm font-medium text-slate-700">
              社内FAQ検索ツール
            </p>
            <p className="mt-1 text-xs text-slate-500">
              よくある質問をまとめたサイト
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 text-center">
            <div className="mb-2 text-2xl" aria-hidden="true">
              Book
            </div>
            <p className="text-sm font-medium text-slate-700">読書記録アプリ</p>
            <p className="mt-1 text-xs text-slate-500">
              読んだ本を記録するサイト
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 text-center">
            <div className="mb-2 text-2xl" aria-hidden="true">
              Team
            </div>
            <p className="text-sm font-medium text-slate-700">
              チーム紹介ページ
            </p>
            <p className="mt-1 text-xs text-slate-500">
              メンバーを紹介するサイト
            </p>
          </div>
        </div>

        {/* 3役テンプレート */}
        <h2 className="text-xl font-bold text-slate-900">
          3役テンプレートを使おう
        </h2>
        <p className="text-slate-600 leading-relaxed">
          以下のテンプレートを順番にClaude（またはChatGPT等）にコピー＆ペーストしてください。
          [あなたのサービスアイデア] の部分を、自分のアイデアに置き換えます。
        </p>

        {/* テンプレート1: 整理役 */}
        <div className="rounded-lg border-2 border-blue-200 bg-blue-50/50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
              1
            </span>
            <h3 className="font-bold text-blue-800">整理役</h3>
            <span className="text-xs text-blue-500">
              考えをまとめる
            </span>
          </div>
          <CodeBlock code={templateOrganize} language="prompt" />
          <p className="mt-2 text-xs text-blue-600">
            AIが目的・ターゲット・提供価値をきれいに整理してくれます。
          </p>
        </div>

        {/* テンプレート2: 批判役 */}
        <div className="rounded-lg border-2 border-amber-200 bg-amber-50/50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
              2
            </span>
            <h3 className="font-bold text-amber-800">批判役</h3>
            <span className="text-xs text-amber-500">
              穴を見つける
            </span>
          </div>
          <CodeBlock code={templateCritique} language="prompt" />
          <p className="mt-2 text-xs text-amber-600">
            整理役の結果をそのまま残した状態で、このプロンプトを送ってください。
          </p>
        </div>

        {/* テンプレート3: 実行役 */}
        <div className="rounded-lg border-2 border-green-200 bg-green-50/50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
              3
            </span>
            <h3 className="font-bold text-green-800">実行役</h3>
            <span className="text-xs text-green-500">
              具体的に決める
            </span>
          </div>
          <CodeBlock code={templateExecute} language="prompt" />
          <p className="mt-2 text-xs text-green-600">
            批判を踏まえた現実的なMVP（最小限で動くもの）が出てきます。
          </p>
        </div>

        <Callout type="tip">
          最初は簡単なものでOK。完成させることが目的です。
          「こんなシンプルでいいの？」と思うくらいがちょうどいいです。
        </Callout>

        <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
          <p className="text-lg font-semibold text-slate-700">
            3役のテンプレートを全部実行しましたか？
          </p>
          <p className="mt-1 text-sm text-slate-500">
            整理結果とMVP機能一覧をメモしておいてください。次のSTEPで使います。
          </p>
        </div>
      </StepLayout>
    </div>
  );
}
