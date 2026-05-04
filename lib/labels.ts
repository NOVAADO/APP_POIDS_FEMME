import type {
  Equipment,
  FoodFilter,
  GroceryCategory,
  HormonalStage,
  MealType,
  NeuroProfile,
  StoreId,
  UserProfile,
} from "./types";

export const hormonalStageOptions: { value: HormonalStage; label: string }[] = [
  { value: "premenopause", label: "Préménopause" },
  { value: "perimenopause", label: "Périménopause" },
  { value: "menopause", label: "Ménopause" },
];

export const neuroProfileOptions: { value: NeuroProfile; label: string }[] = [
  { value: "tdah", label: "TDAH" },
  { value: "hypersensitive", label: "Hypersensibilité" },
  { value: "reactance", label: "Réactance" },
  { value: "rumination", label: "Rumination" },
  { value: "executive_fatigue", label: "Fatigue exécutive" },
];

export const foodFilterOptions: { value: FoodFilter; label: string }[] = [
  { value: "sci", label: "SCI" },
  { value: "sensitive_digestion", label: "Digestion sensible" },
  { value: "reflux", label: "Reflux" },
  { value: "constipation", label: "Constipation" },
  { value: "lactose_free", label: "Sans lactose" },
  { value: "low_lactose", label: "Faible lactose" },
  { value: "no_bovine", label: "Sans produits bovins" },
  { value: "no_beef", label: "Sans bœuf" },
  { value: "vegetarian", label: "Végétarienne" },
  { value: "gluten_free", label: "Sans gluten" },
  { value: "egg_free", label: "Sans œufs" },
  { value: "nut_free", label: "Sans noix" },
];

export const equipmentOptions: { value: Equipment; label: string; emoji?: string }[] = [
  { value: "none", label: "Aucun équipement", emoji: "🤸" },
  { value: "mat", label: "Tapis", emoji: "🟫" },
  { value: "chair", label: "Chaise", emoji: "🪑" },
  { value: "wall", label: "Mur", emoji: "🧱" },
  { value: "elastic", label: "Élastique", emoji: "🎗️" },
  { value: "mini_band", label: "Mini-bande" },
  { value: "dumbbells", label: "Haltères", emoji: "🏋️" },
  { value: "bench", label: "Banc" },
  { value: "stationary_bike", label: "Vélo fixe", emoji: "🚲" },
  { value: "cable", label: "Poulie" },
];

export const equipmentLabel: Record<Equipment, string> = equipmentOptions.reduce(
  (acc, option) => {
    acc[option.value] = option.label;
    return acc;
  },
  {} as Record<Equipment, string>,
);

export const energyModeOptions: {
  value: "low" | "medium" | "good";
  label: string;
  emoji: string;
}[] = [
  { value: "low", label: "Batterie basse", emoji: "🪫" },
  { value: "medium", label: "Batterie correcte", emoji: "🔋" },
  { value: "good", label: "Bonne batterie", emoji: "⚡" },
];

export const exerciseCategoryLabel: Record<
  "lower_body" | "upper_body" | "core" | "mobility" | "cardio_soft",
  string
> = {
  lower_body: "Bas du corps",
  upper_body: "Haut du corps",
  core: "Tronc",
  mobility: "Mobilité",
  cardio_soft: "Cardio doux",
};

export const mealTypeLabel: Record<MealType, string> = {
  breakfast: "Déjeuner",
  lunch: "Dîner",
  dinner: "Souper",
  snack: "Collation",
};

export const groceryCategoryLabel: Record<GroceryCategory, string> = {
  fruits_vegetables: "Fruits et légumes",
  refrigerated: "Réfrigéré",
  meat_substitutes: "Viandes et substituts",
  pantry: "Garde-manger",
  frozen: "Surgelés",
  bakery: "Boulangerie",
  condiments: "Condiments",
  household: "Maison",
  other: "Autre",
};

export const groceryCategoryOrder: GroceryCategory[] = [
  "fruits_vegetables",
  "refrigerated",
  "meat_substitutes",
  "frozen",
  "bakery",
  "pantry",
  "condiments",
  "household",
  "other",
];

export const storeLabel: Record<StoreId, string> = {
  iga: "IGA",
  metro: "Métro",
  superc: "Super C",
  loblaws: "Loblaws",
  maxi: "Maxi",
  walmart: "Walmart",
};

export const storeOptions: { value: StoreId; label: string }[] = [
  { value: "iga", label: "IGA" },
  { value: "metro", label: "Métro" },
  { value: "superc", label: "Super C" },
  { value: "loblaws", label: "Loblaws" },
  { value: "maxi", label: "Maxi" },
  { value: "walmart", label: "Walmart" },
];

export const servingsOptions: { value: 1 | 2 | 3 | 4 | 5 | 6; label: string }[] = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
];

export const breakfastPreferenceOptions: {
  value: UserProfile["breakfastPreference"];
  label: string;
}[] = [
  { value: "salty", label: "Salé" },
  { value: "soft_sweet", label: "Sucré doux" },
  { value: "no_preference", label: "Aucune préférence" },
];

export const cookingCapacityOptions: {
  value: UserProfile["cookingCapacity"];
  label: string;
  emoji: string;
}[] = [
  { value: "low", label: "Basse", emoji: "🪫" },
  { value: "medium", label: "Moyenne", emoji: "🔋" },
  { value: "good", label: "Bonne", emoji: "⚡" },
];
