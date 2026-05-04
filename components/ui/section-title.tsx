import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  hint?: string;
};

export function SectionTitle({ children, hint }: SectionTitleProps) {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-semibold text-ink-900">{children}</h2>
      {hint ? <p className="mt-1 text-sm text-sand-600">{hint}</p> : null}
    </div>
  );
}
