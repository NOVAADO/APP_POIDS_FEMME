# Audit strategique des references — App muscle, glycemie, transition hormonale

**Date :** 2026-05-16
**Auteur :** session Claude Code (Opus 4.7), commande du `main` user
**Portee :** synthese strategique a partir de l'inventaire des references, des metadonnees, du contexte produit et de l'etat actuel du code. Trois **micro-analyses visuelles controlees** ont ete ajoutees : etape 3A (1 image BitePal — pub Facebook), etape 3B (1 image Virtuagym — plan d'entrainement), etape 3C (1 image BitePal — etape de quiz d'onboarding) — voir sections dediees en fin de document.

---

## 1. Resume executif

L'application est un compagnon non punitif pour femmes en transition hormonale avec besoins neurocompatibles. Le MVP est deja avance : six onglets fonctionnels (today, workout, meals, grocery, progress, profile), mascottes, agent IA d'analyse de repas (server-only, sans calories), bibliotheque d'exercices visuels, planificateur de repas, liste d'epicerie, suivi de constance hebdomadaire.

Le corpus de references (`Références/`) contient **109 captures d'ecran de telephone** reparties en deux dossiers thematiques :

- **`Exercices/` (27)** — captures Virtuagym, theme entrainement.
- **`bitepal-campagnon personnalisé/` (82)** — captures Facebook, theme compagnon alimentaire personnalise style BitePal.

**Limite majeure de ce rapport :** aucune analyse visuelle n'a ete effectuee. Les themes sont deduits du nom du dossier et du nom de fichier uniquement. Toutes les recommandations qui touchent au **style visuel, palette, typographie, mise en page, ton iconographique** sont donc des hypotheses a valider lors d'une passe d'audit visuel ulterieure. Ce rapport reste utile pour cadrer **la portee, les risques de positionnement et la priorisation** avant cette passe visuelle.

**Recommandation cle :** ne pas commencer une refonte visuelle tant qu'on n'a pas fait l'analyse visuelle controlee thematique par thematique (etape 3). En attendant, capitaliser sur les chantiers UX deja en cours (Sprints C/D) et durcir le positionnement non culpabilisant.

---

## 2. Etat actuel de l'application

### Stack
- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS.
- Persistance LocalStorage uniquement (pas de backend, pas d'auth).
- Tests : Playwright installe en dev.
- Une route API existe (`app/api/ai/`) pour l'agent d'analyse de repas server-only.

### Structure fonctionnelle
- **6 onglets** orchestres par [components/app-shell.tsx](components/app-shell.tsx) : today, workout, meals, grocery, progress, profile.
- **Composants UI mutualises** dans [components/ui/](components/ui/) : badge, button, card, option-card, screen-header, section-title, toggle-group, toggle-pill.
- **Donnees statiques** dans `data/` : recettes, deals, mascottes, plans par defaut.
- **Logique metier** dans `lib/` : storage, dates, checkins, grocery, workouts.

### Chantiers recents (5 derniers commits)
1. Sprint D — Phase 2 essentials (CI, weekly strip, AI history) — #9
2. Sprint C — confidence et secondary actions (P1) — #8
3. Quick UX fixes from user testing & visual review — #7
4. feat(ai) : soft meal analysis agent (server-only, no calories) — #6
5. feat(workout) : visual library overhaul + detail sheet + softer badges — #5

### Lecture strategique
- Le **squelette fonctionnel est complet** pour le MVP. Les sprints recents portent sur la finition UX (confidence, secondary actions), la consolidation (CI), et l'ajout de differenciateurs (agent IA doux, bibliotheque visuelle d'exercices).
- Le **positionnement editorial** (microcopy non culpabilisant, agent IA sans calories) est deja inscrit dans le code — c'est un acquis a proteger.
- Les **points encore fragiles** (deductibles sans audit visuel) sont la coherence visuelle entre ecrans, la hierarchie typographique, la densite d'information sur l'onglet today, la lisibilite des cartes recettes/exercices, et la cohabitation mascotte + donnees.

---

## 3. Inventaire resume des references

Voir le detail complet dans [docs/INVENTAIRE_REFERENCES.md](docs/INVENTAIRE_REFERENCES.md).

| Mesure | Valeur |
|---|---|
| Fichiers totaux | 109 |
| Images | 109 (100% en `.jpg`) |
| Format | captures de telephone portrait, 1080×2340-2400 |
| Poids cumule original | 34.98 MB |
| Poids cumule reduit (copies pour audit) | 7.01 MB |
| Sous-dossiers | 2 |

### Repartition par theme deduit du nom de dossier

| Dossier | Theme probable | Nombre |
|---|---|---|
| `Exercices/` | Captures d'une app d'entrainement (Virtuagym) | 27 |
| `bitepal-campagnon personnalisé/` | Captures Facebook autour d'un produit BitePal-like (compagnon alimentaire IA personnalise) | 82 |

### Limite d'inventaire
- **Aucune image n'a ete ouverte en analyse visuelle.** Les themes ci-dessus sont des hypotheses fondees sur les noms de fichiers (`Virtuagym`, `Facebook`) et de dossiers (`bitepal-campagnon personnalisé`).
- Le contenu reel des captures (UI, flows, palettes, ton) reste a documenter dans une passe ulterieure.

---

## 4. Analyse des references par theme

> Note d'honnetete intellectuelle : cette section ne peut pas decrire ce que les references *montrent*. Elle se limite a poser des **hypotheses sur ce qu'elles contiennent probablement** et a definir **ce qu'on cherche a en tirer** lors de l'audit visuel a venir.

### 4.1 Dossier `Exercices/` (Virtuagym, 27 images)
- **Hypothese de contenu :** vues d'exercices isoles, programmes, calendriers de seances, possiblement un module bibliotheque + un module suivi.
- **Ce qu'on veut en tirer :** patterns d'affichage d'un exercice (titre + media + serie/repetition), gestion de l'energie / variantes, hierarchie d'une seance, vocabulaire visuel d'un mouvement.
- **Pertinence pour notre app :** moyenne a haute. Notre [components/workout-screen.tsx](components/workout-screen.tsx), [components/exercise-detail-sheet.tsx](components/exercise-detail-sheet.tsx) et [components/exercise-illustration.tsx](components/exercise-illustration.tsx) sont les ecrans cibles. Virtuagym est generaliste et masculin par defaut — il faut **filtrer ce qu'on garde** au regard d'un public femmes 40+ en reconstruction musculaire douce.

### 4.2 Dossier `bitepal-campagnon personnalisé/` (Facebook, 82 images)
- **Hypothese de contenu :** captures marketing et UI d'un produit de type "compagnon IA alimentaire personnalise" diffusees sur Facebook (publicites, posts, screenshots utilisateurs). Volume important (82) suggere une collecte large autour d'un produit qui a inspire la reflexion sur l'agent IA.
- **Ce qu'on veut en tirer :** patterns de **conversation avec un compagnon IA**, **personnalisation par profil**, **affichage d'analyses de repas**, ton et microcopy d'un compagnon doux, gestion de la frontiere "conseil vs jugement".
- **Pertinence pour notre app :** haute pour [components/ai-meal-analysis-card.tsx](components/ai-meal-analysis-card.tsx) et la couche mascotte/compagnon. Mais **risque eleve de derive de positionnement** : BitePal est centre sur l'alimentation/calories/objectifs. Notre app **refuse explicitement** de centrer les calories et le poids. Toute inspiration doit etre filtree par les 4 filtres produit.

### 4.3 Themes absents du corpus
- **Onboarding** : aucun dossier dedie. A documenter avant la prochaine passe sur [components/welcome-screen.tsx](components/welcome-screen.tsx).
- **Mascottes** : aucun dossier dedie. Le brief produit demande des mascottes humanoides animalieres habillees, non sexualisees, non comparatives — il manque des references visuelles explicites.
- **Repas / cuisine quebecoise** : aucun dossier dedie. Risque que les references soient toutes anglophones / internationales.
- **Epicerie (IGA, Metro, Super C, Loblaws, Maxi, Walmart)** : aucun dossier dedie. La specificite quebecoise n'est documentee nulle part dans les references.
- **Transition hormonale, glycemie, suivi corporel doux** : aucun dossier dedie. C'est pourtant le coeur du positionnement.

---

## 5. Ce que les references nous apprennent (meta-niveau)

Meme sans analyse visuelle, l'inventaire en lui-meme transmet de l'information :

1. **Le corpus est tres deseQuilibre.** 82 images BitePal contre 27 Virtuagym, et **zero** sur mascottes, onboarding, repas, epicerie, transition hormonale, glycemie, suivi corporel. Le risque est de surponderer l'inspiration "compagnon IA alimentaire" au detriment de tout le reste.
2. **Les references sont des produits adjacents, pas concurrents directs.** Virtuagym = entrainement generaliste. BitePal-like = compagnon alimentaire mainstream. **Aucune reference ne couvre la combinaison muscle + glycemie + transition hormonale + neurocompatibilite.** Notre app est dans un creneau ou il n'y a pas de modele a copier — c'est une force strategique et un risque d'execution.
3. **La provenance est mobile.** 100% des captures sont au format telephone portrait. C'est coherent avec notre approche mobile-first. Rien dans le corpus ne pousse vers du desktop ou tablette.
4. **La provenance est ancienne pour Exercices, recente pour BitePal.** Les captures Virtuagym datent de 2021. Les captures BitePal datent de mai 2026. Cela suggere que l'inspiration alimentaire est **en cours d'exploration active** par Marie, tandis que les references entrainement sont **un fond de reference plus stable**.
5. **Le canal Facebook domine pour le contenu produit.** 82 captures Facebook implique que la decouverte produit se fait via la publicite sociale. Le ton marketing peut polluer la lecture visuelle : ce qu'on voit dans une pub n'est pas necessairement ce qu'on vit dans l'app. **Calibrer en consequence lors de l'analyse visuelle.**

