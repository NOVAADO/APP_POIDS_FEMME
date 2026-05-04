# Agents et rôles indispensables pour concevoir l’application

## Application : reconstruction musculaire, glycémie, transition hormonale et neurodivergence

Ce document définit les agents, rôles, responsabilités, critères de décision et interactions nécessaires pour concevoir une application destinée aux femmes en préménopause, périménopause et ménopause, avec surplus de poids, résistance à l’insuline ou suspicion de résistance à l’insuline, et besoins neurocompatibles.

L’application doit soutenir la reconstruction musculaire, la stabilité glycémique, l’alimentation familiale simple, la réduction de la charge mentale et l’adhésion durable, sans approche punitive, sans comparaison corporelle et sans discours de performance.

---

# 1. Principe directeur

L’application ne doit pas être pensée comme une application de mise en forme classique.

Elle doit être conçue comme une compagne pratique, douce et intelligente qui aide l’utilisatrice à :

- refaire du muscle;
- stabiliser sa glycémie;
- planifier des repas simples;
- cuisiner pour elle ou sa famille;
- réduire la charge mentale;
- déléguer certaines tâches;
- reprendre après une pause sans culpabilité;
- respecter son système nerveux;
- composer avec les variations hormonales;
- fonctionner malgré le TDAH, la fatigue, l’hypersensibilité ou la réactance.

---

# 2. Structure recommandée des agents

## 2.1 Agent Orchestrateur principal

### Nom recommandé
`agent-orchestrateur-produit`

### Mission
Coordonner tous les autres agents et garder la vision globale cohérente.

### Responsabilités
- Maintenir la vision produit.
- Prioriser les fonctionnalités.
- Éviter les dérives vers une application trop complexe.
- S’assurer que chaque décision respecte la cible :
  - femmes en transition hormonale;
  - surplus de poids;
  - résistance à l’insuline;
  - neurodivergence;
  - charge mentale élevée.
- Arbitrer entre santé, UX, technique, nutrition et entraînement.
- Transformer les recommandations des experts en décisions concrètes de produit.

### Questions à se poser
- Est-ce que cette fonctionnalité réduit ou augmente la charge mentale?
- Est-ce que cette décision peut culpabiliser l’utilisatrice?
- Est-ce que le MVP reste codable rapidement?
- Est-ce que cette fonction sert vraiment le muscle, la glycémie, les repas ou la constance?

### Livrables attendus
- Vision produit.
- Priorités MVP.
- Décisions d’arbitrage.
- Liste des fonctionnalités à coder maintenant ou plus tard.
- Plan de découpage pour Claude Code.

---

# 3. Agents santé et physiologie

## 3.1 Agent physiologie hormonale féminine

### Nom recommandé
`agent-hormones-feminines`

### Mission
Adapter l’application aux réalités de la préménopause, périménopause et ménopause.

### Responsabilités
- Tenir compte des fluctuations hormonales.
- Adapter les recommandations selon :
  - énergie;
  - sommeil;
  - bouffées de chaleur;
  - baisse de libido ou motivation;
  - humeur;
  - inflammation;
  - composition corporelle.
- Éviter les plans trop intenses pendant les périodes de fatigue.
- S’assurer que l’application ne fait pas porter la responsabilité uniquement sur la volonté.

### Points de vigilance
- Ne pas médicaliser inutilement.
- Ne pas promettre une perte de poids.
- Ne pas présenter la ménopause comme un échec corporel.
- Ne pas imposer un modèle unique.

### Livrables attendus
- Règles d’adaptation par étape hormonale.
- Messages de soutien.
- Contraintes à respecter dans les plans d’exercice.
- Indicateurs de progression pertinents autres que le poids.

---

## 3.2 Agent résistance à l’insuline et santé métabolique

### Nom recommandé
`agent-glycemie-metabolisme`

### Mission
Structurer l’application autour de la stabilisation glycémique et du soutien métabolique.

### Responsabilités
- Prioriser :
  - protéines;
  - fibres;
  - glucides complexes;
  - marche douce après repas;
  - reconstruction musculaire;
  - sommeil;
  - réduction du stress.
- Valider les recettes selon leur impact probable sur la satiété et la glycémie.
- Soutenir les choix alimentaires sans interdits rigides.
- Éviter les recommandations de déficit calorique agressif.

