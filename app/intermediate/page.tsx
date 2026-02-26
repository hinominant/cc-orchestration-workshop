import Link from "next/link";
import { intermediateCourse } from "@/lib/courses";
import { UseCaseList } from "@/components/UseCaseList";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { RequirementsTemplate } from "@/components/RequirementsTemplate";
import { Rubric } from "@/components/Rubric";

const prerequisites = [
  {
    title: "初級編を修了していること",
    description: "CLAUDE.md・Agent Team・自動ビルド・デプロイの基本を理解済み",
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

const goals = [
  {
    grade: "A",
    title: "要求定義からの設計",
    description: "ユースケース・非機能要件・運用設計を網羅した要求定義書を作成し、設計に落とし込める",
  },
  {
    grade: "B",
    title: "セキュリティ実装",
    description: "Webhook署名検証・PIIマスク・監査ログなど、実サービス水準のセキュリティを実装できる",
  },
  {
    grade: "C",
    title: "信頼性と観測性",
    description: "冪等性・リトライ・DLQ・構造化ログ・メトリクスにより、障害に強い基盤を構築できる",
  },
  {
    grade: "D",
    title: "運用設計",
    description: "アラート・手順書・環境分離など、本番運用に必要な設計を行える",
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
            中級編:{" "}
            <span className="text-intermediate-dark">
              Event Orchestration Service
            </span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            要求定義からセキュリティ・信頼性・観測性まで、
            <br className="hidden sm:inline" />
            実サービス水準のオーケストレーション基盤を構築する。
          </p>
          <p className="mt-2 text-sm text-slate-500">
            所要時間: {intermediateCourse.duration}
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

      {/* このコースで作るもの */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            このコースで作るもの
          </h2>
          <p className="mb-6 text-sm text-slate-600">
            Event Orchestration Service（EOS）は、外部プロバイダーからのWebhookイベントを受信し、
            ルールに基づいて処理を振り分け、結果を通知するオーケストレーション基盤です。
            初級編で学んだAgent Teamの仕組みを使い、要求定義から設計・実装・運用設計までを一貫して行います。
          </p>
          <ArchitectureDiagram />
        </div>
      </section>

      {/* ユースケース一覧 */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            ユースケース一覧
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            EOSが満たすべき6つのユースケース。MUSTは必須、SHOULDは推奨です。
          </p>
          <UseCaseList />
        </div>
      </section>

      {/* 要求定義テンプレート */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            要求定義テンプレート
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            STEP 1 ではこのテンプレートに沿って要求定義書を完成させます。
          </p>
          <RequirementsTemplate />
        </div>
      </section>

      {/* タイムライン */}
      <section className="px-4 py-12 sm:px-6">
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
                className="group flex items-start gap-4 rounded-xl border border-slate-200 p-4 transition-all hover:border-amber-300 hover:shadow-sm"
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

      {/* ゴールと成功条件 */}
      <section className="bg-slate-50 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-xl font-bold text-slate-900">
            ゴールと成功条件
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            4つの評価軸でRubricに基づいた自己評価を行います。
          </p>
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
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
          <Rubric />
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
