import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Step5Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={5}
        title="GitHub push"
        duration="10分"
        prevStep={4}
        nextStep={6}
      >
        <div className="rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 p-6 sm:p-8">
          <p className="text-center text-xl font-bold text-slate-800 sm:text-2xl">
            コードをGitHubにアップロードしよう
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            Forkしたリポジトリにpushするだけなのでリモート設定は不要です
          </p>
        </div>

        <p className="text-slate-600 leading-relaxed">
          GitHub は「コードの保管庫」です。
          スターターリポジトリをForkしているので、remote設定は済んでいます。
          変更内容をpushするだけで完了です。
        </p>

        <h2 className="text-xl font-bold text-slate-900">手順</h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              1. 変更されたファイルを確認
            </h3>
            <p className="mb-2 text-sm text-slate-600">
              まず、どのファイルが変更されたか確認しましょう。
            </p>
            <CodeBlock code="git status" language="bash" />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              2. すべてのファイルをステージング
            </h3>
            <CodeBlock code="git add ." language="bash" />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              3. コミット（保存ポイント）を作成
            </h3>
            <CodeBlock code={'git commit -m "initial"'} language="bash" />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              4. GitHubにpush
            </h3>
            <p className="mb-2 text-sm text-slate-600">
              Forkしたリポジトリに変更を送信します。
            </p>
            <CodeBlock code="git push origin main" language="bash" />
          </div>
        </div>

        <Callout type="tip">
          HTTPS方式でpushします。パスワードを聞かれたら、GitHubのパスワード
          （またはPersonal Access Token）を入力してください。
        </Callout>

        <Callout type="warning">
          「error: src refspec main does not match any」と出る場合は、
          ブランチ名が「master」かもしれません。
          その場合は{" "}
          <code className="rounded bg-amber-100 px-1 py-0.5 text-xs font-mono">
            git push origin master
          </code>{" "}
          を試してください。
        </Callout>

        <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
          <p className="text-lg font-semibold text-slate-700">
            GitHubにコードがアップロードされましたか？
          </p>
          <p className="mt-1 text-sm text-slate-500">
            GitHubのリポジトリページでファイルが更新されていればOKです
          </p>
        </div>
      </StepLayout>
    </div>
  );
}
