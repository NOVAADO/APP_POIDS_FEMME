import type { ReactElement } from "react";

type Palette = {
  bg: string;
  body: string;
  bodyShade: string;
  prop: string;
  propShade: string;
};

const PALETTES = {
  moss: {
    bg: "#eef4e6",
    body: "#8a9a78",
    bodyShade: "#5e6e52",
    prop: "#dcc8a8",
    propShade: "#a89776",
  },
  sand: {
    bg: "#f7eed9",
    body: "#b4a07e",
    bodyShade: "#7a6c54",
    prop: "#d3754a",
    propShade: "#9c4d29",
  },
  cream: {
    bg: "#fbf3e2",
    body: "#b4a07e",
    bodyShade: "#7a6c54",
    prop: "#dcc8a8",
    propShade: "#a89776",
  },
  warm: {
    bg: "#fde6cd",
    body: "#d97a3a",
    bodyShade: "#9c4d29",
    prop: "#b4a07e",
    propShade: "#7a6c54",
  },
} as const;

type Accent = keyof typeof PALETTES;

const PALETTE_BY_EXERCISE: Record<string, Accent> = {
  "squat-chaise": "sand",
  "pompes-mur": "cream",
  "pont-fessier": "moss",
  "rowing-elastique": "warm",
  "fente-assistee": "sand",
  "dead-bug": "moss",
  "respiration-360": "cream",
  "marche-post-repas": "moss",
};

function Head({ p, cx, cy, r = 6.5 }: { p: Palette; cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={p.bodyShade} />
      {/* small highlight to soften */}
      <circle
        cx={cx - r * 0.35}
        cy={cy - r * 0.35}
        r={r * 0.25}
        fill="#ffffff"
        opacity="0.35"
      />
    </g>
  );
}

function squatChaise(p: Palette): ReactElement {
  return (
    <g>
      {/* chair */}
      <rect x="62" y="48" width="22" height="3" rx="1" fill={p.prop} />
      <rect x="62" y="50" width="3" height="22" fill={p.prop} />
      <rect x="81" y="50" width="3" height="22" fill={p.prop} />
      <rect x="78" y="40" width="3" height="11" fill={p.prop} />
      {/* figure squatting */}
      <Head p={p} cx={40} cy={28} />
      {/* body */}
      <path
        d="M40 33 L40 50"
        stroke={p.body}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* upper legs going to knees */}
      <path
        d="M40 50 L34 60 M40 50 L46 60"
        stroke={p.body}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* shins */}
      <path
        d="M34 60 L34 74 M46 60 L46 74"
        stroke={p.body}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* arms forward */}
      <path
        d="M40 38 L52 44 M40 38 L52 38"
        stroke={p.body}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* floor */}
      <path d="M14 76 L86 76" stroke={p.bodyShade} strokeWidth="1" opacity="0.4" />
    </g>
  );
}

function pompesMur(p: Palette): ReactElement {
  return (
    <g>
      {/* wall */}
      <rect x="78" y="14" width="6" height="60" fill={p.prop} opacity="0.6" />
      <path d="M78 14 L78 74" stroke={p.propShade} strokeWidth="1" opacity="0.5" />
      {/* figure leaning toward wall */}
      <Head p={p} cx={32} cy={28} />
      {/* torso angled */}
      <path
        d="M32 33 L62 50"
        stroke={p.body}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* legs */}
      <path d="M62 50 L62 74" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      <path d="M62 50 L52 74" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      {/* arms reaching wall */}
      <path
        d="M40 36 L72 36 L78 38"
        stroke={p.body}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M44 42 L74 42 L78 44"
        stroke={p.body}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* floor */}
      <path d="M14 76 L78 76" stroke={p.bodyShade} strokeWidth="1" opacity="0.4" />
    </g>
  );
}

