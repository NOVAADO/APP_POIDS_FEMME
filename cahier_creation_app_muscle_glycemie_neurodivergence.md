# Cahier de création complet — Application muscle, glycémie et transition hormonale

## 1. Intention du produit

Créer une application mobile-first destinée exclusivement aux femmes en préménopause, périménopause et ménopause ayant un surplus de poids, avec une attention particulière aux profils neurodivergents : TDAH, hypersensibilité, surcharge mentale, réactance aux contraintes, rumination et fatigue décisionnelle.

L’application ne doit pas ressembler à une application de performance physique classique. Elle doit soutenir la reconstruction musculaire, la stabilité glycémique, la réduction de la charge mentale alimentaire et l’adhésion à long terme, sans culpabilisation ni comparaison corporelle.

## 2. Positionnement clinique et émotionnel

### Objectifs principaux

- Reconstruire ou préserver la masse musculaire.
- Soutenir la résistance à l’insuline.
- Favoriser une perte de poids douce et durable.
- Réduire la charge mentale liée aux repas et à l’exercice.
- Offrir une expérience adaptée aux femmes neurodivergentes.
- Éviter les déclencheurs de honte corporelle, de comparaison et de perfectionnisme.

### À éviter absolument

- Ton punitif ou axé sur la performance.
- Suivi de calories comme élément central.
- Silhouettes humaines réalistes ou corps minces idéalisés.
- Messages du type : « brûler des calories », « se reprendre », « compenser ».
- Plans trop rigides ou longues séquences complexes.
- Mots qui induisent l’échec : abandon, retard, mauvais choix, triche.

### Ton recommandé

- Mature.
- Doux.
- Direct.
- Soutenant.
- Non infantilisant.
- Neuro-compatible.
- Orienté vers la prochaine petite action.

Exemples de microcopies :

- « On choisit la version faisable aujourd’hui. »
- « La version courte compte. »
- « Tu n’as rien brisé. On reprend ici. »
- « On soutient ton corps, on ne le punit pas. »
- « La constance imparfaite est la base du plan. »

## 3. Nom de travail

Nom interne proposé : **MétaCompagne**

Autres options possibles :

- **Compagne Métabolique**
- **Muscle Doux**
- **Force Douce**
- **Ancrage**
- **Métabolisme & Moi**
- **Nova Forme Douce**

Le nom final peut être décidé plus tard. Pour le code, utiliser un nom neutre : `metabolic-companion-app`.

## 4. Public cible

### Utilisatrice principale

Femme adulte en préménopause, périménopause ou ménopause, souvent avec :

- surplus de poids;
- résistance à l’insuline ou suspicion de résistance à l’insuline;
- fatigue;
- sommeil fragile;
- fringales liées à la fatigue ou aux variations glycémiques;
- charge mentale élevée;
- difficulté à maintenir des routines strictes;
- honte ou inconfort avec les applications de mise en forme classiques.

### Particularités neuropsychologiques à soutenir

- TDAH : difficulté à démarrer, oubli, surcharge par trop d’options.
- Hypersensibilité : surcharge sensorielle, besoin de douceur visuelle.
- Réactance : rejet des consignes trop autoritaires.
- Rumination : besoin de scripts courts et d’actions concrètes.
- Tout-ou-rien : besoin de versions minimales acceptables.

## 5. Piliers de l’application

1. **Muscle** : séances courtes, visuelles, adaptables, 2 à 3 fois par semaine.
2. **Glycémie** : protéines, fibres, glucides encadrés, marche douce après certains repas.
3. **Alimentation simplifiée** : recettes simples, planification familiale, liste d’épicerie automatique.
4. **Système nerveux** : pauses douces, sommeil, baisse de pression, messages non culpabilisants.
5. **Mascotte-compagnon** : avatar humanoïde animalier, habillé, non comparatif, qui accompagne l’utilisatrice.
6. **Délégation** : liste d’épicerie partageable par copier-coller pour Messenger, texto ou courriel.

## 6. Architecture fonctionnelle

### Onglets principaux

1. **Aujourd’hui**
2. **Bouger**
3. **Repas**
4. **Épicerie**
5. **Progression**
6. **Profil**

### Navigation secondaire

Dans Bouger :

- Plan du jour
- Bibliothèque d’exercices
- Minuterie
- Accessoires

Dans Repas :

- Livre de recettes
- Planificateur hebdomadaire
- Favoris
- Recettes compatibles

Dans Épicerie :

- Liste automatique
- Rabais à vérifier
- Partage Messenger
- Produits déjà à la maison

Dans Profil :

- Étape hormonale
- Neuroprofil
- Particularités alimentaires
- Accessoires disponibles
- Mascotte-compagnon
- Préférences d’épicerie

