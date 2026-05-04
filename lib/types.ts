export type HormonalStage = "premenopause" | "perimenopause" | "menopause";

export type NeuroProfile =
  | "tdah"
  | "hypersensitive"
  | "reactance"
  | "rumination"
  | "executive_fatigue";

export type FoodFilter =
  | "sci"
  | "sensitive_digestion"
  | "reflux"
  | "constipation"
  | "lactose_free"
  | "low_lactose"
  | "no_bovine"
  | "no_beef"
  | "vegetarian"
  | "gluten_free"
  | "egg_free"
  | "nut_free";

export type Equipment =
  | "none"
  | "mat"
  | "chair"
  | "wall"
  | "elastic"
  | "mini_band"
  | "dumbbells"
  | "bench"
  | "stationary_bike"
  | "cable";

export type StoreId = "iga" | "metro" | "superc" | "loblaws" | "maxi" | "walmart";

export type Store = {
  id: StoreId;
  name: string;
  enabled: boolean;
};

export type MascotAnimal =
  | "capybara"
  | "loutre"
  | "renarde"
  | "biche"
  | "ourse"
  | "hibou"
  | "koala"
  | "louve";

export type MascotMood =
  | "neutral"
  | "calm"
  | "encouraging"
  | "proud"
  | "restful"
  | "focused"
  | "compassionate";

export type MascotContext =
  | "home"
  | "workout"
  | "meals"
  | "grocery"
  | "progress"
  | "sleep"
  | "restart";

export type MascotAccent = "moss" | "sand" | "cream" | "warm" | "rose";

export type MascotProfile = {
  id: MascotAnimal;
  name: string;
  energy: string;
  description: string;
  wardrobe: string;
  bodyStyle: string;
  supportTone: string;
  accent: MascotAccent;
  defaultMood: MascotMood;
  messages: Partial<Record<MascotContext, string[]>>;
  imageKey: string;
  emoji: string;
};

export type ExerciseCategory =
  | "lower_body"
  | "upper_body"
  | "core"
  | "mobility"
  | "cardio_soft";

export type EnergyMode = "low" | "medium" | "good";

export type AdaptationTag =
  | "knees_sensitive"
  | "back_sensitive"
  | "migraine"
  | "hot_flashes"
  | "fatigue"
  | "low_time"
  | "body_shame";

export type Exercise = {
  id: string;
  name: string;
  category: ExerciseCategory;
  sets?: number;
  reps?: string;
  duration?: string;
  requiredEquipment: Equipment[];
  targetZones: string[];
  energyModes: EnergyMode[];
  adaptationTags: AdaptationTag[];
  instructions: {
    soft: string;
    standard: string;
    progression: string;
  };
  alternatives?: string[];
  visualKey: string;
};

export type WorkoutActivity = {
  id: string;
  exerciseId: string;
  sets?: number;
  reps?: string;
  duration?: string;
  completed: boolean;
  supersetGroupId?: string;
};

export type DailyWorkoutPlan = {
  date: string;
  title: string;
  energyMode: EnergyMode;
  activities: WorkoutActivity[];
};

export type GroceryCategory =
  | "fruits_vegetables"
  | "refrigerated"
  | "meat_substitutes"
  | "pantry"
  | "frozen"
  | "bakery"
  | "condiments"
  | "household"
  | "other";

export type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: GroceryCategory;
  aliases?: string[];
};

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type RecipeTag =
  | "glycemic_stable"
  | "high_protein"
  | "high_fiber"
  | "salty_breakfast"
  | "soft_sweet"
  | "quick"
  | "family_friendly"
  | "freezer_friendly"
  | "low_prep"
  | "lunchbox";

export type FoodStructure = {
  protein?: boolean;
  vegetables?: boolean;
  salad?: boolean;
  fruit?: boolean;
  grainOrStarch?: boolean;
  fat?: boolean;
};

export type FoodStructurePreference = "hidden" | "soft" | "precise";

export type Recipe = {
  id: string;
  title: string;
  mealType: MealType;
  baseServings: number;
  prepTimeMinutes: number;
  ingredients: Ingredient[];
  steps: string[];
  tags: RecipeTag[];
  excludedFor: FoodFilter[];
  recommendedFor: FoodFilter[];
  foodStructure?: FoodStructure;
  supportNote?: string;
  notes?: string;
  imageKey?: string;
};

export type PlannedMeal = {
  recipeId: string;
  servings: number;
};

export type DayKey =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type DayMeals = {
  breakfast?: PlannedMeal;
  lunch?: PlannedMeal;
  dinner?: PlannedMeal;
  snack?: PlannedMeal;
};

export type WeeklyMealPlan = {
  weekStartDate: string;
  days: Record<DayKey, DayMeals>;
};

export type FlyerDeal = {
  id: string;
  storeId: StoreId;
  productName: string;
  normalizedIngredientName: string;
  priceLabel?: string;
  validFrom?: string;
  validUntil?: string;
  sourceUrl?: string;
};

export type GroceryItem = {
  key: string;
  ingredientId: string;
  name: string;
  quantity: number;
  unit: string;
  category: GroceryCategory;
  inPantry: boolean;
  purchased: boolean;
  deals?: FlyerDeal[];
};

export type DailyCheckIn = {
  date: string;
  strengthDone: boolean;
  proteinTwice: boolean;
  fiberOrVegetables: boolean;
  postMealWalk: boolean;
  hydration: boolean;
  calmPause: boolean;
  sleepProtected: boolean;
  energyMorning?: 1 | 2 | 3 | 4 | 5;
  cravings?: 1 | 2 | 3 | 4 | 5;
  digestion?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
};

export type UserProfile = {
  firstName?: string;
  hormonalStage: HormonalStage;
  neuroProfiles: NeuroProfile[];
  foodFilters: FoodFilter[];
  availableEquipment: Equipment[];
  preferredStores: StoreId[];
  mascotId: MascotAnimal;
  householdDefaultServings: number;
  breakfastPreference: "salty" | "soft_sweet" | "no_preference";
  cookingCapacity: "low" | "medium" | "good";
  foodStructurePreference: FoodStructurePreference;
  remindersEnabled: boolean;
};

export type TabId =
  | "today"
  | "workout"
  | "meals"
  | "grocery"
  | "progress"
  | "profile";