function pontFessier(p: Palette): ReactElement {
  return (
    <g>
      {/* mat */}
      <rect x="14" y="62" width="72" height="8" rx="2" fill={p.prop} opacity="0.7" />
      {/* figure lying with hip raised */}
      {/* head on left */}
      <Head p={p} cx={22} cy={56} r={5} />
      {/* upper back / shoulders on mat */}
      <path
        d="M27 58 L40 58"
        stroke={p.body}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* lifted hip arch */}
      <path
        d="M40 58 Q56 38 64 56"
        stroke={p.body}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* shins down to feet on mat */}
      <path
        d="M64 56 L64 64"
        stroke={p.body}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* arms */}
      <path
        d="M28 62 L40 62"
        stroke={p.body}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* arrow up to suggest lift */}
      <path
        d="M52 32 L52 24 M48 28 L52 24 L56 28"
        stroke={p.bodyShade}
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  );
}

function rowingElastique(p: Palette): ReactElement {
  return (
    <g>
      {/* anchor point */}
      <circle cx="84" cy="40" r="3" fill={p.propShade} />
      {/* elastic band */}
      <path
        d="M84 40 Q60 44 44 44"
        stroke={p.prop}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M84 40 Q60 48 44 48"
        stroke={p.prop}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
      {/* figure pulling */}
      <Head p={p} cx={32} cy={28} />
      {/* torso */}
      <path
        d="M32 33 L32 60"
        stroke={p.body}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* arms pulling back */}
      <path
        d="M32 38 L44 46 M44 46 L40 50"
        stroke={p.body}
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* legs slight bend */}
      <path d="M32 60 L26 74" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      <path d="M32 60 L38 74" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      {/* floor */}
      <path d="M14 76 L86 76" stroke={p.bodyShade} strokeWidth="1" opacity="0.4" />
    </g>
  );
}

function fenteAssistee(p: Palette): ReactElement {
  return (
    <g>
      {/* chair on right (support) */}
      <rect x="68" y="50" width="16" height="3" rx="1" fill={p.prop} />
      <rect x="68" y="52" width="3" height="20" fill={p.prop} />
      <rect x="81" y="52" width="3" height="20" fill={p.prop} />
      <rect x="79" y="42" width="3" height="9" fill={p.prop} />
      {/* figure in lunge */}
      <Head p={p} cx={40} cy={28} />
      {/* torso */}
      <path d="M40 33 L40 50" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      {/* front leg */}
      <path d="M40 50 L52 60" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      <path d="M52 60 L52 74" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      {/* back leg bent */}
      <path d="M40 50 L30 60" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      <path d="M30 60 L34 74" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      {/* arm reaching chair */}
      <path
        d="M40 40 L66 50"
        stroke={p.body}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* floor */}
      <path d="M14 76 L86 76" stroke={p.bodyShade} strokeWidth="1" opacity="0.4" />
    </g>
  );
}

function deadBug(p: Palette): ReactElement {
  return (
    <g>
      {/* mat */}
      <rect x="14" y="58" width="72" height="6" rx="2" fill={p.prop} opacity="0.7" />
      {/* figure lying on back */}
      <Head p={p} cx={26} cy={48} />
      {/* torso along mat */}
      <path
        d="M31 50 L60 52"
        stroke={p.body}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* one arm raised */}
      <path
        d="M40 50 L42 30"
        stroke={p.body}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* one leg raised opposite */}
      <path
        d="M58 52 L72 28"
        stroke={p.body}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* other arm and leg resting on mat */}
      <path
        d="M40 54 L46 60"
        stroke={p.body}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M58 56 L70 60"
        stroke={p.body}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.6"
      />
    </g>
  );
}