### Règles produit
- Les glucides ne sont pas interdits.
- Les glucides sont encadrés par protéines, fibres et gras.
- Les repas doivent être simples, répétables et rassurants.
- Les collations ne sont pas obligatoires.
- Les marches courtes après repas doivent être proposées comme stratégie douce.

### Livrables attendus
- Règles de composition des repas.
- Tags nutritionnels des recettes.
- Messages éducatifs courts.
- Critères de validation des recettes.

---

## 3.3 Agent inflammation, stress et cortisol

### Nom recommandé
`agent-stress-inflammation`

### Mission
Prévenir les plans qui aggravent le stress physiologique.

### Responsabilités
- Réduire les recommandations trop intenses.
- Intégrer des pauses de régulation.
- Tenir compte du sommeil.
- Prévenir les cycles :
  - restriction;
  - fatigue;
  - fringale;
  - culpabilité;
  - abandon.
- Rappeler que le stress chronique peut nuire à la perte de poids.

### Livrables attendus
- Règles de protection du système nerveux.
- Messages pour journées difficiles.
- Alternatives en cas de fatigue ou surcharge.

---

# 4. Agents neurodivergence et psychologie

## 4.1 Agent TDAH et fonctions exécutives

### Nom recommandé
`agent-tdah-fonctions-executives`

### Mission
Rendre l’application utilisable pour une personne qui a de la difficulté à commencer, planifier, terminer ou maintenir une routine.

### Responsabilités
- Réduire le nombre de décisions.
- Créer des actions très courtes.
- Prévoir des versions minimales acceptables.
- Éviter les longs formulaires.
- Prévoir des rappels non culpabilisants.
- Utiliser des boutons clairs.
- Favoriser les choix rapides :
  - batterie basse;
  - batterie correcte;
  - bonne batterie.
- Prévoir des raccourcis :
  - répéter un repas;
  - utiliser les restes;
  - copier la liste;
  - refaire la même semaine.

### Règles UX
- Une action principale par écran.
- Options limitées.
- Texte court.
- Boutons visibles.
- Progression simple.
- Jamais de message qui dit que l’utilisatrice est en retard.

### Livrables attendus
- Règles UX TDAH.
- Scripts de rappels.
- Structure simplifiée des écrans.
- Critères d’acceptation neurocompatibles.

---

## 4.2 Agent hypersensibilité et surcharge sensorielle

### Nom recommandé
`agent-hypersensibilite`

### Mission
Éviter que l’interface, les sons, les couleurs ou les messages deviennent surstimulants.

### Responsabilités
- Proposer une interface douce.
- Éviter les couleurs agressives.
- Réduire les animations intrusives.
- Prévoir un mode calme.
- Éviter les alertes anxiogènes.
- Limiter les célébrations trop intenses.

### Règles visuelles
- Fond crème ou beige pâle.
- Cartes blanches.
- Contraste suffisant.
- Icônes simples.
- Animations lentes.
- Pas de rouge d’alerte sauf situation importante.
- Pas de “gamification” excessive.

### Livrables attendus
- Charte sensorielle.
- Règles de couleur.
- Règles d’animation.
- Messages adaptés aux journées fragiles.

---

## 4.3 Agent réactance et anti-rigidité

### Nom recommandé
`agent-reactance-anti-rigidite`

### Mission
Empêcher l’application de devenir contrôlante, moralisante ou trop prescriptive.

### Responsabilités
- Transformer les obligations en choix.
- Ajouter des options souples.
- Prévoir des échappatoires.
- Éviter les “tu dois”.
- Éviter la logique tout-ou-rien.
- Permettre de recommencer sans rattrapage.

### Formulations recommandées
- « Tu peux choisir la version courte. »
- « On garde ce qui est faisable. »
- « Ce n’est pas perdu. »
- « On reprend au prochain repas. »
- « Aucun rattrapage nécessaire. »

### Formulations à éviter
- « Tu as manqué ta séance. »
- « Tu dois compenser. »
- « Objectif non atteint. »
- « Tu es en retard. »
- « Mauvaise journée. »

### Livrables attendus
- Dictionnaire de formulations.
- Règles de microcopy.
- Révision des écrans sensibles.

---

## 4.4 Agent trauma complexe et sécurité émotionnelle

### Nom recommandé
`agent-securite-emotionnelle`

### Mission
Prévenir les déclencheurs de honte, de contrôle, de comparaison corporelle et d’échec.

