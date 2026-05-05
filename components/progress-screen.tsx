"use client";

import { useEffect, useRef, useState } from "react";
import type { DailyCheckIn, DayKey, MascotProfile } from "@/lib/types";
import { DAY_KEYS, DAY_LABELS, getCurrentDayKey } from "@/lib/dates";
import { Card } from "./ui/card";
import { ScreenHeader } from "./ui/screen-header";
import { Badge } from "./ui/badge";
import { MascotCard } from "./mascot-card";

type Scale = 1 | 2 | 3 | 4 | 5;

type ProgressScreenProps = {
  mascot: MascotProfile;
  checkIn: DailyCheckIn;
  weekly: Record<DayKey, DailyCheckIn | undefined>;
  weeklyConsistency: { activeDays: number; totalDays: number };
  onUpdate: (patch: Partial<DailyCheckIn>) => void;
};

type CheckBoxKey = keyof Pick<
  DailyCheckIn,
  | "strengthDone"
  | "proteinTwice"
  | "fiberOrVegetables"
  | "postMealWalk"
  | "hydration"
  | "calmPause"
  | "sleepProtected"
>;

const checkboxes: { key: CheckBoxKey; label: string }[] = [
  { key: "strengthDone", label: "Renforcement fait" },
  { key: "proteinTwice", label: "Protéines à au moins deux repas" },
  { key: "fiberOrVegetables", label: "Fibres ou légumes" },
  { key: "postMealWalk", label: "Marche douce après un repas" },
  { key: "hydration", label: "Hydratation suffisante" },
  { key: "calmPause", label: "Pause nerveuse" },
  { key: "sleepProtected", label: "Coucher protecteur" },
];

type ScaleKey = "energyMorning" | "cravings" | "digestion";

const scales: { key: ScaleKey; label: string; hint: string }[] = [
  { key: "energyMorning", label: "Énergie au réveil", hint: "1 très basse · 5 vive" },
  { key: "cravings", label: "Fringales", hint: "1 aucune · 5 marquées" },
  { key: "digestion", label: "Digestion", hint: "1 inconfortable · 5 légère" },
];

export function ProgressScreen({
  mascot,
  checkIn,
  weekly,
  weeklyConsistency,
  onUpdate,
}: ProgressScreenProps) {
  const todayKey = getCurrentDayKey();
  const [savedFlash, setSavedFlash] = useState(false);
  const flashTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setSavedFlash(true);
    if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    flashTimerRef.current = setTimeout(() => setSavedFlash(false), 1500);
    return () => {
      if (flashTimerRef.current) clearTimeout(flashTimerRef.current);
    };
  }, [
    checkIn.strengthDone,
    checkIn.proteinTwice,
    checkIn.fiberOrVegetables,
    checkIn.postMealWalk,
    checkIn.hydration,
    checkIn.calmPause,
    checkIn.sleepProtected,
    checkIn.energyMorning,
    checkIn.cravings,
    checkIn.digestion,
  ]);

  function hasAction(c: DailyCheckIn | undefined): boolean {
    if (!c) return false;
    return (
      c.strengthDone ||
      c.proteinTwice ||
      c.fiberOrVegetables ||
      c.postMealWalk ||
      c.hydration ||
      c.calmPause ||
      c.sleepProtected ||
      Boolean(c.notes && c.notes.trim().length > 0)
    );
  }

  return (
    <div className="space-y-6">
      <div
        aria-live="polite"
        className={`pointer-events-none fixed left-1/2 top-4 z-20 -translate-x-1/2 rounded-pill bg-moss-500 px-4 py-1.5 text-xs font-medium text-cream-50 shadow-soft transition-opacity ${
          savedFlash ? "opacity-100" : "opacity-0"
        }`}
      >
        ✓ Enregistré
      </div>

      <ScreenHeader
        eyebrow="Progression"
        title="Suivi doux"
        subtitle="Énergie, force, sommeil, fringales, digestion, constance. Le poids n’est pas central."
      />

      <MascotCard mascot={mascot} context="progress" />

      <Card padding="lg" className="space-y-3">
        <div>
          <h2 className="text-base font-semibold text-ink-900">Suivi doux du jour</h2>
          <p className="text-xs text-sand-700">Coche ce qui s’est passé. Aucune obligation.</p>
        </div>
        <ul className="space-y-2">
          {checkboxes.map(({ key, label }) => {
            const checked = checkIn[key];
            return (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => onUpdate({ [key]: !checked })}
                  aria-pressed={checked}
                  className={`flex w-full items-center gap-3 rounded-soft border px-3 py-2 text-left transition-colors ${
                    checked
                      ? "border-moss-500 bg-moss-500/5 text-ink-900"
                      : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                      checked
                        ? "border-moss-500 bg-moss-500 text-white"
                        : "border-sand-400 bg-white text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span className="text-sm">{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card padding="lg" className="space-y-4">
        <h2 className="text-base font-semibold text-ink-900">Échelles douces</h2>
        {scales.map(({ key, label, hint }) => {
          const value = checkIn[key];
          return (
            <div key={key}>
              <div className="mb-1 flex items-baseline justify-between">
                <p className="text-sm font-medium text-ink-900">{label}</p>
                <p className="text-xs text-sand-600">{hint}</p>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => {
                  const active = value === n;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => onUpdate({ [key]: (value === n ? undefined : n) as Scale | undefined })}
                      aria-pressed={active}
                      className={`h-10 flex-1 rounded-soft border text-sm transition-colors ${
                        active
                          ? "border-ink-900 bg-ink-900 text-cream-50"
                          : "border-cream-200 bg-white text-ink-700 hover:bg-cream-100"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </Card>

      <Card padding="lg" className="space-y-3">
        <h2 className="text-base font-semibold text-ink-900">Note douce du jour</h2>
        <textarea
          value={checkIn.notes ?? ""}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          placeholder="Un détail utile à retenir, sans obligation."
          rows={3}
          className="w-full resize-y rounded-soft border border-cream-200 bg-white p-3 text-sm text-ink-900 focus:outline-none focus:ring-2 focus:ring-moss-500"
        />
      </Card>

      <Card padding="lg" className="space-y-3">
        <div>
          <h2 className="text-base font-semibold text-ink-900">Constance hebdomadaire</h2>
          <p className="text-xs text-sand-700">Une journée active = au moins une action cochée.</p>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <p className="text-ink-900">
            {weeklyConsistency.activeDays} sur {weeklyConsistency.totalDays} jour
            {weeklyConsistency.totalDays > 1 ? "s" : ""}
          </p>
          <Badge tone="moss">Ta semaine se construit par petites preuves.</Badge>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {DAY_KEYS.map((day) => {
            const active = hasAction(weekly[day]);
            const isToday = day === todayKey;
            return (
              <div
                key={day}
                className={`flex flex-col items-center gap-1 rounded-soft border p-2 text-center text-[11px] ${
                  isToday ? "border-moss-500/50" : "border-cream-200"
                } ${active ? "bg-moss-500/10" : "bg-white"}`}
                aria-label={`${DAY_LABELS[day]}${active ? " : action faite" : " : pas d'action cochée"}`}
              >
                <span className="text-sand-600">{DAY_LABELS[day].slice(0, 3)}</span>
                <span aria-hidden className="text-base">
                  {active ? "●" : "○"}
                </span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-sand-600">
          On ne cherche pas une semaine parfaite. Même une action compte.
        </p>
      </Card>

      <p className="px-2 pt-2 text-center text-xs text-sand-600">
        Cette application soutient les habitudes de vie. Elle ne remplace pas un avis médical ou un
        suivi professionnel.
      </p>
    </div>
  );
}
