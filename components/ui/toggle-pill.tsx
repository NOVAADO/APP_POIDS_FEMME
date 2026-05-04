"use client";

import type { ReactNode } from "react";

type TogglePillProps = {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  ariaLabel?: string;
};

export function TogglePill({ active, onClick, children, ariaLabel }: TogglePillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={ariaLabel}
      className={`rounded-full border px-4 py-2 text-sm transition-colors ${
        active
          ? "border-moss-500 bg-moss-500/10 text-moss-600"
          : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
      }`}
    >
      {children}
    </button>
  );
}
