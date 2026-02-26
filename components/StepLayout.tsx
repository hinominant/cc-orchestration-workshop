import Link from "next/link";

interface StepLayoutProps {
  stepNumber: number;
  title: string;
  duration: string;
  children: React.ReactNode;
  prevStep?: number;
  nextStep?: number;
  nextDisabled?: boolean;
  courseBase?: string;
  courseLabel?: string;
  topHref?: string;
  accentColor?: string;
}

export function StepLayout({
  stepNumber,
  title,
  duration,
  children,
  prevStep,
  nextStep,
  courseBase = "/step",
  courseLabel,
  topHref = "/",
  accentColor,
}: StepLayoutProps) {
  const badgeClass = accentColor
    ? `inline-flex items-center rounded-full px-3 py-1 text-xs font-bold text-white ${accentColor}`
    : "inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold text-white";

  const nextBtnClass = accentColor
    ? `inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors ${accentColor} hover:opacity-90`
    : "inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark";

  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-8">
        <div className="mb-2 flex items-center gap-3">
          <span className={badgeClass}>
            {courseLabel ? `${courseLabel} ` : ""}STEP {stepNumber}
          </span>
          <span className="text-sm text-slate-500">{duration}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          {title}
        </h1>
      </header>

      <div className="prose-slate max-w-none space-y-6">{children}</div>

      <footer className="mt-12 flex items-center justify-between border-t border-slate-200 pt-6">
        {prevStep !== undefined ? (
          <Link
            href={`${courseBase}/${prevStep}`}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            STEP {prevStep} へ戻る
          </Link>
        ) : (
          <Link
            href={topHref}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            トップへ
          </Link>
        )}

        {nextStep !== undefined ? (
          <Link
            href={`${courseBase}/${nextStep}`}
            className={nextBtnClass}
          >
            STEP {nextStep} へ進む
            <svg
              className="h-4 w-4"
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
        ) : (
          <Link
            href={topHref}
            className={nextBtnClass}
          >
            トップへ戻る
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        )}
      </footer>
    </article>
  );
}
