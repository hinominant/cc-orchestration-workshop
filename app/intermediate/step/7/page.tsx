import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function IntermediateStep7Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={7}
        title="デプロイ"
        duration="20分"
        prevStep={6}
        nextStep={8}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          完成したサービスを実際に動かして確認し、デモの準備をします。
          ここまで来たらゴールはすぐそこです。
        </p>

        {/* 動作確認 */}
        <h2 className="text-xl font-bold text-slate-900">1. 動作確認</h2>
        <p className="text-slate-600 leading-relaxed">
          まず、サービスが正しく動くことを自分の目で確認します。
          3つのステップで確認しましょう。
        </p>

        <div className="my-6 space-y-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">1</span>
              <div className="w-full">
                <h3 className="font-semibold text-slate-900">サーバーを起動する</h3>
                <CodeBlock
                  code="npm run dev"
                  language="bash"
                  filename="ターミナル"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">2</span>
              <div className="w-full">
                <h3 className="font-semibold text-slate-900">テスト用APIリクエストを送信して動作確認</h3>
                <p className="mt-1 text-sm text-slate-600">
                  別のターミナルを開いて、以下のコマンドでメール配信APIにリクエストを送信します。
                </p>
                <CodeBlock
                  code={`curl -X POST http://localhost:3000/api/send \\
  -H "Content-Type: application/json" \\
  -d '{"listId": "test-list", "templateId": "welcome"}'`}
                  language="bash"
                  filename="ターミナル（別ウィンドウ）"
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">3</span>
              <div>
                <h3 className="font-semibold text-slate-900">コンソールにメール送信ログが出力されることを確認</h3>
                <p className="mt-1 text-sm text-slate-600">
                  サーバーを起動したターミナルにメール送信のログが表示されていれば成功です。
                  エラーが出る場合は、環境変数やAPIの設定を確認してください。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub push */}
        <h2 className="text-xl font-bold text-slate-900">2. GitHub push</h2>
        <p className="text-slate-600 leading-relaxed">
          動作確認ができたら、コードをGitHubにアップロードします。
          Claude Code に指示するだけでOKです。
        </p>

        <p className="text-sm font-medium text-slate-700">Claude Code への指示:</p>
        <CodeBlock
          code="変更をGitHubにpushしてください"
          language="text"
          filename="Claude Code への指示"
        />

        <Callout type="warning">
          push する前に .env がコミットされていないことを確認してください。
          .env には秘密情報（APIキー等）が含まれています。
          GitHubにアップロードされると取り消しが困難です。
        </Callout>

        {/* Vercelデプロイ */}
        <h2 className="text-xl font-bold text-slate-900">3. Vercelにデプロイ</h2>
        <p className="text-slate-600 leading-relaxed">
          GitHubにpushしたら、Vercelにデプロイしてインターネット上に公開します。
        </p>

        <Callout type="info">
          Vercelアカウントがない場合は{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="font-medium underline">
            vercel.com
          </a>
          {" "}で無料登録してください。GitHubアカウントで簡単にサインアップできます。
        </Callout>

        <p className="text-sm font-medium text-slate-700">Claude Code への指示:</p>
        <CodeBlock
          code={`このプロジェクトをVercelにデプロイできるように設定してください。
vercel.json の作成が必要であれば作成してください。`}
          language="text"
          filename="Claude Code への指示"
        />

        <div className="my-6 space-y-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">方法A: Vercel CLIでデプロイ</h3>
            <p className="mt-1 text-sm text-slate-600">
              ターミナルから直接デプロイできます。初回はVercelアカウントとの連携が求められます。
            </p>
            <CodeBlock
              code="npx vercel"
              language="bash"
              filename="ターミナル"
            />
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">方法B: Vercelダッシュボードから連携</h3>
            <p className="mt-1 text-sm text-slate-600">
              Vercelのダッシュボード（vercel.com/dashboard）から「Add New Project」を選択し、
              GitHubリポジトリを連携するだけで自動デプロイが設定されます。
              以降はGitHubにpushするたびに自動でデプロイされます。
            </p>
          </div>
        </div>

        {/* デモ準備 */}
        <h2 className="text-xl font-bold text-slate-900">4. デモ準備</h2>
        <p className="text-slate-600 leading-relaxed">
          次のSTEPで発表があります。何を見せるか、どう話すかを整理しておきましょう。
        </p>

        <h3 className="text-lg font-semibold text-slate-900">発表で見せるもの</h3>
        <div className="my-4 space-y-3">
          {[
            {
              number: 1,
              title: "要求定義書",
              detail: "docs/requirements.md",
              color: "border-amber-200 bg-amber-50",
              textColor: "text-amber-800",
              subColor: "text-amber-600",
            },
            {
              number: 2,
              title: "要件定義書",
              detail: "docs/specifications.md",
              color: "border-orange-200 bg-orange-50",
              textColor: "text-orange-800",
              subColor: "text-orange-600",
            },
            {
              number: 3,
              title: "エージェントチームの構成",
              detail: "CLAUDE.md",
              color: "border-blue-200 bg-blue-50",
              textColor: "text-blue-800",
              subColor: "text-blue-600",
            },
            {
              number: 4,
              title: "動作デモ",
              detail: "API実行 → メール送信ログ",
              color: "border-green-200 bg-green-50",
              textColor: "text-green-800",
              subColor: "text-green-600",
            },
            {
              number: 5,
              title: "テスト結果",
              detail: "2回分のテスト実行結果",
              color: "border-purple-200 bg-purple-50",
              textColor: "text-purple-800",
              subColor: "text-purple-600",
            },
          ].map((item) => (
            <div key={item.number} className={`flex items-center gap-4 rounded-lg border p-4 ${item.color}`}>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold ${item.textColor}`}>
                {item.number}
              </span>
              <div>
                <p className={`font-semibold ${item.textColor}`}>{item.title}</p>
                <p className={`text-sm ${item.subColor}`}>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-slate-900">発表のストーリー</h3>
        <p className="mt-1 text-sm text-slate-600">
          この4つの流れで話すと、わかりやすい発表になります。
        </p>

        <div className="my-4 space-y-2">
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">1</span>
            <div>
              <p className="font-medium text-slate-800">「こういうサービスを作りました」</p>
              <p className="text-sm text-slate-500">要求定義の概要を説明</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">2</span>
            <div>
              <p className="font-medium text-slate-800">「こういうチームで開発しました」</p>
              <p className="text-sm text-slate-500">組織設計（エージェントの役割分担）を説明</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">3</span>
            <div>
              <p className="font-medium text-slate-800">「こう動きます」</p>
              <p className="text-sm text-slate-500">デモ（API実行 → メール配信）</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </div>
          <div className="flex items-start gap-3 rounded-lg bg-slate-50 p-4">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">4</span>
            <div>
              <p className="font-medium text-slate-800">「品質はこう担保しました」</p>
              <p className="text-sm text-slate-500">テスト2回 + 外部監査の結果</p>
            </div>
          </div>
        </div>

        <Callout type="tip">
          デモが動かなくても大丈夫です。
          要求定義 → 組織設計 → 品質担保の「流れ」を説明できることが重要です。
          プロセスを説明できる人は、結果が出なくても評価されます。
        </Callout>
      </StepLayout>
    </div>
  );
}
