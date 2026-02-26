import Link from "next/link";
import { beginnerCourse, intermediateCourse } from "@/lib/courses";

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            株式会社Luna 社内研修システム
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Claude Code x{" "}
            <span className="text-primary">オーケストレーション</span>講座
          </h1>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            AIを&quot;道具&quot;として使うから、AIを&quot;チーム&quot;として動かすへ。
          </p>
          <p className="mt-2 text-sm text-slate-500">
            目的に合わせてコースを選択してください
          </p>
        </div>
      </section>

      {/* Concept */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 p-5 text-center">
              <div className="mb-2 text-3xl font-bold text-blue-500" aria-hidden="true">1</div>
              <h3 className="font-semibold text-slate-900">指示書を定義</h3>
              <p className="mt-1 text-sm text-slate-500">
                CLAUDE.mdでプロジェクトの方向性を定義する
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5 text-center">
              <div className="mb-2 text-3xl font-bold text-purple-500" aria-hidden="true">2</div>
              <h3 className="font-semibold text-slate-900">チームに任せる</h3>
              <p className="mt-1 text-sm text-slate-500">
                専門エージェントが自動で設計・実装・検証
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-5 text-center">
              <div className="mb-2 text-3xl font-bold text-green-500" aria-hidden="true">3</div>
              <h3 className="font-semibold text-slate-900">結果を調整</h3>
              <p className="mt-1 text-sm text-slate-500">
                確認して修正を依頼し、指示書を改善する
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Selection */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-slate-900">
            コースを選ぶ
          </h2>
          <p className="mb-12 text-center text-sm text-slate-500">
            まずは初級編から。中級編は初級編を修了した方が対象です。
          </p>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Beginner Course Card */}
            <div className="group rounded-2xl border-2 border-blue-200 bg-gradient-to-b from-blue-50 to-white p-6 transition-all hover:border-blue-400 hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                  {beginnerCourse.label}
                </span>
                <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                  {beginnerCourse.duration}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {beginnerCourse.subtitle}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                事前設定されたエージェントチームに仕事を任せ、サービスを設計・構築・公開する体験
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">CLAUDE.md</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">Agent Team</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">自動ビルド</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">Vercelデプロイ</span>
              </div>

              {/* Step list */}
              <div className="mt-5 space-y-1.5">
                {beginnerCourse.steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">
                      {step.id}
                    </span>
                    <span className="truncate">{step.title}</span>
                    <span className="ml-auto text-slate-400">{step.duration}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/step/0"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                STEP 0 から始める
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Intermediate Course Card */}
            <div className="group rounded-2xl border-2 border-amber-200 bg-gradient-to-b from-amber-50 to-white p-6 transition-all hover:border-amber-400 hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-intermediate px-3 py-1 text-xs font-bold text-white">
                  {intermediateCourse.label}
                </span>
                <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                  {intermediateCourse.duration}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {intermediateCourse.subtitle}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                要求定義から組織設計・開発・品質担保まで、一気通貫でサービスを構築する体験
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">要求定義</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">組織設計</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">品質担保</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">Vercelデプロイ</span>
              </div>

              {/* Step list */}
              <div className="mt-5 space-y-1.5">
                {intermediateCourse.steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-600">
                      {step.id}
                    </span>
                    <span className="truncate">{step.title}</span>
                    <span className="ml-auto text-slate-400">{step.duration}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/intermediate"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-intermediate px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
              >
                中級編を始める
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
