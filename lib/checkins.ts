import type { DailyCheckIn, DayKey } from "./types";
import { DAY_KEYS, getISODatesForCurrentWeek, todayISO } from "./dates";

export type CheckInMap = Record<string, DailyCheckIn>;

export const emptyCheckIn = (date: string): DailyCheckIn => ({
  date,
  strengthDone: false,
  proteinTwice: false,
  fiberOrVegetables: false,
  postMealWalk: false,
  hydration: false,
  calmPause: false,
  sleepProtected: false,
});

export function getTodayCheckIn(map: CheckInMap, date: string = todayISO()): DailyCheckIn {
  return map[date] ?? emptyCheckIn(date);
}

export function updateTodayCheckIn(
  map: CheckInMap,
  patch: Partial<DailyCheckIn>,
  date: string = todayISO(),
): CheckInMap {
  const current = getTodayCheckIn(map, date);
  return { ...map, [date]: { ...current, ...patch, date } };
}

export function hasAnyAction(checkIn: DailyCheckIn | undefined): boolean {
  if (!checkIn) return false;
  return (
    checkIn.strengthDone ||
    checkIn.proteinTwice ||
    checkIn.fiberOrVegetables ||
    checkIn.postMealWalk ||
    checkIn.hydration ||
    checkIn.calmPause ||
    checkIn.sleepProtected ||
    Boolean(checkIn.notes && checkIn.notes.trim().length > 0)
  );
}

export function getWeeklyCheckIns(
  map: CheckInMap,
  reference: Date = new Date(),
): Record<DayKey, DailyCheckIn | undefined> {
  const dates = getISODatesForCurrentWeek(reference);
  const result = {} as Record<DayKey, DailyCheckIn | undefined>;
  DAY_KEYS.forEach((key) => {
    result[key] = map[dates[key]];
  });
  return result;
}

export function getWeeklyConsistency(
  map: CheckInMap,
  reference: Date = new Date(),
): { activeDays: number; totalDays: number } {
  const week = getWeeklyCheckIns(map, reference);
  const activeDays = DAY_KEYS.filter((key) => hasAnyAction(week[key])).length;
  return { activeDays, totalDays: DAY_KEYS.length };
}
