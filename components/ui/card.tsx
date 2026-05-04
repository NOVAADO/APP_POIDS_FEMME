import type { HTMLAttributes, ReactNode } from "react";

type Tone = "white" | "cream" | "soft";
type Padding = "none" | "md" | "lg";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  tone?: Tone;
  padding?: Padding;
  hero?: boolean;
};

const tones: Record<Tone, string> = {
  white: "bg-white",
  cream: "bg-cream-100",
  soft: "bg-cream-50",
};

const paddings: Record<Padding, string> = {
  none: "",
  md: "p-5",
  lg: "p-6",
};

export function Card({
  children,
  tone = "white",
  padding = "md",
  hero = false,
  className = "",
  ...rest
}: CardProps) {
  return (
    <div
      className={`${hero ? "rounded-hero shadow-hero" : "rounded-soft shadow-soft"} ${tones[tone]} ${paddings[padding]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