---

## 6. Ce qu'il faut reprendre (hypotheses a valider lors de l'audit visuel)

Sous reserve de confirmation visuelle, voici ce qui meriterait d'etre inspecte serieusement :

- **Patterns d'affichage d'un exercice unitaire** (Virtuagym) : titre + illustration + serie/repetition + temps + variantes.
- **Patterns de calendrier de seances** (Virtuagym) : comment afficher une semaine d'entrainement sans surcharge.
- **Patterns de personnalisation par profil** (BitePal-like) : comment un compagnon IA s'adapte sans poser 30 questions a l'onboarding.
- **Patterns de carte de message du compagnon** (BitePal-like) : structure d'une bulle de conversation utile et chaleureuse.
- **Patterns de feedback non chiffre apres une action** : reaction du compagnon a un repas, a une seance, a un check-in.

---

## 7. Ce qu'il faut adapter

- **Le vocabulaire de l'effort.** Virtuagym pousse "sets/reps/intensity". Pour des femmes en reconstruction musculaire douce avec fatigue variable, on a deja les modes energie (low/medium/high) et le mode court. Conserver cette grille et **ne pas reintroduire** la metrique d'intensite type RPE/RIR sans justification.
- **La granularite des donnees alimentaires.** Les compagnons IA alimentaires mainstream tracent macros et calories. Notre agent IA est explicitement "soft, no calories". Toute inspiration sur l'analyse de repas doit etre **traduite en lecture qualitative** (proteines? legumes? rassasiant? stable?).
- **La frequence des sollicitations.** Les apps grand public envoient beaucoup de notifications et de prompts d'engagement. Pour un public neurodivergent, **moins est plus**. Conserver une logique "l'app attend qu'on revienne, elle ne harcele pas".
- **La place du suivi de poids.** Les references sont des produits ou le poids est central. Notre app le rend optionnel et non central — **ne pas remonter le poids dans la hierarchie visuelle** meme si une reference suggere de le faire.

---

## 8. Ce qu'il faut eviter

- **Le ton coach-performance.** "Defi", "challenge", "streak", "objectif manque", "rattrapage". Le brief produit liste explicitement ces termes a bannir.
- **L'estetique gamification competitive.** Badges agressifs, classements, comparaisons sociales, barres de remplissage anxiogenes.
- **La centralite de la calorie.** Compteurs caloriques, deficits, "calories restantes", visualisations type donut macros. Frontalement incompatibles avec le positionnement.
- **Les illustrations corporelles normees.** Silhouettes ultra-minces, "avant/apres", body shaming implicite. Le brief demande des mascottes humanoides animalieres non sexualisees.
- **La densite extreme d'information.** Ecrans charges avec 8 KPI simultanes. Pour un public neurodivergent + transition hormonale (brouillard mental), la hierarchie doit etre brutale : une chose principale par ecran.
- **L'injonction du "tu dois"**. Toute microcopy doit etre relue avec les filtres du brief.
- **La copie directe de BitePal, Virtuagym ou tout produit identifiable.** Inspiration au niveau des patterns d'interaction, jamais au niveau de la signature visuelle ou du wording.

---

## 9. Brainstorm de directions produit

Trois directions cumulables, listees par ambition croissante :

### Direction A — Consolidation editoriale (faible ambition, faible risque)
- Passe de microcopy systematique sur tous les ecrans pour eliminer le vocabulaire interdit.
- Audit d'accessibilite (contraste, tailles, focus visible, lecture d'ecran).
- Renforcement de la dimension quebecoise (langage, epiceries, produits locaux dans les recettes).

### Direction B — Renforcement du compagnon (ambition moyenne, risque moyen)
- Etoffer le role du mascot au-dela d'un avatar : reactions contextuelles aux check-ins, presence sur l'onglet today, message du jour calme.
- Travailler la continuite entre l'agent IA d'analyse de repas et le mascot affichage (eviter la sensation "deux personnages").
- Historique IA en mode "journal doux" plutot que "log de donnees".

### Direction C — Sante metabolique explicite (ambition haute, risque eleve)
- Introduire des marqueurs qualitatifs de stabilite glycemique (energie ressentie, faim entre repas) sans devenir un appareil medical.
- Ajouter une dimension cycle hormonal / phases (peri/menopause) pour adapter les suggestions sans imposer.
- Risque de derive vers le tracking lourd — necessite un cadrage editorial tres serre.

**Recommandation :** privilegier A et B sur les prochains sprints. C demande une recherche utilisateur prealable et n'est pas requis pour valider le MVP.

---

## 10. Analyse des risques

| # | Risque | Probabilite | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Derive de positionnement par mimetisme BitePal (calories, objectifs, gamification) | Moyenne | Eleve | Filtre 4 questions systematique sur toute fonctionnalite proposee ; review editoriale dediee |
| R2 | Refonte visuelle decidee sans audit visuel reel des references | Haute (si on saute l'etape 3) | Moyen | Bloquer toute refonte visuelle tant que l'audit visuel theme-par-theme n'est pas fait |
| R3 | Surcharge cognitive sur les ecrans denses (today, meals) | Moyenne | Eleve (public neurodivergent) | Passe d'allegement visuel + tests utilisateurs avec public cible |
| R4 | Absence totale de references pour mascottes / onboarding / repas QC / hormones | Haute | Moyen | Constituer un mini-corpus dedie pour chaque theme manquant avant la refonte |
| R5 | Tone marketing des captures Facebook brouille la lecture UX reelle | Moyenne | Faible | Distinguer captures de pub vs captures d'app reelle lors de l'analyse visuelle |
| R6 | Inflation des fonctionnalites (direction C trop tot) | Moyenne | Eleve | Reporter la sante metabolique explicite apres validation utilisateur de A et B |
| R7 | Perte d'acquis editoriaux deja codes lors de futurs refactors | Faible | Eleve | Documenter dans CLAUDE.md les regles non negociables (microcopy interdit, no calories) |

---

## 11. Priorisation P0 / P1 / P2

### P0 — A faire avant toute refonte visuelle
- **P0.1** Faire l'audit visuel controle theme par theme (etape 3), une image a la fois, sur les deux themes existants (Exercices, BitePal-like).
- **P0.2** Constituer un mini-corpus pour les themes manquants (mascottes, onboarding, repas QC, transition hormonale) — Marie a besoin de collecter ces references avant qu'une refonte visuelle ait du sens.
- **P0.3** Documenter dans `CLAUDE.md` les regles editoriales non negociables (vocabulaire interdit, no calories, mascottes non sexualisees, suivi poids optionnel) pour les sceller dans le contexte.

### P1 — Sprints suivants (apres audit visuel)
- **P1.1** Direction A : passe microcopy + accessibilite + dimension quebecoise.
- **P1.2** Direction B : renforcement compagnon (continuite mascot + agent IA, journal doux).
- **P1.3** Allegement visuel de today et meals si l'audit visuel le confirme.
- **P1.4** Tests utilisateurs avec public cible (femmes 40-55, profil neurodivergent declare ou suspecte).

### P2 — Plus tard
- **P2.1** Direction C : sante metabolique explicite (apres validation A et B).
- **P2.2** Migration vers backend / auth / sync multi-appareils (hors MVP).
- **P2.3** Couches PWA / notifications calmees (apres test utilisateurs).

---

## 12. Strategie de refonte progressive

**Principe directeur :** refondre par **briques de coherence**, pas par ecran isole. Chaque brique doit traverser plusieurs ecrans pour eviter l'incoherence visuelle.

### Briques proposees (ordre suggere)
1. **Brique editoriale** : passe de microcopy + tonalite + filtres editoriaux scelle dans CLAUDE.md. Touche tous les ecrans. Coupable sans audit visuel.
2. **Brique compagnon** : continuite mascot + agent IA + ton de voix unifie. Touche today, meals, progress.
3. **Brique typo + hierarchie** : redefinir les 3-4 styles de titres et la hierarchie d'une carte. Touche tous les ecrans. **Requiert audit visuel prealable.**
4. **Brique iconographie** : choix d'un systeme d'icones coherent (lineaire, doux, non normatif). Touche tous les ecrans. **Requiert audit visuel prealable.**
5. **Brique densite** : allegement de today et meals. **Requiert tests utilisateurs.**
6. **Brique data optionnelle** : suivi corporel, cycle, glycemie ressentie. **Direction C, repoussee.**

### Cadence
- Une brique par sprint, validee par tests utilisateurs reels avant la suivante.
- Pas de mega-refonte en un seul commit.
- Chaque brique doit pouvoir etre revertee individuellement.

---

## 13. Recommandations concretes pour la prochaine passe

1. **Reprendre l'etape 3 immediatement, mais avec un theme renseigne.** Commencer par 1 image du dossier `bitepal-campagnon personnalisé/` (volume le plus eleve, sujet le plus a risque editorial). Cela permettra de calibrer les analyses suivantes.
2. **Definir un protocole d'analyse visuelle reutilisable** : meme grille de 6 questions appliquee a chaque image (ce que l'image montre, ce qui inspire, ce a eviter, pertinence haute/moyenne/faible, lien explicite avec un fichier du code, filtre des 4 questions du brief produit).
3. **Constituer les corpus manquants** : Marie collecte 5-10 images par theme pour mascottes, onboarding, repas QC, transition hormonale.
4. **Avant de toucher au code visuel**, faire un commit "scelle editorial" qui ajoute a CLAUDE.md la liste exhaustive du vocabulaire interdit et des regles non negociables, pour qu'aucun futur sprint Claude Code ne puisse les contredire par defaut.
5. **Eviter la tentation d'agir** sur le code applicatif tant que les briques 1-2 ne sont pas validees editorialement.

