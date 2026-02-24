import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Step4Page() {
  const promptTemplate = `Next.jsで以下のサービスを作ってください。

- [整理役の結果を貼る]
- [実行役のMVP機能一覧を貼る]
- Tailwind CSSでスタイリング
- 静的ページのみ（DB不要、API不要）`;

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={4}
        title="コード生成"
        duration="20分"
        prevStep={3}
        nextStep={5}
      >
        <div className="rounded-xl bg-gradient-to-r from-violet-50 to-blue-50 p-6 sm:p-8">
          <p className="text-center text-xl font-bold text-slate-800 sm:text-2xl">
            Claude Codeでコードを生成しよう
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            STEP 3 で設計した内容を、実際のコードにします
          </p>
        </div>

        {/* 手順 */}
        <h2 className="text-xl font-bold text-slate-900">手順</h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              1. プロジェクトフォルダを作成
            </h3>
            <p className="mb-2 text-sm text-slate-600">
              ターミナルを開いて、以下のコマンドを実行します。
            </p>
            <CodeBlock
              code={`mkdir my-service
cd my-service`}
              language="bash"
            />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              2. Claude Code を起動
            </h3>
            <CodeBlock code="claude" language="bash" />
            <p className="mt-2 text-sm text-slate-600">
              Claude Code が起動したら、以下のプロンプトを入力します。
            </p>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              3. プロンプトを入力
            </h3>
            <p className="mb-2 text-sm text-slate-600">
              以下のテンプレートの [整理役の結果] と [実行役のMVP機能一覧] を、
              STEP 3 で得た結果に置き換えて入力してください。
            </p>
            <CodeBlock code={promptTemplate} language="prompt" />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              4. 生成されたコードを確認
            </h3>
            <p className="mb-2 text-sm text-slate-600">
              Claude Code がファイルを自動生成します。
              完了したら、ローカルでプレビューしてみましょう。
            </p>
            <CodeBlock code="npm run dev" language="bash" />
            <p className="mt-2 text-sm text-slate-600">
              ブラウザで{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-700">
                http://localhost:3000
              </code>{" "}
              を開いて、サービスが表示されるか確認します。
            </p>
          </div>
        </div>

        <Callout type="warning">
          エラーが出ても大丈夫。Claude Code にエラーメッセージを貼り付けて
          「このエラーを修正してください」と頼めば、自動で直してくれます。
        </Callout>

        <Callout type="tip">
          表示がイメージと違う場合も、Claude Code に
          「ヘッダーの色を青にしてください」「フォントを大きくしてください」
          など、自然な日本語で修正を依頼できます。
        </Callout>

        <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
          <p className="text-lg font-semibold text-slate-700">
            ブラウザにサービスが表示されましたか？
          </p>
          <p className="mt-1 text-sm text-slate-500">
            表示を確認できたら、次はGitHubにアップロードします
          </p>
        </div>
      </StepLayout>
    </div>
  );
}
