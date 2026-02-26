import Link from "next/link";
import { intermediateCourse } from "@/lib/courses";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

const prerequisites = [
  {
    title: "初級編を修了していること",
    description:
      "CLAUDE.md・Agent Team・自動ビルド・デプロイの基本を理解済み",
  },
  {
    title: "ターミナルの基本操作",
    description: "cd / ls / git clone 程度のコマンド操作ができる",
  },
  {
    title: "GitHubアカウント",
    description: "リポジトリの作成・Fork・Pushができる状態",
  },
];

const flow = [
  {
    step: "1",
    title: "要求定義をつくる",
    description:
      "外部AI（GPT/Gemini）と相談しながら要求定義書と要件定義書を作成する",
    color: "bg-amber-50 border-amber-200",
    textColor: "text-amber-800",
  },
  {
    step: "2",
    title: "組織をつくる",
    description:
      "エージェントチームの組織図を設計する。誰が何をやるか、監査は誰がするか",
    color: "bg-blue-50 border-blue-200",
    textColor: "text-blue-800",
  },
  {
    step: "3",
    title: "Claude Codeに渡す",
    description:
      "要求定義書をClaude Codeにコピペして開発をスタート",
    color: "bg-purple-50 border-purple-200",
    textColor: "text-purple-800",
  },
  {
    step: "4",
    title: "質問に答えて調整",
    description:
      "Claude Codeが実装を進める。あなたは質問に答えて方向を微調整する",
    color: "bg-green-50 border-green-200",
    textColor: "text-green-800",
  },
  {
    step: "5",
    title: "テスト+監査で品質を担保",
    description:
      "テスト2回実行 + 要求定義・要件定義ベースの外部監査で品質確認",
    color: "bg-red-50 border-red-200",
    textColor: "text-red-800",
  },
];

const goals = [
  {
    grade: "A",
    title: "AIと協力して要求定義を作れる",
    description:
      "「何を作るか」を言語化し、AIに伝わる要求定義書と要件定義書を作成できる",
  },
  {
    grade: "B",
    title: "エージェントチームを設計できる",
    description:
      "誰が何をやるか、品質をどう担保するかを考え、適切なチーム編成ができる",
  },
  {
    grade: "C",
    title: "Claude Codeでサービスを完成させられる",
    description:
      "要求定義を渡し、質問に答えながらサービスを完成まで持っていける",
  },
  {
    grade: "D",
    title: "成果を説明できる",
    description:
      "要求定義→組織設計→完成物の流れを人に説明でき、品質担保の方法を語れる",
  },
];

export default function IntermediatePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-amber-50 to-white px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-intermediate px-3 py-1 text-xs font-bold text-white">
            {intermediateCourse.label}
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            要求定義から開発・監査まで
            <br className="hidden sm:inline" />
            <span className="text-intermediate-dark">一気通貫</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            AIと相談しながら要求定義を作り、
            <br className="hidden sm:inline" />
            エージェントチームに開発を任せて、品質を担保して完成させる。
          </p>
          <p className="mt-2 text-sm text-slate-500">
            所要時間: {intermediateCourse.duration} / コードは全部 Claude Code
            が書きます
          </p>
        </div>
      </section>

      {/* 前提条件 */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-xl font-bold text-slate-900">前提条件</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {prerequisites.map((req) => (
              <div
                key={req.title}
                className="rounded-xl border border-slate-200 p-5"
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                  <svg
                    className="h-4 w-4 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {req.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {req.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 中級編の進め方 */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            中級編の進め方
          </h2>
          <p className="mb-6 text-sm text-slate-600">
            初級編では「AIチームに任せて公開する」体験をしました。
            中級編では「要求定義を作る→チームを設計する→品質を担保する」という
            プロジェクトマネジメントの流れを体験します。
          </p>

          <div className="space-y-3">
            {flow.map((item) => (
              <div
                key={item.step}
                className={`flex items-center gap-4 rounded-lg border p-4 ${item.color}`}
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-sm font-bold ${item.textColor}`}
                >
                  {item.step}
                </span>
                <div>
                  <p className={`font-semibold ${item.textColor}`}>
                    {item.title}
                  </p>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* エージェントチーム */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            エージェントチーム
          </h2>
          <p className="mb-6 text-sm text-slate-600">
            中級編では以下のチーム構成で開発を進めます。
            STEP 2 であなた自身がこの組織を設計します。
          </p>
          <ArchitectureDiagram />
        </div>
      </section>

      {/* タイムライン */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            タイムライン
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            全{intermediateCourse.steps.length}ステップで構成。
            各ステップをクリックすると詳細ページへ移動します。
          </p>
          <div className="space-y-3">
            {intermediateCourse.steps.map((step) => (
              <Link
                key={step.id}
                href={`/intermediate/step/${step.id}`}
                className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-amber-300 hover:shadow-sm"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm font-bold text-amber-700 transition-colors group-hover:bg-amber-200">
                  {step.id}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {step.title}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                      {step.duration}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    {step.description}
                  </p>
                </div>
                <svg
                  className="mt-2 h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-amber-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ゴール */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            ゴールと成功条件
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            中級編を修了したら、以下の4つができるようになります。
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {goals.map((goal) => (
              <div
                key={goal.grade}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
                    {goal.grade}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {goal.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  {goal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-xl font-bold text-slate-900">
            準備はできましたか?
          </h2>
          <p className="mb-8 text-sm text-slate-500">
            まずは環境準備から始めましょう。
          </p>
          <Link
            href="/intermediate/step/0"
            className="inline-flex items-center gap-2 rounded-lg bg-intermediate px-8 py-3 text-base font-semibold text-white transition-colors hover:opacity-90"
          >
            STEP 0 から始める
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
