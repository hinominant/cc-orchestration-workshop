import { StepLayout } from "@/components/StepLayout";
import { Callout } from "@/components/Callout";

export default function Step2Page() {
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
            今から講師がデモを見せます
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            実際にサービスを設計して、コードを生成し、公開するまでの流れを見てください
          </p>
        </div>

        <h2 className="text-xl font-bold text-slate-900">注目ポイント</h2>

        <p className="text-slate-600 leading-relaxed">
          デモを見るときは、以下の4つのポイントに注目してください。
          後でご自身が同じことをやるので、「何を」「どんな順番で」やっているかが重要です。
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
              1
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                サービスの設計プロセス
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                どんなサービスを作るのか、どうやって考えを整理しているか。
                「整理役」「批判役」「実行役」がどう機能するかを見てください。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
              2
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                AIへの役割の与え方
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                どんな言葉で指示を出しているか。
                「あなたは整理役です」と明確に伝えることで、AIの回答の質が変わります。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
              3
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">
                Claude Codeの操作
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                ターミナルでどうやってClaude Codeと対話するか。
                どんなプロンプトを入力し、どんな結果が返ってくるかを見てください。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 rounded-lg border border-slate-200 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600">
              4
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">公開までの流れ</h3>
              <p className="mt-1 text-sm text-slate-600">
                コード生成 → GitHub → Vercel の流れ。
                たった数ステップで、サービスがインターネットに公開されることを確認してください。
              </p>
            </div>
          </div>
        </div>

        <Callout type="tip">
          メモを取りながら見てください。特に「自分のサービスだったら、こうしたい」
          というアイデアが浮かんだら書き留めておきましょう。STEP 3 で使います。
        </Callout>

        <div className="rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
          <p className="text-lg font-semibold text-slate-700">
            デモが終わったら、次のSTEPへ
          </p>
          <p className="mt-1 text-sm text-slate-500">
            いよいよ、あなた自身のサービスを設計します
          </p>
        </div>
      </StepLayout>
    </div>
  );
}