### Responsabilités
- Réviser les messages liés au poids, au corps et aux habitudes.
- Éviter toute logique punitive.
- Favoriser la sécurité, l’autonomie et le consentement.
- Soutenir les reprises après pause.
- Éviter les injonctions ou le ton autoritaire.

### Points de vigilance
- Les suivis corporels doivent être optionnels.
- La balance ne doit pas être l’indicateur central.
- Les avatars ne doivent pas être des corps idéalisés.
- Le vocabulaire doit soutenir la dignité.

### Livrables attendus
- Grille de sécurité émotionnelle.
- Liste de déclencheurs à éviter.
- Alternatives de formulation.

---

# 5. Agents entraînement et mouvement

## 5.1 Agent entraînement musculaire adapté

### Nom recommandé
`agent-renforcement-musculaire`

### Mission
Créer les séances d’exercice sécuritaires, efficaces et simples.

### Responsabilités
- Concevoir des plans de 2 à 3 séances par semaine.
- Prioriser les grands groupes musculaires :
  - jambes;
  - fessiers;
  - dos;
  - tronc;
  - haut du corps.
- Créer des versions :
  - batterie basse;
  - standard;
  - progression.
- Prévoir les accessoires nécessaires.
- Proposer des alternatives si un accessoire manque.
- Éviter les exercices trop complexes ou trop intenses.

### Exigences produit
Chaque exercice doit afficher :
- nom;
- illustration ou visuel;
- séries;
- répétitions ou durée;
- accessoires requis;
- zone ciblée;
- niveau d’énergie;
- adaptation possible;
- bouton terminé.

### Livrables attendus
- Catalogue d’exercices.
- Règles de progression.
- Structure des séances.
- Données mockées pour Claude Code.

---

## 5.2 Agent biomécanique et adaptations corporelles

### Nom recommandé
`agent-adaptations-douleurs`

### Mission
Adapter les exercices aux douleurs, limites et inconforts fréquents.

### Responsabilités
- Prévoir adaptations pour :
  - genoux sensibles;
  - dos sensible;
  - bassin sensible;
  - migraines;
  - bouffées de chaleur;
  - fatigue;
  - faible mobilité;
  - honte corporelle.
- Remplacer les mouvements à risque par des variantes plus douces.
- Ajouter des consignes simples pour éviter les blessures.

### Livrables attendus
- Tableau d’adaptations.
- Alternatives par exercice.
- Badges d’avertissement doux.
- Règles de sécurité.

---

## 5.3 Agent activité physique métabolique douce

### Nom recommandé
`agent-mouvement-glycemie`

### Mission
Intégrer les mouvements non intenses qui soutiennent la glycémie.

### Responsabilités
- Ajouter les marches post-repas.
- Ajouter les options de rangement actif.
- Ajouter vélo fixe doux si disponible.
- Définir des micro-actions de 5 à 10 minutes.
- Éviter la logique cardio intense.

### Livrables attendus
- Activités métaboliques courtes.
- Règles de suggestion après repas.
- Messages de marche douce.

---

# 6. Agents nutrition et alimentation

## 6.1 Agent nutrition fonctionnelle féminine

### Nom recommandé
`agent-nutrition-feminine`

### Mission
Créer une structure alimentaire simple, stable et compatible avec la glycémie.

### Responsabilités
- Créer des recettes riches en protéines et fibres.
- Adapter les déjeuners selon la glycémie.
- Prioriser les déjeuners salés quand pertinent.
- Éviter les plans stricts.
- Créer des repas familiaux simples.
- S’assurer que les repas sont réalistes.

### Règles alimentaires
- Protéines à au moins deux repas.
- Fibres quotidiennes.
- Glucides complexes encadrés.
- Bons gras en petite quantité.
- Repas prévisibles.
- Aucun aliment présenté comme interdit de façon morale.

### Livrables attendus
- Livre de recettes.
- Tags nutritionnels.
- Critères de compatibilité.
- Suggestions de repas simples.

---

## 6.2 Agent troubles digestifs et restrictions alimentaires

### Nom recommandé
`agent-digestion-restrictions`

### Mission
Gérer les particularités alimentaires et digestives.

### Responsabilités
- Créer les filtres :
  - SCI;
  - digestion sensible;
  - reflux;
  - constipation;
  - sans lactose;
  - faible lactose;
  - sans produits bovins;
  - sans bœuf;
  - végétarienne;
  - sans gluten;
  - sans œufs;
  - sans noix.
