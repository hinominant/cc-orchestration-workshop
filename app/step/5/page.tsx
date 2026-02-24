import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Step5Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={5}
        title="GitHub連携"
        duration="10分"
        prevStep={4}
        nextStep={6}
      >
        <div className="rounded-xl bg-gradient-to-r from-cyan-50 to-blue-50 p-6 sm:p-8">
          <p className="text-center text-xl font-bold text-slate-800 sm:text-2xl">
            コードをGitHubにアップロードしよう
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            作ったコードをインターネット上に保存します
          </p>
        </div>

        <p className="text-slate-600 leading-relaxed">
          GitHub は「コードの保管庫」です。
          ここにコードをアップロードすると、次のSTEPでVercelが自動的に読み込んで公開してくれます。
        </p>

        <h2 className="text-xl font-bold text-slate-900">手順</h2>

        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              1. Gitを初期化
            </h3>
            <p className="mb-2 text-sm text-slate-600">
              プロジェクトフォルダ内で以下を実行します。
            </p>
            <CodeBlock code="git init" language="bash" />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              2. すべてのファイルをステージング
            </h3>
            <CodeBlock code="git add ." language="bash" />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              3. 最初のコミット（保存ポイント）を作成
            </h3>
            <CodeBlock code={'git commit -m "initial"'} language="bash" />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              4. GitHubで新しいリポジトリを作成
            </h3>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <ol className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-bold text-slate-500">a.</span>
                  <span>
                    ブラウザで{" "}
                    <code className="rounded bg-white px-1.5 py-0.5 text-xs font-mono">
                      github.com
                    </code>{" "}
                    を開いてログイン
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-bold text-slate-500">b.</span>
                  <span>
                    右上の「+」ボタン →「New repository」をクリック
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-bold text-slate-500">c.</span>
                  <span>
                    Repository name に好きな名前を入力（例: my-service）
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-bold text-slate-500">d.</span>
                  <span>
                    「Public」を選択（Vercelで公開するため）
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 font-bold text-slate-500">e.</span>
                  <span>
                    他はデフォルトのまま「Create repository」をクリック
                  </span>
                </li>
              </ol>
            </div>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              5. リモートリポジトリを追加
            </h3>
            <p className="mb-2 text-sm text-slate-600">
              YOUR_NAME と YOUR_REPO を自分のGitHubユーザー名とリポジトリ名に置き換えてください。
            </p>
            <CodeBlock
              code="git remote add origin https://github.com/YOUR_NAME/YOUR_REPO.git"
              language="bash"
            />
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-slate-900">
              6. コードをプッシュ（アップロード）
            </h3>
            <CodeBlock code="git push -u origin main" language="bash" />
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
            git push -u origin master
          </code>{" "}
          を試してください。
        </Callout>

        <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
          <p className="text-lg font-semibold text-slate-700">
            GitHubにコードがアップロードされましたか？
          </p>
          <p className="mt-1 text-sm text-slate-500">
            GitHubのリポジトリページでファイルが見えたらOKです
          </p>
        </div>
      </StepLayout>
    </div>
  );
}
