import { StepLayout } from "@/components/StepLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export default function Step1Page() {
  const claudeMdExample = `# My Service

## Project Overview
- 目的: チーム紹介ページを作る
- 対象: 社内メンバー
- 技術: Next.js + Tailwind CSS

## Technical Constraints
- 静的サイトのみ（DB不要）
- レスポンシブ対応必須`;

  const agentExample = `# Sherpa（計画役）
タスク分解の専門家。
アイデアを具体的なタスクに分解し、
実装の順序と優先度を決める。

# Artisan（実装役）
フロントエンド実装の専門家。
Next.js + Tailwind CSSで
本番品質のUIを構築する。

# Radar（検証役）
テスト・検証の専門家。
ビルドが通るか、表示が正しいか
品質を確認する。`;

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={1}
        title="AIチームのしくみ"
        duration="10分"
        prevStep={0}
        nextStep={2}
      >
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8">
          <p className="text-center text-xl font-bold text-slate-800 sm:text-2xl">
            「AIを道具として使う」から「AIをチームとして動かす」へ
          </p>
        </div>

        <p className="text-slate-600 leading-relaxed">
          多くの人はAIに「1つの質問」をして「1つの回答」をもらいます。
          しかし、AIに<strong>役割を与えてチームとして動かす</strong>と、
          設計・実装・検証まで自動的に行ってくれます。
          その仕組みを見ていきましょう。
        </p>

        {/* 対比図解 */}
        <h2 className="text-xl font-bold text-slate-900">
          「道具」vs「チーム」
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-5">
            <h3 className="mb-3 text-center font-bold text-red-700">
              道具としてのAI
            </h3>
            <div className="space-y-2 text-sm text-red-600">
              <div className="flex items-center gap-2">
                <span aria-hidden="true">x</span>
                <span>1つの質問で全部任せる</span>
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden="true">x</span>
                <span>毎回ゼロから指示する</span>
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden="true">x</span>
                <span>品質にばらつきが出る</span>
              </div>
            </div>
            <div className="mt-4 rounded bg-white p-3 text-center text-xs text-slate-500">
              あなた → AI（1回）→ 結果
            </div>
          </div>

          <div className="rounded-lg border-2 border-green-200 bg-green-50 p-5">
            <h3 className="mb-3 text-center font-bold text-green-700">
              チームとしてのAI
            </h3>
            <div className="space-y-2 text-sm text-green-600">
              <div className="flex items-center gap-2">
                <span aria-hidden="true">o</span>
                <span>専門家が分業して進める</span>
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden="true">o</span>
                <span>指示書で方向性を事前定義</span>
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden="true">o</span>
                <span>安定した高品質</span>
              </div>
            </div>
            <div className="mt-4 rounded bg-white p-3 text-center text-xs text-slate-500">
              あなた → Sherpa → Artisan → Radar → 結果
            </div>
          </div>
        </div>

        {/* CLAUDE.md の説明 */}
        <h2 className="text-xl font-bold text-slate-900">
          CLAUDE.md = チームへの指示書
        </h2>
        <p className="text-slate-600 leading-relaxed">
          スターターリポジトリのルートに <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-700">CLAUDE.md</code> というファイルがあります。
          これはAIチームへの「指示書」です。プロジェクトの目的、技術制約、ワークフローが書いてあります。
        </p>
        <p className="text-slate-600 leading-relaxed">
          <strong>AIはこのファイルを読んでから動きます。</strong>
          つまり、あなたの意図を理解した状態で仕事を始めるのです。
        </p>

        <CodeBlock code={claudeMdExample} language="markdown" filename="CLAUDE.md" />

        <Callout type="tip">
          実際にスターターリポジトリの CLAUDE.md を開いて確認してみましょう。
          ターミナルで以下のコマンドを実行すると内容が表示されます。
        </Callout>

        <CodeBlock code="cat CLAUDE.md" language="bash" />

        {/* agents/ の説明 */}
        <h2 className="text-xl font-bold text-slate-900">
          .claude/agents/ = チームメンバーの定義
        </h2>
        <p className="text-slate-600 leading-relaxed">
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-slate-700">.claude/agents/</code> フォルダには、チームメンバーの「役割定義」が入っています。
          それぞれが専門家として、特定の仕事を担当します。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50/50 p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                S
              </span>
              <h3 className="font-bold text-blue-800">Sherpa（計画役）</h3>
            </div>
            <p className="text-sm text-blue-700">
              アイデアを具体的なタスクに分解する専門家。
              ページ構成、コンポーネント設計、データ構造を決めます。
            </p>
            <p className="mt-2 text-xs text-blue-500">
              ファイル: .claude/agents/sherpa.md
            </p>
          </div>

          <div className="rounded-lg border-2 border-purple-200 bg-purple-50/50 p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm font-bold text-white">
                A
              </span>
              <h3 className="font-bold text-purple-800">Artisan（実装役）</h3>
            </div>
            <p className="text-sm text-purple-700">
              フロントエンドのコードを書く専門家。
              Next.js + Tailwind CSSで本番品質のUIを構築します。
            </p>
            <p className="mt-2 text-xs text-purple-500">
              ファイル: .claude/agents/artisan.md
            </p>
          </div>

          <div className="rounded-lg border-2 border-green-200 bg-green-50/50 p-5">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
                R
              </span>
              <h3 className="font-bold text-green-800">Radar（検証役）</h3>
            </div>
            <p className="text-sm text-green-700">
              コードが正しく動くか確認する専門家。
              ビルド確認、表示確認、品質チェックを行います。
            </p>
            <p className="mt-2 text-xs text-green-500">
              ファイル: .claude/agents/radar.md
            </p>
          </div>
        </div>

        <CodeBlock code={agentExample} language="text" filename=".claude/agents/" />

        <Callout type="info">
          実際にフォルダの中身を確認してみましょう。
        </Callout>

        <CodeBlock code="ls .claude/agents/" language="bash" />

        {/* まとめ */}
        <div className="rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 p-6">
          <h3 className="mb-3 text-center text-lg font-bold text-slate-800">
            オーケストレーション = 指揮
          </h3>
          <p className="text-center text-sm text-slate-600">
            あなたは<strong>指揮者</strong>。AIチームが<strong>オーケストラ</strong>です。
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            CLAUDE.mdで方向を定義し、エージェントに実行を任せる。
          </p>
          <p className="mt-1 text-center text-sm text-slate-600">
            これが「AIオーケストレーション」です。
          </p>
        </div>
      </StepLayout>
    </div>
  );
}
