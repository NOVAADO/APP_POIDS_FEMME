import type { ReactNode } from "react";
import { OrganicCard, type OrganicTone } from "./organic-card";

type SoftHeroProps = {
  tone?: OrganicTone;
  children: ReactNode;
  className?: string;
};

/**
 * Large hero card with organic wash background + paper texture + soft halo.
 * Used for the most emotionally important block on a screen (Welcome, PetiteAction on Today).
 * Keep contents simple — a presence (mascot) plus 1-2 lines, plus optional action.
 */
export function SoftHero({ tone = "sage", children, className = "" }: SoftHeroProps) {
  return (
    <OrganicCard
      tone={tone}
      padding="lg"
      hero
      halo
      className={`space-y-4 ${className}`}
    >
      {children}
    </OrganicCard>
  );
}
