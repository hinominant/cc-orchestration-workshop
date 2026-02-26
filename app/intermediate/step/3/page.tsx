import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function IntermediateStep3Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={3}
        title="要求定義をぶち込む"
        duration="20分"
        prevStep={2}
        nextStep={4}
        courseBase="/intermediate/step"
        courseLabel="中級"
        topHref="/intermediate"
        accentColor="bg-intermediate"
      >
        <p className="text-slate-600 leading-relaxed">
          要求定義ができたら、Claude Code に渡して開発スタートです。
          ここからはAIが主役。あなたは1行もコードを書きません。
        </p>

        {/* Claude Code の確認 */}
        <h2 className="text-xl font-bold text-slate-900">Claude Code の確認</h2>
        <p className="text-slate-600 leading-relaxed">
          Claude Code が起動していなければ、プロジェクトディレクトリで{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono">claude</code>{" "}
          を実行して起動してください。
        </p>

        {/* 要求定義書・要件定義書をコピペする */}
        <h2 className="text-xl font-bold text-slate-900">要求定義書・要件定義書をコピペする</h2>
        <p className="text-slate-600 leading-relaxed">
          STEP 2 で外部AI（GPT / Gemini など）を使って作成した要求定義書と要件定義書を、
          プロジェクトに保存します。
        </p>

        <div className="my-6 space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">1. 要求定義書を保存</h3>
            <p className="mt-1 text-sm text-slate-600">
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono">docs/requirements.md</code>{" "}
              を作成し、外部AIで作成した要求定義書の内容をコピペしてください。
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">2. 要件定義書を保存</h3>
            <p className="mt-1 text-sm text-slate-600">
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono">docs/specifications.md</code>{" "}
              を作成し、外部AIで作成した要件定義書の内容をコピペしてください。
            </p>
          </div>
        </div>

        <Callout type="tip">
          要求定義書は「何を作るか（What）」、要件定義書は「どう作るか（How）」です。
          この2つがあれば、Claude Code は具体的な実装計画を立てられます。
        </Callout>

        <h3 className="text-lg font-semibold text-slate-900">最初の指示</h3>
        <p className="text-slate-600 leading-relaxed">
          Claude Code に入力する文章はこれだけです。コピーしてそのまま貼り付けてください。
        </p>

        <CodeBlock
          code={`docs/requirements.md と docs/specifications.md を読んで、
この要求定義と要件定義に基づいてメール配信システムを実装してください。
CLAUDE.md のルールに従い、エージェントチームで開発を進めてください。`}
          language="text"
          filename="Claude Code への最初の指示"
        />

        <Callout type="tip">
          最初の指示は「要求定義と要件定義を読んで実装してください」で十分です。
          細かい指示は後から追加できます。
          具体的すぎる指示はかえって逆効果になることがあります。
          要求定義書と要件定義書があるので、大まかに伝えればAIが自分で計画を立てます。
        </Callout>

        {/* Claude Code が動き始めたら */}
        <h2 className="text-xl font-bold text-slate-900">Claude Code が動き始めたら</h2>
        <p className="text-slate-600 leading-relaxed">
          指示を送ると、Claude Code はすぐに動き始めます。
          画面にはエージェントが考えている内容や、実行しているコマンドが表示されます。
        </p>

        <div className="my-6 space-y-3">
          {[
            {
              step: 1,
              label: "要求定義書・要件定義書を読み込む",
              description: "docs/requirements.md と docs/specifications.md の内容を分析し、何をどう作るべきか理解します",
              color: "border-blue-300 bg-blue-50",
            },
            {
              step: 2,
              label: "計画を立てる",
              description: "どのファイルを作るか、どの順番で実装するかを自動で決めます",
              color: "border-amber-300 bg-amber-50",
            },
            {
              step: 3,
              label: "コードを書く",
              description: "TypeScript のコードを自動生成し、ファイルに書き込みます",
              color: "border-purple-300 bg-purple-50",
            },
            {
              step: 4,
              label: "テストを実行する",
              description: "書いたコードが正しく動くか、自動でテストします",
              color: "border-green-300 bg-green-50",
            },
          ].map((item) => (
            <div key={item.step} className={`flex items-center gap-4 rounded-lg border p-4 ${item.color}`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                {item.step}
              </span>
              <div>
                <p className="font-semibold text-slate-900">{item.label}</p>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-slate-600 leading-relaxed">
          この間、あなたは基本的に見守るだけです。
          Claude Code が確認を求めてきた場合だけ、対応してください。
        </p>

        <Callout type="info">
          Claude Code は要求定義書と要件定義書を読んで、自動で計画を立て、実装を始めます。
          あなたが1行もコードを書く必要はありません。
        </Callout>

        {/* 確認が来たときの対応 */}
        <h2 className="text-xl font-bold text-slate-900">確認が来たときの対応</h2>
        <p className="text-slate-600 leading-relaxed">
          Claude Code は開発を進める中で、あなたに確認を求めることがあります。
          たとえば「ファイルを作成してもいいですか？」「この方針で進めてもいいですか？」といった質問です。
        </p>

        <div className="my-6 rounded-lg border border-slate-200 p-5">
          <h3 className="mb-3 font-semibold text-slate-900">よくある確認と返答</h3>
          <div className="space-y-3">
            <div className="rounded-md bg-slate-50 px-4 py-3">
              <p className="text-sm font-medium text-slate-700">
                「ファイルを作成してもいいですか？」
              </p>
              <p className="mt-1 text-sm text-slate-500">
                → 「はい」または「y」で許可します
              </p>
            </div>
            <div className="rounded-md bg-slate-50 px-4 py-3">
              <p className="text-sm font-medium text-slate-700">
                「npm install を実行してもいいですか？」
              </p>
              <p className="mt-1 text-sm text-slate-500">
                → 「はい」で許可します（パッケージのインストールです）
              </p>
            </div>
            <div className="rounded-md bg-slate-50 px-4 py-3">
              <p className="text-sm font-medium text-slate-700">
                「この方針で進めてもいいですか？」
              </p>
              <p className="mt-1 text-sm text-slate-500">
                → 内容が妥当であれば「お願いします」で進めます
              </p>
            </div>
          </div>
        </div>

        <Callout type="warning">
          Claude Code が確認を求めてきたら、必ず答えてください。
          無視すると開発が止まります。
          何を答えていいかわからない場合は「お願いします」で進めて大丈夫です。
        </Callout>

        {/* 次のSTEPへの橋渡し */}
        <h2 className="text-xl font-bold text-slate-900">次のSTEPに進む前に</h2>
        <p className="text-slate-600 leading-relaxed">
          Claude Code が実装を進めている最中でも、次のSTEPに進んで大丈夫です。
          次のSTEPでは、開発中にあなたがやるべきこと（質問への回答、方向修正など）を学びます。
        </p>

        <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5">
          <h3 className="font-semibold text-amber-800">この STEP のまとめ</h3>
          <ul className="mt-2 space-y-2 text-sm text-amber-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              要求定義書と要件定義書をプロジェクトに保存した
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              Claude Code に要求定義・要件定義を読ませて実装を開始した
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
              Claude Code が自動で計画 → 実装 → テストを進めている
            </li>
          </ul>
        </div>
      </StepLayout>
    </div>
  );
}
