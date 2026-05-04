"use client";

import { useState } from "react";
import type { Equipment, Exercise, ExerciseIllustration, WorkoutActivity } from "@/lib/types";
import { equipmentLabel, exerciseCategoryLabel } from "@/lib/labels";
import { Badge } from "./ui/badge";

type Variant = "soft" | "standard" | "progression";

const variantLabel: Record<Variant, string> = {
  soft: "Douce",
  standard: "Standard",
  progression: "Progression",
};

const accentClasses: Record<NonNullable<ExerciseIllustration["accent"]>, string> = {
  moss: "bg-moss-500/15 text-moss-600",
  sand: "bg-sand-400/25 text-sand-600",
  cream: "bg-cream-200 text-ink-700",
  warm: "bg-amber-100 text-amber-800",
};

type WorkoutActivityCardProps = {
  activity: WorkoutActivity;
  exercise: Exercise;
  missingEquipment: Equipment[];
  onToggle: () => void;
};

export function WorkoutActivityCard({
  activity,
  exercise,
  missingEquipment,
  onToggle,
}: WorkoutActivityCardProps) {
  const [variant, setVariant] = useState<Variant>(
    missingEquipment.length > 0 ? "soft" : "standard",
  );

  const showableEquipment = exercise.requiredEquipment.filter((e) => e !== "none");
  const hasMissing = missingEquipment.length > 0;
  const illustration = exercise.illustration ?? { emoji: "💪", accent: "moss" };
  const metric = activity.duration
    ? activity.duration
    : `${activity.sets ?? exercise.sets ?? 0} × ${activity.reps ?? exercise.reps ?? "—"}`;

  return (
    <article
      className={`overflow-hidden rounded-soft border bg-white shadow-soft transition-colors ${
        activity.completed ? "border-moss-500/40 bg-moss-500/5" : "border-cream-200"
      }`}
    >
      <div className="flex items-stretch">
        <div
          aria-hidden
          className={`flex w-24 shrink-0 items-center justify-center text-4xl ${
            accentClasses[illustration.accent]
          }`}
        >
          {illustration.emoji}
        </div>

        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-sand-600">
                {exerciseCategoryLabel[exercise.category]}
              </p>
              <h3 className="mt-0.5 truncate text-base font-semibold text-ink-900">
                {exercise.name}
              </h3>
              <p className="mt-1 text-lg font-semibold tabular-nums text-ink-900">{metric}</p>
            </div>

            <button
              type="button"
              onClick={onToggle}
              aria-pressed={activity.completed}
              aria-label={
                activity.completed
                  ? `Annuler ${exercise.name}`
                  : `Marquer ${exercise.name} comme fait`
              }
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                activity.completed
                  ? "border-moss-500 bg-moss-500 text-white"
                  : "border-sand-400 bg-white text-transparent hover:border-moss-500"
              }`}
            >
              <span aria-hidden className="text-base">
                ✓
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t border-cream-200 px-4 py-3">
        <div className="flex flex-wrap gap-1.5">
          {showableEquipment.length === 0 ? (
            <Badge tone="moss">Aucun équipement</Badge>
          ) : (
            showableEquipment.map((eq) => (
              <Badge key={eq} tone={missingEquipment.includes(eq) ? "warn" : "moss"}>
                {equipmentLabel[eq]}
              </Badge>
            ))
          )}
          {hasMissing ? <Badge tone="warn">Accessoire manquant</Badge> : null}
        </div>

        {exercise.targetZones.length > 0 ? (
          <p className="text-xs text-sand-600">
            Zone : {exercise.targetZones.join(", ")}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-1.5">
          {(["soft", "standard", "progression"] as Variant[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              aria-pressed={variant === v}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                variant === v
                  ? "border-moss-500 bg-moss-500/10 text-moss-600"
                  : "border-cream-200 bg-white text-sand-600 hover:bg-cream-100"
              }`}
            >
              {variantLabel[v]}
            </button>
          ))}
        </div>

        <p className="text-sm text-ink-700">{exercise.instructions[variant]}</p>

        {hasMissing && exercise.alternatives && exercise.alternatives.length > 0 ? (
          <p className="text-xs text-sand-600">
            Tu peux choisir la version douce ou un autre exercice du jour.
          </p>
        ) : null}
      </div>
    </article>
  );
}
