import type { MascotContext, MascotProfile } from "@/lib/types";
import { Card } from "./ui/card";
import { MascotAvatar } from "./mascot-avatar";

type MascotCardProps = {
  mascot: MascotProfile;
  context: MascotContext;
  variant?: "compact" | "rich";
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
      <MascotAvatar mascot={mascot} size={isRich ? "lg" : "sm"} />
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
