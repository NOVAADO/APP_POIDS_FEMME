import type { MascotContext, MascotProfile } from "@/lib/types";
import { Card } from "./ui/card";

type MascotCardProps = {
  mascot: MascotProfile;
  context: MascotContext;
};

function pickMessage(mascot: MascotProfile, context: MascotContext): string {
  const list = mascot.messages[context];
  if (list && list.length > 0) return list[0];
  const fallback = Object.values(mascot.messages).flat()[0];
  return fallback ?? "On y va doucement.";
}

export function MascotCard({ mascot, context }: MascotCardProps) {
  return (
    <Card className="flex items-start gap-4">
      <div
        aria-hidden
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cream-100 text-3xl"
      >
        {mascot.emoji}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-sand-600">{mascot.name} · {mascot.energy}</p>
        <p className="mt-1 text-base text-ink-900">{pickMessage(mascot, context)}</p>
      </div>
    </Card>
  );
}