## 7. Mascottes-compagnons

### Concept

Les avatars ne sont pas des humains réalistes. Ce sont des personnages humanoïdes inspirés d’animaux, habillés, chaleureux et expressifs. Ils servent de compagnons de route dans l’application.

L’utilisatrice ne s’identifie pas au corps de l’avatar. Elle s’identifie à son énergie : calme, stabilité, stratégie, douceur, courage, repos ou clarté.

### Règles visuelles

- Humanoïde animalier.
- Habillé.
- Non sexualisé.
- Proportions stylisées.
- Aucune silhouette fitness idéalisée.
- Expressions douces et lisibles.
- Présence légère dans l’interface.
- Style cohérent sur mobile.

### Mascottes proposées

#### 1. Capybara — calme stable

- Énergie : calme, zéro pression, régulation.
- Rôle : aider quand l’utilisatrice est fatiguée ou surchargée.
- Tenue : pantalon souple, chandail ample, petit sac de marche.
- Messages :
  - « On garde ça simple aujourd’hui. »
  - « La version courte compte. »

#### 2. Loutre — mouvement joueur

- Énergie : ludique, souple, légère.
- Rôle : rendre l’exercice moins sérieux.
- Tenue : leggings doux, chandail confortable, bandeau.
- Messages :
  - « On bouge un peu, juste assez pour relancer l’énergie. »
  - « Pas besoin que ce soit parfait pour que ce soit utile. »

#### 3. Renarde — stratégie autonome

- Énergie : vive, astucieuse, indépendante.
- Rôle : aider à choisir sans se sentir contrôlée.
- Tenue : veste légère, pantalon pratique, carnet.
- Messages :
  - « Tu choisis la version qui respecte ta journée. »
  - « On contourne l’obstacle, on ne force pas le mur. »

#### 4. Biche — sensibilité protégée

- Énergie : douce, sensible, attentive.
- Rôle : soutenir l’hypersensibilité et les journées fragiles.
- Tenue : cardigan, pantalon fluide, foulard.
- Messages :
  - « On baisse le bruit et on commence doucement. »
  - « Ton système nerveux compte aussi. »

#### 5. Ourse — force rassurante

- Énergie : ancrée, protectrice, solide.
- Rôle : soutenir la reconstruction musculaire sans pression.
- Tenue : chandail chaud, pantalon confortable, chaussures stables.
- Messages :
  - « On construit de la force, tranquillement. »
  - « Solide ne veut pas dire intense. »

#### 6. Hibou — clarté et observation

- Énergie : lucide, posée, organisée.
- Rôle : aider à planifier les repas et l’épicerie.
- Tenue : veste douce, lunettes optionnelles, tablette.
- Messages :
  - « Je t’aide à réduire les décisions. »
  - « On prépare la semaine sans la surcharger. »

#### 7. Koala — repos et récupération

- Énergie : sommeil, lenteur, récupération.
- Rôle : accompagner les journées de fatigue, sommeil fragile ou baisse d’énergie.
- Tenue : pyjama doux ou tenue détente.
- Messages :
  - « Aujourd’hui, préserver ton énergie fait partie du plan. »
  - « Le repos soutient aussi ton métabolisme. »

#### 8. Louve — intuition et constance

- Énergie : loyauté, protection, instinct.
- Rôle : soutenir le retour à soi et la constance après une pause.
- Tenue : veste pratique, pantalon souple, bottillons.
- Messages :
  - « On revient au prochain petit pas. »
  - « Tu n’as pas à tout recommencer. »

### Types TypeScript

```ts
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

export type MascotProfile = {
  id: MascotAnimal;
  name: string;
  energy: string;
  description: string;
  wardrobe: string;
  defaultMood: MascotMood;
  messages: Partial<Record<MascotContext, string[]>>;
  imageKey: string;
};
```

## 8. Module entraînement

### Objectifs

- Soutenir la reconstruction musculaire.
- Favoriser la sensibilité à l’insuline.
- Offrir des séances visuelles, simples, modulables.
- Réduire la comparaison corporelle.
- Prévoir les accessoires nécessaires.

### Écran Plan du jour

Éléments à afficher :

- Date.
- Compteur : `0/7 activités effectuées`.
- Message de la mascotte.
- Liste d’exercices.
- Supersets visuels.
- Accessoires requis.
- Adaptations disponibles.
- Gros bouton : `Ajouter une activité`.
- Bouton : `Version courte`.
- Bouton : `Démarrer la minuterie`.

### Carte d’exercice

Chaque exercice affiche :

- nom;
- illustration mascotte ou pictogramme;
- séries;
- répétitions ou durée;
- accessoire requis;
- zone ciblée;
- niveau d’énergie compatible;
- adaptation genoux/dos/fatigue/bouffées de chaleur;
- état coché/non coché.