- Masquer les recettes incompatibles par défaut.
- Laisser l’option d’afficher toutes les recettes.
- Éviter les exclusions trop rigides si non nécessaires.
- Prévoir des alternatives.

### Livrables attendus
- Règles de filtrage.
- Liste de tags.
- Exemples de recettes compatibles/incompatibles.
- Messages d’explication courts.

---

## 6.3 Agent planification familiale des repas

### Nom recommandé
`agent-planification-repas-famille`

### Mission
Permettre à l’utilisatrice de cuisiner pour elle-même ou sa famille.

### Responsabilités
- Prévoir les portions par repas.
- Ajuster automatiquement les ingrédients.
- Permettre un nombre de portions variable selon le jour.
- Ajouter les fonctions :
  - répéter un repas;
  - utiliser les restes;
  - cuisiner double;
  - repas familial;
  - repas solo.
- S’assurer que la planification reste simple.

### Livrables attendus
- Modèle WeeklyMealPlan.
- Modèle PlannedMeal.
- Règles de multiplication des ingrédients.
- UX du planificateur hebdomadaire.

---

## 6.4 Agent recettes simples et cuisine réaliste

### Nom recommandé
`agent-recettes-simples`

### Mission
Créer des recettes très simples, faisables avec peu d’énergie.

### Responsabilités
- Créer des recettes courtes.
- Limiter le nombre d’étapes.
- Prévoir des ingrédients accessibles au Québec.
- Créer des recettes compatibles lunch/famille.
- Prévoir des recettes de dépannage.
- Éviter les recettes longues ou gastronomiques.

### Règles de recette
Chaque recette doit inclure :
- titre;
- temps;
- portions de base;
- ingrédients;
- étapes;
- tags;
- restrictions;
- catégorie.

### Livrables attendus
- Banque MVP de 20 à 30 recettes.
- Recettes classées déjeuner/dîner/souper/collation.
- Recettes avec ingrédients normalisés.

---

# 7. Agents épicerie, budget et délégation

## 7.1 Agent liste d’épicerie intelligente

### Nom recommandé
`agent-liste-epicerie`

### Mission
Générer une liste d’épicerie automatique, claire et partageable.

### Responsabilités
- Additionner les ingrédients.
- Ajuster les quantités selon les portions.
- Regrouper par catégorie.
- Gérer les statuts :
  - à acheter;
  - déjà à la maison;
  - acheté.
- Prévoir la réinitialisation hebdomadaire.
- Permettre la délégation.

### Livrables attendus
- Fonction `buildGroceryList`.
- Catégories d’épicerie.
- Structure GroceryItem.
- UX de liste cochable.

---

## 7.2 Agent circulaires et rabais

### Nom recommandé
`agent-circulaires-rabais`

### Mission
Prévoir la logique qui permet de tenir compte des rabais des épiceries.

### Épiceries visées
- IGA.
- Métro.
- Super C.
- Loblaws.
- Maxi.
- Walmart.

### Responsabilités
- Prévoir une architecture remplaçable.
- Ne pas dépendre d’un scraping fragile au MVP.
- Utiliser des rabais mockés au départ.
- Ajouter un statut : `Rabais à vérifier`.
- Prévoir la possibilité d’une intégration externe plus tard.
- Tenir compte du fait que les rabais peuvent varier selon la région.

### Livrables attendus
- Type Store.
- Type FlyerDeal.
- Données mockées.
- Stratégie d’intégration future.
- Affichage des rabais potentiels.

---

## 7.3 Agent partage et délégation familiale

### Nom recommandé
`agent-delegation-partage`

### Mission
Aider l’utilisatrice à partager les tâches avec une autre personne.

### Responsabilités
- Créer un bouton `Copier pour Messenger`.
- Générer une version texte lisible.
- Prévoir un format simple avec cases.
- Permettre l’envoi par Messenger, texto ou courriel.
- Réduire la charge mentale de délégation.

### Format recommandé
```txt
Liste d’épicerie de la semaine

Fruits et légumes
□ Brocoli — 2 têtes — à acheter
□ Avocats — 4 unités — déjà à la maison

Réfrigéré
□ Yogourt sans lactose — 1 pot — à acheter

Rabais à vérifier
- Brocoli : Super C, Maxi

Merci de m’aider avec une partie de l’épicerie.
```

### Livrables attendus
- Fonction `buildGroceryShareText`.
- Fonction `copyToClipboard`.
- UX de confirmation : `Liste copiée`.
- Message de soutien à la délégation.

