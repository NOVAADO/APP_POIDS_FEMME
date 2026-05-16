# Roadmap produit — App muscle, glycemie, transition hormonale

**Date :** 2026-05-16
**Origine :** decoulee de [docs/AUDIT_STRATEGIQUE_REFERENCES_APP_POIDS_FEMME.md](docs/AUDIT_STRATEGIQUE_REFERENCES_APP_POIDS_FEMME.md)
**Etat du code :** commit `51a75be` (Sprint D — Phase 2 essentials)
**Principe :** petites passes incrementales, verifiables en isolation, jamais de mega-refonte.

---

## Passe A — Correction rapide

### A1. Sceller les regles produit non negociables dans CLAUDE.md

- **Objectif :** inscrire les 10 interdictions et 8 principes positifs dans `CLAUDE.md` pour qu'aucune passe Claude Code future ne puisse les contredire par defaut.
- **Pourquoi :** la cooptation de positionnement est le risque numero 1 identifie. Le brief existe mais n'est pas force dans le contexte de toutes les sessions.
- **Fichiers concernes :** `CLAUDE.md` (a la racine, a creer ou completer).
- **Complexite :** faible (ecriture de texte uniquement).
- **Risque :** nul. Documentation pure.
- **Benefice utilisatrice :** indirect mais critique. Garantit que les futures iterations respectent l'ADN.

### A2. Audit du prompt de l'agent IA (server-only)

- **Objectif :** verifier que les contraintes editoriales (pas de calories, pas de jugement, langage doux, structure qualitative) sont inscrites comme **contraintes systeme** du prompt dans `app/api/ai/meal-analysis/route.ts`, pas comme simples suggestions.
- **Pourquoi :** la robustesse de [components/ai-meal-analysis-card.tsx](components/ai-meal-analysis-card.tsx) depend du prompt cote serveur. Une regression cote prompt = regression de positionnement invisible cote UI.
- **Fichiers concernes :** `app/api/ai/meal-analysis/route.ts` (a lire et a auditer).
- **Complexite :** faible a moyenne.
- **Risque :** moyen — toucher au prompt peut alterer la qualite. Toute modification doit etre testee sur 5-10 repas reels.
- **Benefice utilisatrice :** scelle la cleanliness editoriale de l'agent.

### A3. Audit des etats de la mascotte

- **Objectif :** verifier dans [data/mascots.ts](data/mascots.ts) et [components/mascot-card.tsx](components/mascot-card.tsx) qu'aucun `messages.home` / `supportTone` ne contient de formulation conditionnelle a un comportement utilisateur ("j'aimerais que tu...", "je suis content que...", etat triste/decu).
- **Pourquoi :** le risque "BitePal raton laveur" (superego externe) est la derive la plus subtile. Doit etre verrouille avant tout enrichissement de la mascotte.
- **Fichiers concernes :** `data/mascots.ts`, `components/mascot-card.tsx`, `components/mascot-avatar.tsx`.
- **Complexite :** faible.
- **Risque :** faible. Modifications de strings.
- **Benefice utilisatrice :** la mascotte reste un compagnon, jamais un juge.

### A4. Audit du vocabulaire des exercices

