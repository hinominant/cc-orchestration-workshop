import Link from "next/link";

const timeline = [
  {
    step: 0,
    title: "環境確認 + スターターFork",
    duration: "10分",
    description: "ツール確認とスターターリポジトリのFork",
    color: "bg-slate-500",
  },
  {
    step: 1,
    title: "AIチームのしくみ",
    duration: "10分",
    description: "CLAUDE.mdとエージェント定義を理解する",
    color: "bg-blue-500",
  },
  {
    step: 2,
    title: "講師デモ",
    duration: "15分",
    description: "エージェントチームが動く様子を見る",
    color: "bg-indigo-500",
  },
  {
    step: 3,
    title: "あなたのサービスを作ろう",
    duration: "40分",
    description: "アイデアを一言伝えてエージェントが自動ビルド",
    color: "bg-purple-500",
  },
  {
    step: 4,
    title: "カスタマイズ",
    duration: "20分",
    description: "修正依頼とCLAUDE.md編集で出力を変える",
    color: "bg-violet-500",
  },
  {
    step: 5,
    title: "GitHub push",
    duration: "10分",
    description: "コードをGitHubにアップロード",
    color: "bg-cyan-500",
  },
  {
    step: 6,
    title: "Vercel公開",
    duration: "10分",
    description: "サービスをインターネットに公開",
    color: "bg-teal-500",
  },
  {
    step: 7,
    title: "振り返り + ロードマップ",
    duration: "10分",
    description: "学びの整理と次のステップ",
    color: "bg-green-500",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Claude Code x{" "}
            <span className="text-primary">オーケストレーション</span>講座
          </h1>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            AIを&quot;道具&quot;として使うから、AIを&quot;チーム&quot;として動かすへ。
          </p>
          <p className="mt-2 text-sm text-slate-500">
            アイデアを一言伝えるだけで、AIチームが設計・実装・検証を自動で行う体験
          </p>
          <Link
            href="/step/0"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-primary-dark"
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

      {/* Timeline */}
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-slate-900">
            120分のタイムライン
          </h2>
          <p className="mb-12 text-center text-sm text-slate-500">
            全8ステップで、あなたのサービスを世界に公開します
          </p>

          <div className="space-y-4">
            {timeline.map((item) => (
              <Link
                key={item.step}
                href={`/step/${item.step}`}
                className="group flex items-start gap-4 rounded-xl border border-slate-200 p-4 transition-all hover:border-primary/30 hover:shadow-sm sm:p-5"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${item.color}`}
                >
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-slate-900 group-hover:text-primary">
                      {item.title}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-500">
                      {item.duration}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    {item.description}
                  </p>
                </div>
                <svg
                  className="mt-2 h-5 w-5 shrink-0 text-slate-300 transition-colors group-hover:text-primary"
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
    </div>
  );
}
