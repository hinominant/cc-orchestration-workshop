"use client";

import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const displayLabel = filename || language;

  return (
    <div className="my-4 overflow-hidden rounded-lg border border-slate-200 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2">
        {displayLabel ? (
          <span className="text-xs font-medium text-slate-400">
            {displayLabel}
          </span>
        ) : (
          <span />
        )}
        <CopyButton
          text={code}
          className="bg-slate-800 text-slate-300 hover:bg-slate-700"
        />
      </div>
      <pre className="overflow-x-auto p-4">
        <code className="text-sm leading-relaxed text-slate-100">{code}</code>
      </pre>
    </div>
  );
}
