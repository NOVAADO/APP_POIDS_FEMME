import type { ReactNode } from "react";

type PaperSectionProps = {
  eyebrow?: string;
  title?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
};

/**
 * A vertically-stacked section with a discreet hand-drawn separator under the title.
 * Use to introduce a group of content (lists, cards) with a softer rhythm than h2 + text.
 */
export function PaperSection({
  eyebrow,
  title,
  hint,
  children,
  className = "",
}: PaperSectionProps) {
  return (
    <section className={`space-y-3 ${className}`}>
      {(eyebrow || title || hint) && (
        <div className="space-y-1 px-1">
          {eyebrow ? (
            <p className="text-[11px] font-medium uppercase tracking-wide text-sand-700">
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h2 className="text-lg font-semibold leading-tight text-ink-900">
              {title}
            </h2>
          ) : null}
          {hint ? <p className="text-xs text-sand-700">{hint}</p> : null}
          {title ? (
            <svg
              viewBox="0 0 120 6"
              aria-hidden
              className="h-1.5 w-24 text-sage-400"
              preserveAspectRatio="none"
            >
              <path
                d="M2 3 Q 30 0.5 60 3 T 118 3"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
          ) : null}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}