### Accessoires possibles

- Aucun équipement.
- Tapis.
- Chaise.
- Mur ou comptoir.
- Élastiques.
- Mini-bande.
- Haltères.
- Banc.
- Vélo fixe.
- Poulie.

### Types TypeScript

```ts
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
```

### Exercices MVP

Créer au minimum ces exercices :

Bas du corps :

- Squat vers chaise.
- Squat élastique.
- Squat sumo.
- Fente arrière assistée.
- Pont fessier.
- Charnière de hanches.
- Montée sur marche.
- Extension de hanche.

Haut du corps :

- Pompes au mur.
- Pompes inclinées.
- Shoulder press élastique.
- Rowing élastique.
- Rowing haltère un bras.
- Face pull élastique.
- Extension triceps élastique.
- Flexion biceps élastique.

Tronc :

- Dead bug doux.
- Planche inclinée.
- Respiration 360 degrés.
- Gainage contre le mur.

Cardio doux :

- Marche 5 à 10 minutes après repas.
- Vélo fixe 10 à 15 minutes doux.
- Rangement actif 10 minutes.

### Règles de filtrage des exercices

1. Si l’utilisatrice ne possède pas l’équipement requis, masquer l’exercice ou afficher une alternative.
2. Toujours afficher la version douce.
3. Ne jamais bloquer une séance parce qu’un accessoire manque.
4. Si énergie basse, réduire le nombre d’exercices et de séries.
5. Si migraine ou bouffées de chaleur, éviter mouvements sautés ou intensité élevée.
6. Si genoux sensibles, proposer chaise, mur, amplitude réduite.
7. Si dos sensible, réduire les flexions ou proposer respiration/activation fessiers.

## 9. Module alimentation

### Objectifs

- Stabiliser la glycémie.
- Faciliter les protéines et fibres.
- Éviter le régime strict.
- Réduire la charge mentale.
- Permettre de cuisiner pour soi ou pour la famille.
- Tenir compte des particularités digestives.

### Livre de recettes

Catégories :

- Déjeuner.
- Dîner.
- Souper.
- Collation.
- Dépannage.

### Recette

Chaque recette doit contenir :

- nom;
- type de repas;
- temps de préparation;
- nombre de portions de base;
- ingrédients avec quantités;
- étapes simples;
- tags nutritionnels;
- restrictions;
- compatibilités;
- possibilité de modifier le nombre de portions.

### Particularité importante

L’utilisatrice peut cuisiner pour elle seule ou pour sa famille. Dans chaque recette et dans le plan hebdomadaire, elle peut choisir le nombre de portions/personnes.

Exemple :

- Recette de base : 2 portions.
- Lundi soir : 4 portions.
- Les ingrédients sont multipliés par 2 dans la liste d’épicerie.

### Types TypeScript

```ts
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

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

export type Ingredient = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: GroceryCategory;
  aliases?: string[];
};

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
  notes?: string;
  imageKey?: string;
};

export type PlannedMeal = {
  recipeId: string;
  servings: number;
};

export type WeeklyMealPlan = {
  weekStartDate: string;
  days: Record<
    "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday",
    {
      breakfast?: PlannedMeal;
      lunch?: PlannedMeal;
      dinner?: PlannedMeal;
      snack?: PlannedMeal;
    }
  >;
};
```

### Règles de filtrage des recettes

1. Les recettes incompatibles avec le profil sont masquées par défaut.
2. Ajouter un bouton : `Voir quand même toutes les recettes`.
3. Si SCI est coché, éviter par défaut les recettes riches en irritants connus ou difficiles à tolérer.
4. Si sans lactose est coché, masquer yogourt, lait, fromage non adaptés.
5. Si sans produits bovins est coché, masquer bœuf, produits laitiers bovins, yogourt grec classique.
6. Si végétarienne est coché, masquer viande et poisson.
7. Si sans œufs est coché, masquer recettes avec œufs.
8. Si sans noix est coché, masquer noix, beurre d’arachide, amandes.
9. Les recettes doivent rester modifiables plus tard.

## 10. Module planification hebdomadaire

### Fonctionnement

L’utilisatrice choisit ses repas pour la semaine à partir du livre de recettes.

Pour chaque jour :

- déjeuner;
- dîner;
- souper;
- collation optionnelle.

Pour chaque repas :

- choisir une recette;
- choisir le nombre de portions/personnes;
- modifier les portions en cours de semaine;
- générer la liste d’épicerie automatiquement.

### UX recommandée

