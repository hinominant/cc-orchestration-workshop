import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Step4Page() {
  const claudeMdBefore = `## Technical Constraints
- Next.js Static Export
- Tailwind CSS でスタイリング
- レスポンシブ対応必須`;

  const claudeMdAfter = `## Technical Constraints
- Next.js Static Export
- Tailwind CSS でスタイリング
- レスポンシブ対応必須

## Design Preferences
- 角丸を多用した柔らかいデザイン
- パステルカラーを基調にする
- カード型レイアウトを優先する`;

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={4}
        title="カスタマイズ"
        duration="20分"
        prevStep={3}
        nextStep={5}
      >
        <div className="rounded-xl bg-gradient-to-r from-violet-50 to-blue-50 p-6 sm:p-8">
          <p className="text-center text-xl font-bold text-slate-800 sm:text-2xl">
            生成されたサイトを自分好みに調整しよう
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            修正依頼とCLAUDE.md編集で、出力をコントロールする方法を学びます
          </p>
        </div>

        {/* Phase 1: 修正依頼 */}
        <h2 className="text-xl font-bold text-slate-900">
          Phase 1: Claude Codeに修正を依頼する
        </h2>
        <p className="text-slate-600 leading-relaxed">
          生成されたサイトを見て、気になる部分を修正しましょう。
          自然な日本語で依頼するだけでOKです。
        </p>

        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              色を変えたい
            </h3>
            <CodeBlock code="ヘッダーの背景色を青に変えてください" language="prompt" />
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              セクションを追加したい
            </h3>
            <CodeBlock code="トップページにお客様の声セクションを追加してください" language="prompt" />
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              レイアウトを変えたい
            </h3>
            <CodeBlock code="メンバー一覧を横並びの3カラムレイアウトに変えてください" language="prompt" />
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              テキストを変えたい
            </h3>
            <CodeBlock code="フッターのコピーライト表示を「2025 My Team」に変えてください" language="prompt" />
          </div>
        </div>

        <Callout type="tip">
          修正は何度でも依頼できます。
          「もう少し大きく」「もっと明るい色で」のように、段階的に調整していくのがコツです。
        </Callout>

        {/* Phase 2: CLAUDE.mdを編集する */}
        <h2 className="text-xl font-bold text-slate-900">
          Phase 2: CLAUDE.mdを編集してみる
        </h2>

        <div className="rounded-lg border-l-4 border-violet-400 bg-violet-50 p-4">
          <p className="text-sm font-semibold text-violet-800">
            ここが今日の最大の学び
          </p>
          <p className="mt-1 text-sm text-violet-700">
            CLAUDE.mdを変えると、AIチームの動き方が変わります。
            「指示書を書き換えると、チームの出力が変わる」ことを体験してください。
          </p>
        </div>

        <p className="text-slate-600 leading-relaxed">
          CLAUDE.mdを開いて、「デザインの好み」を追記してみましょう。
          テキストエディタ（メモ帳やVS Code）でCLAUDE.mdを開きます。
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-2 text-sm font-bold text-slate-700">編集前</h3>
            <CodeBlock code={claudeMdBefore} language="markdown" />
          </div>
          <div className="rounded-lg border border-green-200 bg-green-50/30 p-4">
            <h3 className="mb-2 text-sm font-bold text-green-700">編集後（追記）</h3>
            <CodeBlock code={claudeMdAfter} language="markdown" />
          </div>
        </div>

        <p className="text-slate-600 leading-relaxed">
          CLAUDE.mdに「Design Preferences」セクションを追加したら、
          Claude Codeに再度指示を出してみましょう。
        </p>

        <CodeBlock code="ページ全体のデザインをCLAUDE.mdのDesign Preferencesに合わせて調整してください" language="prompt" />

        <div className="rounded-xl border-2 border-violet-200 bg-violet-50 p-6">
          <h3 className="mb-3 text-center text-lg font-bold text-violet-800">
            何が変わるか
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white">
                1
              </span>
              <p className="text-sm text-violet-700">
                角丸が多用された柔らかいデザインに変わる
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white">
                2
              </span>
              <p className="text-sm text-violet-700">
                パステルカラーが基調になる
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white">
                3
              </span>
              <p className="text-sm text-violet-700">
                カード型レイアウトが優先される
              </p>
            </div>
          </div>
        </div>

        <Callout type="info">
          CLAUDE.mdの変更は「一度きりの修正依頼」ではなく、「チーム全体の方針変更」です。
          今後のすべての指示に対して、この好みが反映されます。
          これが「道具」と「チーム」の違いです。
        </Callout>

        {/* 最終確認 */}
        <h2 className="text-xl font-bold text-slate-900">
          最終確認
        </h2>
        <p className="text-slate-600 leading-relaxed">
          カスタマイズが済んだら、ビルドが通るか確認しましょう。
        </p>

        <CodeBlock code="npm run build" language="bash" />

        <Callout type="warning">
          ビルドエラーが出る場合は、Claude Codeに「npm run buildでエラーが出ます。修正してください」
          と伝えてください。
        </Callout>

        <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
          <p className="text-lg font-semibold text-slate-700">
            カスタマイズとビルド確認が完了しましたか？
          </p>
          <p className="mt-1 text-sm text-slate-500">
            次はGitHubにpushしてコードを保存します
          </p>
        </div>
      </StepLayout>
    </div>
  );
}
