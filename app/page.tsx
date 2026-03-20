import Link from "next/link";
import { beginnerCourse, intermediateCourse, engineerCourse } from "@/lib/courses";

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

      {/* 事前準備リンク */}
      <section className="px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/preparation"
            className="group flex items-center justify-between rounded-xl border-2 border-slate-200 bg-slate-50 p-5 transition-all hover:border-slate-400 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 transition-colors group-hover:bg-slate-300">
                <svg className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.22-3.04a1.6 1.6 0 01-.8-1.38V7.39a1.6 1.6 0 01.8-1.38l5.22-3.04a1.6 1.6 0 011.6 0l5.22 3.04c.49.29.8.81.8 1.38v3.36c0 .57-.31 1.09-.8 1.38l-5.22 3.04a1.6 1.6 0 01-1.6 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900">事前準備・セットアップガイド</h3>
                <p className="mt-0.5 text-sm text-slate-500">
                  Claude Codeとは？ / インストール手順（Mac・Windows）/ 読んでおくべき記事 / セキュリティ設定
                </p>
              </div>
            </div>
            <svg className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-slate-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
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
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-slate-900">
            コースを選ぶ
          </h2>
          <p className="mb-12 text-center text-sm text-slate-500">
            経験に合わせてコースを選択してください
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
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
              <div className="mt-3 rounded-lg bg-blue-50 p-3">
                <p className="text-xs font-medium text-blue-700">対象</p>
                <p className="text-xs text-blue-600">非エンジニア・コード未経験OK</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">CLAUDE.md</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">Agent Team</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">自動ビルド</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">Vercelデプロイ</span>
              </div>

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
              <div className="mt-3 rounded-lg bg-amber-50 p-3">
                <p className="text-xs font-medium text-amber-700">対象</p>
                <p className="text-xs text-amber-600">初級編修了者</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">要求定義</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">組織設計</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">品質担保</span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700">Vercelデプロイ</span>
              </div>

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

            {/* Engineer Course Card */}
            <div className="group rounded-2xl border-2 border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-6 transition-all hover:border-emerald-400 hover:shadow-lg">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-flex items-center rounded-full bg-engineer px-3 py-1 text-xs font-bold text-white">
                  {engineerCourse.label}
                </span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  {engineerCourse.duration}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {engineerCourse.subtitle}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Claude Code未経験のエンジニアがAIチーム運用を実践的に習得する
              </p>
              <div className="mt-3 rounded-lg bg-emerald-50 p-3">
                <p className="text-xs font-medium text-emerald-700">対象</p>
                <p className="text-xs text-emerald-600">エンジニア（CC未経験OK・ターミナル操作可能）</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">セキュリティ</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">エージェント設計</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">オーケストレーション</span>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700">品質管理</span>
              </div>

              <div className="mt-5 space-y-1.5">
                {engineerCourse.steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-600">
                      {step.id}
                    </span>
                    <span className="truncate">{step.title}</span>
                    <span className="ml-auto text-slate-400">{step.duration}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/engineer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-engineer px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90"
              >
                エンジニア編を始める
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