- Vue semaine en cartes.
- Chaque jour est repliable.
- Chaque repas a un bouton `Choisir une recette`.
- Afficher `4 portions` avec un sélecteur rapide : 1, 2, 3, 4, 5, 6.
- Bouton `Répéter ce repas`.
- Bouton `Utiliser les restes`.
- Bouton `Préparer une nouvelle semaine`.

## 11. Module épicerie

### Objectifs

- Générer automatiquement la liste.
- Additionner les ingrédients identiques.
- Ajuster selon les portions choisies.
- Permettre de cocher ce qui est déjà à la maison.
- Permettre de cocher ce qui est acheté.
- Permettre de partager la liste.
- Tenir compte des rabais de circulaires lorsque possible.

### Catégories

```ts
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
```

### Type GroceryItem

```ts
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
```

### Partage Messenger

Le bouton `Copier pour Messenger` génère une version texte lisible :

```txt
Liste d’épicerie de la semaine

Fruits et légumes
□ Brocoli — 2 têtes — à acheter
□ Avocats — 4 unités — déjà à la maison

Réfrigéré
□ Yogourt sans lactose — 1 pot — à acheter

Rabais à vérifier
- Brocoli : Super C, Maxi
- Œufs : Walmart

Merci de m’aider avec une partie de l’épicerie.
```

### Types pour les magasins et circulaires

```ts
export type StoreId = "iga" | "metro" | "superc" | "loblaws" | "maxi" | "walmart";

export type Store = {
  id: StoreId;
  name: string;
  enabled: boolean;
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
```

### Règle réaliste pour les circulaires

Pour le MVP, ne pas tenter de scraper automatiquement les circulaires. Prévoir une couche `dealsProvider` remplaçable.

Étape 1 — MVP :

- Données mockées de rabais.
- Affichage : `Rabais à vérifier`.
- Sélection des épiceries à surveiller.

Étape 2 — intégration externe :

- Ajouter API ou service tiers si disponible.
- Associer les produits des circulaires aux ingrédients avec des alias.
- Tenir compte de la région ou du code postal.

### Fonction de génération de liste d’épicerie

```ts
export function buildGroceryList(
  mealPlan: WeeklyMealPlan,
  recipes: Recipe[],
  groceryChecks: Record<string, { inPantry?: boolean; purchased?: boolean }>,
  deals: FlyerDeal[],
  enabledStores: StoreId[]
): GroceryItem[] {
  const map = new Map<string, GroceryItem>();

  Object.values(mealPlan.days).forEach((day) => {
    Object.values(day).forEach((plannedMeal) => {
      if (!plannedMeal) return;

      const recipe = recipes.find((item) => item.id === plannedMeal.recipeId);
      if (!recipe) return;

      const multiplier = plannedMeal.servings / recipe.baseServings;

      recipe.ingredients.forEach((ingredient) => {
        const key = `${ingredient.id}-${ingredient.unit}`;
        const existing = map.get(key);
        const quantityToAdd = ingredient.quantity * multiplier;

        const matchingDeals = deals.filter((deal) => {
          const storeEnabled = enabledStores.includes(deal.storeId);
          const directMatch = deal.normalizedIngredientName === ingredient.name.toLowerCase();
          const aliasMatch = ingredient.aliases?.some(
            (alias) => alias.toLowerCase() === deal.normalizedIngredientName
          );
          return storeEnabled && (directMatch || aliasMatch);
        });

        if (existing) {
          existing.quantity += quantityToAdd;
          existing.deals = [...(existing.deals || []), ...matchingDeals];
        } else {
          map.set(key, {
            key,
            ingredientId: ingredient.id,
            name: ingredient.name,
            quantity: quantityToAdd,
            unit: ingredient.unit,
            category: ingredient.category,
            inPantry: groceryChecks[key]?.inPantry || false,
            purchased: groceryChecks[key]?.purchased || false,
            deals: matchingDeals,
          });
        }
      });
    });
  });

  return Array.from(map.values()).sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });
}
```

## 12. Profil utilisateur

### Type UserProfile

```ts
export type HormonalStage = "premenopause" | "perimenopause" | "menopause";

export type NeuroProfile =
  | "tdah"
  | "hypersensitive"
  | "reactance"
  | "rumination"
  | "executive_fatigue";

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
  remindersEnabled: boolean;
};
```

### Valeurs par défaut

```ts
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
  remindersEnabled: true,
};
```

## 13. Progression et suivi

### Indicateurs à suivre

- Séances faites.
- Marches après repas.
- Protéines à au moins 2 repas.
- Fibres/légumes.
- Sommeil.
- Fringales.
- Énergie au réveil.
- Digestion.
- Bouffées de chaleur.
- Force ressentie.
- Tour de taille optionnel.

### Règle importante

Ne pas faire de la balance le centre de l’application. La balance peut exister comme donnée optionnelle, mais les indicateurs principaux doivent être : énergie, force, sommeil, fringales, digestion, constance.

