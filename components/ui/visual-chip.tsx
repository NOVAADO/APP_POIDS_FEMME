import type { ReactNode } from "react";

export type ChipTone = "sage" | "clay" | "apricot" | "oat" | "rose" | "neutral";
type ChipSize = "sm" | "md";

type VisualChipProps = {
  tone?: ChipTone;
  size?: ChipSize;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

const TONES: Record<ChipTone, string> = {
  sage: "bg-sage-50 text-sage-600 ring-sage-200",
  clay: "bg-clay-100 text-cocoa-700 ring-clay-300",
  apricot: "bg-apricot-100 text-cocoa-700 ring-apricot-300",
  oat: "bg-oat-100 text-cocoa-700 ring-oat-200",
  rose: "bg-rosewarm-100 text-cocoa-700 ring-rosewarm-300",
  neutral: "bg-cream-100 text-sand-700 ring-cream-200",
};

const SIZES: Record<ChipSize, string> = {
  sm: "h-6 px-2.5 text-[11px]",
  md: "h-7 px-3 text-xs",
};

/**
 * A softer chip alternative to Badge. Uses organic tones + a subtle inner ring
 * instead of the harder Badge contrast. Use for categories, energy hints,
 * non-binary statuses.
 */
export function VisualChip({
  tone = "sage",
  size = "sm",
  icon,
  children,
  className = "",
}: VisualChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill font-medium ring-1 ring-inset ${TONES[tone]} ${SIZES[size]} ${className}`}
    >
      {icon ? <span aria-hidden>{icon}</span> : null}
      <span>{children}</span>
    </span>
  );
}
