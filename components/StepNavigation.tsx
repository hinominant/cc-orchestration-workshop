"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const steps = [
  { id: 0, title: "環境確認", duration: "10分" },
  { id: 1, title: "思想理解", duration: "10分" },
  { id: 2, title: "講師デモ", duration: "15分" },
  { id: 3, title: "サービス設計", duration: "40分" },
  { id: 4, title: "コード生成", duration: "20分" },
  { id: 5, title: "GitHub連携", duration: "10分" },
  { id: 6, title: "Vercel公開", duration: "10分" },
  { id: 7, title: "振り返り", duration: "10分" },
];

export function StepNavigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="ステップナビゲーション" className="w-full">
      <ol className="space-y-1">
        {steps.map((step) => {
          const href = `/step/${step.id}`;
          const isCurrent = pathname === href;

          return (
            <li key={step.id}>
              <Link
                href={href}
                aria-current={isCurrent ? "step" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isCurrent
                    ? "bg-primary text-white font-medium"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isCurrent
                      ? "bg-white/20 text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {step.id}
                </span>
                <span className="truncate">{step.title}</span>
                <span
                  className={`ml-auto text-xs ${
                    isCurrent ? "text-white/70" : "text-slate-400"
                  }`}
                >
                  {step.duration}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function MobileStepNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="ステップナビゲーション（モバイル）"
      className="overflow-x-auto"
    >
      <ol className="flex gap-1 px-4 py-2">
        {steps.map((step) => {
          const href = `/step/${step.id}`;
          const isCurrent = pathname === href;

          return (
            <li key={step.id} className="shrink-0">
              <Link
                href={href}
                aria-current={isCurrent ? "step" : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                  isCurrent
                    ? "bg-primary text-white"
                    : "bg-slate-200 text-slate-500 hover:bg-slate-300"
                }`}
                aria-label={`STEP ${step.id}: ${step.title}`}
              >
                {step.id}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