---

## 14. Conclusion

L'application est plus mature que ne le laisse penser le besoin d'un audit. Le squelette fonctionnel est complet, les positions editoriales fortes sont deja codees (agent IA sans calories, microcopy doux), et les sprints recents montrent une discipline de finition. Le risque principal n'est pas technique : c'est **la derive de positionnement par mimetisme** des produits adjacents collectes dans les references, en particulier la verticale "compagnon IA alimentaire" qui represente 82 captures sur 109.

L'audit visuel reel reste a faire — c'est la prochaine etape, theme par theme, image par image. Tant qu'elle n'est pas faite, toute decision de refonte visuelle est prematuree. En revanche, les **briques editoriale et compagnon** peuvent avancer en parallele sans dependre de l'audit visuel.

Le creneau de l'app (muscle + glycemie + transition hormonale + neurocompatibilite) **n'a pas de modele direct** dans les references collectees. C'est a la fois sa force strategique (pas de concurrent identifie) et son exigence d'execution (pas de filet de securite, chaque choix produit doit etre defendu par les filtres du brief).

---

## Analyse visuelle contrôlée — BitePal

**Date :** 2026-05-16
**Etape :** 3A (micro-analyse, 1 seule image)
**Erreur API :** aucune
**Confirmation perimetre :** 1 image analysee, aucune autre image n'a ete chargee dans le cadre de cette etape.

### Image analysee