### Type DailyCheckIn

```ts
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
```

## 14. Rappels neuro-compatibles

### Règles

- Jamais de rappel culpabilisant.
- Toujours offrir une version courte.
- Ne jamais dire que l’utilisatrice est en retard.
- Ne jamais faire sentir qu’elle a échoué.
- Le rappel doit réduire la friction, pas augmenter la pression.

### Exemples

- « Deux minutes suffisent pour garder le lien. »
- « Tu peux choisir la version douce. »
- « On reprend ici, sans rattrapage. »
- « Si ton énergie est basse, le minimum est le bon choix. »
- « La marche de 5 minutes compte. »

## 15. Architecture technique recommandée

### Stack

- Next.js 15 App Router.
- TypeScript.
- Tailwind CSS.
- React client components.
- LocalStorage pour MVP.
- Supabase plus tard si besoin de comptes utilisateurs.
- PWA plus tard si désiré.

### Pourquoi LocalStorage d’abord

Pour réduire le temps de développement avec Claude Code, commencer sans authentification, sans backend et sans base de données. L’objectif du premier MVP est de valider :

- parcours utilisateur;
- planification;
- génération d’épicerie;
- filtrage recettes;
- filtrage exercices;
- mascotte;
- ton;
- expérience mobile.

Ensuite seulement, ajouter compte utilisateur et synchronisation.

### Structure de fichiers proposée

```txt
app/
  layout.tsx
  page.tsx
  globals.css

components/
  app-shell.tsx
  bottom-nav.tsx
  mascot-card.tsx
  today-screen.tsx
  workout-screen.tsx
  workout-activity-card.tsx
  workout-timer.tsx
  meals-screen.tsx
  recipe-card.tsx
  meal-planner.tsx
  grocery-screen.tsx
  grocery-list.tsx
  progress-screen.tsx
  profile-screen.tsx
  ui/
    badge.tsx
    button.tsx
    card.tsx
    section-title.tsx
    toggle-pill.tsx

data/
  mascots.ts
  exercises.ts
  recipes.ts
  deals.ts
  stores.ts
  default-plans.ts

lib/
  types.ts
  storage.ts
  recipes.ts
  workouts.ts
  grocery.ts
  dates.ts
  copy.ts

public/
  mascots/
    capybara.svg
    loutre.svg
    renarde.svg
    biche.svg
    ourse.svg
    hibou.svg
    koala.svg
    louve.svg
```

## 16. Composants à créer

### AppShell

Responsable de :

- état principal;
- profil utilisateur;
- navigation;
- chargement/sauvegarde localStorage.

### BottomNav

Onglets :

- Aujourd’hui.
- Bouger.
- Repas.
- Épicerie.
- Progression.
- Profil.

### MascotCard

Props :

```ts
type MascotCardProps = {
  mascot: MascotProfile;
  context: MascotContext;
  mood?: MascotMood;
};
```

### WorkoutActivityCard

Props :

```ts
type WorkoutActivityCardProps = {
  activity: WorkoutActivity;
  exercise: Exercise;
  completed: boolean;
  onToggle: () => void;
  missingEquipment?: Equipment[];
};
```

### MealPlanner

Props :

```ts
type MealPlannerProps = {
  mealPlan: WeeklyMealPlan;
  recipes: Recipe[];
  visibleRecipes: Recipe[];
  onChangeRecipe: (day: string, mealType: MealType, recipeId: string) => void;
  onChangeServings: (day: string, mealType: MealType, servings: number) => void;
};
```

### GroceryList

Props :

```ts
type GroceryListProps = {
  items: GroceryItem[];
  onTogglePantry: (key: string) => void;
  onTogglePurchased: (key: string) => void;
  onCopyShareText: () => void;
};
```

## 17. Fonctions utilitaires essentielles

### `filterRecipes`

```ts
export function filterRecipes(recipes: Recipe[], filters: FoodFilter[], showAll: boolean): Recipe[] {
  if (showAll) return recipes;
  return recipes.filter((recipe) => {
    return !recipe.excludedFor.some((filter) => filters.includes(filter));
  });
}
```

### `scaleIngredients`

```ts
export function scaleIngredients(recipe: Recipe, servings: number): Ingredient[] {
  const multiplier = servings / recipe.baseServings;
  return recipe.ingredients.map((ingredient) => ({
    ...ingredient,
    quantity: ingredient.quantity * multiplier,
  }));
}
```

### `filterExercisesByEquipment`

```ts
export function filterExercisesByEquipment(
  exercises: Exercise[],
  availableEquipment: Equipment[]
): Exercise[] {
  return exercises.filter((exercise) => {
    return exercise.requiredEquipment.every(
      (equipment) => equipment === "none" || availableEquipment.includes(equipment)
    );
  });
}
```

