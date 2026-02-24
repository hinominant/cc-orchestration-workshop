"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { id: 0, title: "環境確認" },
  { id: 1, title: "思想理解" },
  { id: 2, title: "講師デモ" },
  { id: 3, title: "サービス設計" },
  { id: 4, title: "コード生成" },
  { id: 5, title: "GitHub連携" },
  { id: 6, title: "Vercel公開" },
  { id: 7, title: "振り返り" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="text-base font-bold text-slate-900 hover:text-primary transition-colors sm:text-lg"
        >
          Claude Code × オーケストレーション講座
        </Link>
      </div>
      <div className="border-t border-slate-100">
        <nav
          aria-label="ステップナビゲーション"
          className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6"
        >
          <ol className="flex gap-0.5 py-2">
            {steps.map((step) => {
              const href = `/step/${step.id}`;
              const isCurrent = pathname === href;

              return (
                <li key={step.id} className="shrink-0">
                  <Link
                    href={href}
                    aria-current={isCurrent ? "step" : undefined}
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                      isCurrent
                        ? "bg-primary text-white"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        isCurrent
                          ? "bg-white/20 text-white"
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
        </nav>
      </div>
    </header>
  );
}
