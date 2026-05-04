import type { ReactElement } from "react";
import type { MascotAccent, MascotAnimal, MascotProfile } from "@/lib/types";

type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-14 w-14",
  md: "h-24 w-24",
  lg: "h-32 w-32",
};

const ACCENT_BG: Record<MascotAccent, string> = {
  moss: "#eef3e7",
  sand: "#f4ecd9",
  cream: "#f8f1e3",
  warm: "#fde6cf",
  rose: "#fbe1e1",
};

type Clothes = { cloth: string; clothShade: string; collar: string };

const ACCENT_CLOTHES: Record<MascotAccent, Clothes> = {
  moss: { cloth: "#6f8160", clothShade: "#566649", collar: "#3f4b35" },
  sand: { cloth: "#c8a780", clothShade: "#a08560", collar: "#7a6c54" },
  cream: { cloth: "#b6a07e", clothShade: "#8c7c5e", collar: "#5b5040" },
  warm: { cloth: "#c66a3d", clothShade: "#8d4a28", collar: "#6a3315" },
  rose: { cloth: "#c08585", clothShade: "#8e5e5e", collar: "#693a3a" },
};

type AnimalColors = {
  fur: string;
  furShade: string;
  belly: string;
  inner: string;
};

const ANIMAL_COLORS: Record<MascotAnimal, AnimalColors> = {
  capybara: { fur: "#b48a64", furShade: "#8b6646", belly: "#e6cba6", inner: "#7a5538" },
  loutre: { fur: "#9a7556", furShade: "#73533a", belly: "#e0c4a3", inner: "#5e3f2a" },
  renarde: { fur: "#cc7a3f", furShade: "#a35c28", belly: "#f6d6a8", inner: "#7a3f17" },
  biche: { fur: "#c89773", furShade: "#9a6f4f", belly: "#f0d4ad", inner: "#6e4a31" },
  ourse: { fur: "#8f6648", furShade: "#65462d", belly: "#d6b58a", inner: "#5a3d27" },
  hibou: { fur: "#9d7045", furShade: "#75502c", belly: "#e8c98c", inner: "#5b3e22" },
  koala: { fur: "#a3a8ac", furShade: "#73797d", belly: "#e2e4e6", inner: "#525557" },
  louve: { fur: "#8a847f", furShade: "#5b5651", belly: "#d6cfca", inner: "#3d3a37" },
};

function GroundShadow() {
  return <ellipse cx="50" cy="96" rx="28" ry="3" fill="#000" opacity="0.08" />;
}

function Sweater({ clothes }: { clothes: Clothes }) {
  return (
    <g>
      {/* sweater body covers from neck down to bottom of frame */}
      <path
        d="M22 100 L22 80 Q22 72 32 70 Q40 78 50 78 Q60 78 68 70 Q78 72 78 80 L78 100 Z"
        fill={clothes.cloth}
      />
      {/* ribbed hem hint */}
      <path
        d="M22 92 L78 92"
        stroke={clothes.clothShade}
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* collar / round neckline */}
      <path
        d="M36 70 Q50 78 64 70 Q58 74 50 74 Q42 74 36 70 Z"
        fill={clothes.clothShade}
      />
    </g>
  );
}

function Eyes({ shade }: { shade: string }) {
  return (
    <g>
      <ellipse cx="38" cy="50" rx="6" ry="7" fill={shade} />
      <circle cx="36.5" cy="47.5" r="2.2" fill="#ffffff" />
      <circle cx="40" cy="52" r="0.9" fill="#ffffff" opacity="0.8" />
      <ellipse cx="62" cy="50" rx="6" ry="7" fill={shade} />
      <circle cx="60.5" cy="47.5" r="2.2" fill="#ffffff" />
      <circle cx="64" cy="52" r="0.9" fill="#ffffff" opacity="0.8" />
    </g>
  );
}

function Cheeks() {
  return (
    <g>
      <ellipse cx="28" cy="62" rx="4.5" ry="2.8" fill="#f4a3b0" opacity="0.55" />
      <ellipse cx="72" cy="62" rx="4.5" ry="2.8" fill="#f4a3b0" opacity="0.55" />
    </g>
  );
}

function Smile({ stroke }: { stroke: string }) {
  return (
    <path
      d="M44 65 Q50 69 56 65"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    />
  );
}

function Nose({ fill }: { fill: string }) {
  return <ellipse cx="50" cy="58" rx="2.4" ry="1.8" fill={fill} />;
}

function HeadBase({ colors, headPath }: { colors: AnimalColors; headPath: ReactElement }) {
  return (
    <g>
      {headPath}
      <ellipse cx="50" cy="60" rx="20" ry="14" fill={colors.belly} opacity="0.55" />
    </g>
  );
}

