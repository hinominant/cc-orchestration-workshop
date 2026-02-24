import { StepLayout } from "@/components/StepLayout";
import { Callout } from "@/components/Callout";

export default function Step6Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={6}
        title="Vercel公開"
        duration="10分"
        prevStep={5}
        nextStep={7}
      >
        <div className="rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 p-6 sm:p-8">
          <p className="text-center text-xl font-bold text-slate-800 sm:text-2xl">
            サービスをインターネットに公開しよう
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            あと少しで完成です。Vercelを使えばワンクリックで公開できます
          </p>
        </div>

        <h2 className="text-xl font-bold text-slate-900">手順</h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-600">
              1
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                Vercelにログイン
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                ブラウザで{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-700">
                  vercel.com
                </code>{" "}
                にアクセスし、GitHubアカウントでログインします。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-600">
              2
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                「New Project」をクリック
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                ダッシュボード画面の右上にある「Add New...」から「Project」をクリックします。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-600">
              3
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                GitHubリポジトリを選択
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Forkした「cc-workshop-starter」リポジトリが一覧に表示されるので、
                「Import」ボタンをクリックします。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-600">
              4
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                「Deploy」ボタンをクリック
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                設定画面が表示されますが、特に変更は不要です。
                そのまま「Deploy」をクリックしてください。
              </p>
            </div>
          </div>
        </div>

        <Callout type="info">
          Framework Presetは自動検出されます。
          Next.jsが自動的に選択されるので、そのままDeployでOKです。
        </Callout>

        {/* 成功表示 */}
        <div className="rounded-xl border-2 border-green-300 bg-green-50 p-8 text-center">
          <div className="mb-3 text-4xl font-bold text-green-600" aria-hidden="true">
            *
          </div>
          <p className="text-xl font-bold text-green-800">
            公開URLが表示されたら完成です
          </p>
          <p className="mt-2 text-sm text-green-600">
            デプロイが完了すると、
            <code className="rounded bg-green-100 px-1.5 py-0.5 font-mono text-xs">
              https://あなたのプロジェクト.vercel.app
            </code>{" "}
            のようなURLが発行されます。
          </p>
          <p className="mt-3 text-sm text-green-600">
            そのURLをブラウザで開いて、あなたのサービスが世界中からアクセスできることを確認してください。
          </p>
        </div>

        <Callout type="warning">
          デプロイに失敗する場合は、エラーログを確認してください。
          多くの場合、ビルドエラーが原因です。
          Claude Codeに「Vercelでビルドエラーが出ました」と相談すれば解決できます。
        </Callout>
      </StepLayout>
    </div>
  );
}