---

# 8. Agents UX, UI et design

## 8.1 Agent UX mobile-first

### Nom recommandé
`agent-ux-mobile-first`

### Mission
Concevoir l’application d’abord pour cellulaire.

### Responsabilités
- Créer des écrans simples.
- Prioriser une action principale.
- Prévoir une navigation basse.
- Rendre les cartes faciles à toucher.
- Limiter le texte.
- Éviter les écrans trop denses.

### Livrables attendus
- Structure des écrans.
- Navigation.
- Hiérarchie visuelle.
- Critères de lisibilité mobile.

---

## 8.2 Agent UI douceur et accessibilité

### Nom recommandé
`agent-ui-accessibilite-douce`

### Mission
Créer une interface douce, lisible et accessible.

### Responsabilités
- Définir couleurs.
- Définir typographie.
- Définir espacements.
- Vérifier contraste.
- Créer des composants réutilisables.
- Garder un design sobre.

### Composants à prévoir
- Button.
- Card.
- Badge.
- TogglePill.
- SectionTitle.
- BottomNav.
- MascotCard.
- ExerciseCard.
- RecipeCard.
- GroceryItemCard.

### Livrables attendus
- Mini design system.
- Composants UI.
- Règles d’accessibilité.

---

## 8.3 Agent expérience émotionnelle et microcopy

### Nom recommandé
`agent-microcopy-emotionnelle`

### Mission
Écrire les textes courts qui rendent l’application soutenante.

### Responsabilités
- Rédiger les messages de mascotte.
- Rédiger les états vides.
- Rédiger les confirmations.
- Rédiger les avertissements doux.
- Éliminer les formulations culpabilisantes.

### Exemples d’états vides
- « Rien à rattraper. Tu peux préparer une nouvelle semaine. »
- « Aucune recette compatible pour ce filtre. Tu peux élargir les options. »
- « Aucun accessoire requis. On garde ça simple. »

### Livrables attendus
- Banque de microcopies.
- Messages par contexte.
- Textes d’erreur doux.

---

## 8.4 Agent mascotte et attachement utilisateur

### Nom recommandé
`agent-mascotte-compagnon`

### Mission
Créer le système de mascottes humanoïdes animalières.

### Responsabilités
- Définir les mascottes.
- Définir leurs énergies.
- Définir leurs messages.
- Définir leurs contextes d’apparition.
- Prévenir l’infantilisation.
- Prévenir la comparaison corporelle.

### Livrables attendus
- Données `mascots.ts`.
- Types MascotProfile.
- Composant MascotCard.
- Messages par contexte.
- Règles de présence dans l’interface.

---

# 9. Agents techniques

## 9.1 Agent architecture Next.js

### Nom recommandé
`agent-architecture-nextjs`

### Mission
Définir la structure technique de l’application.

### Responsabilités
- Utiliser Next.js App Router.
- Séparer données, composants et logique.
- Créer une structure claire.
- Éviter un backend prématuré.
- Assurer la maintenabilité.

### Stack MVP
- Next.js 15.
- TypeScript.
- Tailwind CSS.
- LocalStorage.
- Pas d’authentification.
- Pas de base de données.
- Pas d’API réelle au départ.

### Livrables attendus
- Arborescence.
- AppShell.
- Navigation.
- Organisation des fichiers.

---

## 9.2 Agent TypeScript et modèles de données

### Nom recommandé
`agent-typescript-modeles`

### Mission
Créer des types solides pour éviter que Claude Code perde du temps.

### Responsabilités
- Créer `types.ts`.
- Définir les types :
  - UserProfile;
  - MascotProfile;
  - Exercise;
  - WorkoutPlan;
  - Recipe;
  - WeeklyMealPlan;
  - GroceryItem;
  - FlyerDeal;
  - DailyCheckIn.
- Garantir des types simples et extensibles.

### Livrables attendus
- Fichier `lib/types.ts`.
- Types exportables.
- Cohérence entre composants et données.

---

## 9.3 Agent logique métier

### Nom recommandé
`agent-logique-metier`

### Mission
Coder les fonctions principales indépendantes de l’interface.

### Responsabilités
Créer les fonctions :

- `filterRecipes`.
- `scaleIngredients`.
- `filterExercisesByEquipment`.
- `getMissingEquipment`.
- `buildGroceryList`.
- `buildGroceryShareText`.
- `copyToClipboard`.
- `getCurrentWeekStart`.
- `resetWeeklyDataIfNeeded`.

