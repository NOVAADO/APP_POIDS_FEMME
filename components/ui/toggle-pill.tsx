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
      className={`inline-flex h-9 items-center rounded-pill border px-4 text-sm transition-colors ${
        active
          ? "border-ink-900 bg-ink-900 text-cream-50"
          : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
      }`}
    >
      {children}
    </button>
  );
}
