import type { ReactElement } from "react";
import type { MascotAccent, MascotAnimal, MascotProfile } from "@/lib/types";

type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-12 w-12",
  md: "h-20 w-20",
  lg: "h-28 w-28",
};

type AccentPalette = {
  bg: string;
  fur: string;
  furShade: string;
  cloth: string;
  clothShade: string;
};

const ACCENTS: Record<MascotAccent, AccentPalette> = {
  moss: {
    bg: "#eef2e7",
    fur: "#cdb795",
    furShade: "#a18d6e",
    cloth: "#7a8a6b",
    clothShade: "#5e6e52",
  },
  sand: {
    bg: "#f4ece0",
    fur: "#d4bf9a",
    furShade: "#a48b66",
    cloth: "#c8a780",
    clothShade: "#a08560",
  },
  cream: {
    bg: "#f8f1e3",
    fur: "#dcc8a8",
    furShade: "#b29e7e",
    cloth: "#b6a07e",
    clothShade: "#8c7c5e",
  },
  warm: {
    bg: "#fdecd6",
    fur: "#d8a06b",
    furShade: "#a87648",
    cloth: "#c66a3d",
    clothShade: "#8d4a28",
  },
  rose: {
    bg: "#fae5e5",
    fur: "#dec0c0",
    furShade: "#b08e8e",
    cloth: "#c08585",
    clothShade: "#8e5e5e",
  },
};

type HeadRenderer = (palette: AccentPalette) => ReactElement;

const HEAD_RENDERERS: Record<MascotAnimal, HeadRenderer> = {
  capybara: (p) => (
    <g>
      <ellipse cx="50" cy="40" rx="22" ry="20" fill={p.fur} />
      <ellipse cx="50" cy="46" rx="14" ry="9" fill={p.furShade} opacity="0.45" />
      <ellipse cx="38" cy="32" rx="4" ry="5" fill={p.fur} />
      <ellipse cx="62" cy="32" rx="4" ry="5" fill={p.fur} />
    </g>
  ),
  loutre: (p) => (
    <g>
      <ellipse cx="50" cy="42" rx="20" ry="22" fill={p.fur} />
      <ellipse cx="50" cy="50" rx="11" ry="7" fill={p.furShade} opacity="0.4" />
      <circle cx="36" cy="28" r="5" fill={p.fur} />
      <circle cx="64" cy="28" r="5" fill={p.fur} />
    </g>
  ),
  renarde: (p) => (
    <g>
      <path d="M28 22 L34 38 L42 30 Z" fill={p.fur} />
      <path d="M72 22 L66 38 L58 30 Z" fill={p.fur} />
      <path d="M30 24 L34 36 L40 30 Z" fill={p.furShade} opacity="0.35" />
      <path d="M70 24 L66 36 L60 30 Z" fill={p.furShade} opacity="0.35" />
      <path
        d="M50 22 C36 22 30 36 32 48 C34 58 44 62 50 62 C56 62 66 58 68 48 C70 36 64 22 50 22 Z"
        fill={p.fur}
      />
      <path d="M44 56 L50 62 L56 56 Z" fill={p.furShade} opacity="0.5" />
    </g>
  ),
  biche: (p) => (
    <g>
      <path
        d="M36 14 L34 8 M34 8 L30 8 M34 8 L36 4"
        stroke={p.furShade}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M64 14 L66 8 M66 8 L70 8 M66 8 L64 4"
        stroke={p.furShade}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="50" cy="40" rx="19" ry="22" fill={p.fur} />
      <ellipse cx="50" cy="56" rx="6" ry="4" fill={p.furShade} opacity="0.4" />
      <path d="M34 28 L38 18 L42 28 Z" fill={p.fur} />
      <path d="M66 28 L62 18 L58 28 Z" fill={p.fur} />
    </g>
  ),
  ourse: (p) => (
    <g>
      <circle cx="50" cy="42" r="22" fill={p.fur} />
      <circle cx="34" cy="26" r="6" fill={p.fur} />
      <circle cx="66" cy="26" r="6" fill={p.fur} />
      <circle cx="34" cy="26" r="3" fill={p.furShade} opacity="0.6" />
      <circle cx="66" cy="26" r="3" fill={p.furShade} opacity="0.6" />
      <ellipse cx="50" cy="48" rx="9" ry="6" fill={p.furShade} opacity="0.4" />
    </g>
  ),
  hibou: (p) => (
    <g>
      <ellipse cx="50" cy="42" rx="24" ry="22" fill={p.fur} />
      <path d="M30 24 L36 18 L40 28 Z" fill={p.furShade} opacity="0.6" />
      <path d="M70 24 L64 18 L60 28 Z" fill={p.furShade} opacity="0.6" />
      <circle cx="42" cy="40" r="7" fill="#fff" />
      <circle cx="58" cy="40" r="7" fill="#fff" />
      <circle cx="42" cy="40" r="3" fill={p.clothShade} />
      <circle cx="58" cy="40" r="3" fill={p.clothShade} />
      <path d="M46 50 L50 56 L54 50 Z" fill={p.clothShade} opacity="0.6" />
    </g>
  ),
  koala: (p) => (
    <g>
      <circle cx="32" cy="32" r="9" fill={p.fur} />
      <circle cx="68" cy="32" r="9" fill={p.fur} />
      <circle cx="32" cy="32" r="5" fill={p.furShade} opacity="0.45" />
      <circle cx="68" cy="32" r="5" fill={p.furShade} opacity="0.45" />
      <circle cx="50" cy="42" r="20" fill={p.fur} />
      <ellipse cx="50" cy="52" rx="7" ry="5" fill={p.furShade} opacity="0.55" />
      <circle cx="50" cy="50" r="3" fill={p.furShade} />
    </g>
  ),
  louve: (p) => (
    <g>
      <path d="M28 24 L36 38 L40 30 Z" fill={p.fur} />
      <path d="M72 24 L64 38 L60 30 Z" fill={p.fur} />
      <path d="M30 26 L34 36 L38 32 Z" fill={p.furShade} opacity="0.4" />
      <path d="M70 26 L66 36 L62 32 Z" fill={p.furShade} opacity="0.4" />
      <ellipse cx="50" cy="42" rx="20" ry="22" fill={p.fur} />
      <ellipse cx="50" cy="54" rx="7" ry="5" fill={p.furShade} opacity="0.45" />
    </g>
  ),
};

