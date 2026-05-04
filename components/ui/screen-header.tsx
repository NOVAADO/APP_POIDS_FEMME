import type { ReactNode } from "react";

type ScreenHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
};

export function ScreenHeader({ eyebrow, title, subtitle, trailing }: ScreenHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-wide text-sand-600">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-1 text-3xl font-semibold leading-tight text-ink-900">{title}</h1>
        {subtitle ? <p className="mt-2 text-sm text-sand-700">{subtitle}</p> : null}
      </div>
      {trailing ? <div className="shrink-0">{trailing}</div> : null}
    </header>
  );
}
