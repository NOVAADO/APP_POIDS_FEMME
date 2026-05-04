"use client";

import { useState } from "react";
import type { Equipment, Exercise, WorkoutActivity } from "@/lib/types";
import { equipmentLabel, exerciseCategoryLabel } from "@/lib/labels";
import { Badge } from "./ui/badge";
import { ExerciseIllustration } from "./exercise-illustration";

type Variant = "soft" | "standard" | "progression";

const variantLabel: Record<Variant, string> = {
  soft: "Douce",
  standard: "Standard",
  progression: "Progression",
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
  const metric = activity.duration
    ? activity.duration
    : `${activity.sets ?? exercise.sets ?? 0} × ${activity.reps ?? exercise.reps ?? "—"}`;

  return (
    <article
      className={`overflow-hidden rounded-soft bg-white shadow-soft ${
        activity.completed ? "ring-1 ring-moss-500/40" : ""
      }`}
    >
      <div className="flex items-stretch">
        <ExerciseIllustration exerciseId={exercise.id} size="card" />

        <div className="min-w-0 flex-1 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wide text-sand-600">
                {exerciseCategoryLabel[exercise.category]}
              </p>
              <h3 className="mt-0.5 truncate text-base font-semibold text-ink-900">
                {exercise.name}
              </h3>
              <p className="mt-1 text-xl font-semibold tabular-nums text-ink-900">
                {metric}
              </p>
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
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                activity.completed
                  ? "bg-ink-900 text-cream-50"
                  : "border-2 border-cream-200 bg-white text-transparent hover:border-ink-700"
              }`}
            >
              <span aria-hidden className="text-lg">
                ✓
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 border-t border-cream-200 px-4 py-3">
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
          {hasMissing ? <Badge tone="warn">Alternative à prévoir</Badge> : null}
        </div>

        {exercise.targetZones.length > 0 ? (
          <p className="text-xs text-sand-700">
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
              className={`inline-flex h-8 items-center rounded-pill border px-3 text-xs transition-colors ${
                variant === v
                  ? "border-ink-900 bg-ink-900 text-cream-50"
                  : "border-cream-200 bg-white text-sand-700 hover:bg-cream-100"
              }`}
            >
              {variantLabel[v]}
            </button>
          ))}
        </div>

        <p className="text-sm text-ink-700">{exercise.instructions[variant]}</p>

        {hasMissing && exercise.alternatives && exercise.alternatives.length > 0 ? (
          <p className="text-xs text-sand-700">
            Tu peux choisir la version douce ou un autre exercice du jour.
          </p>
        ) : null}
      </div>
    </article>
  );
}