function Eyes() {
  return (
    <g>
      <circle cx="42" cy="40" r="1.6" fill="#1f1c19" />
      <circle cx="58" cy="40" r="1.6" fill="#1f1c19" />
    </g>
  );
}

function Mouth() {
  return (
    <path
      d="M46 50 Q50 53 54 50"
      stroke="#1f1c19"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
  );
}

function Body(palette: AccentPalette) {
  return (
    <g>
      <path
        d="M22 110 Q22 65 50 65 Q78 65 78 110 L78 130 Q50 138 22 130 Z"
        fill={palette.cloth}
      />
      <path
        d="M30 78 Q30 70 50 70 Q70 70 70 78 L70 86 Q50 92 30 86 Z"
        fill={palette.clothShade}
        opacity="0.55"
      />
      <path
        d="M22 102 L34 96 M78 102 L66 96"
        stroke={palette.clothShade}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M42 130 L42 138 M58 130 L58 138"
        stroke={palette.clothShade}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}

type MascotAvatarProps = {
  mascot: MascotProfile;
  size?: Size;
  className?: string;
};

export function MascotAvatar({ mascot, size = "md", className = "" }: MascotAvatarProps) {
  const palette = ACCENTS[mascot.accent];
  const renderHead = HEAD_RENDERERS[mascot.id];

  return (
    <div
      className={`shrink-0 overflow-hidden rounded-soft ${SIZE_CLASS[size]} ${className}`}
      style={{ backgroundColor: palette.bg }}
      role="img"
      aria-label={`${mascot.name}, ${mascot.energy.toLowerCase()}`}
    >
      <svg viewBox="0 0 100 140" className="h-full w-full" aria-hidden>
        {Body(palette)}
        {renderHead(palette)}
        <Eyes />
        <Mouth />
      </svg>
    </div>
  );
}