### `getMissingEquipment`

```ts
export function getMissingEquipment(
  exercise: Exercise,
  availableEquipment: Equipment[]
): Equipment[] {
  return exercise.requiredEquipment.filter(
    (equipment) => equipment !== "none" && !availableEquipment.includes(equipment)
  );
}
```

### `buildGroceryShareText`

```ts
export function buildGroceryShareText(items: GroceryItem[]): string {
  const groups = items.reduce<Record<string, GroceryItem[]>>((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const lines = ["Liste d’épicerie de la semaine", ""];

  Object.entries(groups).forEach(([category, categoryItems]) => {
    lines.push(category);
    categoryItems.forEach((item) => {
      const status = item.inPantry ? "déjà à la maison" : item.purchased ? "acheté" : "à acheter";
      const deals = item.deals?.length
        ? ` — rabais à vérifier : ${item.deals.map((deal) => deal.storeId).join(", ")}`
        : "";
      lines.push(`□ ${item.name} — ${item.quantity} ${item.unit} (${status})${deals}`);
    });
    lines.push("");
  });

  lines.push("Merci de m’aider avec une partie de l’épicerie.");
  return lines.join("\n");
}
```

## 18. Données mockées minimales à créer

### Recettes minimales MVP

Déjeuners :

1. Œufs, avocat et légumes.
2. Bol yogourt grec, petits fruits et chia.
3. Gruau protéiné doux.
4. Tofu brouillé.
5. Smoothie protéiné doux.

Dîners :

1. Bol poulet, quinoa et légumes.
2. Salade repas saumon ou thon.
3. Soupe protéinée aux lentilles.
4. Wrap poulet/légumes.
5. Bol tofu, riz et légumes.

Soupers :

1. Saumon, pommes de terre et brocoli.
2. Poulet plaque au four.
3. Chili doux aux lentilles.
4. Tofu sauté au riz.
5. Omelette repas.
6. Soupe poulet et riz.

Collations :

1. Fromage sans lactose + fruit.
2. Yogourt compatible + graines.
3. Houmous + légumes.
4. Œuf dur + fruit.
5. Smoothie doux.

### Exercices minimaux MVP

Créer au moins 24 exercices :

- 8 bas du corps.
- 8 haut du corps.
- 4 tronc.
- 4 cardio doux/mobilité.

## 19. Écrans MVP attendus

### 1. Aujourd’hui

Contenu :

- Date.
- Mascotte.
- Message du jour.
- Batterie du jour.
- Plan bouger.
- Repas du jour.
- Mini liste d’épicerie s’il manque des choses.
- Bouton `Version courte`.

### 2. Bouger

Contenu :

- Activités du jour.
- Supersets.
- Accessoires.
- Minuterie.
- Bibliothèque d’exercices.

### 3. Repas

Contenu :

- Livre de recettes filtré.
- Planificateur de semaine.
- Portions par repas.
- Bouton nouvelle semaine.

### 4. Épicerie

Contenu :

- Liste regroupée par catégories.
- Boutons `Déjà à la maison` et `Acheté`.
- Rabais à vérifier.
- Bouton `Copier pour Messenger`.
- Magasins à surveiller.

### 5. Progression

Contenu :

- Suivi doux.
- Indicateurs non centrés sur le poids.
- Graphiques simples optionnels.
- Constance hebdomadaire.

### 6. Profil

Contenu :

- Étape hormonale.
- Neuroprofil.
- Particularités alimentaires.
- Équipement disponible.
- Mascotte-compagnon.
- Magasins préférés.
- Portions familiales par défaut.

## 20. Critères d’acceptation MVP

L’application est considérée fonctionnelle si :

1. L’utilisatrice peut sélectionner son profil hormonal.
2. Elle peut choisir son neuroprofil.
3. Elle peut choisir une mascotte humanoïde animalier.
4. Elle peut cocher ses particularités alimentaires.
5. Les recettes incompatibles sont masquées par défaut.
6. Elle peut créer un plan de repas hebdomadaire.
7. Elle peut changer le nombre de portions pour chaque repas.
8. La liste d’épicerie se génère automatiquement.
9. Les quantités changent quand les portions changent.
10. Elle peut cocher `Déjà à la maison`.
11. Elle peut cocher `Acheté`.
12. Elle peut copier la liste pour Messenger.
13. Elle peut choisir ses épiceries à surveiller.
14. Les rabais mockés apparaissent comme `À vérifier`.
15. Elle peut voir son plan d’exercices visuel.
16. Les accessoires requis sont affichés.
17. Les exercices incompatibles avec l’équipement sont adaptés ou signalés.
18. Elle peut cocher les exercices terminés.
19. Le suivi reste doux, sans culpabilisation.
20. Les données persistent en LocalStorage.

