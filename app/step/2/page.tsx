import { StepLayout } from "@/components/StepLayout";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

export default function Step2Page() {
  const demoPrompt = `チーム紹介ページを作って。メンバーは佐藤花子(PM)、鈴木太郎(エンジニア)、高橋美咲(デザイナー)の3人。各メンバーのカード表示で、趣味も載せて。`;

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={2}
        title="講師デモ"
        duration="15分"
        prevStep={1}
        nextStep={3}
      >
        <div className="rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-6 sm:p-8">
          <p className="text-center text-xl font-bold text-slate-800 sm:text-2xl">
            エージェントチームが動く様子を見てみよう
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            講師がスターターリポジトリでClaude Codeを開き、
            一言伝えるだけでサービスが出来上がる過程を実演します
          </p>
        </div>

        {/* デモの流れ */}
        <h2 className="text-xl font-bold text-slate-900">デモの流れ</h2>

        <p className="text-slate-600 leading-relaxed">
          講師がClaude Codeに以下の一言を入力します。
          コードは1行も手で書きません。
        </p>

        <CodeBlock code={demoPrompt} language="prompt" />

        <div className="space-y-4">
          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
              1
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                Sherpa がタスクを分解
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                「ページ構成はどうするか」「データ構造はどうするか」
                「コンポーネントは何が必要か」をエージェントが自動で計画します。
              </p>
              <p className="mt-2 text-xs text-slate-400">
                注目: CLAUDE.mdの技術制約（Next.js + Tailwind CSS）に沿って計画していることを確認
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-lg font-bold text-purple-600">
              2
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                Artisan がコードを実装
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Next.jsのページファイル、コンポーネント、スタイリングを自動で書いていきます。
                ファイルが次々に作成される様子が見えます。
              </p>
              <p className="mt-2 text-xs text-slate-400">
                注目: ファイルが自動生成される速さ。人間が書いたら何時間かかるか想像してみてください
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-600">
              3
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                Radar がビルド確認
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                コードにエラーがないか、正しくビルドできるかを検証します。
                問題があれば自動で修正されます。
              </p>
              <p className="mt-2 text-xs text-slate-400">
                注目: エラーが出ても自動修正される。人間が「直して」と頼む必要すらない場合がある
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-600">
              4
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                ブラウザで表示確認
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-700">npm run dev</code> でローカルサーバーを起動し、
                ブラウザでチーム紹介ページが表示されることを確認します。
              </p>
            </div>
          </div>
        </div>

        <CodeBlock code="npm run dev" language="bash" />

        {/* 注目ポイント */}
        <h2 className="text-xl font-bold text-slate-900">ここが重要</h2>

        <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50 p-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
                1
              </span>
              <p className="text-sm text-indigo-800">
                <strong>コードを1行も書いていない</strong> -- 自然な日本語で伝えただけ
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
                2
              </span>
              <p className="text-sm text-indigo-800">
                <strong>設計→実装→検証が自動</strong> -- エージェントが連携して動いた
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-xs font-bold text-white">
                3
              </span>
              <p className="text-sm text-indigo-800">
                <strong>CLAUDE.mdがあるから安定する</strong> -- 技術制約を守った上で実装された
              </p>
            </div>
          </div>
        </div>

        <Callout type="tip">
          メモを取りながら見てください。特に「自分のサービスだったら、こう伝えよう」
          というアイデアが浮かんだら書き留めておきましょう。次のSTEPで使います。
        </Callout>

        <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
          <p className="text-lg font-semibold text-slate-700">
            デモが終わったら、次のSTEPへ
          </p>
          <p className="mt-1 text-sm text-slate-500">
            いよいよ、あなた自身のサービスをエージェントチームに作ってもらいます
          </p>
        </div>
      </StepLayout>
    </div>
  );
}
