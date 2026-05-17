import type { ReactNode } from "react";
import { OrganicCard, type OrganicTone } from "./organic-card";

type EmptyStateIllustratedProps = {
  title: string;
  hint?: string;
  tone?: OrganicTone;
  action?: ReactNode;
  className?: string;
};

/**
 * Calm illustrated empty-state placeholder.
 * Used when a list / section is empty (no recipes filtered, no grocery items, etc.).
 * The small SVG vignette is intentionally non-narrative — no character, no failure,
 * just a soft organic shape to fill the negative space with warmth.
 */
export function EmptyStateIllustrated({
  title,
  hint,
  tone = "oat",
  action,
  className = "",
}: EmptyStateIllustratedProps) {
  return (
    <OrganicCard tone={tone} padding="lg" className={`text-center ${className}`}>
      <div className="mx-auto flex max-w-xs flex-col items-center gap-3">
        <svg
          viewBox="0 0 80 60"
          aria-hidden
          className="h-12 w-16 text-sage-400"
        >
          {/* small leaf-like organic shape with a warm dot — abstract, no character */}
          <path
            d="M10 35 Q 18 12 40 18 Q 62 24 70 40 Q 60 50 40 48 Q 20 46 10 35 Z"
            fill="currentColor"
            opacity="0.18"
          />
          <path
            d="M10 35 Q 18 12 40 18 Q 62 24 70 40 Q 60 50 40 48 Q 20 46 10 35 Z"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          <circle cx="55" cy="22" r="3" fill="currentColor" opacity="0.5" className="text-apricot-300" />
        </svg>
        <div className="space-y-1">
          <p className="text-base font-semibold text-ink-900">{title}</p>
          {hint ? <p className="text-sm text-sand-700">{hint}</p> : null}
        </div>
        {action ? <div className="pt-1">{action}</div> : null}
      </div>
    </OrganicCard>
  );
}
