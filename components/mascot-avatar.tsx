"use client";

import Image from "next/image";
import { useState, type ReactElement } from "react";
import type { MascotAccent, MascotAnimal, MascotProfile } from "@/lib/types";

type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-14 w-14",
  md: "h-24 w-24",
  lg: "h-32 w-32",
};

const SIZE_PX: Record<Size, number> = {
  sm: 56,
  md: 96,
  lg: 128,
};

// Mascots that have a custom illustrated avatar at public/mascots/<id>-avatar.webp.
// When listed here AND the file exists, the image is rendered. If the file is
// missing or fails to load, the SVG renderer below is used as a graceful fallback.
// To add a new custom avatar: drop the file at public/mascots/<id>-avatar.webp
// AND add the id below.
export const MASCOTS_WITH_CUSTOM_AVATAR: ReadonlySet<MascotAnimal> = new Set<MascotAnimal>([
  "capybara",
]);

const ACCENT_BG: Record<MascotAccent, string> = {
  moss: "#e8efe0",
  sand: "#f4ead4",
  cream: "#faf2e1",
  warm: "#fcdfc1",
  rose: "#fbdada",
};

type AnimalColors = {
  fur: string;
  furShade: string;
  belly: string;
  inner: string;
};

const ANIMAL_COLORS: Record<MascotAnimal, AnimalColors> = {
  capybara: { fur: "#b58866", furShade: "#7d5a3c", belly: "#ebd1aa", inner: "#3d2c1d" },
  loutre: { fur: "#8e6a4a", furShade: "#5e4530", belly: "#dcc09a", inner: "#2e2014" },
  renarde: { fur: "#d97a3a", furShade: "#a4521e", belly: "#fbe2bf", inner: "#3a1e0c" },
  biche: { fur: "#cd9876", furShade: "#9b6f4d", belly: "#f3d9b3", inner: "#36241a" },
  ourse: { fur: "#7e5639", furShade: "#523a26", belly: "#cca987", inner: "#2c1d10" },
  hibou: { fur: "#9d6f44", furShade: "#6e4d2c", belly: "#ecca8a", inner: "#2e1f10" },
  koala: { fur: "#a4abae", furShade: "#6a7174", belly: "#e3e6e8", inner: "#262827" },
  louve: { fur: "#9b9590", furShade: "#65615d", belly: "#e0d9d3", inner: "#1f1d1c" },
};

type Clothes = { cloth: string; clothShade: string };

const ACCENT_CLOTHES: Record<MascotAccent, Clothes> = {
  moss: { cloth: "#7a8a6b", clothShade: "#566649" },
  sand: { cloth: "#c8a780", clothShade: "#9c7d57" },
  cream: { cloth: "#cebb96", clothShade: "#9b8865" },
  warm: { cloth: "#d3754a", clothShade: "#9c4d29" },
  rose: { cloth: "#c97d8b", clothShade: "#965765" },
};

function Sweater({ clothes }: { clothes: Clothes }) {
  return (
    <g>
      <path
        d="M14 100 L14 78 Q14 68 26 66 Q36 78 50 78 Q64 78 74 66 Q86 68 86 78 L86 100 Z"
        fill={clothes.cloth}
      />
      <path
        d="M28 76 L72 76"
        stroke={clothes.clothShade}
        strokeWidth="1.6"
        opacity="0.45"
      />
      <path
        d="M34 70 Q50 80 66 70 Q58 78 50 78 Q42 78 34 70 Z"
        fill={clothes.clothShade}
        opacity="0.85"
      />
    </g>
  );
}

function SparkleEyes({ shade }: { shade: string }) {
  return (
    <g>
      {/* left eye */}
      <ellipse cx="38" cy="48" rx="6.5" ry="8" fill={shade} />
      <circle cx="36" cy="44.5" r="2.6" fill="#ffffff" />
      <circle cx="40.5" cy="51" r="1" fill="#ffffff" opacity="0.85" />
      {/* right eye */}
      <ellipse cx="62" cy="48" rx="6.5" ry="8" fill={shade} />
      <circle cx="60" cy="44.5" r="2.6" fill="#ffffff" />
      <circle cx="64.5" cy="51" r="1" fill="#ffffff" opacity="0.85" />
    </g>
  );
}

