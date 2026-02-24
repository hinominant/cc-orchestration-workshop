import Link from "next/link";

const timeline = [
  {
    step: 0,
    title: "環境確認",
    duration: "10分",
    description: "必要なツールが揃っているか確認",
    color: "bg-slate-500",
  },
  {
    step: 1,
    title: "思想理解",
    duration: "10分",
    description: "AIをチームとして活用する考え方",
    color: "bg-blue-500",
  },
  {
    step: 2,
    title: "講師デモ",
    duration: "15分",
    description: "実際のサービス構築を見る",
    color: "bg-indigo-500",
  },
  {
    step: 3,
    title: "サービス設計",
    duration: "40分",
    description: "整理・批判・実行の3分業で設計",
    color: "bg-purple-500",
  },
  {
    step: 4,
    title: "コード生成",
    duration: "20分",
    description: "Claude Codeでコードを生成",
    color: "bg-violet-500",
  },
  {
    step: 5,
    title: "GitHub連携",
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
    title: "振り返り",
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
            Claude Code ×{" "}
            <span className="text-primary">オーケストレーション</span>講座
          </h1>
          <p className="mt-4 text-lg text-slate-600 sm:text-xl">
            AIを&quot;使う&quot;から、AIに&quot;任せる&quot;へ。
          </p>
          <p className="mt-2 text-sm text-slate-500">
            非エンジニアが2時間でサービスを設計・構築・公開するチュートリアル
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