### Livrables attendus
- Fichiers dans `lib/`.
- Fonctions pures.
- Tests manuels simples.

---

## 9.4 Agent persistance LocalStorage

### Nom recommandé
`agent-persistence-localstorage`

### Mission
Gérer la sauvegarde locale des données.

### Responsabilités
- Créer helpers :
  - `getLocal`.
  - `setLocal`.
  - `removeLocal`.
- Sauvegarder :
  - profil;
  - plan repas;
  - liste épicerie;
  - suivi quotidien;
  - progression;
  - choix de mascotte;
  - préférences.
- Prévoir une réinitialisation hebdomadaire.

### Livrables attendus
- `lib/storage.ts`.
- Clés LocalStorage nommées clairement.
- Gestion des valeurs invalides.

---

## 9.5 Agent qualité, tests et robustesse

### Nom recommandé
`agent-qa-tests`

### Mission
Vérifier que l’application fonctionne et ne casse pas les scénarios principaux.

### Responsabilités
Tester :

- changement des portions;
- recalcul de la liste d’épicerie;
- filtres alimentaires;
- affichage des rabais mockés;
- copie Messenger;
- choix mascotte;
- choix équipement;
- signalement équipement manquant;
- sauvegarde LocalStorage;
- réinitialisation hebdomadaire.

### Livrables attendus
- Liste de tests manuels.
- Critères d’acceptation.
- Bugs à corriger.
- Recommandations de tests automatisés plus tard.

---

# 10. Agents contenu et données

## 10.1 Agent données mockées MVP

### Nom recommandé
`agent-donnees-mock-mvp`

### Mission
Créer les données de départ pour que l’application fonctionne sans backend.

### Responsabilités
Créer :

- 8 mascottes.
- 24 exercices.
- 20 à 30 recettes.
- 6 magasins.
- 10 à 20 rabais mockés.
- 1 plan de repas par défaut.
- 1 plan d’entraînement par défaut.
- Messages de mascotte.

### Livrables attendus
- `data/mascots.ts`.
- `data/exercises.ts`.
- `data/recipes.ts`.
- `data/deals.ts`.
- `data/stores.ts`.
- `data/default-plans.ts`.

---

## 10.2 Agent normalisation des ingrédients

### Nom recommandé
`agent-normalisation-ingredients`

### Mission
Éviter que la liste d’épicerie soit mal regroupée.

### Responsabilités
- Normaliser les noms d’ingrédients.
- Ajouter des alias.
- Éviter les doublons :
  - tomate / tomates;
  - yogourt grec / yogourt;
  - brocoli / tête de brocoli.
- Faciliter la correspondance avec les rabais.

### Livrables attendus
- Convention de nommage.
- Alias d’ingrédients.
- Catégories d’épicerie.

---

# 11. Agents conformité, éthique et prudence

## 11.1 Agent sécurité santé et limites médicales

### Nom recommandé
`agent-securite-sante`

### Mission
S’assurer que l’application ne fait pas de promesses médicales et ne remplace pas un professionnel.

### Responsabilités
- Ajouter les avertissements nécessaires.
- Éviter les promesses de guérison.
- Éviter de traiter la résistance à l’insuline comme un diagnostic automatique.
- Recommander de consulter en cas de symptômes ou conditions médicales.
- Prévoir des limites claires.

### Mention recommandée
« Cette application est un outil de soutien aux habitudes de vie. Elle ne remplace pas un avis médical, un diagnostic, un traitement ou un suivi professionnel. En cas de condition médicale, de diabète traité, de douleurs, de symptômes inhabituels ou de médication, consulter une professionnelle ou un professionnel de la santé. »

### Livrables attendus
- Texte de prudence.
- Règles d’affichage.
- Révision des contenus sensibles.

---

## 11.2 Agent langage inclusif et non stigmatisant

### Nom recommandé
`agent-langage-non-stigmatisant`

### Mission
Prévenir la stigmatisation du poids, de l’âge, de la ménopause ou de la neurodivergence.

### Responsabilités
- Réviser tous les textes.
- Retirer les formulations honteuses.
- Éviter la moralisation alimentaire.
- Préférer :
  - surplus de poids;
  - stabilité;
  - soutien;
  - énergie;
  - force;
  - digestion;
  - constance.
- Éviter :
  - mauvais aliments;
  - triche;
  - discipline;
  - excuses;
  - laisser-aller.

