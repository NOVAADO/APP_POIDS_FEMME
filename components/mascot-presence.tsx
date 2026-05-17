"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import type { MascotAnimal, MascotProfile } from "@/lib/types";
import { MascotAvatar } from "./mascot-avatar";

// Mascots that have a custom contextual pose at public/mascots/<id>-pose.webp.
// Empty by default; populate when an asset has been deposited.
export const MASCOTS_WITH_CUSTOM_POSE: ReadonlySet<MascotAnimal> = new Set<MascotAnimal>([]);

type PresenceSize = "sm" | "md";

type MascotPresenceProps = {
  mascot: MascotProfile;
  size?: PresenceSize;
  showName?: boolean;
  children: ReactNode;
  className?: string;
};

const SIZE_PX: Record<PresenceSize, number> = {
  sm: 56,
  md: 72,
};

const SIZE_CLASS: Record<PresenceSize, string> = {
  sm: "h-14 w-14",
  md: "h-[72px] w-[72px]",
};

/**
 * Companion presence block for in-context moments (signature under AI result,
 * end-of-workout, soft messages). Shows a small portrait of the mascot beside a
 * message slot. 3-tier fallback like MascotHero:
 *   1. /mascots/<id>-pose.webp   (when listed and file exists)
 *   2. avatar via MascotAvatar
 *   3. SVG via MascotAvatar
 */
export function MascotPresence({
  mascot,
  size = "sm",
  showName = true,
  children,
  className = "",
}: MascotPresenceProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasPose = MASCOTS_WITH_CUSTOM_POSE.has(mascot.id);
  const useImage = hasPose && !imageFailed;
  const sizePx = SIZE_PX[size];

  return (
    <div className={`flex items-start gap-3 ${className}`}>
      {useImage ? (
        <div
          className={`shrink-0 overflow-hidden rounded-full organic-wash-sage ${SIZE_CLASS[size]}`}
          role="img"
          aria-label={`${mascot.name}, ${mascot.energy.toLowerCase()}`}
        >
          <Image
            src={`/mascots/${mascot.id}-pose.webp`}
            alt=""
            width={sizePx}
            height={sizePx}
            className="h-full w-full object-cover"
            onError={() => setImageFailed(true)}
          />
        </div>
      ) : (
        <MascotAvatar mascot={mascot} size={size === "md" ? "md" : "sm"} />
      )}
      <div className="min-w-0 flex-1">
        {showName ? (
          <p className="text-xs font-medium uppercase tracking-wide text-sand-600">
            {mascot.name}
          </p>
        ) : null}
        <div className={showName ? "mt-1 text-sm text-ink-900" : "text-sm text-ink-900"}>
          {children}
        </div>
      </div>
    </div>
  );
}