type Renderer = (colors: AnimalColors, clothes: Clothes) => ReactElement;

const RENDERERS: Record<MascotAnimal, Renderer> = {
  capybara: (c, w) => (
    <g>
      <GroundShadow />
      <ellipse cx="32" cy="32" rx="5" ry="4" fill={c.fur} />
      <ellipse cx="68" cy="32" rx="5" ry="4" fill={c.fur} />
      <ellipse cx="32" cy="33" rx="2.5" ry="2" fill={c.furShade} opacity="0.45" />
      <ellipse cx="68" cy="33" rx="2.5" ry="2" fill={c.furShade} opacity="0.45" />
      <HeadBase colors={c} headPath={<ellipse cx="50" cy="46" rx="32" ry="28" fill={c.fur} />} />
      <Cheeks />
      <Eyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
      <Sweater clothes={w} />
    </g>
  ),
  loutre: (c, w) => (
    <g>
      <GroundShadow />
      <circle cx="30" cy="34" r="5" fill={c.fur} />
      <circle cx="70" cy="34" r="5" fill={c.fur} />
      <circle cx="30" cy="35" r="2.4" fill={c.furShade} opacity="0.5" />
      <circle cx="70" cy="35" r="2.4" fill={c.furShade} opacity="0.5" />
      <HeadBase colors={c} headPath={<ellipse cx="50" cy="46" rx="30" ry="28" fill={c.fur} />} />
      <path
        d="M22 58 L34 56 M22 62 L34 60 M78 58 L66 56 M78 62 L66 60"
        stroke={c.furShade}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* headband */}
      <path
        d="M22 32 Q50 24 78 32"
        stroke={w.cloth}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      <Cheeks />
      <Eyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
      <Sweater clothes={w} />
    </g>
  ),
  renarde: (c, w) => (
    <g>
      <GroundShadow />
      <path d="M28 14 L32 36 L42 30 Z" fill={c.fur} />
      <path d="M72 14 L68 36 L58 30 Z" fill={c.fur} />
      <path d="M30 18 L34 34 L40 30 Z" fill={c.furShade} opacity="0.45" />
      <path d="M70 18 L66 34 L60 30 Z" fill={c.furShade} opacity="0.45" />
      <HeadBase colors={c} headPath={<ellipse cx="50" cy="46" rx="30" ry="28" fill={c.fur} />} />
      <path d="M50 56 Q40 66 50 72 Q60 66 50 56 Z" fill={c.belly} />
      {/* scarf */}
      <path
        d="M28 70 Q50 80 72 70 L72 76 Q50 84 28 76 Z"
        fill={w.cloth}
      />
      <path
        d="M28 76 L24 86 L34 80 Z"
        fill={w.clothShade}
      />
      <Cheeks />
      <Eyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
    </g>
  ),
  biche: (c, w) => (
    <g>
      <GroundShadow />
      <path
        d="M38 14 L36 6 M36 6 L32 4 M36 6 L38 2"
        stroke={c.furShade}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M62 14 L64 6 M64 6 L68 4 M64 6 L62 2"
        stroke={c.furShade}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M30 22 L38 12 L42 28 Z" fill={c.fur} />
      <path d="M70 22 L62 12 L58 28 Z" fill={c.fur} />
      <HeadBase colors={c} headPath={<ellipse cx="50" cy="46" rx="29" ry="28" fill={c.fur} />} />
      <circle cx="34" cy="40" r="1.2" fill={c.belly} opacity="0.7" />
      <circle cx="66" cy="40" r="1.2" fill={c.belly} opacity="0.7" />
      <Cheeks />
      <Eyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
      <Sweater clothes={w} />
      {/* peter pan collar over sweater */}
      <path
        d="M36 72 Q42 80 50 80 Q58 80 64 72 Q58 76 50 76 Q42 76 36 72 Z"
        fill="#fff"
        opacity="0.85"
      />
    </g>
  ),
  ourse: (c, w) => (
    <g>
      <GroundShadow />
      <circle cx="28" cy="28" r="8" fill={c.fur} />
      <circle cx="72" cy="28" r="8" fill={c.fur} />
      <circle cx="28" cy="29" r="4" fill={c.furShade} opacity="0.4" />
      <circle cx="72" cy="29" r="4" fill={c.furShade} opacity="0.4" />
      <HeadBase colors={c} headPath={<circle cx="50" cy="46" r="30" fill={c.fur} />} />
      <Cheeks />
      <Eyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
      <Sweater clothes={w} />
      {/* horizontal stripe on sweater */}
      <path d="M22 86 L78 86" stroke={w.collar} strokeWidth="3" opacity="0.7" />
    </g>
  ),
  hibou: (c, w) => (
    <g>
      <GroundShadow />
      <path d="M28 14 L36 28 L40 18 Z" fill={c.fur} />
      <path d="M72 14 L64 28 L60 18 Z" fill={c.fur} />
      <ellipse cx="50" cy="46" rx="32" ry="28" fill={c.fur} />
      <ellipse cx="50" cy="56" rx="22" ry="18" fill={c.belly} opacity="0.85" />
      <circle cx="38" cy="48" r="9" fill="#ffffff" />
      <circle cx="62" cy="48" r="9" fill="#ffffff" />
      <ellipse cx="38" cy="49" rx="4" ry="5" fill={c.inner} />
      <ellipse cx="62" cy="49" rx="4" ry="5" fill={c.inner} />
      <circle cx="36.5" cy="47" r="1.4" fill="#ffffff" />
      <circle cx="60.5" cy="47" r="1.4" fill="#ffffff" />
      <path d="M47 58 L50 64 L53 58 Z" fill="#c89c5b" />
      <Cheeks />
      <Smile stroke={c.inner} />
      <Sweater clothes={w} />
      {/* bow tie */}
      <path d="M44 76 L50 80 L44 84 Z" fill={w.collar} />
      <path d="M56 76 L50 80 L56 84 Z" fill={w.collar} />
      <circle cx="50" cy="80" r="1.6" fill={w.cloth} />
    </g>
  ),
  koala: (c, w) => (
    <g>
      <GroundShadow />
      <circle cx="22" cy="36" r="11" fill={c.fur} />
      <circle cx="78" cy="36" r="11" fill={c.fur} />
      <circle cx="22" cy="38" r="6" fill={c.belly} opacity="0.7" />
      <circle cx="78" cy="38" r="6" fill={c.belly} opacity="0.7" />
      <HeadBase colors={c} headPath={<ellipse cx="50" cy="46" rx="28" ry="26" fill={c.fur} />} />
      <ellipse cx="50" cy="58" rx="6" ry="5" fill={c.inner} />
      <ellipse cx="48" cy="56.5" rx="1.6" ry="1" fill="#ffffff" opacity="0.5" />
      <Cheeks />
      <Eyes shade={c.inner} />
      <Smile stroke={c.inner} />
      <Sweater clothes={w} />
      {/* pyjama dots on sweater */}
      <circle cx="34" cy="84" r="1.4" fill={w.collar} opacity="0.6" />
      <circle cx="44" cy="90" r="1.4" fill={w.collar} opacity="0.6" />
      <circle cx="56" cy="84" r="1.4" fill={w.collar} opacity="0.6" />
      <circle cx="66" cy="90" r="1.4" fill={w.collar} opacity="0.6" />
    </g>
  ),
  louve: (c, w) => (
    <g>
      <GroundShadow />
      <path d="M28 12 L34 34 L42 28 Z" fill={c.fur} />
      <path d="M72 12 L66 34 L58 28 Z" fill={c.fur} />
      <path d="M30 16 L34 32 L40 28 Z" fill={c.furShade} opacity="0.4" />
      <path d="M70 16 L66 32 L60 28 Z" fill={c.furShade} opacity="0.4" />
      <HeadBase colors={c} headPath={<ellipse cx="50" cy="46" rx="30" ry="28" fill={c.fur} />} />
      <path
        d="M30 44 Q50 32 70 44 Q70 54 50 58 Q30 54 30 44 Z"
        fill={c.furShade}
        opacity="0.32"
      />
      <Cheeks />
      <Eyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
      <Sweater clothes={w} />
      {/* turtleneck collar */}
      <path
        d="M30 70 Q50 76 70 70 L70 76 Q50 82 30 76 Z"
        fill={w.clothShade}
      />
    </g>
  ),
};

type MascotAvatarProps = {
  mascot: MascotProfile;
  size?: Size;
  className?: string;
};

export function MascotAvatar({ mascot, size = "md", className = "" }: MascotAvatarProps) {
  const colors = ANIMAL_COLORS[mascot.id];
  const clothes = ACCENT_CLOTHES[mascot.accent];
  const renderer = RENDERERS[mascot.id];
  const bg = ACCENT_BG[mascot.accent];

  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full ${SIZE_CLASS[size]} ${className}`}
      style={{ backgroundColor: bg }}
      role="img"
      aria-label={`${mascot.name}, ${mascot.energy.toLowerCase()}`}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
        {renderer(colors, clothes)}
      </svg>
    </div>
  );
}
