import type { HTMLAttributes, ReactNode } from "react";

export type OrganicTone = "paper" | "sage" | "clay" | "apricot" | "oat" | "rose";

type Padding = "none" | "sm" | "md" | "lg";

type OrganicCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: OrganicTone;
  padding?: Padding;
  hero?: boolean;
  textured?: boolean;
  halo?: boolean;
};

const toneBg: Record<OrganicTone, string> = {
  paper: "bg-paper-50",
  sage: "bg-sage-50",
  clay: "bg-clay-100",
  apricot: "bg-apricot-100",
  oat: "bg-oat-100",
  rose: "bg-rosewarm-100",
};

const toneWash: Record<OrganicTone, string> = {
  paper: "organic-wash-oat",
  sage: "organic-wash-sage",
  clay: "organic-wash-clay",
  apricot: "organic-wash-apricot",
  oat: "organic-wash-oat",
  rose: "organic-wash-rose",
};

const toneHalo: Record<OrganicTone, string> = {
  paper: "soft-halo",
  sage: "soft-halo",
  clay: "soft-halo-clay",
  apricot: "soft-halo-apricot",
  oat: "soft-halo",
  rose: "soft-halo-clay",
};

const paddings: Record<Padding, string> = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
};

export function OrganicCard({
  children,
  tone = "paper",
  padding = "md",
  hero = false,
  textured = true,
  halo = false,
  className = "",
  ...rest
}: OrganicCardProps) {
  return (
    <div
      className={[
        hero ? "rounded-hero" : "rounded-soft",
        toneBg[tone],
        toneWash[tone],
        textured ? "paper-texture" : "",
        halo ? toneHalo[tone] : hero ? "shadow-hero" : "shadow-soft",
        paddings[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
