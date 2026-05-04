"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  DailyCheckIn,
  DailyWorkoutPlan,
  DayKey,
  EnergyMode,
  MealType,
  TabId,
  UserProfile,
  WeeklyMealPlan,
} from "@/lib/types";
import { getLocal, setLocal, StorageKeys } from "@/lib/storage";
import {
  defaultUserProfile,
  makeDefaultMealPlan,
  makeDefaultWorkoutPlan,
} from "@/data/default-plans";
import { recipes as allRecipes } from "@/data/recipes";
import { deals } from "@/data/deals";
import { getMascotById, mascots } from "@/data/mascots";
import { getCurrentWeekStart, todayISO } from "@/lib/dates";
import {
  applyEnergyMode,
  getShortWorkoutPlan,
  toggleActivityCompleted,
} from "@/lib/workouts";
import {
  buildGroceryList,
  toggleGroceryItemStatus,
  type GroceryCheckMap,
} from "@/lib/grocery";
import {
  type CheckInMap,
  getTodayCheckIn,
  getWeeklyCheckIns,
  getWeeklyConsistency,
  updateTodayCheckIn,
} from "@/lib/checkins";
import { BottomNav } from "./bottom-nav";
import { TodayScreen } from "./today-screen";
import { WorkoutScreen } from "./workout-screen";
import { MealsScreen } from "./meals-screen";
import { GroceryScreen } from "./grocery-screen";
import { ProgressScreen } from "./progress-screen";
import { ProfileScreen } from "./profile-screen";
import { WelcomeScreen } from "./welcome-screen";

