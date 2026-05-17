"use client";

import Image from "next/image";
import { useState } from "react";
import type { MascotAnimal, MascotProfile } from "@/lib/types";
import { MascotAvatar } from "./mascot-avatar";

// Mascots that have a custom landscape hero illustration at public/mascots/<id>-hero.webp.
// Empty by default; populate when an asset has been deposited at the expected path.
// When listed AND the file exists, the landscape image is rendered. Otherwise the
// component falls back to MascotAvatar (which itself handles avatar.webp → SVG).
export const MASCOTS_WITH_CUSTOM_HERO: ReadonlySet<MascotAnimal> = new Set<MascotAnimal>([]);

type Variant = "soft" | "wide";

type MascotHeroProps = {
  mascot: MascotProfile;
  variant?: Variant;
  className?: string;
};

const VARIANT_ASPECT: Record<Variant, string> = {
  soft: "aspect-[5/4]",
  wide: "aspect-[4/3]",
};

/**
 * A landscape presence block for the most emotional moments (Today hero, Welcome).
 * 3-tier fallback chain:
 *   1. /mascots/<id>-hero.webp   (when id ∈ MASCOTS_WITH_CUSTOM_HERO and file exists)
 *   2. /mascots/<id>-avatar.webp (via MascotAvatar)
 *   3. SVG renderer              (via MascotAvatar)
 * The wrapper always carries the soft sage wash so the fallback avatar feels
 * like it's resting in a quiet scene rather than floating alone.
 */
export function MascotHero({ mascot, variant = "soft", className = "" }: MascotHeroProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasHero = MASCOTS_WITH_CUSTOM_HERO.has(mascot.id);
  const useImage = hasHero && !imageFailed;

  return (
    <div
      className={`relative overflow-hidden rounded-soft organic-wash-sage paper-texture ${VARIANT_ASPECT[variant]} ${className}`}
      role="img"
      aria-label={`${mascot.name}, ${mascot.energy.toLowerCase()}`}
    >
      {useImage ? (
        <Image
          src={`/mascots/${mascot.id}-hero.webp`}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 480px) 100vw, 480px"
          onError={() => setImageFailed(true)}
          priority
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-3">
          <MascotAvatar mascot={mascot} size="lg" className="!h-32 !w-32" />
        </div>
      )}
    </div>
  );
}
