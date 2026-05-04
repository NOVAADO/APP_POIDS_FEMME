import type { MascotAccent, MascotContext, MascotProfile } from "@/lib/types";
import { Card } from "./ui/card";

type MascotCardProps = {
  mascot: MascotProfile;
  context: MascotContext;
  variant?: "compact" | "rich";
};

const accentClasses: Record<MascotAccent, string> = {
  moss: "bg-moss-500/15 text-moss-600",
  sand: "bg-sand-400/25 text-sand-600",
  cream: "bg-cream-200 text-ink-700",
  warm: "bg-amber-100 text-amber-800",
  rose: "bg-rose-100 text-rose-700",
};

function pickMessage(mascot: MascotProfile, context: MascotContext): string {
  const list = mascot.messages[context];
  if (list && list.length > 0) return list[0];
  const fallback = Object.values(mascot.messages).flat()[0];
  return fallback ?? "On y va doucement.";
}

export function MascotCard({ mascot, context, variant = "compact" }: MascotCardProps) {
  const isRich = variant === "rich";
  return (
    <Card className="flex items-start gap-4">
      <div
        aria-hidden
        className={`flex shrink-0 items-center justify-center rounded-soft ${
          accentClasses[mascot.accent]
        } ${isRich ? "h-20 w-20 text-5xl" : "h-14 w-14 text-3xl"}`}
      >
        {mascot.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-sand-600">
          {mascot.name} · {mascot.energy}
        </p>
        <p className="mt-1 text-base text-ink-900">{pickMessage(mascot, context)}</p>
        {isRich ? (
          <p className="mt-2 text-xs text-sand-600">{mascot.supportTone}</p>
        ) : null}
      </div>
    </Card>
  );
}
