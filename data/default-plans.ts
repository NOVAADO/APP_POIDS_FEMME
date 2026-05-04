import type { DailyWorkoutPlan, UserProfile, WeeklyMealPlan } from "@/lib/types";
import { getCurrentWeekStart, todayISO } from "@/lib/dates";

export const defaultUserProfile: UserProfile = {
  hormonalStage: "perimenopause",
  neuroProfiles: ["tdah", "hypersensitive", "reactance"],
  foodFilters: [],
  availableEquipment: ["none", "chair", "mat", "elastic"],
  preferredStores: ["iga", "metro", "superc", "maxi", "walmart"],
  mascotId: "capybara",
  householdDefaultServings: 4,
  breakfastPreference: "salty",
  cookingCapacity: "low",
  foodStructurePreference: "soft",
  remindersEnabled: true,
};

export function makeDefaultMealPlan(): WeeklyMealPlan {
  return {
    weekStartDate: getCurrentWeekStart(),
    days: {
      monday: {
        breakfast: { recipeId: "oeufs-avocat-legumes", servings: 1 },
        lunch: { recipeId: "bol-poulet-quinoa", servings: 4 },
        dinner: { recipeId: "saumon-pdt-brocoli", servings: 4 },
      },
      tuesday: {
        breakfast: { recipeId: "tofu-brouille", servings: 2 },
        lunch: { recipeId: "soupe-lentilles", servings: 4 },
        dinner: { recipeId: "omelette-repas", servings: 2 },
      },
      wednesday: {
        breakfast: { recipeId: "yogourt-grec-fruits", servings: 1 },
        lunch: { recipeId: "wrap-poulet", servings: 1 },
        dinner: { recipeId: "chili-lentilles", servings: 4 },
      },
      thursday: {
        breakfast: { recipeId: "oeufs-avocat-legumes", servings: 1 },
        lunch: { recipeId: "bol-poulet-quinoa", servings: 4 },
      },
      friday: {
        breakfast: { recipeId: "tofu-brouille", servings: 2 },
        snack: { recipeId: "houmous-legumes", servings: 1 },
      },
      saturday: {},
      sunday: {},
    },
  };
}

export function makeDefaultWorkoutPlan(): DailyWorkoutPlan {
  return {
    date: todayISO(),
    title: "Bas du corps doux",
    energyMode: "medium",
    activities: [
      { id: "a1", exerciseId: "respiration-360", duration: "1 minute", completed: false },
      { id: "a2", exerciseId: "squat-chaise", sets: 3, reps: "10", completed: false, supersetGroupId: "g1" },
      { id: "a3", exerciseId: "pont-fessier", sets: 3, reps: "12", completed: false, supersetGroupId: "g1" },
      { id: "a4", exerciseId: "pompes-mur", sets: 2, reps: "8 à 12", completed: false },
      { id: "a5", exerciseId: "dead-bug", sets: 2, reps: "8 par côté", completed: false },
      { id: "a6", exerciseId: "marche-post-repas", duration: "5 à 10 minutes", completed: false },
    ],
  };
}