| Champ | Valeur |
|---|---|
| Nom du fichier | `Screenshot_20260516_064912_Facebook.jpg` |
| Fichier reduit utilise | `_resized_for_audit/bitepal-campagnon personnalisé/Screenshot_20260516_064912_Facebook.jpg` |
| Dimensions originales | 1080×2340 |
| Dimensions analysees | 554×1200 (copie reduite) |
| Type | Publicite Facebook sponsorisee (annonce, pas capture d'app) |

### Ce que l'image montre

Une **publicite sponsorisee Facebook** pour un produit s'appelant explicitement **"BitePal: AI Calorie Tracker"**. La pub est en francais et s'adresse au marche quebecois ou francophone. Elle contient :

- Un en-tete Facebook standard (nom du produit, mention "Sponsorisee").
- Un sous-titre : "BitePal : votre compagnon personnalisé…".
- Un titre principal violet, en gros caracteres, tout en majuscules : un temoignage premiere personne disant en substance avoir arrete des comportements alimentaires compulsifs grace a une mascotte raton laveur.
- Un corps de temoignage en plusieurs paragraphes : intensite emotionnelle elevee (auto-detestation passee, peur de la nourriture qui disparait), metriques temporelles ("en 72 heures", "en 10 jours", "depuis 2,5 mois"), et la phrase cle "La bienveillance fonctionne mieux que la restriction".
- Une **mascotte raton laveur** rendue en 3D, expression triste/preoccupee, tenant un petit objet dans ses mains, posture protectrice.
- Une chute narrative : la justification de la transformation est attribuee a "ne pas vouloir decevoir un raton laveur".
- Un CTA texte "COMMENCER MAINTENANT" puis une barre CTA en bas avec un lien vers `quiz.bitepal.app` et "En savoir plus".

### Ce qui fonctionne visuellement

- **La mascotte est l'ancrage visuel principal.** Rendue avec une expression emotionnelle lisible, elle attire le regard avant le texte.
- **Le titre violet en caps cree un point d'entree fort** sur un fond lavande tres pale — contraste eleve, hierarchie immediate.
- **La copie temoignage est en flow naturel** (paragraphes courts, langage parle, conjonction de coordination en debut de phrase).
- **L'espace blanc autour de la mascotte** lui donne de la presence sans surcharger.
- **La palette globale est douce** (lavande, blanc casse, accents violets) — coherente avec un positionnement "compagnon non punitif" en surface.

### Ce qui cree de l'attachement

- **La mascotte a une expression triste/concernee**, pas joyeuse. Cela declenche un instinct protecteur chez le lecteur (l'envie de "rassurer" le personnage).
- **L'inversion du rapport de pouvoir** : ce n'est pas la mascotte qui demande des comptes a l'utilisateur, c'est l'utilisateur qui veut "ne pas decevoir" la mascotte. Le levier est l'empathie, pas l'obeissance.
- **Le raton laveur est un choix d'animal inattendu** (ni cute classique type chat/chien, ni intimidant). Cette singularite cree de la memorabilite.
- **La posture parental-protectrice** (mains tenant un objet, taille de bebe-animal) active un cadre relationnel adulte → enfant.
- **L'incongruite "raton laveur" + "guerison alimentaire"** cree un effet absurde-mais-attendrissant qui fait baisser la garde.

### Ce qui est risque pour notre application

- **Le produit s'appelle litteralement "AI Calorie Tracker".** Toute son identite produit est exactement ce que notre app refuse. La couche marketing "bienveillance" recouvre un coeur de produit qui compte des calories. **Inspiration tres dangereuse : on risque d'importer le ton sans voir que le moteur reste centre sur la calorie.**
- **Le levier "ne pas decevoir la mascotte" est de la culpabilisation deguisee.** En apparence chaleureux, le mecanisme installe en realite un superego externe : la mascotte devient l'entite qui pourrait etre decue. Pour notre public (femmes en transition hormonale + neurodivergence + souvent trauma complexe), c'est exactement le type de dynamique a eviter — il reproduit l'experience d'enfance d'avoir a "gerer l'humeur de l'autre".
- **Le temoignage est calibre sur un profil trouble alimentaire** ("je mangeais jusqu'a ne plus rien ressentir", "je me detestais"). C'est une cible commerciale puissante mais qui demande, dans un vrai produit, des garde-fous cliniques. Une app sans cadrage clinique qui s'adresse a cette population fait courir un risque reel.
- **Les metriques temporelles "en 72 heures, en 10 jours"** sont un pattern de promesse de transformation rapide. Incompatible avec notre positionnement (constance douce, pas de promesse magique).
- **Le funnel "quiz pour obtenir votre plan personnel"** est un pattern manipulatoire classique qui ancre l'utilisatrice dans une logique de plan a suivre — l'oppose de la reduction de charge mentale.
- **Le titre tout en caps** est visuellement agressif — incompatible avec une lecture douce et neurocompatible.

### Ce qu'il faut eviter de copier

1. **Le mot "tracker"** et tout vocabulaire de suivi metrique (calories, macros, deficit, objectif chiffre).
2. **Toute expression de tristesse / decapitation / inquietude / decu de la mascotte** declenchee par un comportement utilisateur. La mascotte n'est jamais decue. Elle n'a pas d'attente sur l'utilisatrice.
3. **Le pattern "en X jours vous serez transformee"** sous toutes ses formes (countdown, before/after, milestones de comportement).
4. **Le quiz d'onboarding qui debouche sur un "plan personnel"** — surtout s'il pose des questions a logique restrictive (qu'evitez-vous, qu'est-ce qui vous fait peur, quels aliments declenchent vos crises).
5. **Le ton temoignage de "transformation"** (anciens comportements honteux → nouvelle vie liberee). Meme reformule, ce cadre maintient l'ancien comportement comme deviant.
6. **Les titres tout en majuscules** sur fond pale.
7. **L'usage clinique implicite** (toucher aux troubles du comportement alimentaire) sans cadrage professionnel reel.
8. **Le double discours marketing/produit** : annoncer "bienveillance" en facade tout en construisant un tracker calorique.

### Ce qui peut etre adapte sans trahir notre ADN

1. **Une mascotte avec une expression neutre-chaleureuse stable**, presente sans demander, qui ne change pas d'humeur en fonction des actions de l'utilisatrice. (Notre mascotte existe deja — verifier qu'aucun etat "triste" n'est conditionnel a un comportement utilisateur.)
2. **Le choix d'un animal singulier et inattendu** plutot que generique. Renforce la memorabilite sans declencher de comparaison sociale.
3. **L'idee que la mascotte est un compagnon, pas un coach.** Notre brief le dit deja — c'est l'occasion de le verrouiller dans `CLAUDE.md` (la mascotte ne donne pas d'instructions, n'evalue pas, ne mesure pas).
4. **La palette douce lavande/cream avec accents** est compatible avec notre ton. (A confirmer par audit visuel de plus d'images si on veut en tirer un systeme couleur.)
5. **La phrase "la bienveillance fonctionne mieux que la restriction"** est, en isolation, alignee avec notre positionnement — mais elle doit etre une **pratique** de produit (la mascotte ne te restreint jamais), pas un **slogan** marketing qui couvre l'inverse.
6. **L'espace blanc abondant autour de l'element principal** d'un ecran est compatible avec un design neurocompatible — confirmer cet acquis dans nos cartes (today, meals, workout).
7. **L'ancrage emotionnel par un personnage** est un levier legitime — mais le contrat doit etre inverse : la mascotte est la pour offrir une presence stable, pas pour recevoir notre devotion.

### Recommandations concretes pour notre application

> Aucune action de code n'est faite ici. Ce sont des verifications a planifier dans une prochaine passe.

- **Audit des etats de la mascotte** dans [components/mascot-avatar.tsx](components/mascot-avatar.tsx) et [components/mascot-card.tsx](components/mascot-card.tsx) : verifier qu'aucun etat triste/decu n'est conditionnel a une action ou inaction de l'utilisatrice. Si oui, supprimer ou remplacer par une presence neutre.
- **Audit de l'onboarding** dans [components/welcome-screen.tsx](components/welcome-screen.tsx) : verifier qu'aucune question n'est de logique restrictive ou ne genere un "plan personnel" anchored dans un deficit.
- **Audit du wording de l'agent IA repas** dans [components/ai-meal-analysis-card.tsx](components/ai-meal-analysis-card.tsx) : verifier qu'aucun mot ne re-introduit la dualite "bon/mauvais repas", ni de metrique temporelle de transformation.
- **Audit du ton des messages** dans la couche compagnon (a identifier) : verifier qu'aucun message ne porte une charge emotionnelle conditionnelle ("je suis content que…", "j'aimerais que…").
- **Scellement dans `CLAUDE.md`** d'une regle explicite : *la mascotte n'a pas d'attente envers l'utilisatrice. Elle ne devient jamais triste, decue, ou inquiete a cause d'un comportement utilisateur. Elle n'utilise pas la 1re personne pour formuler des attentes ("j'aimerais que…", "je serais content si…"). Sa presence est inconditionnelle.*
- **Garder en reference negative** ce que BitePal fait : c'est exactement le genre d'app dont on doit pouvoir dire en interne "notre mascotte n'est pas le raton laveur de BitePal".

### Niveau de pertinence

**Haute.** Cette image, bien qu'unique, est tres riche pour notre travail : elle illustre un produit qui utilise notre vocabulaire de positionnement ("compagnon personnalise", "bienveillance") pour vendre exactement ce que nous refusons. C'est la reference negative la plus utile du corpus : elle nous montre comment notre positionnement peut etre coopte si on n'est pas vigilantes sur la coherence entre la facade et le moteur.

---

## Analyse visuelle contrôlée — Virtuagym / exercices

**Date :** 2026-05-16
**Etape :** 3B (micro-analyse, 1 seule image)
**Erreur API :** aucune
**Confirmation perimetre :** 1 image analysee, aucune autre image n'a ete chargee dans le cadre de cette etape.

### Image analysee

| Champ | Valeur |
|---|---|
| Nom du fichier | `Screenshot_20210430-065731_Virtuagym.jpg` |
| Fichier reduit utilise | `_resized_for_audit/Exercices/Screenshot_20210430-065731_Virtuagym.jpg` |
| Dimensions originales | 1080×2400 |
| Dimensions analysees | 554×1200 (copie reduite) |
| Type | Capture d'app native Virtuagym — vue "plan du jour" |

### Ce que l'image montre

Une vue **"plan d'entrainement du jour"** dans l'application Virtuagym, en francais. Elements visibles :

- En-tete tres minimaliste : fleche retour + date "17 avr." + menu trois points.
- Bandeau de confirmation en vert : "Toutes les activites sont terminees!"
- Une liste verticale de **7 exercices**, chacun affiche avec :
  - le nom de l'exercice en gras (ex. "Shoulder press- EB", "Rowing debout vertical - Poulie", "Band face pulls - EB", "Releve lateral - Elastique", "Overhead triceps extension - Pu...", "Pompes ge...", "Velo fixe").
  - une ligne meta sous le nom : "3 sets • 34 kcal" (le nombre de kcal varie : 27, 34, et 1049 pour le velo fixe 1h 45m).
  - une **petite illustration en miniature** a droite : un personnage 3D feminin demontrant la position de l'exercice.
  - un **gros checkmark vert** superpose a la miniature, indiquant que l'exercice est complete.
  - une petite icone "carnet" en cyan a gauche de la meta (probablement acces a des notes/details).
- Deux **tags "Superset"** avec icone chainon, qui groupent visuellement des paires d'exercices.
- Un **bouton flottant violet** "+ Ajoutez une activite" au centre-bas.
- Status bar Android encombree (heure, musique, notifications, batterie 91%).
- Bandeau photo decoratif en haut (visage de femme souriante coupe).

### Ce qui fonctionne visuellement

- **La miniature illustree par exercice est un excellent affordance visuel** : on identifie le mouvement avant meme d'avoir lu le nom. Pour un public neurodivergent ou en brouillard mental, c'est un gain de charge cognitive evident.
- **La hierarchie d'une ligne est claire** : nom (gras, lisible) puis meta (taille reduite, gris). On scanne la liste tres vite.
- **Le checkmark vert circulaire** est universel et immediatement lisible.
- **Le groupement "Superset"** avec un tag et une icone est une jolie facon de dire "ces deux blocs vont ensemble" sans recourir a un encadre lourd.
- **Le bouton flottant unique** centre-bas est pouce-friendly et coherent avec les patterns Android Material.
- **Le rythme vertical des cartes** (separateurs gris fins, padding constant) donne une lecture calme malgre la densite.

### Ce qui aide a comprendre les exercices

- L'**illustration montre la position** (bras en l'air, traction, releve lateral, push-up, velo) — primaire visuel rapide.
- L'**equipement est inscrit dans le nom** (Poulie, Elastique, EB pour bande elastique probable) : on sait ce qu'il faut sortir avant de commencer.
- Le **regroupement en supersets** transmet une intention pedagogique (ces exercices se font en serie sans pause).
- L'**affichage uniforme "3 sets"** donne un repere de volume comparable d'un exercice a l'autre.

### Ce qui est trop technique, froid ou oriente performance

- **Les kilocalories sont affichees sur CHAQUE exercice** : "34 kcal", "27 kcal", "1049 kcal". C'est exactement le pattern que notre app refuse. Implique que tout mouvement a une valeur calorique, gamifie le corps comme bruleur, et installe en arriere-plan une comptabilite energetique anxiogene.
- **L'en-tete est reduit a une date.** Aucune dimension humaine, aucune mascotte, aucune presence chaleureuse. Une page de journal, pas un compagnon.
- **La prescription est fixe** ("3 sets") sans modulation selon l'energie/fatigue/cycle.
- **"Velo fixe 1h 45m / 1049 kcal"** : duree absurde pour un public en transition hormonale avec fatigue variable. La prescription n'ecoute pas le corps.
- **Le narrative "Toutes les activites sont terminees"** est binaire (fait/pas fait). Cree de la pression silencieuse les jours ou on ne finit pas, et celebre la mauvaise chose (l'exhaustivite vs la constance douce).
- **Le vocabulaire est gym-natif** : "Shoulder press", "Rowing debout vertical", "Overhead triceps extension". Demande une culture fitness prealable.
- **Le CTA flottant "+ Ajouter une activite"** part du postulat que l'utilisatrice veut faire *plus*. Pour notre public, c'est l'oppose du besoin reel.
- **Le status bar surchargee** (heure + 4 icones notification + horloge alarme + batterie) augmente la charge visuelle — c'est exterieur a l'app mais cela rappelle qu'il faut soigner la zone superieure de nos ecrans.

### Ce qu'il faut eviter de copier

1. **L'affichage de calories par exercice ou par seance.** Aucune kcal nulle part.
2. **L'en-tete reduit a une date.** Notre en-tete doit porter une presence (mascotte, mode energie, etat propose).
3. **Le narrative binaire de completion** ("tout est fait", "objectif atteint", "100%"). Constance > completeness.
4. **La prescription fixe** sans modulation visible par l'energie/fatigue. La modulation doit etre **a l'avant** de l'ecran, pas cachee dans un parametre.
5. **Les longues durees** (1h+) prescrites par defaut. Nos modes energie doivent borner ce qu'on propose.
6. **Le vocabulaire technique** non traduit. Si le nom est technique, l'illustration ou un sous-titre doit le rendre evident.
7. **Le CTA primaire "ajouter"** qui presume l'envie de faire plus. Notre CTA primaire devrait permettre d'**alleger** ou de **transformer** la seance plus facilement que d'en ajouter.
8. **Les sous-tags techniques** (EB, Poulie, etc.) en collant au nom sans glossaire — soit on les explicite, soit on les illustre.

### Ce qui peut etre adapte pour notre application

1. **Le pattern "miniature illustree par exercice"** est valide — c'est exactement ce que fait deja [components/exercise-illustration.tsx](components/exercise-illustration.tsx). Confirmation de la direction prise.
2. **La hierarchie d'une carte d'exercice** (nom gras + meta gris + illustration a droite + statut visible) est un pattern mobile robuste — peut servir de gabarit pour nos cartes d'exercice.
3. **Le checkmark circulaire vert** comme indicateur de completion — pattern accessible.
4. **Le regroupement visuel par "bloc"** (l'idee du superset, sans le mot) peut servir a regrouper des exercices d'un meme objectif (echauffement / force / mobilite / cardio doux) avec un tag chaleureux.
5. **Le bouton flottant unique** comme action primaire est un bon pattern — mais l'action elle-meme doit etre reframee (cf. "Recommandations" ci-dessous).
6. **Le rythme vertical aere** des cartes est compatible avec une lecture neurocompatible. A reverifier dans nos ecrans.
7. **L'usage d'un personnage feminin** dans les illustrations est culturellement approprie pour notre cible — a verifier que la diversite est presente (age, morphologie, posture realiste pour une femme 40+).

### Recommandations concretes pour le module Bouger

> Aucune action de code n'est faite ici. Ce sont des verifications a planifier dans une prochaine passe.

- **Audit de [components/workout-screen.tsx](components/workout-screen.tsx)** : verifier qu'aucune kcal, aucune duree totale "performance", aucun pourcentage de completion, aucun "tout est fait" n'apparait. Si oui, retirer.
- **Audit de [components/workout-activity-card.tsx](components/workout-activity-card.tsx)** : confirmer que la carte d'exercice respecte la hierarchie nom + illustration + statut, sans metrique calorique. Si une duree est affichee, qu'elle soit indicative et bornee par le mode energie.
- **Audit de [components/exercise-illustration.tsx](components/exercise-illustration.tsx)** : verifier la diversite des corps representes (age, morphologie). Pas uniquement de jeunes corps athletiques.
- **Audit du vocabulaire des exercices** dans `data/` : tout nom technique doit avoir un sous-titre en langage simple ("Eleve les bras au-dessus de la tete" plutot que "Shoulder press"). Idealement la version simple en titre, la version technique en sous-titre.
- **Confirmation des modes energie** (low/medium/high) en position dominante sur [components/workout-screen.tsx](components/workout-screen.tsx) : le choix d'energie doit etre **visible et facile a changer** depuis l'ecran de seance, pas enfoui dans un parametre.
- **Reframer le wording de fin de seance** : eviter "toutes les activites sont terminees" et preferer une formulation qui valorise la presence ("joli moment de mouvement", "ton corps t'a senti bouger") plutot que l'exhaustivite.
- **Reframer le CTA primaire** : au lieu de "+ Ajouter une activite", proposer en priorite "alleger la seance" / "transformer en version plus courte" / "remplacer un exercice". L'ajout reste possible mais en option secondaire.
- **Bannir les durees longues par defaut** : aucun bloc cardio > 30 min en mode low, > 45 min en mode medium, sans validation explicite de l'utilisatrice.
- **Scellement dans `CLAUDE.md`** : *aucun ecran ou composant lie au mouvement ne doit afficher de calorie, ni de pourcentage de completion globale, ni de "tout est fait". La completion est exercice par exercice (checkmark), pas globale.*

### Niveau de pertinence

**Haute.** L'image montre un produit qui couvre la meme verticale (planification + execution + cartes d'exercice) avec des patterns visuels valides ET un moteur metrique a rejeter integralement. Correspondance directe avec nos composants [workout-screen](components/workout-screen.tsx), [workout-activity-card](components/workout-activity-card.tsx), [exercise-detail-sheet](components/exercise-detail-sheet.tsx), [exercise-illustration](components/exercise-illustration.tsx). Le contraste utile-vs-toxique est aussi net que pour BitePal mais sur un terrain different : ici le risque n'est pas le tracking alimentaire, c'est la **culture fitness calorique-performante**.

---

## Analyse visuelle contrôlée — Onboarding / quiz

**Date :** 2026-05-16
**Etape :** 3C (micro-analyse, 1 seule image)
**Erreur API :** aucune
**Confirmation perimetre :** 1 image analysee, aucune autre image n'a ete chargee dans le cadre de cette etape.

### Image analysee

| Champ | Valeur |
|---|---|
| Nom du fichier | `Screenshot_20260516_065725_Facebook.jpg` |
| Fichier reduit utilise | `_resized_for_audit/bitepal-campagnon personnalisé/Screenshot_20260516_065725_Facebook.jpg` |
| Dimensions originales | 1080×2340 |
| Dimensions analysees | 554×1200 (copie reduite) |
| Type | Etape de quiz web servie depuis `quiz.bitepal.app`, ouverte dans le navigateur in-app de Facebook |

### Ce que l'image montre

Une **etape de quiz d'onboarding** servie depuis un domaine separe (`quiz.bitepal.app`), affichee dans le navigateur in-app de Facebook (pas dans l'app native). Elements visibles :

- Barre superieure du navigateur in-app : croix de fermeture (X), URL `quiz.bitepal.app`, icone historique, menu trois points.
- Fleche retour a gauche.
- **Barre de progression** tres peu remplie (environ 10%), suggerant que cette etape est tres tot dans une longue serie.
- **Question principale** en gros caracteres gras serif : "Quel type d'alimentation préfères-tu ?".
- **5 options visibles** (avec un debut de 6e option coupee en bas), chacune sous forme de **carte horizontale rectangulaire blanche, bordure grise tres fine, coins arrondis**, avec :
  - une **icone illustrative coloree** a gauche dans un fond rond pastel
  - le libelle en noir, sans description supplementaire
- Options listees, dans cet ordre :
  1. "Aucun régime" — icone croix rouge dans rond rose pale
  2. "Équilibrée" — icone de balance avec elements colores
  3. "Végétarienne" — icone fromage + pomme
  4. "Végane" — icone feuille verte
  5. "Paléo" — icone pilon de poulet
- Aucune mascotte. Aucun texte d'accueil. Aucun contexte sur l'utilisation de la reponse. Aucun "passer" ou "je ne sais pas".

### Ce qui fonctionne visuellement

- **Une seule question par ecran** — charge cognitive bornee.
- **Cartes d'options spacieuses** avec icone + libelle — pattern accessible, cibles tactiles larges.
- **Iconographie illustrative simple** : on identifie l'option avant de lire.
- **Typographie de question forte et lisible** (gros, gras, serif).
- **Tutoiement chaleureux** ("preferes-tu") plutot que vouvoiement formel.
- **L'option "Aucun régime" en premiere position** offre une porte de sortie symbolique — bonne pratique editoriale.
- **Coins arrondis + couleurs pastel** donnent un ton doux malgre l'intensite implicite du sujet.

### Ce qui rend le parcours simple ou engageant

- **Focus visuel total** : il n'y a qu'une chose a faire sur cet ecran.
- **Pas de saisie clavier** — uniquement du tap.
- **Pattern conversationnel binaire** (question → choix → suivant) qui ressemble a un assistant.
- **Barre de progression** qui donne un sentiment de mouvement.
- **Cohérence visuelle** entre options (toutes le meme gabarit) — la decision se reduit a comparer 5 mots.

### Ce qui est manipulateur, culpabilisant ou trop oriente "plan minceur"

- **La barre de progression est minuscule a cet ecran** : on est a ~10%. C'est le pattern **sunk-cost classique** : on amorce un long tunnel sans annoncer le nombre total de questions, et plus on avance, moins on a envie d'abandonner les reponses deja donnees. Manipulation comportementale assumee.
- **La question elle-meme presuppose le cadre "regime"**. "Aucun régime" reste un positionnement *par rapport* a la categorie regime. La question n'est pas "comment manges-tu naturellement ?" mais "dans quelle case dietetique te ranges-tu ?". Le simple fait de poser cette question impose un cadre identitaire restrictif.
- **Toutes les options non-"aucun" sont des regimes identitaires** (Equilibrée, Végétarienne, Végane, Paléo, et tres probablement Keto/Carnivore en dessous). Aucune option "je mange ce qui marche pour ma famille", "intuitivement", "je suis en remission d'une periode de restriction".
- **Aucune transparence** sur ce qui sera fait de la reponse : la reponse va-t-elle adapter l'app, generer un plan, bloquer des fonctionnalites, declencher un email ?
- **Le quiz est servi depuis un domaine separe** (`quiz.bitepal.app`) charge dans le navigateur in-app de Facebook : pattern classique de **funnel de capture de leads avant installation**. La "plan personnel" promis est l'appat qui justifie l'email/le paiement a la fin.
- **Aucune mascotte, aucune chaleur, aucun cadrage humain** du *pourquoi* on pose cette question. C'est un formulaire deguise en conversation.
- **La croix de fermeture sort vers Facebook**, pas vers une zone calme. Quitter le quiz = quitter le contexte. Friction maximale pour l'abandon.
- **L'option "Aucun régime" est en premiere position avec une croix rouge** — visuellement, c'est marque comme une option "non". Le rouge biaise subtilement vers les autres options "valables".
- **Le langage "préfères-tu"** est en realite un piege : on choisit un regime, on ne dit pas qu'on n'en suit aucun. La granularite reelle des comportements alimentaires (variable selon la semaine, la famille, l'energie) n'a pas de place ici.

### Ce qu'il faut eviter de copier

1. **Le tunnel de quiz long** avec barre de progression qui dissimule le nombre total d'etapes.
2. **Les categories d'identite dietetique** (Keto, Paleo, Végane, Equilibrée) comme cadre par defaut.
3. **Le vocabulaire "regime"** sous toutes ses formes, meme negate.
4. **L'opacite sur l'usage des reponses.**
5. **Le pattern funnel de capture de leads** (domaine separe, paywall a la fin, plan personnel deterministe).
6. **La sortie par friction** (X qui sort de l'app/du contexte, pas de "plus tard" doux).
7. **L'absence de mascotte/presence chaleureuse** pendant le parcours.
8. **Le rouge sur l'option "non"** ou tout signal visuel qui biaise vers une categorie particuliere.
9. **La mise en categorie identitaire** (toutes les questions du type "quel type de X es-tu ?") qui fige la realite changeante du quotidien.
10. **L'extraction d'information avant d'avoir construit la relation** (questions intimes sur l'alimentation des le 2e ecran, avant meme d'avoir presente la mascotte).

### Ce qui peut etre adapte pour notre application

1. **Une question par ecran** — pattern juste pour la charge cognitive. Limiter a 3-5 questions max au total.
2. **Cartes d'options avec icone + libelle** — gabarit deja disponible dans [components/ui/option-card.tsx](components/ui/option-card.tsx). Confirmation de la direction.
3. **Typographie de question lisible et chaleureuse** (gros, doux, pas crie).
4. **Tutoiement systematique** (deja dans le brief).
5. **L'option "rien de specifique" / "je ne sais pas" / "plus tard"** en premiere position — adoptee comme principe : aucune question n'a de mauvaise reponse, et "je ne veux pas repondre" est toujours une reponse valable.
6. **Iconographie illustrative simple** — coherent avec la culture visuelle deja amorcee dans l'app.
7. **Coins arrondis + pastel** — coherent avec le ton doux.

### Recommandations concretes pour notre onboarding

> Aucune action de code n'est faite ici. Ce sont des verifications et orientations a planifier dans une prochaine passe.

- **Audit de [components/welcome-screen.tsx](components/welcome-screen.tsx)** et du flow d'onboarding : verifier que l'onboarding fait **au plus 5 etapes**, est **skippable a chaque etape**, et que chaque etape **explique en une phrase ce qui est fait de la reponse** (ex. "ca m'aide a te proposer des recettes que tu as deja sous la main").
- **Pas de quiz "regime"**. Reformuler toute question alimentaire en termes de **realite pratique** : "qu'as-tu generalement dans ton frigo ?", "quels aliments tu evites ?", "y a-t-il quelqu'un d'autre que tu nourris ?". Jamais en termes d'identite dietetique.
- **Progression transparente** : afficher "etape 2 sur 4" en chiffres explicites, jamais une barre qui dissimule la longueur totale.
- **"Plus tard" visible et chaleureux a chaque etape**, pas seulement une croix qui sort du contexte. "Plus tard" reste dans l'app et revient a l'ecran today avec une mascotte qui dit "on commencera tranquillement".
- **Toujours afficher la mascotte pendant l'onboarding** : format conversation, la mascotte pose la question, l'utilisatrice repond, la mascotte accuse reception (sans evaluer la reponse).
- **Premiere question : la relation, pas l'extraction.** "Quelle mascotte t'accompagne ?" ou "comment veux-tu que je t'appelle ?" avant toute question sur la realite alimentaire ou corporelle.
- **Aucun "plan personnel" deterministe en sortie** d'onboarding. L'onboarding cale des **defaults doux** (mode energie de depart, mascotte choisie, frequence d'apparition souhaitee). Tout est modifiable a tout moment.
- **Jamais de question sur le poids, l'objectif chiffre, le passe alimentaire honteux, les "echecs"** des regimes precedents. Si on veut comprendre la fatigue, demander "comment te sens-tu aujourd'hui ?" — pas "depuis combien de temps as-tu pris du poids ?".
- **Jamais de paywall, d'email obligatoire, de creation de compte** pendant l'onboarding. Stack LocalStorage = c'est techniquement impossible deja, mais sceller cette regle pour l'avenir.
- **Scellement dans `CLAUDE.md`** : *l'onboarding fait au plus 5 etapes. Chaque etape est skippable. Aucune question identitaire dietetique. Aucun plan deterministe en sortie. Aucun email/compte. La mascotte est presente a chaque etape. Les defaults sont modifiables a tout moment.*

### Niveau de pertinence

**Haute.** L'image illustre un pattern technique tres proche de ce que pourrait devenir notre onboarding si on n'est pas vigilantes : cartes d'options propres + tutoiement + iconographie pastel = visuellement coherent avec notre direction. Mais le **moteur derriere** (cadre identitaire restrictif, sunk-cost, lead capture, plan deterministe) est exactement l'inverse de notre positionnement. La reference est donc tres utile pour calibrer **ou s'arrete l'inspiration de pattern** et **ou commence la divergence de moteur**.

---

## Synthèse finale des trois analyses visuelles

> Cette section consolide les trois micro-analyses 3A/3B/3C et les confronte a l'etat reel du code (lecture directe des composants concernes). Aucune nouvelle image n'a ete analysee.

### BitePal (pub Facebook + funnel de quiz)

**Ce qui est utile**
- Une mascotte avec **expression emotionnelle lisible** declenche un ancrage memoriel fort.
- Le **choix d'un animal singulier** (raton laveur) plutot que generique cree de la memorabilite sans comparaison sociale.
- Le pattern **une question par ecran avec cartes a options** est propre et accessible.
- La typographie **gros + doux + tutoiement** est compatible avec un ton chaleureux.

**Ce qui est dangereux**
- Le produit s'appelle litteralement "AI Calorie Tracker" : marketing "bienveillance" + moteur de tracking calorique. **C'est le cas exemplaire de la cooptation de positionnement.**
- Le mecanisme "ne pas decevoir la mascotte" = **superego externe deguise en compagnon**.
- Cible commerciale alignee sur des profils troubles alimentaires sans cadrage clinique.
- Promesse de transformation rapide chiffree ("72 heures", "10 jours").
- Funnel quiz long avec barre de progression dissimulant la longueur (sunk-cost), cadre identitaire restrictif des le 2e ecran, lead capture avant installation.

**Ce qu'on peut adapter**
- Mascotte presente avec **expression stable**, pas conditionnelle au comportement utilisateur.
- Card-based options (deja en place dans [components/ui/option-card.tsx](components/ui/option-card.tsx)).
- Tutoiement + langage parle (deja en place).
- Palette douce et coins arrondis (deja en place).

**Ce qu'il faut absolument eviter**
- Toute kcal/macro/score alimentaire.
- Toute mascotte triste/decu en reaction a un comportement utilisateur.
- Toute promesse de transformation chiffree en temps.
- Tout quiz long avec progression dissimulee.
- Toute question d'identite dietetique (Keto, Vegane, etc.).
- Tout "plan personnel" deterministe en sortie de quiz.
- Tout funnel marketing servi depuis un domaine separe.

### Virtuagym (plan d'entrainement du jour)

**Ce qui est utile**
- **Liste verticale d'exercices avec miniature illustree** par item : pattern visuel d'identification rapide.
- **Hierarchie de carte** : nom gras + meta + thumbnail + statut.
- **Checkmark vert circulaire** comme affordance de completion par exercice.
- **Tag "Superset"** avec icone pour grouper visuellement des blocs.
- **Bouton flottant unique** comme action primaire (pouce-friendly).

**Ce qui est trop performance / fitness**
- **Kcal sur chaque exercice et sur la seance** — anchor calorique frontal.
- **En-tete reduit a une date** sans presence chaleureuse.
- **Prescription fixe** ("3 sets" partout) sans modulation par energie.
- **Duree absurde par defaut** (1h 45m de velo).
- **Narrative binaire de completion globale** ("Toutes les activites sont terminees!").
- **CTA primaire "+ Ajouter une activite"** qui presume le besoin de faire *plus*.
- **Vocabulaire gym-natif** ("Shoulder press", "Rowing debout vertical - Poulie") sans traduction.

**Ce qu'on peut adapter**
- **Miniature illustree par exercice** : deja en place dans [components/exercise-illustration.tsx](components/exercise-illustration.tsx) et utilisee dans [components/workout-screen.tsx](components/workout-screen.tsx).
- **Regroupement par bloc** : deja en place via supersets ([components/workout-screen.tsx:147-159](components/workout-screen.tsx:147)).
- **Hierarchie de carte** : deja en place via [components/workout-activity-card.tsx](components/workout-activity-card.tsx) (a confirmer en detail).
- **Checkmark de completion par exercice** : pattern compatible avec notre approche par-exercice.

**Ce qu'il faut eviter**
- Toute kcal dans le module Bouger.
- Tout "objectif atteint", "100%", "tout est fait" comme celebration principale.
- Toute prescription qui ignore le mode energie.
- Toute duree longue (> 30 min en low, > 45 min en medium) sans validation explicite.

**Etat actuel verifie :** le module Bouger applique deja largement ces lecons. Voir section "Etat actuel des modules" plus bas.

### Onboarding / quiz (BitePal funnel)

**Ce qui est utile**
- **Une question par ecran**.
- **Cards d'options icone + texte** avec cibles tactiles larges.
- **Tutoiement** chaleureux.
- **Option "neutre" en premiere position** (modele utile : aucune reponse n'est mauvaise).

**Ce qui est manipulateur**
- Progression dissimulant la longueur totale (sunk-cost).
- Categorie identitaire dietetique comme cadre de question.
- Extraction d'information avant construction de relation.
- Pas de mascotte/contexte humain pendant les questions.
- X de fermeture sortant du contexte (friction d'abandon).
- Quiz servi depuis un domaine separe avec lead capture/paywall final.
- "Plan personnel" deterministe en sortie.

**Ce qu'on peut adapter**
- Cards icone + texte (deja disponibles).
- Une question par ecran (a appliquer si on construit un vrai flow d'onboarding multi-etapes).
- "Pas de regime" / "plus tard" en premiere position.
- Tutoiement (deja en place).

**Ce qu'il faut eviter**
- Tout quiz > 5 etapes.
- Toute question d'identite dietetique.
- Tout vocabulaire "regime" meme negate.
- Tout "plan personnel" deterministe en sortie.
- Toute extraction d'info avant la mascotte.
- Tout paywall / capture email pendant l'onboarding (techniquement deja impossible avec LocalStorage seul, a sceller pour l'avenir).

**Etat actuel verifie :** [components/welcome-screen.tsx](components/welcome-screen.tsx) est aujourd'hui **un seul ecran d'accueil** (pas un quiz). Il presente la mascotte par defaut, deux boutons "Commencer" / "Plus tard", et affiche "Aucun rattrapage. Aucune comparaison corporelle." L'ADN est respecte. Il n'y a pas encore de vrai parcours d'onboarding multi-etapes — c'est un terrain a defricher proprement.

---

## Règles produit non négociables

> A sceller dans `CLAUDE.md` pour qu'aucune passe Claude Code future ne puisse les contredire par defaut.

### Interdictions

1. **Pas de calories** — aucune kcal affichee, ni par repas, ni par exercice, ni en total. Aucune metrique calorique cachee dans l'agent IA.
2. **Pas de score alimentaire** — aucun systeme de notation des repas, des aliments, des journees. Pas de "bon repas" / "mauvais repas", pas de Nutri-Score-like, pas de "qualite alimentaire 7/10".
3. **Pas de plan personnel rigide** — aucun parcours d'onboarding ou de quiz ne genere une prescription qui enferme l'utilisatrice dans un cadre fixe. Les outputs d'un parcours sont des defaults doux, tous modifiables.
4. **Pas de transformation en X jours** — aucune promesse temporelle de resultat (poids, energie, "vous serez differente dans X jours"). Aucun countdown, milestone de comportement, "challenge X jours".
5. **Pas de mascotte deçue, triste, inquiete a cause d'un comportement utilisateur** — la mascotte n'a pas d'attente envers l'utilisatrice. Sa presence est inconditionnelle. Elle ne dit jamais "j'aimerais que tu...", "je serais content si...", "je suis triste que tu n'aies pas...".
6. **Pas de logique "tout completer"** — la completion par exercice/case est valorisee, mais aucune celebration de l'exhaustivite globale ("100%", "tout est fait", "objectif atteint"). Constance > completeness.
7. **Pas de CTA qui pousse a faire plus** — les actions primaires de chaque ecran ne doivent pas defaut a "+ ajouter une activite", "+ ajouter un repas", "+ ajouter une mesure". Les CTA primaires doivent permettre **d'adapter / d'alleger** au moins autant que **d'ajouter**.
8. **Pas de culpabilisation** — aucun langage de jugement, de manquement, de rattrapage. Voir liste exhaustive du vocabulaire interdit dans le brief (`project_app_overview.md`).
9. **Pas de vocabulaire regime** — "regime", "diete", "Keto", "Paleo", "Vegane comme identite", "bon/mauvais aliment", "triche", "compenser", "deficit" — aucun de ces termes dans l'interface, les notifs, ou les retours de l'agent IA.
10. **Pas de promesse minceur agressive** — pas de "perdez X kg", "atteignez votre poids ideal", "transformez votre silhouette". Le poids est optionnel, jamais central.

### Principes positifs

1. **Mascotte stable et soutenante** — meme presence, meme ton, jour apres jour. Elle accueille, n'evalue jamais.
2. **Une question a la fois** — un ecran = une decision principale. Pas de formulaires multi-champs hors profil.
3. **Version courte toujours valide** — pour chaque activite proposee (seance, repas, planification), il y a une version courte qui compte autant que la version longue.
4. **Mode energie visible** — le niveau d'energie du jour (low/medium/high) est en position dominante sur les ecrans qui proposent une action physique. Modifiable a tout moment.
5. **Repas structures sans rigidite** — la structure (proteine + fibres + feculent + lipide) est un repere, pas une regle. Les ecarts sont accueillis, jamais corriges.
6. **Mouvement pour soutenir le muscle et la glycemie** — le cadrage du mouvement est sante metabolique douce, pas performance esthetique.
7. **Plan partiel accepte** — une journee a moitie faite, c'est une journee. Une semaine a 3 jours, c'est une semaine.
8. **Aucune mauvaise reponse** — toute question dans l'app a une porte de sortie "plus tard" / "je ne sais pas" / "ca depend des jours".

---

## État actuel des modules

> Audit fonde sur la lecture directe des composants au commit `51a75be`. Aucun jugement visuel — uniquement code et microcopy.

### Aujourd'hui ([components/today-screen.tsx](components/today-screen.tsx))

**Solide**
- En-tete avec greeting personnalise + sous-titre "On simplifie. Tu peux commencer par une seule petite action." — ton aligne.
- Carte mascotte avec message d'accueil + supportTone visible.
- Bande hebdomadaire de constance (`WeeklyConsistencyStrip`) presentant "X sur 7 jours" sans graphique anxiogene.
- Cartes d'action primaires avec eyebrow + icone + meta + hint — hierarchie claire.
- Hint explicite "Sans graphique anxiogene. Sans poids central." sur la carte Suivi doux.
- Disclaimer medical en bas.

**Fragile**
- 5 zones distinctes (header + mascotte + strip + 4 cartes) peuvent saturer pour un public en brouillard mental. Densite a surveiller.
- Les 4 cartes "PrimaryAction" sont visuellement equivalentes — aucune priorisation visuelle entre Bouger / Repas / Epicerie / Suivi doux.
- "Tout est coche" comme hint sur l'epicerie completee approche le narrative binaire.

**Manque pour vraiment differencier**
- Aucune adaptation visible de l'ecran selon l'energie du jour (un jour "low" pourrait deja masquer/condenser certaines cartes).
- Pas de "petite action proposee" concrete et unique en haut de l'ecran (le sous-titre l'evoque mais ne la propose pas).

**Eviter d'ajouter**
- Graphiques de progression poids/calories.
- KPIs numeriques agreges.
- Notifications/badges rouges sur les cartes.

### Bouger ([components/workout-screen.tsx](components/workout-screen.tsx))

**Solide**
- Mascotte presente via `MascotCard`.
- Mode energie en radiogroup tres visible avec libelles ("Batterie du jour" / "Comment est ton energie aujourd'hui ?").
- Bouton "Passer en version courte" / "Revenir au plan complet" — CTA d'adaptation, pas d'ajout.
- Microcopy : "Aucun rattrapage. La version courte compte autant.", "Ce qui est fait compte. Tu peux t'arreter ici.".
- Badge "Belle constance" plutot que "Objectif atteint".
- Aucune kcal nulle part.
- Supersets visuellement groupes.
- Bibliotheque d'exercices avec illustration banner + categorie + supportNote + badges equipement.
- "Alternative a prevoir" plutot que "incompatible" pour materiel manquant.

**Fragile**
- Le compteur "done / total" en gros au centre de la carte hero reste un signal de completion globale (meme s'il est encadre de phrases douces). Risque d'etre lu comme un score binaire.
- Le narrative "Toutes les activites" reste sous-jacent (via `allDone`).
- Pas de CTA "alleger un exercice individuel" depuis la liste — uniquement toggle done/not done.

**Manque pour vraiment differencier**
- Pas de notion de "energie corporelle pendant l'effort" (option pour signaler en cours de seance "je dois m'arreter ici").
- Vocabulaire des exercices (dans `data/exercises.ts`) a verifier : presence d'un titre simple en plus du nom technique ? **A verifier dans la prochaine passe.**

**Eviter d'ajouter**
- Compteur de calories brulees.
- Pourcentage de completion global.
- Comparaison avec les seances precedentes.
- "Streak" / "serie en cours".

### Repas ([components/meals-screen.tsx](components/meals-screen.tsx) — non lu en detail dans cette passe)

**Note :** lecture detaillee non realisee dans cette session. Verification recommandee dans une passe suivante.

**Hypothese basee sur les imports de [components/app-shell.tsx](components/app-shell.tsx)** :
- Le module gere un `WeeklyMealPlan` avec recettes par jour et par type de repas.
- Permet de changer de recette, ajuster portions, copier d'un jour a l'autre, reset semaine.
- `showAllRecipes` toggle existe — suggere une bibliotheque de recettes.

**A verifier dans la prochaine passe :** absence de kcal/macros sur les cartes recettes, microcopy non culpabilisant, comportement quand un repas est saute.

### Epicerie ([components/grocery-screen.tsx](components/grocery-screen.tsx) — non lu en detail)

**Hypothese :** liste construite automatiquement a partir du plan de repas (via `buildGroceryList`), avec toggle "in pantry" / "purchased" + integration deals + filtrage par magasins preferes.

**A verifier :** comportement en cas de liste vide, microcopy quand tout est coche (deja vu sur today : "Tout est coche" — a uniformiser).

### Progression ([components/progress-screen.tsx](components/progress-screen.tsx) — non lu en detail)

**Hypothese basee sur l'app-shell :** ecran de suivi avec `todayCheckIn`, `weeklyCheckIns`, `weeklyConsistency`. Le check-in du jour est mis a jour via `handleUpdateCheckIn`.

**A verifier dans la prochaine passe** : absence de poids central, absence de graphique anxiogene, langage d'auto-evaluation doux.

### Profil ([components/profile-screen.tsx](components/profile-screen.tsx) — non lu en detail)

**Hypothese :** edition du profil utilisateur (nom, mascotte, equipement, magasins preferes, portions par defaut).

**A verifier :** absence de champ poids/taille obligatoire, mascotte changeable a tout moment, defaults modifiables.

### Mascottes ([components/mascot-card.tsx](components/mascot-card.tsx), [components/mascot-avatar.tsx](components/mascot-avatar.tsx), [data/mascots.ts](data/mascots.ts) — non lus en detail)

**Vu sur today-screen :** la mascotte expose `name`, `messages.home`, `supportTone`. Sur welcome-screen elle expose `energy` (utilise comme libelle).

**A verifier dans la prochaine passe (priorite haute selon analyse 3A) :**
- Y a-t-il un etat "triste" ou "decu" de la mascotte conditionnel a un comportement utilisateur ?
- Les `messages.home` contiennent-ils des formulations a la 1re personne du type "j'aimerais que tu..." / "je suis content que tu..." ?
- `supportTone` est-il toujours inconditionnel ?

### Agent IA Analyse douce du repas ([components/ai-meal-analysis-card.tsx](components/ai-meal-analysis-card.tsx), [app/api/ai/](app/api/ai/))

**Solide**
- Titre "Analyse douce du repas" + sous-titre "sans mettre les calories au centre" (explicit).
- Placeholder concret et culturellement situe ("poulet, riz, brocoli et un peu d'huile d'olive").
- Bouton "Analyser doucement" + etat de loading "Je regarde doucement…".
- Resultats structures qualitativement : protéine, fibres/légumes, feculent, lipide — etat **present / a completer / a confirmer**, jamais "manque" ni "rate".
- Sections "Suggestion douce", "Option facile", "Repère glycémie", + bloc "reassurance" en moss-50.
- Disclaimer medical + reminder de ne pas saisir d'infos medicales sensibles.
- Historique des analyses avec bouton "Effacer" visible.
- Server-only (cle API jamais cote client).

**Fragile**
- La fiabilite du contenu de reassurance/suggestion depend de la robustesse du prompt cote `app/api/ai/`. **Le prompt n'a pas ete relu dans cette passe — a auditer.**
- L'agent peut, sur un prompt mal calibre, produire un commentaire qui semble doux mais reintroduit subtilement une logique "amelioration".

**Manque pour vraiment differencier**
- Pas d'integration avec le plan de repas (pas de "regarder un repas du plan" en un tap).
- Pas de continuite avec la mascotte (c'est l'app qui "regarde", pas la mascotte).
- Pas d'option "ce repas est arrive comme ca, je ne veux pas qu'on l'analyse" pour quand l'utilisatrice veut juste manger sans rendre de compte.

**Eviter d'ajouter**
- Estimation calorique meme indicative.
- Score global du repas.
- Comparaison entre repas successifs.
- Recommandations correctives ("la prochaine fois ajoute…").

### Onboarding / Welcome ([components/welcome-screen.tsx](components/welcome-screen.tsx))

**Solide**
- Court : un seul ecran.
- Mascotte par defaut presente avec name + energy visibles.
- Microcopy : "Aucun rattrapage. Aucune comparaison corporelle.", "Tu peux personnaliser ta compagne et ton profil quand tu veux.", "Tu peux aussi commencer tout de suite et ajuster plus tard."
- Deux boutons : "Commencer" (primary) et "Plus tard" (ghost) — skippable, et les deux mènent au meme `onContinue`, ce qui est elegant (la sortie est honoree).
- Disclaimer medical.

**Fragile**
- "Commencer" et "Plus tard" font la meme action. Cela respecte le principe de non-friction, mais cree une legere incoherence semantique (les deux boutons sont equivalents).
- Aucune personnalisation initiale n'est captee (pas de choix de mascotte, pas de signal energetique de depart).

**Manque pour vraiment differencier**
- Pas de **mini-parcours** (3-5 etapes max) qui captent les defaults doux avant d'entrer dans l'app — actuellement on entre directement avec les valeurs par defaut.
- Pas de presentation de **plusieurs mascottes** au moment de l'accueil (alors que `data/mascots.ts` en contient probablement plusieurs).

**Eviter d'ajouter**
- Tout quiz long (> 5 etapes).
- Toute question d'identite dietetique.
- Toute question sur le poids actuel/cible.
- Tout email/compte obligatoire.

---

## Recommandation spécifique pour l'onboarding

### Principes
- **Court** : 3-5 etapes maximum.
- **Skippable** a chaque etape via un bouton "Plus tard" (revient a today avec defaults doux).
- **Transparent** : afficher "Etape 2 sur 4" en chiffres explicites.
- **Mascotte presente** sur chaque etape (avatar + bulle de question).
- **Sans question de regime, sans poids, sans promesse, sans plan rigide final.**
- **Construit la relation avant d'extraire de l'info.**

### Sequence recommandee (5 ecrans)

**Etape 1 — Bienvenue avec mascotte par defaut**
- Mascotte par defaut + message d'accueil + 1 phrase de positionnement.
- 2 boutons : "Continuer" et "Plus tard, je veux juste voir".

**Etape 2 — Choix de la compagne**
- Presentation visuelle des mascottes disponibles (grille de cartes avec illustration + nom + ton).
- Selection optionnelle. Bouton "Plus tard" garde la mascotte par defaut.
- Microcopy : "Tu peux changer quand tu veux."

**Etape 3 — Ce que tu veux soutenir (optionnel)**
- 3-4 cartes a choix multiples (multi-select) : "Refaire du muscle doucement" / "Sentir mon energie plus stable" / "Simplifier mes repas" / "Reduire ma charge mentale".
- Aucun choix n'est obligatoire. "Plus tard" valide.
- Aucune option de type "perdre du poids", "atteindre un objectif chiffre", "etre plus en forme".

**Etape 4 — Ton energie ces temps-ci**
- 3 options : "Plutot basse", "Plutot stable", "Plutot bonne".
- Set le `EnergyMode` par defaut.
- Microcopy : "Ca m'aide a te proposer des seances qui te ressemblent. Tu peux changer chaque jour."

**Etape 5 — Ce qui rend les routines difficiles (optionnel)**
- 3-4 chips multi-select : "Fatigue qui varie beaucoup", "Charge mentale (famille, travail)", "Concentration qui flotte", "Sensibilite aux ecrans/sons".
- Aucun jugement, aucune adaptation deterministe — sert a calibrer les futurs messages de la mascotte (presence plus calme, propositions plus courtes).
- Final : "Voila, on commence. Tu peux tout changer dans ton profil."

### Regles techniques
- Aucun envoi reseau (LocalStorage uniquement).
- Aucune metrique d'engagement (pas de "completed onboarding rate").
- Etat persiste en LocalStorage avec une cle dediee (`StorageKeys.welcomeSeen` existe deja) — etendre proprement.
- Reversible : depuis Profil, "refaire l'onboarding" est possible.

---

## Recommandation spécifique pour Bouger

### Constat
Le module Bouger applique deja largement les lecons Virtuagym (pas de kcal, mode energie visible, version courte, microcopy doux). Les ameliorations sont du **renforcement**, pas de la refonte.

### Actions recommandees

- **Reframer le compteur "done / total"** au-dessus de la liste : remplacer le gros chiffre central par une formulation qui valorise la presence ("3 mouvements deja faits aujourd'hui") plutot que la progression ("3 / 7"). Garder la donnee disponible mais en hierarchie reduite.
- **CTA "adapter" plus visible que "ajouter"** : la carte hero pourrait exposer directement "Cet exercice est trop ? Voir une variation plus douce" sur chaque carte d'activite, au-dela du toggle done.
- **Visuels d'exercices plus grands** : confirmer que [components/exercise-illustration.tsx](components/exercise-illustration.tsx) supporte un mode "carte de seance" assez grand pour reconnaitre le mouvement au scroll. (Le mode "banner" existe deja dans la bibliotheque — peut-etre l'amener dans la liste d'exercices d'une seance.)
- **Regroupements doux** : enrichir les groupements visuels au-dela des "Supersets" (categorie "Echauffement", "Force douce", "Mobilite", "Cardio doux") avec des en-tetes calmes.
- **Fin de seance non binaire** : remplacer le badge "Belle constance" (qui apparait quand `allDone`) par un message present a la fois quand tout est fait ET quand seulement une partie est faite ("Joli moment de mouvement, ce qui est fait compte.").
- **Message "ce qui est fait compte"** systematique : aujourd'hui, ce wording est present dans la carte hero. Le repeter en fin de liste (apres le dernier exercice) et sur l'ecran d'arret manuel si on en cree un.
- **Vocabulaire des exercices** : auditer `data/exercises.ts` pour s'assurer que chaque nom technique a un titre simple en complement. **A verifier dans la prochaine passe.**
- **Borner les durees** : verifier qu'aucun exercice de [data/exercises.ts](data/exercises.ts) ne propose par defaut > 30 min en mode low ou > 45 min en mode medium.

### Ne pas ajouter
- Compteur de calories brulees (sous aucune forme).
- "Streak" ou "X jours d'affilee".
- Comparaison entre seances ("plus que la semaine derniere").
- Recommandations correctives ("la prochaine fois fais...").

---

## Recommandation spécifique pour l'agent IA

### Constat
[components/ai-meal-analysis-card.tsx](components/ai-meal-analysis-card.tsx) est deja remarquablement bien aligne avec les lecons de BitePal. Le titre, les sous-titres, le langage de loading, la structure qualitative des resultats, la presence d'un disclaimer medical et d'une reminder vie privee — tout est en place. L'agent est server-only avec historique LocalStorage et bouton effacer.

### Actions de renforcement

- **L'agent doit aider a :**
  - comprendre la **structure** d'un repas (proteine / fibres / feculent / lipide) — deja le cas via le bloc `Ce que je repere`.
  - proposer une **option simple** pour completer si manque — deja le cas via `simpleOption`.
  - alleger la **charge mentale** par une suggestion concrete et faisable.
  - donner un **repere glycemie** qualitatif (stabilite / pic / vide) sans diagnostic — deja le cas via `glycemicSupportNote`.
  - finir sur une **reassurance** non conditionnelle — deja le cas via `reassurance`.

- **L'agent ne doit pas devenir :**
  - un tracker calorique (meme cache).
  - un juge alimentaire (jamais "ce repas est bon/mauvais").
  - un generateur de honte (jamais "tu devrais", "tu manques de").
  - un plan minceur automatise.

### Renforcements proposes

- **Audit du prompt cote serveur** (`app/api/ai/meal-analysis/route.ts` — non lu dans cette passe) : verifier que les regles editoriales sont inscrites comme contraintes systeme du prompt, pas comme suggestions. **Priorite haute.**
- **Continuite avec la mascotte** : l'introduction du bloc resultats pourrait etre prefixee par une phrase signee par la mascotte ("[Mascotte] regarde avec toi") pour eviter la sensation "deux entites separees".
- **Etat "ne pas analyser"** : ajouter une option discrete "j'ai juste mange, je ne veux pas qu'on en parle" qui ferme le champ sans culpabilisation.
- **Limite douce** : si l'utilisatrice analyse > 5 repas dans la journee, la mascotte peut suggerer "on peut arreter de regarder pour aujourd'hui, ton corps sait deja".
- **Aucune visualisation cumulative** des analyses (pas de graphique "structure de la semaine"). L'historique est un journal, pas un dashboard.
- **Verification cle API absente** deja geree (etat `no_api_key`) — bon point a maintenir.

---

## Annexes

- [docs/INVENTAIRE_REFERENCES.md](docs/INVENTAIRE_REFERENCES.md) — inventaire fichier par fichier + copies reduites.
- [docs/ROADMAP_PRODUIT_APP_POIDS_FEMME.md](docs/ROADMAP_PRODUIT_APP_POIDS_FEMME.md) — roadmap operationnelle (passes A/B/C/D + priorisation P0/P1/P2).
- Brief produit en memoire : `project_app_overview.md` (Memory index).
- Document de reference cite dans le brief : `agents/agents_roles_application_muscle_glycemie.md`.
- Etat du code au moment de l'audit : commit `51a75be` (Sprint D — Phase 2 essentials).