### Livrables attendus
- Liste des mots à utiliser.
- Liste des mots à éviter.
- Révision finale des microcopies.

---

# 12. Organisation recommandée du travail

## Phase 1 — Conception produit

Agents principaux :

- `agent-orchestrateur-produit`
- `agent-hormones-feminines`
- `agent-glycemie-metabolisme`
- `agent-tdah-fonctions-executives`
- `agent-securite-emotionnelle`
- `agent-ux-mobile-first`

Livrables :

- vision produit;
- écrans MVP;
- parcours utilisateur;
- priorités;
- contraintes UX.

---

## Phase 2 — Modèles et architecture

Agents principaux :

- `agent-architecture-nextjs`
- `agent-typescript-modeles`
- `agent-logique-metier`
- `agent-persistence-localstorage`

Livrables :

- structure de fichiers;
- types;
- fonctions;
- LocalStorage;
- AppShell.

---

## Phase 3 — Contenu MVP

Agents principaux :

- `agent-recettes-simples`
- `agent-nutrition-feminine`
- `agent-digestion-restrictions`
- `agent-renforcement-musculaire`
- `agent-adaptations-douleurs`
- `agent-donnees-mock-mvp`

Livrables :

- recettes;
- exercices;
- plans par défaut;
- mascottes;
- rabais mockés.

---

## Phase 4 — Interfaces

Agents principaux :

- `agent-ux-mobile-first`
- `agent-ui-accessibilite-douce`
- `agent-mascotte-compagnon`
- `agent-microcopy-emotionnelle`

Livrables :

- Aujourd’hui;
- Bouger;
- Repas;
- Épicerie;
- Progression;
- Profil.

---

## Phase 5 — Validation

Agents principaux :

- `agent-qa-tests`
- `agent-securite-sante`
- `agent-langage-non-stigmatisant`
- `agent-orchestrateur-produit`

Livrables :

- tests manuels;
- corrections;
- validation UX;
- validation des messages;
- liste des limites MVP.

---

# 13. Ordre d’utilisation recommandé dans Claude Code

## Passe 1 — Fondations

Utiliser :

1. `agent-architecture-nextjs`
2. `agent-typescript-modeles`
3. `agent-persistence-localstorage`
4. `agent-donnees-mock-mvp`

Objectif :

- Créer la structure.
- Créer les types.
- Créer les données mockées.
- Créer les helpers.

---

## Passe 2 — Profil et mascotte

Utiliser :

1. `agent-mascotte-compagnon`
2. `agent-tdah-fonctions-executives`
3. `agent-ui-accessibilite-douce`
4. `agent-langage-non-stigmatisant`

Objectif :

- Créer le profil.
- Créer la mascotte.
- Créer les filtres.
- Sauvegarder en LocalStorage.

---

## Passe 3 — Bouger

Utiliser :

1. `agent-renforcement-musculaire`
2. `agent-adaptations-douleurs`
3. `agent-mouvement-glycemie`
4. `agent-logique-metier`
5. `agent-ux-mobile-first`

Objectif :

- Créer le plan d’exercices visuel.
- Ajouter accessoires.
- Ajouter variantes.
- Ajouter minuterie.
- Ajouter filtres équipement.

---

## Passe 4 — Repas et épicerie

Utiliser :

1. `agent-recettes-simples`
2. `agent-planification-repas-famille`
3. `agent-liste-epicerie`
4. `agent-circulaires-rabais`
5. `agent-delegation-partage`

Objectif :

- Créer livre de recettes.
- Créer planificateur hebdomadaire.
- Gérer portions variables.
- Générer liste d’épicerie.
- Ajouter rabais mockés.
- Ajouter copie Messenger.

---

## Passe 5 — Progression et finition

Utiliser :

1. `agent-stress-inflammation`
2. `agent-microcopy-emotionnelle`
3. `agent-securite-sante`
4. `agent-qa-tests`
5. `agent-orchestrateur-produit`

Objectif :

- Créer suivi doux.
- Réviser les messages.
- Ajouter limites médicales.
- Tester les parcours.
- Nettoyer l’interface.

---

# 14. Prompts prêts à utiliser pour activer les agents

## 14.1 Prompt Orchestrateur

