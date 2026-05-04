"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "soft";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  fullWidth?: boolean;
  children: ReactNode;
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-soft px-5 py-3 text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-moss-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-moss-500 text-white hover:bg-moss-600 active:bg-moss-600",
  secondary: "bg-white text-ink-700 border border-cream-200 hover:bg-cream-100",
  ghost: "bg-transparent text-ink-700 hover:bg-cream-100",
  soft: "bg-cream-100 text-ink-700 hover:bg-cream-200",
};

export function Button({ variant = "primary", fullWidth, className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
