import Link from "next/link";
import { engineerCourse } from "@/lib/courses";

const prerequisites = [
  {
    title: "ターミナル操作に慣れている",
    description: "cd / ls / git / npm 等の基本コマンドを日常的に使っている",
  },
  {
    title: "プログラミング経験がある",
    description: "言語は問わない。TypeScript推奨だがPython/Go等でもOK",
  },
  {
    title: "Claude Code は未経験でOK",
    description: "このコースでゼロから学びます",
  },
];

const flow = [
  {
    step: "1",
    title: "Claude Code を理解する",
    description: "アーキテクチャ・CLI操作・CLAUDE.md・パーミッション設定を把握",
    color: "bg-emerald-50 border-emerald-200",
    textColor: "text-emerald-800",
  },
  {
    step: "2",
    title: "セキュリティを設計する",
    description: "サンドボックス・権限設定・Hooks・組織ポリシーを実装",
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-800",
  },
  {
    step: "3",
    title: "エージェントチームを設計する",
    description: "役割分担・ファイルオーナーシップ・並列実行パターンを設計",
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-800",
  },
  {
    step: "4",
    title: "実践でサービスを構築する",
    description: "設計したチームでバックエンドサービスを一気通貫で構築",
    color: "bg-amber-50 border-amber-200",
    textColor: "text-amber-800",
  },
  {
    step: "5",
    title: "品質管理とスケーリング",
    description: "テスト自動化・監査・実プロジェクトへの導入パターンを習得",
    color: "bg-red-50 border-red-200",
    textColor: "text-red-800",
  },
];

const goals = [
  {
    grade: "A",
    title: "Claude Code のセキュリティ設計ができる",
    description: "サンドボックス・パーミッション・Hooks を組み合わせた安全な環境を構築できる",
  },
  {
    grade: "B",
    title: "エージェントチームを設計・構成できる",
    description: "プロジェクトに合わせたエージェント定義と役割分担を設計し、CLAUDE.md に落とし込める",
  },
  {
    grade: "C",
    title: "オーケストレーションで開発を回せる",
    description: "Hub-spoke・並列実行・ファイルオーナーシップを活用してプロジェクトを進行できる",
  },
  {
    grade: "D",
    title: "実プロジェクトに導入できる",
    description: "既存のチーム・プロジェクトにAIエージェントチームを段階的に導入する計画を立てられる",
  },
];

export default function EngineerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-emerald-50 to-white px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-engineer px-3 py-1 text-xs font-bold text-white">
            {engineerCourse.label}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            エンジニアのための
            <br className="hidden sm:inline" />
            <span className="text-engineer-dark">Claude Code 実践</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            ターミナルに慣れたエンジニアが、
            <br className="hidden sm:inline" />
            AIエージェントチームを設計・運用するスキルを身につける。
          </p>
          <p className="mt-2 text-sm text-slate-500">
            所要時間: {engineerCourse.duration} / Claude Code 未経験OK
          </p>
        </div>
      </section>

      {/* 前提条件 */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-xl font-bold text-slate-900">前提条件</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {prerequisites.map((req) => (
              <div key={req.title} className="rounded-xl border border-slate-200 p-5">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                  <svg className="h-4 w-4 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-slate-900">{req.title}</h3>
                <p className="mt-1 text-xs text-slate-500">{req.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 初級・中級編との違い */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-slate-900">初級・中級編との違い</h2>
          <p className="mb-6 text-sm text-slate-600">
            初級・中級編は「非エンジニアがAIチームを体験する」ことに重点を置いています。
            エンジニア編では「なぜそう設計するのか」「実プロジェクトにどう導入するか」を深掘りします。
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
              <h3 className="font-semibold text-blue-800">初級編</h3>
              <p className="mt-2 text-sm text-blue-700">AIチームに任せてサービスを公開する体験</p>
              <p className="mt-1 text-xs text-blue-600">対象: 非エンジニア</p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <h3 className="font-semibold text-amber-800">中級編</h3>
              <p className="mt-2 text-sm text-amber-700">要求定義→組織設計→品質担保のPM体験</p>
              <p className="mt-1 text-xs text-amber-600">対象: 初級修了者</p>
            </div>
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <h3 className="font-semibold text-emerald-800">エンジニア編（本コース）</h3>
              <p className="mt-2 text-sm text-emerald-700">セキュリティ設計+エージェント設計+実装の技術深掘り</p>
              <p className="mt-1 text-xs text-emerald-600">対象: エンジニア（CC未経験OK）</p>
            </div>
          </div>
        </div>
      </section>

      {/* 進め方 */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-xl font-bold text-slate-900">エンジニア編の進め方</h2>
          <div className="space-y-3">
            {flow.map((item) => (
              <div key={item.step} className={`flex items-center gap-4 rounded-lg border p-4 ${item.color}`}>
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold ${item.textColor}`}>
                  {item.step}
                </span>
                <div>
                  <p className={`font-semibold ${item.textColor}`}>{item.title}</p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* タイムライン */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-slate-900">タイムライン</h2>
          <p className="mb-6 text-sm text-slate-500">
            全{engineerCourse.steps.length}ステップで構成。各ステップをクリックすると詳細ページへ移動します。
          </p>
          <div className="space-y-3">
            {engineerCourse.steps.map((step) => (
              <Link
                key={step.id}
                href={`/engineer/step/${step.id}`}
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-emerald-300 hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-700 transition-colors group-hover:bg-emerald-200">
                  {step.id}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">{step.title}</h3>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">{step.duration}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{step.description}</p>
                </div>
                <svg className="mt-2 h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-emerald-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ゴール */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-slate-900">ゴールと成功条件</h2>
          <p className="mb-6 text-sm text-slate-500">
            エンジニア編を修了したら、以下の4つができるようになります。
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {goals.map((goal) => (
              <div key={goal.grade} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                    {goal.grade}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">{goal.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">{goal.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-xl font-bold text-slate-900">準備はできましたか?</h2>
          <p className="mb-8 text-sm text-slate-500">
            事前準備がまだの方は先にセットアップガイドをご確認ください。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/preparation"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              事前準備ガイド
            </Link>
            <Link
              href="/engineer/step/0"
              className="inline-flex items-center gap-2 rounded-lg bg-engineer px-8 py-3 text-base font-semibold text-white transition-colors hover:opacity-90"
            >
              STEP 0 から始める
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
