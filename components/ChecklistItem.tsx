"use client";

import { useState, useId } from "react";

interface ChecklistItemProps {
  children: React.ReactNode;
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
}

export function ChecklistItem({
  children,
  defaultChecked = false,
  onToggle,
}: ChecklistItemProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const id = useId();

  const handleToggle = () => {
    const next = !checked;
    setChecked(next);
    onToggle?.(next);
  };

  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
        checked
          ? "border-green-200 bg-green-50"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-primary accent-primary"
      />
      <span
        className={`text-sm leading-relaxed ${
          checked ? "text-green-700" : "text-slate-700"
        }`}
      >
        {children}
      </span>
    </label>
  );
}