## 21. Prompt Claude Code complet

Copier-coller ce prompt dans Claude Code.

---

Je veux que tu construises une application Next.js 15 App Router, TypeScript et Tailwind CSS à partir de zéro, mobile-first, nommée `metabolic-companion-app`.

## Objectif produit

L’application s’adresse exclusivement aux femmes en préménopause, périménopause et ménopause ayant un surplus de poids, souvent neurodivergentes. Elle vise :

- reconstruction musculaire;
- soutien à la résistance à l’insuline;
- perte de poids douce;
- réduction de la charge mentale alimentaire;
- réduction de la honte corporelle et de la comparaison;
- routines adaptées au TDAH, à l’hypersensibilité et à la réactance.

Le ton doit être doux, mature, non infantilisant, non punitif et neuro-compatible. Ne jamais utiliser un ton de performance fitness ou de culpabilisation.

## Stack imposée

- Next.js 15 App Router.
- TypeScript strict.
- Tailwind CSS.
- React client components.
- LocalStorage pour le MVP.
- Pas de backend pour l’instant.
- Pas d’authentification.
- Pas d’API de circulaires réelle pour l’instant : utiliser des données mockées remplaçables.

## Structure de fichiers à créer

Crée exactement cette structure :

```txt
app/
  layout.tsx
  page.tsx
  globals.css

components/
  app-shell.tsx
  bottom-nav.tsx
  mascot-card.tsx
  today-screen.tsx
  workout-screen.tsx
  workout-activity-card.tsx
  workout-timer.tsx
  meals-screen.tsx
  recipe-card.tsx
  meal-planner.tsx
  grocery-screen.tsx
  grocery-list.tsx
  progress-screen.tsx
  profile-screen.tsx
  ui/
    badge.tsx
    button.tsx
    card.tsx
    section-title.tsx
    toggle-pill.tsx

data/
  mascots.ts
  exercises.ts
  recipes.ts
  deals.ts
  stores.ts
  default-plans.ts

lib/
  types.ts
  storage.ts
  recipes.ts
  workouts.ts
  grocery.ts
  dates.ts
  copy.ts
```

## Design UI

- Mobile-first.
- Fond doux : crème ou beige très pâle.
- Cartes blanches arrondies.
- Texte lisible.
- Navigation basse.
- Gros boutons faciles à toucher.
- Badges pour accessoires, filtres et statuts.
- Mascotte présente, mais non envahissante.

## Mascottes

Créer 8 mascottes humanoïdes animalières : capybara, loutre, renarde, biche, ourse, hibou, koala, louve.

Elles doivent être décrites dans `data/mascots.ts`. Pour les visuels, utiliser temporairement des blocs emoji ou SVG placeholder. Ne pas utiliser de corps humain réaliste. L’avatar est un compagnon de soutien, pas un modèle corporel.

## Onglets

Créer 6 onglets :

1. Aujourd’hui.
2. Bouger.
3. Repas.
4. Épicerie.
5. Progression.
6. Profil.

## Profil

Dans l’onglet Profil, permettre de modifier :

- étape hormonale : préménopause, périménopause, ménopause;
- neuroprofil : TDAH, hypersensibilité, réactance, rumination, fatigue exécutive;
- particularités alimentaires : SCI, digestion sensible, reflux, constipation, sans lactose, faible lactose, sans produits bovins, sans bœuf, végétarienne, sans gluten, sans œufs, sans noix;
- équipement disponible : aucun, tapis, chaise, mur, élastique, mini-bande, haltères, banc, vélo fixe, poulie;
- mascotte;
- épiceries à surveiller : IGA, Métro, Super C, Loblaws, Maxi, Walmart;
- nombre de portions par défaut pour la famille.

Les préférences doivent être persistées en LocalStorage.

## Bouger

Créer un plan d’exercices visuel.

Chaque exercice affiche :

- nom;
- séries;
- reps ou durée;
- accessoire requis;
- zone ciblée;
- badge d’énergie;
- visuel placeholder;
- état terminé/non terminé.

Afficher les supersets visuellement.

Ajouter une minuterie douce.

Filtrer ou signaler les exercices selon l’équipement disponible. Si équipement manquant, afficher une alternative ou un badge `Accessoire manquant`.

## Repas

Créer un livre de recettes avec au moins 20 recettes mockées : déjeuners, dîners, soupers et collations.

Chaque recette contient :

- id;
- titre;
- type de repas;
- portions de base;
- temps de préparation;
- ingrédients;
- étapes;
- tags;
- filtres d’exclusion;
- filtres recommandés.

