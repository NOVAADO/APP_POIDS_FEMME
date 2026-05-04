import type { DayKey } from "./types";

export const DAY_KEYS: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const DAY_LABELS: Record<DayKey, string> = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};

export function getCurrentWeekStart(reference: Date = new Date()): string {
  const date = new Date(reference);
  const day = date.getDay();
  const diff = (day + 6) % 7;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return toISODate(date);
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function formatLongDate(date: Date = new Date()): string {
  return date.toLocaleDateString("fr-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function isNewWeek(storedWeekStart: string | null, now: Date = new Date()): boolean {
  if (!storedWeekStart) return true;
  return storedWeekStart !== getCurrentWeekStart(now);
}

export function getCurrentDayKey(reference: Date = new Date()): DayKey {
  const day = reference.getDay();
  return DAY_KEYS[(day + 6) % 7];
}

export function getISODatesForCurrentWeek(reference: Date = new Date()): Record<DayKey, string> {
  const start = new Date(reference);
  const day = start.getDay();
  const diff = (day + 6) % 7;
  start.setDate(start.getDate() - diff);
  start.setHours(0, 0, 0, 0);
  const result = {} as Record<DayKey, string>;
  DAY_KEYS.forEach((key, index) => {
    const d = new Date(start);
    d.setDate(start.getDate() + index);
    result[key] = toISODate(d);
  });
  return result;
}
