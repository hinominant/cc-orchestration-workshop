import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function IntermediateStep6Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={6}
        title="仕上げ"
        duration="30分"
        prevStep={5}
        nextStep={7}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          テストと監査をパスしたら、セキュリティと運用の基本を確認して仕上げます。
          「動くサービス」を「安心して人に見せられるサービス」にする最後の工程です。
        </p>

        {/* セキュリティ基本チェック */}
        <h2 className="text-xl font-bold text-slate-900">1. セキュリティ基本チェック</h2>
        <p className="text-slate-600 leading-relaxed">
          セキュリティは難しく考える必要はありません。
          まずは「秘密情報が漏れていないか」の3点だけ確認しましょう。
        </p>

        <div className="my-6 space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">1</span>
              <div>
                <h3 className="font-semibold text-slate-900">.env ファイルが .gitignore に含まれているか</h3>
                <p className="mt-1 text-sm text-slate-600">
                  .env にはAPIキーやパスワードが書かれています。
                  これがGitHubにアップロードされると、誰でも見られる状態になります。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">2</span>
              <div>
                <h3 className="font-semibold text-slate-900">コード内にAPIキーやパスワードが直書きされていないか</h3>
                <p className="mt-1 text-sm text-slate-600">
                  秘密情報はすべて環境変数（.envファイル）経由で読み込むのが鉄則です。
                  コードに直接書くと、GitHubに公開された瞬間に漏洩します。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">3</span>
              <div>
                <h3 className="font-semibold text-slate-900">Webhook署名検証が有効になっているか</h3>
                <p className="mt-1 text-sm text-slate-600">
                  署名検証がないと、誰でもWebhookエンドポイントにデータを送れてしまいます。
                  「本物のリクエストかどうか」を確認する仕組みです。
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm font-medium text-slate-700">Claude Code への指示例:</p>
        <CodeBlock
          code={`セキュリティチェックを行ってください。
.envが.gitignoreに含まれているか、
コード内にハードコードされた秘密情報がないか確認してください。`}
          language="text"
          filename="Claude Code への指示"
        />

        {/* 運用の基本 */}
        <h2 className="text-xl font-bold text-slate-900">2. 運用の基本</h2>
        <p className="text-slate-600 leading-relaxed">
          自分以外の人がこのサービスを見たとき、
          「何をするサービスか」「どう動かすか」がわかる状態にしておきます。
        </p>

        <div className="my-6 space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">README.md に書くべきこと</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                サービスの概要（何をするサービスか、一言で）
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                起動方法（どのコマンドで動くか）
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                テスト実行方法（品質をどう確認するか）
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                トラブルシューティング（エラーが起きたらどうするか）
              </li>
            </ul>
          </div>
        </div>

        <p className="text-sm font-medium text-slate-700">Claude Code への指示例:</p>
        <CodeBlock
          code={`README.md を充実させてください。
サービスの概要、起動方法、テスト実行方法、
トラブルシューティングを記載してください。`}
          language="text"
          filename="Claude Code への指示"
        />

        {/* 最終チェックリスト */}
        <h2 className="text-xl font-bold text-slate-900">3. 最終チェックリスト</h2>
        <p className="text-slate-600 leading-relaxed">
          リリース前に確認すべき項目をまとめました。
          全部自分で確認する必要はありません。Claude Code に丸ごと渡しましょう。
        </p>

        <div className="my-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border-2 border-red-200 bg-red-50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <h3 className="font-bold text-red-800">セキュリティ</h3>
            </div>
            <ul className="space-y-2">
              {[
                "シークレットが環境変数経由",
                ".gitignore に .env が含まれている",
                "署名検証が有効",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-red-700">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-blue-800">品質</h3>
            </div>
            <ul className="space-y-2">
              {[
                "テスト2回パス",
                "外部監査パス",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-blue-700">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border-2 border-green-200 bg-green-50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384-3.065A2.25 2.25 0 003 14.086V17.5a2.25 2.25 0 002.036 1.98l.464.058a18.02 18.02 0 009 0l.464-.058A2.25 2.25 0 0017 17.5v-3.414a2.25 2.25 0 00-3.036-1.98l-5.384 3.065a2.25 2.25 0 01-2.16 0z" />
              </svg>
              <h3 className="font-bold text-green-800">運用</h3>
            </div>
            <ul className="space-y-2">
              {[
                "README が完備されている",
                "エラー対処手順がある",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-green-700">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border-2 border-purple-200 bg-purple-50 p-5">
            <div className="mb-3 flex items-center gap-2">
              <svg className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <h3 className="font-bold text-purple-800">ドキュメント</h3>
            </div>
            <ul className="space-y-2">
              {[
                "要求定義書（docs/requirements.md）がある",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-purple-700">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-purple-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Callout type="tip">
          最終チェックリストを Claude Code に渡して
          「このチェックリストを全部確認してください」と指示するのが効率的です。
          自分で一つずつ確認するより、抜け漏れなくチェックできます。
        </Callout>

        <Callout type="info">
          セキュリティと運用は「動かす前の最低限のマナー」です。
          完璧でなくてもいいので、基本は押さえましょう。
        </Callout>
      </StepLayout>
    </div>
  );
}