Les recettes incompatibles avec le profil alimentaire sont masquées par défaut. Ajouter un bouton `Voir quand même toutes les recettes`.

## Planification des repas

Créer un planificateur hebdomadaire.

Pour chaque jour :

- déjeuner;
- dîner;
- souper;
- collation optionnelle.

L’utilisatrice peut choisir une recette et changer le nombre de portions pour chaque repas. Les portions doivent pouvoir varier dans la semaine.

## Épicerie

Créer une liste d’épicerie automatique à partir du plan de repas.

La liste doit :

- additionner les ingrédients similaires;
- ajuster les quantités selon les portions;
- regrouper par catégorie;
- permettre de cocher `Déjà à la maison`;
- permettre de cocher `Acheté`;
- afficher les rabais mockés à vérifier selon les épiceries sélectionnées;
- offrir un bouton `Copier pour Messenger`.

Le bouton `Copier pour Messenger` doit générer un texte lisible, regroupé par catégories, avec cases `□`, statuts et rabais à vérifier.

## Progression

Créer un suivi doux avec :

- renforcement fait;
- protéines à au moins deux repas;
- fibres/légumes;
- marche après repas;
- hydratation;
- pause nerveuse;
- coucher protecteur;
- énergie;
- fringales;
- digestion.

Ne pas centrer l’expérience sur le poids.

## LocalStorage

Créer des helpers dans `lib/storage.ts` :

- `getLocal<T>(key: string, fallback: T): T`
- `setLocal<T>(key: string, value: T): void`

Utiliser ces helpers partout.

## Fonctions obligatoires

Dans `lib/recipes.ts` :

- `filterRecipes`
- `scaleIngredients`

Dans `lib/workouts.ts` :

- `filterExercisesByEquipment`
- `getMissingEquipment`

Dans `lib/grocery.ts` :

- `buildGroceryList`
- `buildGroceryShareText`

Dans `lib/copy.ts` :

- `copyToClipboard`

## Critères de qualité

- Code clair.
- Types stricts.
- Données mockées séparées des composants.
- Composants réutilisables.
- Aucune dépendance externe inutile.
- Pas de backend.
- Aucune promesse médicale.
- Aucune culpabilisation.
- Interface utilisable sur mobile.

## Livrable attendu

Construis l’application complète avec les écrans fonctionnels, les données mockées et les interactions LocalStorage.

Après implémentation, donne-moi :

1. la liste des fichiers créés;
2. les commandes à exécuter;
3. les limites connues;
4. les prochaines étapes recommandées.

---

## 22. Plan de travail recommandé pour Claude Code

Demander à Claude Code de procéder en 5 passes :

### Passe 1 — Fondations

- Créer les types.
- Créer les données mockées.
- Créer les helpers LocalStorage.
- Créer l’AppShell et la navigation.

### Passe 2 — Profil et mascotte

- Écran Profil.
- Choix mascotte.
- Choix filtres alimentaires.
- Choix équipement.
- Choix épiceries.

### Passe 3 — Bouger

- Écran Bouger.
- Cartes exercices.
- Supersets.
- Minuterie.
- Filtrage équipement.

### Passe 4 — Repas et épicerie

- Livre de recettes.
- Planificateur semaine.
- Portions ajustables.
- Liste d’épicerie automatique.
- Rabais mockés.
- Copie Messenger.

### Passe 5 — Progression et finition UX

- Suivi doux.
- Messages mascotte.
- Responsive.
- Nettoyage.
- Tests manuels.

## 23. Priorités MVP

À coder en premier :

1. Profil.
2. Recettes filtrées.
3. Planificateur repas.
4. Liste d’épicerie automatique.
5. Copie Messenger.
6. Plan d’exercices visuel.
7. Accessoires requis.
8. Mascotte.
9. Progression douce.

À reporter :

- Connexion utilisateur.
- Paiement.
- API réelle de circulaires.
- Graphiques avancés.
- Notifications natives.
- Animations avancées des mascottes.
- Génération automatique de plans par IA.

## 24. Notes de prudence

L’application doit contenir une mention claire :

« Cette application est un outil de soutien aux habitudes de vie. Elle ne remplace pas un avis médical, un diagnostic, un traitement ou un suivi professionnel. En cas de condition médicale, de diabète traité, de douleurs, de symptômes inhabituels ou de médication, consulter une professionnelle ou un professionnel de la santé. »

## 25. Résumé exécutif

L’application doit être construite autour d’une idée centrale : aider une femme à refaire du muscle, stabiliser sa glycémie et simplifier son alimentation sans se battre contre son cerveau, son corps ou sa vie familiale.

Elle ne doit pas être une app de performance. Elle doit être une compagne douce, pratique, familiale et neuro-compatible.