function respiration360(p: Palette): ReactElement {
  return (
    <g>
      {/* breath circles around */}
      <circle cx="50" cy="44" r="34" fill="none" stroke={p.prop} strokeWidth="1" opacity="0.6" />
      <circle cx="50" cy="44" r="26" fill="none" stroke={p.prop} strokeWidth="1" opacity="0.45" />
      <circle cx="50" cy="44" r="18" fill="none" stroke={p.prop} strokeWidth="1" opacity="0.3" />
      {/* sitting figure */}
      <Head p={p} cx={50} cy={32} />
      {/* torso */}
      <path
        d="M50 37 L50 58"
        stroke={p.body}
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* crossed legs / lap */}
      <path
        d="M50 58 Q40 64 36 60"
        stroke={p.body}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M50 58 Q60 64 64 60"
        stroke={p.body}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* arms resting */}
      <path d="M50 42 L42 56" stroke={p.body} strokeWidth="3" strokeLinecap="round" />
      <path d="M50 42 L58 56" stroke={p.body} strokeWidth="3" strokeLinecap="round" />
      {/* floor */}
      <path d="M14 76 L86 76" stroke={p.bodyShade} strokeWidth="1" opacity="0.4" />
    </g>
  );
}

function marchePostRepas(p: Palette): ReactElement {
  return (
    <g>
      {/* dotted path */}
      <path
        d="M14 70 L86 70"
        stroke={p.propShade}
        strokeWidth="1.4"
        strokeDasharray="3 4"
        opacity="0.5"
      />
      {/* footprints leading away */}
      <ellipse cx="22" cy="74" rx="3" ry="1.6" fill={p.prop} opacity="0.7" />
      <ellipse cx="32" cy="68" rx="3" ry="1.6" fill={p.prop} opacity="0.7" />
      <ellipse cx="42" cy="74" rx="3" ry="1.6" fill={p.prop} opacity="0.7" />
      <ellipse cx="52" cy="68" rx="3" ry="1.6" fill={p.prop} opacity="0.5" />
      {/* walking figure */}
      <Head p={p} cx={68} cy={28} />
      <path d="M68 33 L68 54" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      {/* legs in stride */}
      <path d="M68 54 L60 70" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      <path d="M68 54 L78 70" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      {/* swinging arms */}
      <path d="M68 38 L60 50" stroke={p.body} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
      <path d="M68 38 L78 50" stroke={p.body} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
    </g>
  );
}

const RENDERERS: Record<string, (p: Palette) => ReactElement> = {
  "squat-chaise": squatChaise,
  "pompes-mur": pompesMur,
  "pont-fessier": pontFessier,
  "rowing-elastique": rowingElastique,
  "fente-assistee": fenteAssistee,
  "dead-bug": deadBug,
  "respiration-360": respiration360,
  "marche-post-repas": marchePostRepas,
};

function genericRenderer(p: Palette): ReactElement {
  return (
    <g>
      <Head p={p} cx={50} cy={28} />
      <path d="M50 33 L50 60" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      <path d="M50 60 L40 74 M50 60 L60 74" stroke={p.body} strokeWidth="4" strokeLinecap="round" />
      <path d="M50 40 L36 50 M50 40 L64 50" stroke={p.body} strokeWidth="3" strokeLinecap="round" opacity="0.85" />
    </g>
  );
}

type ExerciseIllustrationProps = {
  exerciseId: string;
  size?: "card" | "library" | "banner" | "detail";
  className?: string;
};

const SIZE_CLASS: Record<NonNullable<ExerciseIllustrationProps["size"]>, string> = {
  card: "h-full w-24",
  library: "h-full w-20",
  banner: "h-32 w-full",
  detail: "h-44 w-full",
};

export function ExerciseIllustration({
  exerciseId,
  size = "card",
  className = "",
}: ExerciseIllustrationProps) {
  const accent = PALETTE_BY_EXERCISE[exerciseId] ?? "moss";
  const palette = PALETTES[accent];
  const renderer = RENDERERS[exerciseId] ?? genericRenderer;

  return (
    <div
      className={`flex shrink-0 items-center justify-center ${SIZE_CLASS[size]} ${className}`}
      style={{ backgroundColor: palette.bg }}
      role="presentation"
      aria-hidden
    >
      <svg
        viewBox="0 0 100 80"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        strokeLinejoin="round"
      >
        {renderer(palette)}
      </svg>
    </div>
  );
}
