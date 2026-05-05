"use client";

import { useEffect } from "react";
import type { Equipment, Exercise } from "@/lib/types";
import { equipmentLabel, exerciseCategoryLabel } from "@/lib/labels";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExerciseIllustration } from "./exercise-illustration";

type ExerciseDetailSheetProps = {
  exercise: Exercise | null;
  missingEquipment: Equipment[];
  onClose: () => void;
};

export function ExerciseDetailSheet({
  exercise,
  missingEquipment,
  onClose,
}: ExerciseDetailSheetProps) {
  useEffect(() => {
    if (!exercise) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [exercise, onClose]);

  if (!exercise) return null;

  const showableEquipment = exercise.requiredEquipment.filter((e) => e !== "none");
  const hasMissing = missingEquipment.length > 0;

  return (
    <div className="fixed inset-0 z-30 flex flex-col">
      <div
        className="absolute inset-0 bg-ink-900/40"
        aria-hidden
        onClick={onClose}
      />
      <div className="relative mt-auto flex max-h-[88svh] flex-col overflow-hidden rounded-t-hero bg-cream-50 shadow-hero">
        <div className="flex items-start justify-between gap-3 px-5 pt-5">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-sand-700">
              {exerciseCategoryLabel[exercise.category]}
            </p>
            <p className="mt-1 text-xl font-semibold leading-tight text-ink-900">
              {exercise.name}
            </p>
            {exercise.supportNote ? (
              <p className="mt-1 text-sm text-sand-700">{exercise.supportNote}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer le détail de l’exercice"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-ink-700 shadow-soft hover:bg-cream-100 active:bg-cream-200"
          >
            <span aria-hidden className="text-lg">
              ✕
            </span>
          </button>
        </div>

        <div className="px-5 pt-4">
          <ExerciseIllustration exerciseId={exercise.id} size="detail" className="rounded-soft" />
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
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
            <p className="text-sm text-sand-700">
              <span className="font-medium text-ink-900">Zone : </span>
              {exercise.targetZones.join(", ")}
            </p>
          ) : null}

          <Section title="Version douce" body={exercise.instructions.soft} />
          <Section title="Version standard" body={exercise.instructions.standard} />
          <Section title="Progression" body={exercise.instructions.progression} />

          {hasMissing ? (
            <p className="rounded-soft bg-amber-50 p-3 text-sm text-amber-800">
              Pas grave si l’accessoire manque. Tu peux choisir la version douce ou un autre
              exercice du jour.
            </p>
          ) : null}
        </div>

        <div className="border-t border-cream-200 bg-white px-5 py-3 safe-bottom">
          <Button onClick={onClose} fullWidth>
            Fermer
          </Button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-sand-600">{title}</p>
      <p className="text-sm leading-relaxed text-ink-700">{body}</p>
    </div>
  );
}