```txt
Agis comme agent-orchestrateur-produit. Ta mission est de coordonner la conception de l’application destinée aux femmes en préménopause, périménopause et ménopause avec surplus de poids, résistance à l’insuline ou suspicion, et besoins neurocompatibles.

Assure-toi que chaque décision réduit la charge mentale, évite la culpabilisation, soutient la reconstruction musculaire, la glycémie, l’alimentation familiale simple et la constance douce.

Produit une liste claire de priorités MVP, de décisions produit, de risques et de prochaines tâches.
```

## 14.2 Prompt Architecture

```txt
Agis comme agent-architecture-nextjs et agent-typescript-modeles. Crée la structure technique de l’application en Next.js 15 App Router, TypeScript strict et Tailwind CSS.

Le MVP doit fonctionner avec LocalStorage, sans backend ni authentification. Sépare clairement les composants, les données mockées et les fonctions métier.

Crée les fichiers de types, données, helpers et composants de base.
```

## 14.3 Prompt Profil et mascotte

```txt
Agis comme agent-mascotte-compagnon, agent-tdah-fonctions-executives et agent-langage-non-stigmatisant.

Crée le système de profil utilisateur et de mascottes humanoïdes animalières. Les mascottes doivent être habillées, non sexualisées, non comparatives et agir comme compagnons de soutien dans l’application.

Ajoute les choix : étape hormonale, neuroprofil, particularités alimentaires, équipement disponible, épiceries préférées, portions familiales par défaut et mascotte.
```

## 14.4 Prompt Bouger

```txt
Agis comme agent-renforcement-musculaire, agent-adaptations-douleurs et agent-mouvement-glycemie.

Crée le module Bouger avec un plan d’exercices visuel, des cartes d’exercices, les accessoires requis, les adaptations, les supersets, la minuterie et les filtres selon l’équipement disponible.

Le ton doit rester doux, non culpabilisant et adapté aux femmes en transition hormonale.
```

## 14.5 Prompt Repas et épicerie

```txt
Agis comme agent-nutrition-feminine, agent-recettes-simples, agent-planification-repas-famille, agent-liste-epicerie, agent-circulaires-rabais et agent-delegation-partage.

Crée le livre de recettes, le planificateur hebdomadaire avec portions variables, la liste d’épicerie automatique, les rabais mockés selon les épiceries sélectionnées et le bouton Copier pour Messenger.

Les recettes doivent être simples, familiales, ajustables et filtrées selon les particularités alimentaires.
```

## 14.6 Prompt QA

```txt
Agis comme agent-qa-tests, agent-securite-sante et agent-langage-non-stigmatisant.

Teste les parcours principaux : profil, filtres recettes, portions, liste d’épicerie, copie Messenger, exercices, accessoires, mascotte, progression et LocalStorage.

Repère les bugs, les incohérences UX, les messages culpabilisants et les risques de promesses médicales.
```

---

# 15. Critères d’acceptation globaux

L’application respecte le cahier de conception si :

- elle est utilisable sur mobile;
- elle ne culpabilise pas;
- elle ne centre pas le poids;
- elle permet un plan d’exercices visuel;
- elle affiche les accessoires requis;
- elle propose des adaptations;
- elle permet un avatar compagnon humanoïde animalier;
- elle permet de planifier les repas de la semaine;
- elle ajuste les ingrédients selon les portions;
- elle génère une liste d’épicerie;
- elle permet de cocher ce qui est déjà à la maison;
- elle permet de cocher ce qui est acheté;
- elle affiche les rabais à vérifier;
- elle permet de copier la liste pour Messenger;
- elle filtre les recettes selon les particularités alimentaires;
- elle garde une option pour voir toutes les recettes;
- elle sauvegarde les données localement;
- elle respecte les limites médicales;
- elle réduit la charge mentale.

---

# 16. Résumé final

Les agents les plus indispensables sont :

1. `agent-orchestrateur-produit`
2. `agent-hormones-feminines`
3. `agent-glycemie-metabolisme`
4. `agent-tdah-fonctions-executives`
5. `agent-securite-emotionnelle`
6. `agent-renforcement-musculaire`
7. `agent-nutrition-feminine`
8. `agent-planification-repas-famille`
9. `agent-liste-epicerie`
10. `agent-mascotte-compagnon`
11. `agent-ux-mobile-first`
12. `agent-architecture-nextjs`
13. `agent-typescript-modeles`
14. `agent-logique-metier`
15. `agent-qa-tests`

Ces agents couvrent le nécessaire pour concevoir une application cohérente, utile, codable rapidement et profondément alignée avec les besoins des femmes neurodivergentes en transition hormonale.
