"use client";

import { useState } from "react";
import type { Equipment, Exercise, WorkoutActivity } from "@/lib/types";
import { getExerciseById } from "@/lib/workouts";
import { equipmentLabel, exerciseCategoryLabel } from "@/lib/labels";
import { Badge } from "./ui/badge";
import { ExerciseIllustration } from "./exercise-illustration";

type Variant = "soft" | "standard" | "progression";

const variantLabel: Record<Variant, string> = {
  soft: "Douce",
  standard: "Régulière",
  progression: "Un peu plus",
};

type WorkoutActivityCardProps = {
  activity: WorkoutActivity;
  exercise: Exercise;
  missingEquipment: Equipment[];
  onToggle: () => void;
  onToggleSetAside?: () => void;
};

export function WorkoutActivityCard({
  activity,
  exercise,
  missingEquipment,
  onToggle,
  onToggleSetAside,
}: WorkoutActivityCardProps) {
  const [variant, setVariant] = useState<Variant>(
    missingEquipment.length > 0 ? "soft" : "standard",
  );
  const [adapterOpen, setAdapterOpen] = useState(false);

  const showableEquipment = exercise.requiredEquipment.filter((e) => e !== "none");
  const hasMissing = missingEquipment.length > 0;
  const metric = activity.duration
    ? activity.duration
    : `${activity.sets ?? exercise.sets ?? 0} × ${activity.reps ?? exercise.reps ?? "—"}`;

  const isSetAside = Boolean(activity.setAside);
  const firstAlternativeId = exercise.alternatives?.[0];
  const firstAlternative = firstAlternativeId ? getExerciseById(firstAlternativeId) : undefined;

  return (
    <article
      className={`overflow-hidden rounded-soft shadow-soft transition-opacity ${
        isSetAside ? "bg-cream-100 opacity-70" : "bg-white"
      } ${activity.completed && !isSetAside ? "ring-1 ring-moss-500/40" : ""}`}
      aria-label={
        isSetAside ? `${exercise.name} — mis de côté pour aujourd’hui` : exercise.name
      }
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
              {isSetAside ? (
                <p className="mt-1 text-xs text-sand-700">Mis de côté pour aujourd’hui.</p>
              ) : null}
            </div>

            <button
              type="button"
              onClick={onToggle}
              disabled={isSetAside}
              aria-pressed={activity.completed}
              aria-label={
                activity.completed
                  ? `Annuler ${exercise.name}`
                  : `Marquer ${exercise.name} comme fait`
              }
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                isSetAside
                  ? "border-2 border-cream-200 bg-cream-100 text-transparent"
                  : activity.completed
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

      {!isSetAside ? (
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

          <div
            role="group"
            aria-label={`Version de ${exercise.name}`}
            className="flex flex-wrap gap-1.5"
          >
            {(["soft", "standard", "progression"] as Variant[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                aria-pressed={variant === v}
                aria-label={`Version ${variantLabel[v].toLowerCase()} de ${exercise.name}`}
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

          <button
            type="button"
            onClick={() => setAdapterOpen((v) => !v)}
            aria-expanded={adapterOpen}
            className="flex w-full items-center justify-between gap-2 rounded-soft bg-cream-100 px-3 py-2 text-left text-xs font-medium text-ink-900 transition-colors hover:bg-cream-200"
          >
            <span>Adapter cet exercice</span>
            <span aria-hidden className="text-sand-700">{adapterOpen ? "▴" : "▾"}</span>
          </button>

          {adapterOpen ? (
            <div className="space-y-2 rounded-soft bg-cream-50 p-3">
              <p className="text-xs text-sand-700">
                Tu peux adapter sans perdre ta séance.
              </p>

              <button
                type="button"
                onClick={() => setVariant("soft")}
                className="flex w-full items-start gap-2 rounded-soft bg-white px-3 py-2 text-left text-sm text-ink-900 transition-colors hover:bg-cream-100"
              >
                <span aria-hidden className="text-base">🌿</span>
                <span className="flex-1">
                  <span className="font-medium">Version plus courte ou plus douce</span>
                  <span className="block text-xs text-sand-700">
                    Passe en version douce, ressens sans forcer.
                  </span>
                </span>
              </button>

              <div className="flex w-full items-start gap-2 rounded-soft bg-white px-3 py-2 text-left text-sm">
                <span aria-hidden className="text-base">🔄</span>
                <span className="flex-1">
                  <span className="font-medium text-ink-900">Alternative sans accessoire</span>
                  {firstAlternative ? (
                    <span className="block text-xs text-sand-700">
                      Tu peux essayer « {firstAlternative.name} » à la place.
                    </span>
                  ) : (
                    <span className="block text-xs text-sand-700">
                      Pas d’alternative prévue pour celui-ci. Tu peux passer à la version douce.
                    </span>
                  )}
                </span>
              </div>

              {onToggleSetAside ? (
                <button
                  type="button"
                  onClick={onToggleSetAside}
                  className="flex w-full items-start gap-2 rounded-soft bg-white px-3 py-2 text-left text-sm text-ink-900 transition-colors hover:bg-cream-100"
                >
                  <span aria-hidden className="text-base">🤍</span>
                  <span className="flex-1">
                    <span className="font-medium">Je le saute aujourd’hui</span>
                    <span className="block text-xs text-sand-700">
                      Mis de côté, sans rattrapage. Tu peux le remettre plus tard.
                    </span>
                  </span>
                </button>
              ) : null}
            </div>
          ) : null}

          {hasMissing && exercise.alternatives && exercise.alternatives.length > 0 ? (
            <p className="text-xs text-sand-700">
              Tu peux choisir la version douce ou un autre exercice du jour.
            </p>
          ) : null}
        </div>
      ) : (
        <div className="border-t border-cream-200 px-4 py-3">
          {onToggleSetAside ? (
            <button
              type="button"
              onClick={onToggleSetAside}
              className="flex w-full items-center justify-center gap-2 rounded-pill border border-cream-200 bg-white px-3 py-2 text-xs font-medium text-ink-700 transition-colors hover:bg-cream-100"
            >
              Le remettre dans la séance
            </button>
          ) : null}
        </div>
      )}
    </article>
  );
}
