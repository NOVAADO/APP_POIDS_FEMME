import type { ReactNode } from "react";

type BadgeTone = "neutral" | "moss" | "sand" | "warn";

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  neutral: "bg-cream-100 text-ink-700",
  moss: "bg-moss-500/10 text-moss-600",
  sand: "bg-sand-400/20 text-sand-600",
  warn: "bg-amber-100 text-amber-800",
};

export function Badge({ children, tone = "neutral" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}
