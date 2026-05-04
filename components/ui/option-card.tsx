"use client";

import type { ReactNode } from "react";

type OptionCardProps = {
  title: ReactNode;
  description?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  active?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
  as?: "button" | "div";
};

export function OptionCard({
  title,
  description,
  leading,
  trailing,
  active = false,
  onClick,
  ariaLabel,
  as = "button",
}: OptionCardProps) {
  const baseClasses = `flex w-full items-center gap-3 rounded-soft border px-4 py-3 text-left transition-colors ${
    active
      ? "border-ink-900 bg-white shadow-soft"
      : "border-cream-200 bg-white hover:bg-cream-100"
  }`;

  const inner = (
    <>
      {leading ? <div className="shrink-0">{leading}</div> : null}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-ink-900">{title}</p>
        {description ? (
          <p className="mt-0.5 text-xs text-sand-700">{description}</p>
        ) : null}
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </>
  );

  if (as === "button" && onClick) {
    return (
      <button type="button" onClick={onClick} aria-pressed={active} aria-label={ariaLabel} className={baseClasses}>
        {inner}
      </button>
    );
  }
  return <div className={baseClasses}>{inner}</div>;
}
