import { StepLayout } from "@/components/StepLayout";
import { Callout } from "@/components/Callout";

export default function Step7Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={7}
        title="振り返り"
        duration="10分"
        prevStep={6}
      >
        <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 sm:p-8">
          <p className="text-center text-2xl font-bold text-slate-800 sm:text-3xl">
            おめでとうございます！
          </p>
          <p className="mt-2 text-center text-sm text-slate-600">
            あなたはAIをチームとして活用し、サービスを設計・構築・公開しました
          </p>
        </div>

        {/* 振り返り3問 */}
        <h2 className="text-xl font-bold text-slate-900">振り返り 3つの問い</h2>
        <p className="text-slate-600 leading-relaxed">
          この講座を通じて学んだことを、自分の言葉で整理してみましょう。
          正解はありません。感じたことを素直に考えてみてください。
        </p>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                1
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  何が一番重要だったか？
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  8つのSTEPの中で、最も価値があったのはどの部分ですか？
                  なぜそう思いますか？
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                2
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  なぜ分業が効いたか？
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  整理役・批判役・実行役に分けたことで、何が変わりましたか？
                  1回で全部やらせた場合と比べてどう違いましたか？
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                3
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  仕事にどう応用できるか？
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  今日学んだ「AIオーケストレーション」の考え方を、
                  明日からの仕事でどう使えそうですか？
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 今日の学び */}
        <h2 className="text-xl font-bold text-slate-900">今日の学び</h2>

        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
              1
            </span>
            <div>
              <p className="font-semibold text-blue-800">
                AIは「道具」ではなく「チーム」
              </p>
              <p className="mt-1 text-sm text-blue-600">
                役割を与えることで、AIの力を最大限に引き出せます。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
              2
            </span>
            <div>
              <p className="font-semibold text-blue-800">
                整理 → 批判 → 実行 の3分業
              </p>
              <p className="mt-1 text-sm text-blue-600">
                この流れは、あらゆる企画・計画に応用できる普遍的なフレームワークです。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
              3
            </span>
            <div>
              <p className="font-semibold text-blue-800">
                完璧じゃなくていい、完成させることが大事
              </p>
              <p className="mt-1 text-sm text-blue-600">
                動くものを作り、公開し、フィードバックを得る。
                そのサイクルが最も価値を生みます。
              </p>
            </div>
          </div>
        </div>

        {/* 次のステップ */}
        <h2 className="text-xl font-bold text-slate-900">次のステップ</h2>
        <p className="text-slate-600 leading-relaxed">
          今日の講座はここまでですが、学びはここからが本番です。
          以下のことに挑戦してみてください。
        </p>

        <div className="space-y-3">
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">
              作ったサービスを改善する
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Claude Code に追加機能を頼んだり、デザインを変えたりしてみましょう。
              コードを書く必要はありません。日本語で依頼するだけです。
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">
              別のサービスを作ってみる
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              今回と同じ流れ（整理→批判→実行→コード生成→公開）で、
              別のアイデアを形にしてみましょう。
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="font-semibold text-slate-900">
              仕事でAIオーケストレーションを試す
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              企画書の作成、会議のアジェンダ作り、問題解決など、
              日常業務で「整理→批判→実行」のフレームワークを使ってみてください。
            </p>
          </div>
        </div>

        <Callout type="tip">
          今日作ったサービスのURLを同僚や友人に共有してみましょう。
          「自分が作った」と言えるサービスがあることは、大きな自信になります。
        </Callout>
      </StepLayout>
    </div>
  );
}
