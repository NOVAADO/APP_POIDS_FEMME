"use client";

import { useState } from "react";
import type { Equipment, Exercise, WorkoutActivity } from "@/lib/types";
import { equipmentLabel, exerciseCategoryLabel } from "@/lib/labels";
import { Badge } from "./ui/badge";

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

  return (
    <div
      className={`rounded-soft border bg-white p-4 shadow-soft transition-colors ${
        activity.completed ? "border-moss-500/40 bg-moss-500/5" : "border-cream-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={activity.completed}
          aria-label={
            activity.completed ? `Annuler ${exercise.name}` : `Marquer ${exercise.name} comme fait`
          }
          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            activity.completed
              ? "border-moss-500 bg-moss-500 text-white"
              : "border-sand-400 bg-white text-transparent hover:border-moss-500"
          }`}
        >
          <span aria-hidden>✓</span>
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-medium text-ink-900">{exercise.name}</h3>
            <Badge tone="neutral">{exerciseCategoryLabel[exercise.category]}</Badge>
          </div>

          <p className="mt-1 text-sm text-sand-600">
            {[
              activity.sets ? `${activity.sets} série${activity.sets > 1 ? "s" : ""}` : null,
              activity.reps ? `${activity.reps} rép.` : null,
              activity.duration ?? null,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>

          {exercise.targetZones.length > 0 ? (
            <p className="mt-1 text-xs text-sand-600">Zone : {exercise.targetZones.join(", ")}</p>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-1.5">
            {showableEquipment.length === 0 ? (
              <Badge tone="moss">Aucun équipement</Badge>
            ) : (
              showableEquipment.map((eq) => (
                <Badge
                  key={eq}
                  tone={missingEquipment.includes(eq) ? "warn" : "moss"}
                >
                  {equipmentLabel[eq]}
                </Badge>
              ))
            )}
            {hasMissing ? <Badge tone="warn">Accessoire manquant</Badge> : null}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
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

          <p className="mt-2 text-sm text-ink-700">{exercise.instructions[variant]}</p>

          {hasMissing && exercise.alternatives && exercise.alternatives.length > 0 ? (
            <p className="mt-2 text-xs text-sand-600">
              Alternative possible : version douce ou un autre exercice du jour.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
