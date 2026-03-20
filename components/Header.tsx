"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCourseByPath } from "@/lib/courses";
import type { Course } from "@/lib/courses";

function StepTabs({ course, pathname }: { course: Course; pathname: string }) {
  const colorMap: Record<string, { active: string; badge: string }> = {
    intermediate: { active: "bg-intermediate text-white", badge: "bg-white/20 text-white" },
    engineer: { active: "bg-engineer text-white", badge: "bg-white/20 text-white" },
  };
  const colors = colorMap[course.id] ?? { active: "bg-primary text-white", badge: "bg-white/20 text-white" };

  return (
    <ol className="flex gap-0.5 py-2">
      {course.steps.map((step) => {
        const href = `${course.basePath}/${step.id}`;
        const isCurrent = pathname === href;

        return (
          <li key={step.id} className="shrink-0">
            <Link
              href={href}
              aria-current={isCurrent ? "step" : undefined}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                isCurrent
                  ? colors.active
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  isCurrent
                    ? colors.badge
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                {step.id}
              </span>
              <span className="hidden sm:inline">{step.title}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

export function Header() {
  const pathname = usePathname();
  const currentCourse = getCourseByPath(pathname);

  const isHome = pathname === "/";
  const isTopPage = pathname === "/intermediate" || pathname === "/engineer" || pathname === "/preparation";

  const badgeColorMap: Record<string, string> = {
    intermediate: "bg-intermediate-light text-intermediate-dark hover:bg-amber-200",
    engineer: "bg-engineer-light text-engineer-dark hover:bg-emerald-200",
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-base font-bold text-slate-900 hover:text-primary transition-colors sm:text-lg"
        >
          Claude Code x オーケストレーション講座
        </Link>
        {currentCourse && !isHome && !isTopPage && (
          <Link
            href={currentCourse.topPath}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              badgeColorMap[currentCourse.id] ?? "bg-primary-light text-primary-dark hover:bg-blue-200"
            }`}
          >
            {currentCourse.label}
          </Link>
        )}
      </div>
      {currentCourse && !isHome && !isTopPage && (
        <div className="border-t border-slate-100">
          <nav
            aria-label="ステップナビゲーション"
            className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6"
          >
            <StepTabs course={currentCourse} pathname={pathname} />
          </nav>
        </div>
      )}
    </header>
  );
}
