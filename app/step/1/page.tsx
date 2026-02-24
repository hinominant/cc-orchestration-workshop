import { StepLayout } from "@/components/StepLayout";
import { Callout } from "@/components/Callout";

export default function Step1Page() {
  return (
    <div className="px-4 py-8 sm:px-6 sm:py-12">
      <StepLayout
        stepNumber={1}
        title="思想理解 -- AIはチームである"
        duration="10分"
        prevStep={0}
        nextStep={2}
      >
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6 sm:p-8">
          <p className="text-center text-xl font-bold text-slate-800 sm:text-2xl">
            「AIは検索エンジンではない。チームである。」
          </p>
        </div>

        <p className="text-slate-600 leading-relaxed">
          多くの人はAIを「賢い検索エンジン」として使っています。
          しかし、本当に力を発揮するのは、AIに<strong>役割を与えてチームとして動かす</strong>ときです。
          この講座では、その考え方を体験します。
        </p>

        {/* 3つのポイント */}
        <h2 className="text-xl font-bold text-slate-900">3つのポイント</h2>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-600">
                1
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  単発利用は弱い
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  「何か面白いアイデアを出して」と聞くだけでは、表面的な回答しか返ってきません。
                  1回の質問で完璧な結果が出ることは、まずありません。
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
                  分業で強くなる
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  人間のチームと同じです。企画担当・批判担当・実行担当に分ければ、
                  それぞれが専門性を発揮し、全体の質が上がります。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-600">
                3
              </span>
              <div>
                <h3 className="font-semibold text-slate-900">
                  整理 → 批判 → 実行
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  この講座のコアコンセプトです。
                  まず考えを整理し、その内容を批判的に検証し、最後に実行する。
                  この3ステップが品質を劇的に上げます。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 比較図解 */}
        <h2 className="text-xl font-bold text-slate-900">
          1人のAI vs チームとしてのAI
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-5">
            <h3 className="mb-3 text-center font-bold text-red-700">
              従来の使い方
            </h3>
            <div className="space-y-2 text-sm text-red-600">
              <div className="flex items-center gap-2">
                <span aria-hidden="true">x</span>
                <span>1つの質問で全部任せる</span>
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden="true">x</span>
                <span>結果をそのまま使う</span>
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
              チームとしての使い方
            </h3>
            <div className="space-y-2 text-sm text-green-600">
              <div className="flex items-center gap-2">
                <span aria-hidden="true">o</span>
                <span>役割を分けて段階的に進める</span>
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden="true">o</span>
                <span>各段階でフィードバック</span>
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden="true">o</span>
                <span>安定した高品質</span>
              </div>
            </div>
            <div className="mt-4 rounded bg-white p-3 text-center text-xs text-slate-500">
              あなた → 整理役 → 批判役 → 実行役 → 結果
            </div>
          </div>
        </div>

        <Callout type="tip">
          この考え方は、AIだけでなく人間のチームワークにも応用できます。
          「まず整理する人」「穴を見つける人」「実行する人」を分けると、
          会議や企画の質が格段に上がります。
        </Callout>
      </StepLayout>
    </div>
  );
}
