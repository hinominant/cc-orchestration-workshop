import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function EngineerStep0Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={0}
        title="Claude Code とは"
        duration="15分"
        nextStep={1}
        courseBase="/engineer/step"
        courseLabel="エンジニア"
        topHref="/engineer"
        accentColor="bg-engineer"
      >
        <p className="text-slate-600 leading-relaxed">
          Claude Code の全体像を理解し、エンジニアとしての効率的な使い方の基盤を作ります。
        </p>

        {/* アーキテクチャ */}
        <h2 className="text-xl font-bold text-slate-900">アーキテクチャ概要</h2>

        <p className="text-slate-600 leading-relaxed">
          Claude Code は「Agent Loop」と呼ばれるコアメカニズムで動作します。
          すべてのAIコーディングエージェントに共通するパターンです。
        </p>

        <CodeBlock
          code={`// Agent Loop の基本構造（概念）
while (true) {
  const response = await callModel(messages);  // LLMを呼ぶ
  if (response.stop_reason === "end_turn") break;  // 完了判定
  for (const toolCall of response.tool_calls) {
    const result = await executeTool(toolCall);  // ツール実行
    messages.push({ role: "tool", content: result });  // 結果を返す
  }
}`}
          language="typescript"
          filename="Agent Loop（概念コード）"
        />

        <p className="text-slate-600 leading-relaxed">
          このループの中で Claude Code は以下のツールにアクセスします：
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">ファイル操作</h3>
            <p className="mt-1 text-xs text-slate-500">Read / Write / Edit / Glob / Grep</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">シェル実行</h3>
            <p className="mt-1 text-xs text-slate-500">Bash（サンドボックス内）</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">サブエージェント</h3>
            <p className="mt-1 text-xs text-slate-500">Agent（独立したメッセージ配列で並列実行）</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">Web アクセス</h3>
            <p className="mt-1 text-xs text-slate-500">WebFetch / WebSearch（制限付き）</p>
          </div>
        </div>

        {/* 従来ツールとの違い */}
        <h2 className="text-xl font-bold text-slate-900">GitHub Copilot / ChatGPT との違い</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 pr-4 text-left font-semibold text-slate-900" />
                <th className="py-2 px-4 text-left font-semibold text-slate-900">Copilot</th>
                <th className="py-2 px-4 text-left font-semibold text-slate-900">ChatGPT</th>
                <th className="py-2 pl-4 text-left font-semibold text-emerald-700">Claude Code</th>
              </tr>
            </thead>
            <tbody className="text-slate-600">
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium">操作形式</td>
                <td className="py-2 px-4">エディタ内補完</td>
                <td className="py-2 px-4">Webチャット</td>
                <td className="py-2 pl-4 text-emerald-700">ターミナルCLI</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium">ファイル操作</td>
                <td className="py-2 px-4">不可</td>
                <td className="py-2 px-4">不可</td>
                <td className="py-2 pl-4 text-emerald-700">直接読み書き</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium">コマンド実行</td>
                <td className="py-2 px-4">不可</td>
                <td className="py-2 px-4">不可</td>
                <td className="py-2 pl-4 text-emerald-700">サンドボックス内で実行</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 pr-4 font-medium">マルチエージェント</td>
                <td className="py-2 px-4">不可</td>
                <td className="py-2 px-4">不可</td>
                <td className="py-2 pl-4 text-emerald-700">サブエージェント・チーム</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">プロジェクト設定</td>
                <td className="py-2 px-4">限定的</td>
                <td className="py-2 px-4">なし</td>
                <td className="py-2 pl-4 text-emerald-700">CLAUDE.md + agents/</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* セットアップ確認 */}
        <h2 className="text-xl font-bold text-slate-900">セットアップ確認</h2>

        <p className="text-slate-600 leading-relaxed">
          事前準備ガイドでインストールが済んでいることを確認します。
        </p>

        <CodeBlock
          code={`# バージョン確認
claude --version
node -v
git --version

# Claude Code の起動（任意のプロジェクトディレクトリで）
mkdir cc-engineer-practice && cd cc-engineer-practice
git init
claude`}
          language="bash"
        />

        <Callout type="info">
          初回起動時にAnthropicアカウントへの認証が求められます。
          ブラウザが開くので、ログインして認証を完了してください。
        </Callout>

        {/* 基本的なインタラクション */}
        <h2 className="text-xl font-bold text-slate-900">基本的なインタラクション</h2>

        <p className="text-slate-600 leading-relaxed">
          Claude Code が起動したら、自然言語で指示を出します。
          エンジニアとして知っておくべき基本パターン：
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-2 font-semibold text-slate-900">コードベースの理解</h3>
            <CodeBlock code={`このプロジェクトの構造を説明して`} language="text" filename="Claude Code への指示" />
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-2 font-semibold text-slate-900">実装の依頼</h3>
            <CodeBlock code={`Express.js で /api/health エンドポイントを実装して。
レスポンスは { status: "ok", timestamp: ISO8601 } を返す。`} language="text" filename="Claude Code への指示" />
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-2 font-semibold text-slate-900">デバッグ</h3>
            <CodeBlock code={`npm test が失敗する。エラーログを確認して原因を特定し、修正して。`} language="text" filename="Claude Code への指示" />
          </div>
        </div>

        <Callout type="tip">
          Claude Code はコードを直接読み書きしてコマンドを実行します。
          操作の前に「何をするか」の確認が表示されるので、内容を確認してから承認してください。
        </Callout>
      </StepLayout>
    </div>
  );
}
