import type { ReactElement } from "react";
import type { MealType } from "@/lib/types";

type Palette = {
  bg: string;
  bowl: string;
  bowlShade: string;
  accent1: string;
  accent2: string;
  accent3: string;
};

const PALETTES: Record<MealType, Palette> = {
  breakfast: {
    bg: "#fdecd6",
    bowl: "#ffffff",
    bowlShade: "#ead7b7",
    accent1: "#f3a74e", // egg yolk / orange
    accent2: "#c66a3d", // berries
    accent3: "#7a8a6b", // herb
  },
  lunch: {
    bg: "#e8efe0",
    bowl: "#ffffff",
    bowlShade: "#cdd5be",
    accent1: "#7a8a6b", // greens
    accent2: "#c8a780", // grain
    accent3: "#d97a3a", // protein orange
  },
  dinner: {
    bg: "#fae5e5",
    bowl: "#ffffff",
    bowlShade: "#e6c8c8",
    accent1: "#c97d8b", // protein pink
    accent2: "#7a8a6b", // veggie
    accent3: "#c8a780", // starch
  },
  snack: {
    bg: "#f4ead4",
    bowl: "#ffffff",
    bowlShade: "#d8c8a4",
    accent1: "#d97a3a",
    accent2: "#7a8a6b",
    accent3: "#c97d8b",
  },
};

function Breakfast(p: Palette): ReactElement {
  return (
    <g>
      {/* round bowl */}
      <ellipse cx="50" cy="58" rx="32" ry="10" fill={p.bowlShade} />
      <path
        d="M18 58 Q18 40 50 40 Q82 40 82 58 Q82 68 50 68 Q18 68 18 58 Z"
        fill={p.bowl}
      />
      {/* egg yolk */}
      <circle cx="40" cy="50" r="7" fill={p.accent1} />
      <circle cx="38" cy="48" r="2" fill="#ffffff" opacity="0.5" />
      {/* berries */}
      <circle cx="58" cy="48" r="3" fill={p.accent2} />
      <circle cx="64" cy="52" r="2.5" fill={p.accent2} />
      <circle cx="55" cy="54" r="2.5" fill={p.accent2} />
      {/* herb sprig */}
      <path
        d="M48 44 Q52 38 56 42"
        stroke={p.accent3}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="50" cy="42" rx="2" ry="1" fill={p.accent3} />
      {/* steam */}
      <path
        d="M40 32 Q42 28 40 24 M50 30 Q52 26 50 22 M60 32 Q62 28 60 24"
        stroke={p.bowlShade}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </g>
  );
}

function Lunch(p: Palette): ReactElement {
  return (
    <g>
      {/* bento-style square bowl */}
      <rect x="16" y="36" width="68" height="36" rx="10" fill={p.bowlShade} />
      <rect x="18" y="38" width="64" height="32" rx="8" fill={p.bowl} />
      {/* divider */}
      <path d="M50 38 L50 70" stroke={p.bowlShade} strokeWidth="1.2" opacity="0.6" />
      {/* greens left */}
      <circle cx="28" cy="54" r="4" fill={p.accent1} />
      <circle cx="36" cy="50" r="4" fill={p.accent1} />
      <circle cx="42" cy="58" r="3.5" fill={p.accent1} />
      <circle cx="32" cy="60" r="3" fill={p.accent1} opacity="0.8" />
      {/* protein right */}
      <ellipse cx="62" cy="50" rx="6" ry="4" fill={p.accent3} />
      <ellipse cx="72" cy="58" rx="5" ry="3.5" fill={p.accent3} />
      {/* grain dots */}
      <circle cx="60" cy="62" r="1.4" fill={p.accent2} />
      <circle cx="66" cy="64" r="1.4" fill={p.accent2} />
      <circle cx="72" cy="62" r="1.4" fill={p.accent2} />
      <circle cx="68" cy="56" r="1.4" fill={p.accent2} />
    </g>
  );
}

function Dinner(p: Palette): ReactElement {
  return (
    <g>
      {/* round plate */}
      <ellipse cx="50" cy="58" rx="36" ry="8" fill={p.bowlShade} />
      <ellipse cx="50" cy="56" rx="34" ry="14" fill={p.bowl} />
      <ellipse cx="50" cy="56" rx="26" ry="9" fill={p.bowlShade} opacity="0.3" />
      {/* protein (salmon-like) */}
      <path
        d="M30 56 Q40 46 50 50 Q56 56 50 60 Q40 64 30 60 Z"
        fill={p.accent1}
      />
      <path
        d="M34 54 L46 50 M36 58 L46 56"
        stroke={p.bowlShade}
        strokeWidth="0.8"
        opacity="0.6"
      />
      {/* broccoli florets */}
      <circle cx="62" cy="52" r="3" fill={p.accent2} />
      <circle cx="66" cy="56" r="2.5" fill={p.accent2} />
      <circle cx="60" cy="58" r="2.5" fill={p.accent2} />
      {/* potato */}
      <ellipse cx="72" cy="60" rx="4" ry="2.8" fill={p.accent3} />
      {/* steam */}
      <path
        d="M38 38 Q40 32 38 26 M50 36 Q52 30 50 24 M62 38 Q64 32 62 26"
        stroke={p.bowlShade}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </g>
  );
}

function Snack(p: Palette): ReactElement {
  return (
    <g>
      {/* small bowl */}
      <ellipse cx="50" cy="62" rx="22" ry="6" fill={p.bowlShade} />
      <path
        d="M28 62 Q28 50 50 50 Q72 50 72 62 Q72 68 50 68 Q28 68 28 62 Z"
        fill={p.bowl}
      />
      {/* veggie sticks */}
      <rect x="42" y="36" width="3" height="16" rx="1.5" fill={p.accent1} />
      <rect x="48" y="32" width="3" height="20" rx="1.5" fill={p.accent2} />
      <rect x="54" y="36" width="3" height="16" rx="1.5" fill={p.accent3} />
      <rect x="60" y="40" width="3" height="12" rx="1.5" fill={p.accent1} opacity="0.85" />
      {/* hummus dollop */}
      <ellipse cx="40" cy="58" rx="5" ry="2.5" fill={p.accent2} opacity="0.6" />
    </g>
  );
}

const RENDERERS: Record<MealType, (p: Palette) => ReactElement> = {
  breakfast: Breakfast,
  lunch: Lunch,
  dinner: Dinner,
  snack: Snack,
};

type MealIllustrationProps = {
  mealType: MealType;
  size?: "banner" | "square";
  className?: string;
};

export function MealIllustration({
  mealType,
  size = "banner",
  className = "",
}: MealIllustrationProps) {
  const palette = PALETTES[mealType];
  const renderer = RENDERERS[mealType];

  return (
    <div
      className={`overflow-hidden ${size === "banner" ? "h-24 w-full rounded-soft" : "h-20 w-20 rounded-soft"} ${className}`}
      style={{ backgroundColor: palette.bg }}
      role="presentation"
      aria-hidden
    >
      <svg viewBox="0 0 100 90" className="h-full w-full" preserveAspectRatio="xMidYMid meet">
        {renderer(palette)}
      </svg>
    </div>
  );
}