export function AppShell() {
  const [hydrated, setHydrated] = useState(false);
  const [welcomeSeen, setWelcomeSeen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("today");
  const [profile, setProfile] = useState<UserProfile>(defaultUserProfile);

  const [basePlan, setBasePlan] = useState<DailyWorkoutPlan>(() => makeDefaultWorkoutPlan());
  const [energyMode, setEnergyMode] = useState<EnergyMode>("medium");
  const [shortMode, setShortMode] = useState<boolean>(false);

  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan>(() => makeDefaultMealPlan());
  const [showAllRecipes, setShowAllRecipes] = useState<boolean>(false);
  const [groceryChecks, setGroceryChecks] = useState<GroceryCheckMap>({});

  const [checkIns, setCheckIns] = useState<CheckInMap>({});

  useEffect(() => {
    setProfile(getLocal<UserProfile>(StorageKeys.profile, defaultUserProfile));
    setActiveTab(getLocal<TabId>(StorageKeys.activeTab, "today"));
    setWelcomeSeen(getLocal<boolean>(StorageKeys.welcomeSeen, false));

    const storedWorkout = getLocal<DailyWorkoutPlan | null>(StorageKeys.workoutPlan, null);
    if (storedWorkout && storedWorkout.date === todayISO()) {
      setBasePlan(storedWorkout);
    } else {
      setBasePlan(makeDefaultWorkoutPlan());
    }
    setEnergyMode(getLocal<EnergyMode>(StorageKeys.workoutEnergy, "medium"));
    setShortMode(getLocal<boolean>(StorageKeys.workoutShortMode, false));

    const storedMealPlan = getLocal<WeeklyMealPlan | null>(StorageKeys.mealPlan, null);
    if (storedMealPlan && storedMealPlan.weekStartDate === getCurrentWeekStart()) {
      setMealPlan(storedMealPlan);
    } else {
      setMealPlan(makeDefaultMealPlan());
    }
    setShowAllRecipes(getLocal<boolean>(StorageKeys.showAllRecipes, false));
    setGroceryChecks(getLocal<GroceryCheckMap>(StorageKeys.groceryChecks, {}));
    setCheckIns(getLocal<CheckInMap>(StorageKeys.dailyCheckIns, {}));

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) setLocal(StorageKeys.profile, profile);
  }, [profile, hydrated]);
  useEffect(() => {
    if (hydrated) setLocal(StorageKeys.activeTab, activeTab);
  }, [activeTab, hydrated]);
  useEffect(() => {
    if (hydrated) setLocal(StorageKeys.workoutPlan, basePlan);
  }, [basePlan, hydrated]);
  useEffect(() => {
    if (hydrated) setLocal(StorageKeys.workoutEnergy, energyMode);
  }, [energyMode, hydrated]);
  useEffect(() => {
    if (hydrated) setLocal(StorageKeys.workoutShortMode, shortMode);
  }, [shortMode, hydrated]);
  useEffect(() => {
    if (hydrated) setLocal(StorageKeys.mealPlan, mealPlan);
  }, [mealPlan, hydrated]);
  useEffect(() => {
    if (hydrated) setLocal(StorageKeys.showAllRecipes, showAllRecipes);
  }, [showAllRecipes, hydrated]);
  useEffect(() => {
    if (hydrated) setLocal(StorageKeys.groceryChecks, groceryChecks);
  }, [groceryChecks, hydrated]);
  useEffect(() => {
    if (hydrated) setLocal(StorageKeys.dailyCheckIns, checkIns);
  }, [checkIns, hydrated]);

  const displayedPlan = useMemo<DailyWorkoutPlan>(() => {
    const energized = applyEnergyMode(basePlan, energyMode);
    if (shortMode && energyMode !== "low") return getShortWorkoutPlan(energized);
    return energized;
  }, [basePlan, energyMode, shortMode]);

  const groceryItems = useMemo(
    () => buildGroceryList(mealPlan, allRecipes, groceryChecks, deals, profile.preferredStores),
    [mealPlan, groceryChecks, profile.preferredStores],
  );

  const todayCheckIn = useMemo<DailyCheckIn>(() => getTodayCheckIn(checkIns), [checkIns]);
  const weeklyCheckIns = useMemo(() => getWeeklyCheckIns(checkIns), [checkIns]);
  const weeklyConsistency = useMemo(() => getWeeklyConsistency(checkIns), [checkIns]);

  function handleContinueFromWelcome() {
    setWelcomeSeen(true);
    setLocal(StorageKeys.welcomeSeen, true);
  }

  function handleToggleActivity(activityId: string) {
    setBasePlan((prev) => toggleActivityCompleted(prev, activityId));
  }

  function handleChangeRecipe(day: DayKey, mealType: MealType, recipeId: string | null) {
    setMealPlan((prev) => {
      const dayMeals = { ...prev.days[day] };
      if (recipeId === null) {
        delete dayMeals[mealType];
      } else {
        const previousServings = dayMeals[mealType]?.servings ?? profile.householdDefaultServings;
        dayMeals[mealType] = { recipeId, servings: previousServings };
      }
      return { ...prev, days: { ...prev.days, [day]: dayMeals } };
    });
  }

  function handleChangeServings(day: DayKey, mealType: MealType, servings: number) {
    setMealPlan((prev) => {
      const dayMeals = { ...prev.days[day] };
      const current = dayMeals[mealType];
      if (!current) return prev;
      dayMeals[mealType] = { ...current, servings };
      return { ...prev, days: { ...prev.days, [day]: dayMeals } };
    });
  }

  function handleCopyDayMeal(sourceDay: DayKey, targetDay: DayKey, mealType: MealType) {
    setMealPlan((prev) => {
      const source = prev.days[sourceDay][mealType];
      if (!source) return prev;
      const target = { ...prev.days[targetDay], [mealType]: { ...source } };
      return { ...prev, days: { ...prev.days, [targetDay]: target } };
    });
  }

  function handleResetWeek() {
    setMealPlan(makeDefaultMealPlan());
    setGroceryChecks({});
  }

  function handleTogglePantry(itemKey: string) {
    setGroceryChecks((prev) => toggleGroceryItemStatus(prev, itemKey, "inPantry"));
  }

  function handleTogglePurchased(itemKey: string) {
    setGroceryChecks((prev) => toggleGroceryItemStatus(prev, itemKey, "purchased"));
  }

  function handleUpdateCheckIn(patch: Partial<DailyCheckIn>) {
    setCheckIns((prev) => updateTodayCheckIn(prev, patch));
  }

  if (!hydrated) {
    return <div className="min-h-svh bg-cream-50" aria-hidden />;
  }

  if (!welcomeSeen) {
    return <WelcomeScreen onContinue={handleContinueFromWelcome} />;
  }

  const mascot = getMascotById(profile.mascotId) ?? mascots[0];

  return (
    <div className="flex min-h-svh flex-col bg-cream-50">
      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-24 pt-6">
        {activeTab === "today" && (
          <TodayScreen
            mascot={mascot}
            profile={profile}
            workoutPlan={displayedPlan}
            energyMode={energyMode}
            shortMode={shortMode}
            mealPlan={mealPlan}
            groceryItems={groceryItems}
            onNavigate={setActiveTab}
          />
        )}
        {activeTab === "workout" && (
          <WorkoutScreen
            plan={displayedPlan}
            profile={profile}
            mascot={mascot}
            energyMode={energyMode}
            shortMode={shortMode}
            onToggleActivity={handleToggleActivity}
            onChangeEnergy={setEnergyMode}
            onToggleShortMode={() => setShortMode((s) => !s)}
          />
        )}
        {activeTab === "meals" && (
          <MealsScreen
            profile={profile}
            mascot={mascot}
            mealPlan={mealPlan}
            showAllRecipes={showAllRecipes}
            onToggleShowAll={() => setShowAllRecipes((v) => !v)}
            onChangeRecipe={handleChangeRecipe}
            onChangeServings={handleChangeServings}
            onCopyDayMeal={handleCopyDayMeal}
            onResetWeek={handleResetWeek}
          />
        )}
        {activeTab === "grocery" && (
          <GroceryScreen
            items={groceryItems}
            profile={profile}
            mascot={mascot}
            onTogglePantry={handleTogglePantry}
            onTogglePurchased={handleTogglePurchased}
          />
        )}
        {activeTab === "progress" && (
          <ProgressScreen
            mascot={mascot}
            checkIn={todayCheckIn}
            weekly={weeklyCheckIns}
            weeklyConsistency={weeklyConsistency}
            onUpdate={handleUpdateCheckIn}
          />
        )}
        {activeTab === "profile" && <ProfileScreen profile={profile} onChange={setProfile} />}
      </main>
      <BottomNav active={activeTab} onChange={setActiveTab} />
    </div>
  );
}