- **Objectif :** verifier que chaque exercice de [data/exercises.ts](data/exercises.ts) a un titre simple en langage courant (en plus du nom technique si necessaire), et qu'aucune duree par defaut ne depasse 30 min en mode low / 45 min en mode medium.
- **Pourquoi :** la lecon Virtuagym la plus actionnable.
- **Fichiers concernes :** `data/exercises.ts`.
- **Complexite :** faible a moyenne (selon nombre d'exercices).
- **Risque :** faible.
- **Benefice utilisatrice :** accessibilite pour les non-initiees a la culture gym.

---

## Passe B — Refonte UX ciblée

### B1. Refonte du compteur de Bouger (done / total → narration douce)

- **Objectif :** remplacer le gros chiffre central "3 / 7" par une formulation valorisant la presence ("3 mouvements faits aujourd'hui — ce qui est fait compte"). Garder la donnee accessible mais non centrale.
- **Pourquoi :** la lecon Virtuagym sur le narrative binaire de completion.
- **Fichiers concernes :** [components/workout-screen.tsx:77-96](components/workout-screen.tsx:77).
- **Complexite :** faible.
- **Risque :** faible — modification d'UI sur une zone delimitee.
- **Benefice utilisatrice :** reduit la pression silencieuse les jours ou la seance n'est pas finie.

### B2. CTA "adapter" plus visible que "ajouter" sur Bouger

- **Objectif :** depuis chaque carte d'activite, offrir une variation plus douce / un retrait individuel en plus du toggle done. Aujourd'hui seul le toggle "version courte" globale existe.
- **Pourquoi :** la lecon Virtuagym sur le CTA primaire "+ Ajouter".
- **Fichiers concernes :** [components/workout-activity-card.tsx](components/workout-activity-card.tsx), [components/workout-screen.tsx](components/workout-screen.tsx).
- **Complexite :** moyenne.
- **Risque :** moyen — touche la mecanique principale du module.
- **Benefice utilisatrice :** chaque exercice devient negociable, l'utilisatrice n'est jamais obligee de "tout faire ou rien".

### B3. Continuite mascotte ↔ agent IA

- **Objectif :** prefixer le bloc resultats de l'agent IA par une phrase signee par la mascotte ("[Mascotte] regarde avec toi"). Unifier le ton de voix.
- **Pourquoi :** lecon BitePal — eviter la sensation de "deux entites separees" (la mascotte d'un cote, l'agent IA de l'autre).
- **Fichiers concernes :** [components/ai-meal-analysis-card.tsx](components/ai-meal-analysis-card.tsx), eventuellement [components/mascot-card.tsx](components/mascot-card.tsx) pour un format reutilisable.
- **Complexite :** faible.
- **Risque :** faible.
- **Benefice utilisatrice :** sentiment d'un compagnon unique, pas d'une boite a outils.

### B4. Adaptation visuelle de today selon le mode energie

- **Objectif :** sur l'ecran Today, masquer ou condenser certaines cartes secondaires en mode "low" (par exemple : ne montrer que Bouger + Mascotte + 1 phrase douce, repli des cartes Epicerie/Suivi sous un "Voir plus").
- **Pourquoi :** la lecon transverse — un public en brouillard mental a besoin d'une hierarchie brutale les jours difficiles.
- **Fichiers concernes :** [components/today-screen.tsx](components/today-screen.tsx).
- **Complexite :** moyenne.
- **Risque :** faible.
- **Benefice utilisatrice :** charge cognitive adaptee a l'etat reel.

### B5. Option "ne pas analyser ce repas"

- **Objectif :** ajouter dans l'agent IA une option discrete "j'ai juste mange, je ne veux pas qu'on en parle" qui ferme le champ sans culpabilisation.
- **Pourquoi :** lecon BitePal — l'utilisatrice doit avoir le droit de ne pas rendre de compte.
- **Fichiers concernes :** [components/ai-meal-analysis-card.tsx](components/ai-meal-analysis-card.tsx).
- **Complexite :** faible.
- **Risque :** faible.
- **Benefice utilisatrice :** liberte de manger sans pression de logging.

---

## Passe C — Différenciation forte

### C1. Mini-parcours d'onboarding 3-5 etapes

- **Objectif :** construire un vrai onboarding multi-etapes (voir "Recommandation specifique pour l'onboarding" dans le rapport strategique). 5 ecrans : bienvenue / mascotte / soutien souhaite / energie / contraintes neurodivergentes.
- **Pourquoi :** l'onboarding actuel ([components/welcome-screen.tsx](components/welcome-screen.tsx)) est un seul ecran. C'est ADN-aligne mais ne capte aucune personnalisation. Un mini-parcours doux differencie tres fortement par rapport aux funnels manipulateurs des concurrents.
- **Fichiers concernes :** nouveau dossier `components/onboarding/` (à creer), refonte de [components/welcome-screen.tsx](components/welcome-screen.tsx), eventuellement nouvelles cles dans `lib/storage.ts`.
- **Complexite :** moyenne a haute.
- **Risque :** moyen — premier vrai parcours multi-etapes de l'app, doit etre teste utilisateur.
- **Benefice utilisatrice :** entree dans l'app calibree sur sa realite, sans extraction manipulatoire.

### C2. Mascotte avec presence contextuelle (sans evaluation)

- **Objectif :** enrichir la mascotte pour qu'elle ait une presence variable selon le contexte (today / workout / meals) sans jamais evaluer le comportement utilisateur. Ex : message different selon le moment de la journee, mais jamais selon ce que l'utilisatrice a fait ou pas fait.
- **Pourquoi :** lecon BitePal positive — l'ancrage emotionnel par un personnage est puissant si le contrat est inverse (presence stable, pas attente).
- **Fichiers concernes :** [data/mascots.ts](data/mascots.ts) (enrichissement des `messages`), [components/mascot-card.tsx](components/mascot-card.tsx), [components/today-screen.tsx](components/today-screen.tsx) pour exposition.
- **Complexite :** moyenne.
- **Risque :** moyen — toute formulation conditionnelle reintroduit le piege.
- **Benefice utilisatrice :** sentiment de compagnie, sans pression.

### C3. Regroupements doux dans Bouger (au-dela des supersets)

- **Objectif :** introduire des en-tetes calmes ("Echauffement", "Force douce", "Mobilite", "Cardio doux") qui regroupent les activites visuellement et donnent du sens pedagogique a la seance.
- **Pourquoi :** lecon Virtuagym sur le groupement "superset" — extensible a notre vocabulaire.
- **Fichiers concernes :** [data/exercises.ts](data/exercises.ts) (ajout de tags), `lib/workouts.ts` (logique de groupement), [components/workout-screen.tsx](components/workout-screen.tsx) (affichage).
- **Complexite :** moyenne.
- **Risque :** faible.
- **Benefice utilisatrice :** comprehension de la structure d'une seance, pas juste une liste d'exercices isoles.

### C4. Dimension quebecoise renforcee dans les recettes et l'epicerie

- **Objectif :** verifier que les recettes ([data/recipes.ts](data/recipes.ts)), les deals ([data/deals.ts](data/deals.ts)) et le vocabulaire sont culturellement situes au Quebec. Aliments locaux, epiceries cibles (IGA, Metro, Super C, Loblaws, Maxi, Walmart) presentes nommement.
- **Pourquoi :** brief produit — la cible geographique est Quebec. Aucune reference du corpus n'est quebecoise.
- **Fichiers concernes :** `data/recipes.ts`, `data/deals.ts`, `lib/grocery.ts`.
- **Complexite :** moyenne (depend de l'etendue de l'audit).
- **Risque :** faible.
- **Benefice utilisatrice :** sentiment d'une app qui parle vraiment de sa realite quotidienne.

---

## Passe D — Préparation produit public

### D1. Tests utilisateurs avec public cible

- **Objectif :** 5-8 sessions avec des femmes 40-55 ans en transition hormonale, idealement avec profil neurodivergent declare ou suspecte. Test sur les modules : today, workout, meals, agent IA, et le nouvel onboarding (post C1).
- **Pourquoi :** aucune des decisions de cet audit n'est validee par des utilisatrices reelles. Le risque numero 1 est de batir une experience qui *semble* douce mais qui frotte sur des elements inattendus.
- **Fichiers concernes :** aucun fichier de code. Plan de test + recrutement + script de session.
- **Complexite :** haute (logistique).
- **Risque :** faible (uniquement coute en temps).
- **Benefice utilisatrice :** validation reelle des choix produit.

### D2. Audit d'accessibilite complete

- **Objectif :** verifier contrastes WCAG, tailles de police, focus visible, support lecteurs d'ecran, prefere-reduced-motion, dark mode, viewports tres petits.
- **Pourquoi :** indispensable avant un produit public.
- **Fichiers concernes :** tous les composants UI, [app/globals.css](app/globals.css), [tailwind.config.ts](tailwind.config.ts).
- **Complexite :** moyenne.
- **Risque :** faible.
- **Benefice utilisatrice :** app utilisable par tous les profils.

### D3. PWA + notifications calmees

- **Objectif :** transformer l'app en Progressive Web App installable. Si notifications, **opt-in strict**, jamais > 3 par semaine, jamais en soiree, jamais sur un "comportement manque".
- **Pourquoi :** mobilite et reengagement doux. **Pas** pour pousser l'utilisatrice a revenir.
- **Fichiers concernes :** `next.config.mjs`, `public/manifest.json` (a creer), service worker (a creer).
- **Complexite :** moyenne a haute.
- **Risque :** moyen — toute notification mal calibree compromet l'ADN.
- **Benefice utilisatrice :** acces rapide, pas d'app store, presence non intrusive.

### D4. Migration vers backend (long terme)

- **Objectif :** si validation produit + demande utilisateur reelle, envisager un backend pour la sync multi-appareils. LocalStorage suffit pour le MVP.
- **Pourquoi :** ne pas anticiper. Attendre que le besoin emerge.
- **Fichiers concernes :** ensemble de l'app — chantier majeur.
- **Complexite :** tres haute.
- **Risque :** eleve si premature (introduit auth, GDPR, infra).
- **Benefice utilisatrice :** uniquement si validee. Pas avant.

---

## Priorisation P0 / P1 / P2

### P0 — A corriger avant d'ajouter autre chose

| # | Description | Impact utilisateur | Risque si non corrige | Fichiers probables | Recommandation |
|---|---|---|---|---|---|
| P0.1 | Sceller les regles produit non negociables dans CLAUDE.md | Indirect mais critique : garantit que toutes les futures sessions respectent l'ADN | Eleve — la cooptation de positionnement est le risque #1 | `CLAUDE.md` | **Faire maintenant** |
| P0.2 | Audit du prompt de l'agent IA cote serveur | L'agent peut produire des reponses qui semblent douces mais reintroduisent une logique d'amelioration | Eleve — regression invisible cote UI | `app/api/ai/meal-analysis/route.ts` | **Faire maintenant** |
| P0.3 | Audit des etats de la mascotte (`data/mascots.ts`, `mascot-card.tsx`) | Si une formulation conditionnelle existe, on cree le pattern "BitePal raton laveur" | Eleve — derive subtile, difficile a deceler ensuite | `data/mascots.ts`, `components/mascot-card.tsx` | **Faire maintenant** |
| P0.4 | Audit du vocabulaire des exercices (`data/exercises.ts`) | Une utilisatrice non-initiee a la culture gym decroche sur les noms techniques | Moyen | `data/exercises.ts` | **Faire maintenant** |

### P1 — Important pour l'adhesion

| # | Description | Impact utilisateur | Risque si non corrige | Fichiers probables | Recommandation |
|---|---|---|---|---|---|
| P1.1 | Refonte du compteur Bouger (done/total → narration douce) | Reduit la pression silencieuse les jours partiels | Faible-moyen | `components/workout-screen.tsx` | Faire dans le sprint suivant |
| P1.2 | CTA "adapter" sur les cartes d'activite individuelles | Chaque exercice devient negociable, pas un tout-ou-rien | Moyen | `components/workout-activity-card.tsx`, `components/workout-screen.tsx` | Faire dans le sprint suivant |
| P1.3 | Continuite mascotte ↔ agent IA | Sentiment de compagnon unique, pas une boite a outils | Faible | `components/ai-meal-analysis-card.tsx`, `components/mascot-card.tsx` | Faire dans le sprint suivant |
| P1.4 | Mini-parcours d'onboarding 3-5 etapes | Personnalisation douce sans extraction manipulatoire | Moyen | nouveau `components/onboarding/`, refonte `welcome-screen.tsx` | Faire apres P1.1-P1.3 |
| P1.5 | Adaptation visuelle de today selon le mode energie | Charge cognitive adaptee a l'etat reel les jours difficiles | Faible-moyen | `components/today-screen.tsx` | Faire dans le sprint suivant |
| P1.6 | Option "ne pas analyser ce repas" dans l'agent IA | Liberte de manger sans pression de logging | Faible | `components/ai-meal-analysis-card.tsx` | Faire dans le sprint suivant |
| P1.7 | Regroupements doux dans Bouger | Sens pedagogique de la seance | Faible | `data/exercises.ts`, `lib/workouts.ts`, `components/workout-screen.tsx` | Faire dans le sprint suivant |
| P1.8 | Dimension quebecoise renforcee (recettes, epiceries) | Sentiment d'une app qui parle de sa realite | Moyen pour adhesion locale | `data/recipes.ts`, `data/deals.ts`, `lib/grocery.ts` | Faire dans le sprint suivant |

### P2 — Plus tard

| # | Description | Impact utilisateur | Risque si non corrige | Fichiers probables | Recommandation |
|---|---|---|---|---|---|
| P2.1 | Tests utilisateurs avec public cible | Validation reelle, indispensable avant scale | Tres eleve a moyen terme | aucun code | Faire avant tout produit public |
| P2.2 | Audit accessibilite complete (WCAG, lecteurs d'ecran) | Indispensable pour produit public | Eleve a long terme | tous composants UI, `globals.css`, `tailwind.config.ts` | Faire avant tout produit public |
| P2.3 | Mascotte avec presence contextuelle riche | Sentiment de compagnie plus profond | Faible | `data/mascots.ts`, `components/mascot-card.tsx`, `components/today-screen.tsx` | Plus tard |
| P2.4 | PWA + notifications calmees opt-in | Acces rapide, presence non intrusive | Moyen si mal calibre | `next.config.mjs`, `public/manifest.json`, service worker | Plus tard |
| P2.5 | Sante metabolique explicite (suivi qualitatif glycemie / cycle) | Differenciation forte sur le coeur du positionnement | Moyen — risque de derive vers tracking lourd | nouveau module `components/metabolic/` | Plus tard, apres validation utilisatrice |
| P2.6 | Migration vers backend (sync multi-appareils) | Uniquement si demande utilisateur emerge | Eleve si premature | ensemble app | **Eviter** tant que pas valide |

---

## Prochaine passe recommandee

**Passe A — Correction rapide.** En sequence, dans l'ordre, sur un seul sprint :

1. A1 — sceller `CLAUDE.md` avec les regles produit non negociables (la plus rapide, deverrouille toutes les suivantes).
2. A3 — audit des `data/mascots.ts` et `mascot-card.tsx` (priorite vu le risque "BitePal raton laveur").
3. A2 — audit du prompt de l'agent IA cote serveur.
4. A4 — audit du vocabulaire des exercices.

Aucune de ces actions n'a un risque eleve. Toutes verrouillent les acquis editoriaux et bouchent les angles morts identifies par les analyses visuelles. Apres la Passe A, l'app est prete pour les ameliorations UX de la Passe B en toute serenite.

---

## Annexes

- [docs/AUDIT_STRATEGIQUE_REFERENCES_APP_POIDS_FEMME.md](docs/AUDIT_STRATEGIQUE_REFERENCES_APP_POIDS_FEMME.md) — rapport strategique source.
- [docs/INVENTAIRE_REFERENCES.md](docs/INVENTAIRE_REFERENCES.md) — inventaire des references.
- Brief produit en memoire : `project_app_overview.md`.