function Cheeks() {
  return (
    <g>
      <ellipse cx="26" cy="60" rx="5.5" ry="3" fill="#f3a4ae" opacity="0.6" />
      <ellipse cx="74" cy="60" rx="5.5" ry="3" fill="#f3a4ae" opacity="0.6" />
    </g>
  );
}

function Smile({ stroke }: { stroke: string }) {
  return (
    <path
      d="M44 63 Q50 67 56 63"
      stroke={stroke}
      strokeWidth="1.7"
      strokeLinecap="round"
      fill="none"
    />
  );
}

function Nose({ fill }: { fill: string }) {
  return <ellipse cx="50" cy="56" rx="2.5" ry="1.9" fill={fill} />;
}

type Renderer = (colors: AnimalColors, clothes: Clothes) => ReactElement;

const RENDERERS: Record<MascotAnimal, Renderer> = {
  // CAPYBARA — round, calm, neutral
  capybara: (c, w) => (
    <g>
      {/* small ears */}
      <ellipse cx="28" cy="26" rx="6" ry="5" fill={c.fur} />
      <ellipse cx="72" cy="26" rx="6" ry="5" fill={c.fur} />
      <ellipse cx="28" cy="27" rx="3" ry="2.5" fill={c.furShade} opacity="0.5" />
      <ellipse cx="72" cy="27" rx="3" ry="2.5" fill={c.furShade} opacity="0.5" />
      {/* head */}
      <ellipse cx="50" cy="44" rx="34" ry="30" fill={c.fur} />
      {/* light belly muzzle area */}
      <ellipse cx="50" cy="58" rx="20" ry="13" fill={c.belly} opacity="0.7" />
      <SparkleEyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
      <Cheeks />
      <Sweater clothes={w} />
    </g>
  ),

  // LOUTRE — playful, soft head with whiskers + headband
  loutre: (c, w) => (
    <g>
      {/* ears */}
      <circle cx="28" cy="28" r="6" fill={c.fur} />
      <circle cx="72" cy="28" r="6" fill={c.fur} />
      <circle cx="28" cy="29" r="2.8" fill={c.furShade} opacity="0.5" />
      <circle cx="72" cy="29" r="2.8" fill={c.furShade} opacity="0.5" />
      {/* head */}
      <ellipse cx="50" cy="44" rx="32" ry="30" fill={c.fur} />
      {/* belly muzzle */}
      <ellipse cx="50" cy="58" rx="20" ry="14" fill={c.belly} opacity="0.75" />
      {/* headband */}
      <path
        d="M22 28 Q50 18 78 28"
        stroke={w.cloth}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 30 Q50 20 78 30"
        stroke={w.clothShade}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
      {/* whiskers */}
      <path
        d="M16 56 L32 54 M16 60 L32 58 M84 56 L68 54 M84 60 L68 58"
        stroke={c.furShade}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.6"
      />
      <SparkleEyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
      <Cheeks />
      <Sweater clothes={w} />
    </g>
  ),

  // RENARDE — pointed orange ears + scarf
  renarde: (c, w) => (
    <g>
      {/* tall pointed ears */}
      <path d="M22 12 L32 36 L44 28 Z" fill={c.fur} />
      <path d="M78 12 L68 36 L56 28 Z" fill={c.fur} />
      <path d="M26 18 L32 34 L40 30 Z" fill={c.furShade} opacity="0.45" />
      <path d="M74 18 L68 34 L60 30 Z" fill={c.furShade} opacity="0.45" />
      <ellipse cx="50" cy="44" rx="32" ry="30" fill={c.fur} />
      {/* white blaze + muzzle */}
      <path d="M50 44 Q38 54 50 70 Q62 54 50 44 Z" fill={c.belly} />
      {/* scarf draped over neck */}
      <path
        d="M22 76 Q50 86 78 76 L78 84 Q50 94 22 84 Z"
        fill={w.cloth}
      />
      <path
        d="M22 84 L18 96 L30 86 Z"
        fill={w.clothShade}
      />
      <SparkleEyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
      <Cheeks />
    </g>
  ),

  // BICHE — small antlers + cardigan with collar + spots
  biche: (c, w) => (
    <g>
      {/* tiny antlers */}
      <path
        d="M38 12 L36 4 M36 4 L32 2 M36 4 L38 0"
        stroke={c.furShade}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M62 12 L64 4 M64 4 L68 2 M64 4 L62 0"
        stroke={c.furShade}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      {/* delicate ears */}
      <path d="M30 22 L40 8 L44 28 Z" fill={c.fur} />
      <path d="M70 22 L60 8 L56 28 Z" fill={c.fur} />
      <path d="M34 22 L40 12 L42 26 Z" fill="#fbe5d6" opacity="0.6" />
      <path d="M66 22 L60 12 L58 26 Z" fill="#fbe5d6" opacity="0.6" />
      {/* head */}
      <ellipse cx="50" cy="44" rx="30" ry="29" fill={c.fur} />
      <ellipse cx="50" cy="58" rx="20" ry="13" fill={c.belly} opacity="0.75" />
      {/* white spots */}
      <circle cx="32" cy="38" r="1.4" fill="#ffffff" opacity="0.7" />
      <circle cx="68" cy="38" r="1.4" fill="#ffffff" opacity="0.7" />
      <circle cx="38" cy="32" r="0.9" fill="#ffffff" opacity="0.6" />
      <circle cx="62" cy="32" r="0.9" fill="#ffffff" opacity="0.6" />
      <SparkleEyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
      <Cheeks />
      <Sweater clothes={w} />
      {/* peter-pan collar */}
      <path
        d="M34 70 Q42 80 50 80 Q58 80 66 70 Q58 76 50 76 Q42 76 34 70 Z"
        fill="#ffffff"
        opacity="0.95"
      />
    </g>
  ),

  // OURSE — round, cozy, big ears
  ourse: (c, w) => (
    <g>
      {/* big round ears */}
      <circle cx="24" cy="22" r="9" fill={c.fur} />
      <circle cx="76" cy="22" r="9" fill={c.fur} />
      <circle cx="24" cy="23" r="4.5" fill={c.furShade} opacity="0.45" />
      <circle cx="76" cy="23" r="4.5" fill={c.furShade} opacity="0.45" />
      {/* head */}
      <circle cx="50" cy="44" r="32" fill={c.fur} />
      <ellipse cx="50" cy="58" rx="20" ry="14" fill={c.belly} opacity="0.75" />
      <SparkleEyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
      <Cheeks />
      <Sweater clothes={w} />
      {/* horizontal cozy stripe */}
      <path d="M14 90 L86 90" stroke={w.clothShade} strokeWidth="3.5" opacity="0.7" />
    </g>
  ),

  // HIBOU — wide head, big white-ringed eyes, beak, vest
  hibou: (c, w) => (
    <g>
      {/* feather tufts */}
      <path d="M22 10 L32 28 L40 16 Z" fill={c.fur} />
      <path d="M78 10 L68 28 L60 16 Z" fill={c.fur} />
      {/* head */}
      <ellipse cx="50" cy="44" rx="34" ry="30" fill={c.fur} />
      {/* face plate */}
      <ellipse cx="50" cy="50" rx="24" ry="20" fill={c.belly} opacity="0.85" />
      {/* big ringed eyes */}
      <circle cx="38" cy="48" r="10" fill="#ffffff" />
      <circle cx="62" cy="48" r="10" fill="#ffffff" />
      <circle cx="38" cy="48" r="5" fill={c.inner} />
      <circle cx="62" cy="48" r="5" fill={c.inner} />
      <circle cx="36.5" cy="46" r="1.6" fill="#ffffff" />
      <circle cx="60.5" cy="46" r="1.6" fill="#ffffff" />
      {/* beak */}
      <path d="M46 58 L50 66 L54 58 Z" fill="#d39855" />
      <Cheeks />
      <Sweater clothes={w} />
      {/* tiny bow tie */}
      <path d="M44 78 L50 82 L44 86 Z" fill={w.clothShade} />
      <path d="M56 78 L50 82 L56 86 Z" fill={w.clothShade} />
      <circle cx="50" cy="82" r="1.6" fill={w.cloth} />
    </g>
  ),

  // KOALA — huge fluffy side ears, big nose, gray
  koala: (c, w) => (
    <g>
      {/* huge fluffy side ears */}
      <circle cx="18" cy="38" r="14" fill={c.fur} />
      <circle cx="82" cy="38" r="14" fill={c.fur} />
      <circle cx="18" cy="40" r="8" fill={c.belly} opacity="0.7" />
      <circle cx="82" cy="40" r="8" fill={c.belly} opacity="0.7" />
      {/* head */}
      <ellipse cx="50" cy="46" rx="28" ry="26" fill={c.fur} />
      <ellipse cx="50" cy="58" rx="18" ry="13" fill={c.belly} opacity="0.7" />
      {/* big dark nose */}
      <ellipse cx="50" cy="56" rx="7" ry="5.5" fill={c.inner} />
      <ellipse cx="48" cy="54.5" rx="1.8" ry="1.1" fill="#ffffff" opacity="0.55" />
      <SparkleEyes shade={c.inner} />
      <Smile stroke={c.inner} />
      <Cheeks />
      <Sweater clothes={w} />
      {/* pyjama dots */}
      <circle cx="30" cy="84" r="1.6" fill={w.clothShade} opacity="0.65" />
      <circle cx="42" cy="92" r="1.6" fill={w.clothShade} opacity="0.65" />
      <circle cx="58" cy="84" r="1.6" fill={w.clothShade} opacity="0.65" />
      <circle cx="70" cy="92" r="1.6" fill={w.clothShade} opacity="0.65" />
    </g>
  ),

  // LOUVE — pointed ears, slate gray, mask, jacket
  louve: (c, w) => (
    <g>
      {/* pointed ears */}
      <path d="M22 8 L32 32 L42 26 Z" fill={c.fur} />
      <path d="M78 8 L68 32 L58 26 Z" fill={c.fur} />
      <path d="M26 14 L32 30 L38 28 Z" fill={c.furShade} opacity="0.45" />
      <path d="M74 14 L68 30 L62 28 Z" fill={c.furShade} opacity="0.45" />
      {/* head */}
      <ellipse cx="50" cy="44" rx="32" ry="30" fill={c.fur} />
      <ellipse cx="50" cy="58" rx="20" ry="14" fill={c.belly} opacity="0.7" />
      {/* darker mask */}
      <path
        d="M22 40 Q50 26 78 40 Q78 52 50 56 Q22 52 22 40 Z"
        fill={c.furShade}
        opacity="0.4"
      />
      <SparkleEyes shade={c.inner} />
      <Nose fill={c.inner} />
      <Smile stroke={c.inner} />
      <Cheeks />
      <Sweater clothes={w} />
      {/* turtleneck collar */}
      <path
        d="M28 70 Q50 78 72 70 L72 78 Q50 86 28 78 Z"
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
  const [imageFailed, setImageFailed] = useState(false);
  const hasCustomAvatar = MASCOTS_WITH_CUSTOM_AVATAR.has(mascot.id);
  const useImage = hasCustomAvatar && !imageFailed;

  const colors = ANIMAL_COLORS[mascot.id];
  const clothes = ACCENT_CLOTHES[mascot.accent];
  const renderer = RENDERERS[mascot.id];
  const bg = ACCENT_BG[mascot.accent];
  const sizePx = SIZE_PX[size];

  return (
    <div
      className={`shrink-0 overflow-hidden rounded-full ${SIZE_CLASS[size]} ${className}`}
      style={{ backgroundColor: useImage ? undefined : bg }}
      role="img"
      aria-label={`${mascot.name}, ${mascot.energy.toLowerCase()}`}
    >
      {useImage ? (
        <Image
          src={`/mascots/${mascot.id}-avatar.webp`}
          alt=""
          width={sizePx}
          height={sizePx}
          className="h-full w-full object-cover"
          onError={() => setImageFailed(true)}
          priority={size === "lg"}
        />
      ) : (
        <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
          {renderer(colors, clothes)}
        </svg>
      )}
    </div>
  );
}
