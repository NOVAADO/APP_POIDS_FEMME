# Brief assets — Mascottes organiques (Passe B3.1)

**Date :** 2026-05-16
**Statut :** brief en attente de generation d'assets. Aucun code modifie.
**Reference de style :** `public/mascots/capybara-avatar.webp` (Capybara — direction A validee).
**Objectif :** generer 7 avatars cohérents avec Capybara pour les mascottes Loutre, Renarde, Biche, Ourse, Hibou, Koala, Louve.

---

## 1. Contexte technique confirme

### IDs reels dans le code

Les IDs sont definies dans [data/mascots.ts](data/mascots.ts) et typees dans [lib/types.ts](lib/types.ts) (`MascotAnimal`). **Utiliser exactement ces IDs (lowercase, sans accent, francais)** pour les noms de fichiers :

| ID code | Nom affiche | Energie |
|---|---|---|
| `capybara` | Capybara | Calme stable |
| `loutre` | Loutre | Mouvement joueur |
| `renarde` | Renarde | Strategie autonome |
| `biche` | Biche | Sensibilite protegee |
| `ourse` | Ourse | Force rassurante |
| `hibou` | Hibou | Clarte et observation |
| `koala` | Koala | Repos et recuperation |
| `louve` | Louve | Intuition et constance |

### Noms de fichiers attendus

```
public/mascots/loutre-avatar.webp
public/mascots/renarde-avatar.webp
public/mascots/biche-avatar.webp
public/mascots/ourse-avatar.webp
public/mascots/hibou-avatar.webp
public/mascots/koala-avatar.webp
public/mascots/louve-avatar.webp
```

### Etat des assets aujourd'hui

| Mascotte | Avatar custom | Statut |
|---|---|---|
| capybara | ✅ `capybara-avatar.webp` | Integre, reference de style |
| loutre, renarde, biche, ourse, hibou, koala, louve | ⏳ Manquant | SVG fallback en attendant |

### Workflow d'integration (post-generation)

1. **Telecharger** la version propre de l'image (sans UI overlay du tool de generation).
2. **Renommer** au nom exact attendu (ex : `loutre-avatar.webp`).
3. **Deposer** dans `public/mascots/`.
4. **Activer** dans le code en ajoutant l'id au set `MASCOTS_WITH_CUSTOM_AVATAR` dans [components/mascot-avatar.tsx](components/mascot-avatar.tsx) (1 ligne ajoutee).
5. **Tester** : l'avatar apparait dans Profil → Ma compagne (picker), et partout ou la mascotte est selectionnee.

Si l'asset est manquant ou echoue a charger, le fallback SVG existant prend automatiquement le relais — aucune image cassee.

### Ou les mascottes apparaissent dans l'app

- **WelcomeScreen** ([components/welcome-screen.tsx](components/welcome-screen.tsx)) : Capybara size lg (premier ecran)
- **TodayScreen / PetiteActionHero** : mascotte du profil en grand format (MascotHero, paysage 5:4)
- **TodayScreen / bottom card** : MascotPresence (size sm)
- **ProfileScreen** ([components/profile-screen.tsx](components/profile-screen.tsx)) : picker des 8 mascottes (size sm × 8) + carte "compagne actuelle" (size lg)
- **MealsScreen, WorkoutScreen, ProgressScreen, GroceryScreen** : MascotCard en tete d'ecran (size sm ou rich)
- **AI Meal Analysis Card** : MascotPresence (size sm) au-dessus du resultat
- **WorkoutScreen** : MascotPresence (size sm) en fin d'activites

Toutes les tailles affichent la **meme image source**, optimisee par `next/image`. Une seule generation par mascotte suffit (le 512×512 avatar couvre toutes les tailles d'usage actuelles).

---

## 2. Style commun obligatoire (charte direction A)

Les 7 mascottes doivent **suivre exactement** la direction etablie par Capybara :

- Illustration **editoriale** style "carnet illustre adulte"
- **Aquarelle douce** + lavis transparent + grain papier visible
- **Trait fin sepia** (plume ou crayon sepia, pas de contour noir gras)
- **Texture papier creme** en fond (kraft pale, grain naturel)
- Palette : **terre / creme / sauge / abricot / ocre / brun chaud** — toujours mat, jamais sature
- Vetements **adultes simples** : pull/cardigan ample, pantalon souple, eventuellement foulard ou accessoire discret
- Posture **calme**, debout 3/4, mains posees devant le ventre OU le long du corps, jamais en geste demonstratif
- Expression **neutre-douce** : bouche fermee ou tres leger sourire, yeux ronds avec un seul reflet blanc, paupiere superieure visible
- Joues a peine roses (lavis subtil, pas cercles vifs)
- Fond papier kraft creme avec **lavis tres delicat** dans la couleur secondaire de la mascotte
- Composition **centree**, sujet visible en buste haut + epaules pour cadrage circulaire avatar 512×512
- 2D illustration uniquement — **pas de 3D, pas de cartoon anime, pas de chibi**

**Test decisif (pour chaque mascotte) :** *"Une femme 45 ans en transition hormonale, un mardi soir epuise, regarderait-elle cette mascotte et se sentirait-elle accueillie sans pression ?"* Si reponse hesitante : regenerer.

---

## 3. Differenciation obligatoire

Chaque mascotte doit etre **immediatement distincte** des autres au scan. Eviter le piege "meme corps avec une tete differente" du SVG actuel.

### Quatre axes de differenciation

| Axe | Comment varier entre mascottes |
|---|---|
| **Silhouette** | Ronde (Capybara, Ourse, Koala) / fine-souple (Loutre, Renarde, Biche, Louve) / compacte (Hibou) |
| **Posture** | Mains devant ventre (calme) / une main au cardigan (penseuse) / les deux pattes sur le cote (joueuse) / posture lovee (Koala) |
| **Vetement** | Couleur, coupe et accessoire signature : foulard, sacoche, cardigan boutonne, bandana, etc. |
| **Palette secondaire** | Wash de fond et accent vetement variant : sauge / terracotta / rose argile / cacao / olive / gris-sauge / graphite |

Le **trait + le grain papier + le palette globale terre-creme** restent constants. **Tout le reste varie.**

---

## 4. Specs techniques (toutes les mascottes)

| Parametre | Valeur |
|---|---|
| Dimensions | **512 × 512 px minimum** (carre 1:1) |
| Format livraison | **WebP** (priorite), PNG accepte (fallback). **Pas de JPEG** (compression destructive). |
| Profondeur | 8 bits / canal |
| Transparence | **Pas de transparence** — fond papier creme inclus (le code clippera en cercle via `rounded-full`) |
| Padding interne | ≥ 40 px autour du sujet pour ne pas couper la tete/oreilles au crop circulaire |
| Sujet visible | Tete + epaules + buste haut au minimum. Eviter cadrage trop large qui rend la mascotte minuscule dans le cercle. |
| Composition | Centrer horizontalement, sujet a ~70 % du cadre |

---

## 5. Prompt general (template reutilisable)

Le template ci-dessous est la structure commune. Pour chaque mascotte, **remplacer les `<…>`** par les valeurs specifiques (section 7). Conserver le reste mot pour mot.

### Template en francais

```
Illustration editoriale d'<animal> humanoide adulte debout, vu de 3/4, expression
calme et neutre, yeux ronds doux avec un seul reflet blanc, leger sourire ferme,
<traits caracteristiques de l'espece : museau, oreilles, fourrure>. Porte
<vetement specifique : pull/cardigan + pantalon ou tenue cocoon adulte sans
logo>. Posture <posture specifique : detendue / penseuse / lovee / etc.>,
epaules relachees, <position des mains specifique>. Fond papier kraft creme
avec grain visible et lavis aquarelle tres delicat <couleur de wash> en
arriere. Style : illustration au lavis d'aquarelle et trait fin a la plume
sepia, esthetique carnet illustre moderne adulte, texture papier visible,
couleurs mat et organiques, palette terre douce, eclairage diffus de matin.
Composition centree, espace negatif genereux. 2D illustration, pas 3D, pas
cartoon anime, pas chibi, pas Disney. Ambiance chaleureuse, mature, rassurante,
douce. Coherent avec un style « carnet illustre » de mascotte capybara existante.
```

### Template en anglais (recommande pour generation)

```
Editorial illustration of an adult humanoid <animal> standing, three-quarter
view, calm neutral expression, soft round eyes with a single white highlight,
slight closed-mouth smile, <species traits: snout, ears, fur color>. Wearing
<specific clothing: sweater/cardigan + trousers or adult cocoon outfit without
logo>. <Specific posture: relaxed / thoughtful / cradling / etc.>, shoulders
dropped, <specific hand placement>. Cream kraft paper background with visible
grain and very delicate light <wash color> watercolor wash in the back. Style:
watercolor wash with fine sepia ink line, modern adult illustrated notebook
aesthetic, visible paper texture, matte organic colors, soft earth palette,
diffuse morning light. Centered composition, generous negative space. 2D
illustration only, not 3D, not anime cartoon, not chibi, not Disney style.
Warm, mature, reassuring, soft mood. Must match the existing capybara mascot
in the same illustrated notebook style.
```

---

## 6. Negative prompt commun

### Format Midjourney (`--no` syntax)

```
--no 3d render, cartoon, anime, chibi, kawaii, disney, pixar, studio ghibli,
hyperrealistic, photo, photograph, realistic skin, muscular, sexualized, fitness
gear, gym clothes, leggings, sports bra, baseball cap, headband, sneakers, scale,
measuring tape, calorie chart, food labels, salad bowl, weights, dumbbells, gym
equipment, logo, text, watermark, signature, written words, neon colors, hot pink,
bright purple, harsh shadows, hard outlines, multiple animals, crowd, sad face,
crying, angry, surprised, mouth wide open, sparkle eyes, multiple highlights in
eyes, big teeth grin, infantile baby style, plastic look, glossy finish, deep
saturation, vector flat, coach posture, finger pointing, thumb up, seductive pose,
predatory gaze, warrior pose
```

### Format Stable Diffusion / Flux (champ negative prompt separe)

Meme liste, separee par virgules, sans le `--no` prefixe.

### Format DALL-E 3 / Sora / Gemini (exclusions naturelles a coller en fin de prompt)

```
Important constraints: no 3d render, no cartoon, no anime, no chibi, no kawaii,
no disney, no pixar, no hyperrealistic photo, no muscular body, no fitness gear,
no gym clothes, no leggings, no sports bra, no scale, no measuring tape, no
calorie chart, no food labels, no dumbbells, no logo, no text, no neon colors,
no hot pink, no sparkle eyes, no big teeth smile, no infantile baby style, no
plastic look, no coach posture, no finger pointing, no thumb up, no seductive
pose, no predatory gaze, no warrior pose.
```

---

## 7. Prompts specifiques par mascotte

> Chaque prompt est **autonome et copiable** dans ton outil. Version anglaise donnee comme principale (meilleurs resultats). Ajouter le negative prompt approprie selon ton outil (section 6) + `--ar 1:1` pour Midjourney.

### 7.1 — Loutre (id : `loutre`)

**Energie :** mouvement joueur, souple, dedramatise le mouvement.
**Wash de fond :** **vert-eau / sauge clair**.
**Vetement :** pull tricot ample **vert d'eau** ou **bleu-sauge**, pantalon souple creme (pas leggings).
**Posture :** debout 3/4, **legerement inclinee sur une hanche**, mains posees doucement, posture qui suggere "viens, on bouge un peu mais sans pression".
**Expression :** vive et douce, **pas excitee**. Petit sourire ferme avec un peu de malice retenue.
**Accessoire (optionnel) :** **petit bandana de tissu** au cou (pas un bandeau sur la tete style sport).

```
Editorial illustration of an adult humanoid otter standing three-quarter view,
calm neutral expression with a hint of quiet playfulness, soft round eyes with
a single white highlight, slight closed-mouth smile, warm chestnut brown fur
with cream beige belly and chest, characteristic otter face with a slightly
elongated muzzle, whiskers very subtle, small rounded ears flat against the
head. Wearing a soft loose knit sweater in muted water-green or sage-blue, soft
cream beige trousers (not leggings), adult cocoon-style clothing without any
logo. Relaxed posture, gently leaning on one hip, shoulders dropped, hands
resting calmly in front of the belly, optional small fabric bandana at the
neck. Cream kraft paper background with visible grain and very delicate light
sage-blue watercolor wash in the back. Style: watercolor wash with fine sepia
ink line, modern adult illustrated notebook aesthetic, visible paper texture,
matte organic colors, soft earth palette, diffuse morning light. Centered
composition, generous negative space. 2D illustration only, not 3D, not anime
cartoon, not chibi, not Disney style. Warm, mature, reassuring, soft mood.
Must match the existing capybara mascot in the same illustrated notebook style.
```

**Specifique a eviter pour la Loutre :** loutre bebe, posture sportive, baton ou raquette, mouvement dynamique, eclaboussures d'eau, lac en arriere-plan.

---

### 7.2 — Renarde (id : `renarde`)

**Energie :** strategie autonome, vive, astucieuse, "tu choisis, je suis la si besoin".
**Wash de fond :** **terracotta tres dilue**.
**Vetement :** **cardigan ouvert ou veste legere couleur terracotta** ou ocre rouille, par-dessus un haut creme ou beige, pantalon pratique brun doux.
**Posture :** debout legerement tournee, **regard de cote attentif sans intensite**, une main posee sur l'autre devant le ventre OU une main legerement sur la hanche (jamais bras croises severes).
**Expression :** intelligente et calme, **jamais judgmentale ni manipulatrice**, regard pose, pas perceant.
**Accessoire (optionnel) :** **petit carnet ferme tenu dans une main** (sans texte visible, juste un objet familier).

```
Editorial illustration of an adult humanoid fox standing three-quarter view,
calm attentive expression with quiet intelligence, soft round eyes with a single
white highlight, slight closed-mouth smile, warm muted russet-orange fur with
cream beige chest and inner ears, characteristic pointed fox ears slightly
tilted, fine pointed snout, soft white blaze on the cheeks. Wearing an open
cardigan or light jacket in terracotta or earthy rust color over a cream beige
top, soft brown trousers, adult cocoon-style clothing without any logo. Relaxed
posture, slightly turned, shoulders dropped, one hand resting in front of belly
or gently on hip, may hold a small closed notebook with no visible text. Cream
kraft paper background with visible grain and very delicate light terracotta
watercolor wash in the back. Style: watercolor wash with fine sepia ink line,
modern adult illustrated notebook aesthetic, visible paper texture, matte
organic colors, soft earth palette, diffuse morning light. Centered composition,
generous negative space. 2D illustration only, not 3D, not anime cartoon, not
chibi, not Disney style. Warm, mature, reassuring, soft mood. Must match the
existing capybara mascot in the same illustrated notebook style.
```

**Specifique a eviter pour la Renarde :** regard seducteur, sourire malicieux, posture sexy, pose de coach, doigt qui pointe, queue de renard exhibee, fox style "trickster".

---

### 7.3 — Biche (id : `biche`)

**Energie :** sensibilite protegee, douceur, prudence, soutient l'hypersensibilite.
**Wash de fond :** **rose argile tres pale ou beige rose**.
**Vetement :** **cardigan beige rose ou rose argile**, par-dessus un top creme, pantalon fluide creme ou ivoire, eventuellement un **foulard en lin** noue souple au cou.
**Posture :** **mains pres du cœur ou du ventre**, posture douce et legerement protectrice, tete tres legerement inclinee.
**Expression :** **calme et sensible**, regard pose et accueillant, pas triste, pas fragile a outrance.
**Trait specifique :** **petites taches blanches discretes** sur le haut du dos / les flancs (pas du faon couvert de taches).

```
Editorial illustration of an adult humanoid doe standing three-quarter view,
calm gentle expression with soft sensitivity, soft round eyes with a single
white highlight, slight closed-mouth smile, warm beige-fawn fur with cream
belly, characteristic delicate doe face with a fine muzzle, large gentle ears
tilted slightly back, very subtle small white spots discreetly on the shoulders.
Wearing a soft cardigan in dusty rose or pale clay-pink color over a cream top,
soft flowing cream trousers, optional light linen scarf softly knotted at the
neck, adult cocoon-style clothing without any logo. Relaxed posture, head
slightly tilted, shoulders dropped, both hands gathered close to the heart or
upper belly in a gently protective gesture. Cream kraft paper background with
visible grain and very delicate light dusty-rose watercolor wash in the back.
Style: watercolor wash with fine sepia ink line, modern adult illustrated
notebook aesthetic, visible paper texture, matte organic colors, soft earth
palette, diffuse morning light. Centered composition, generous negative space.
2D illustration only, not 3D, not anime cartoon, not chibi, not Disney style.
Warm, mature, reassuring, soft mood. Must match the existing capybara mascot
in the same illustrated notebook style.
```

**Specifique a eviter pour la Biche :** fragilite excessive, air triste ou peureux, doe-eyes exageres, faon, jeune Bambi style, position recroquevillee, larmes.

---

### 7.4 — Ourse (id : `ourse`)

**Energie :** force rassurante, ancrage, protection, reconstruction musculaire **sans pression**.
**Wash de fond :** **miel doux ou ocre dilue**.
**Vetement :** **pull tricot chaud couleur cacao, miel ou ocre**, pantalon brun doux. Tenue solide et chaleureuse.
**Posture :** **debout stable, epaules relachees, mains gauchement posees devant le ventre ou une main qui tient l'autre poignet** — presence solide sans rigidite.
**Expression :** **protectrice et calme**, regard chaleureux, pas severe ni dominante.
**Silhouette :** **ronde et stable**, presence rassurante par la silhouette enveloppante (pas musculation).

```
Editorial illustration of an adult humanoid bear standing three-quarter view,
calm protective expression, soft round eyes with a single white highlight,
slight closed-mouth smile, warm cocoa-brown fur with lighter cream belly,
characteristic bear face with a short rounded muzzle, small rounded ears, soft
rounded silhouette that feels enveloping and reassuring (not muscular). Wearing
a warm chunky knit sweater in cocoa brown, honey or warm ochre color, soft
brown trousers, adult cocoon-style clothing without any logo. Stable grounded
posture, shoulders dropped, hands gently resting in front of belly or one hand
holding the other wrist softly. Cream kraft paper background with visible grain
and very delicate light honey-amber watercolor wash in the back. Style:
watercolor wash with fine sepia ink line, modern adult illustrated notebook
aesthetic, visible paper texture, matte organic colors, soft earth palette,
diffuse morning light. Centered composition, generous negative space. 2D
illustration only, not 3D, not anime cartoon, not chibi, not Disney style.
Warm, mature, reassuring, soft mood. Must match the existing capybara mascot
in the same illustrated notebook style.
```

**Specifique a eviter pour l'Ourse :** ourse agressive, posture defensive ou imposante, silhouette fitness ou musclee, force masculine caricaturale, grognement, dents visibles, griffes proeminentes.

---

### 7.5 — Hibou (id : `hibou`)

**Energie :** clarte et observation, lucidite, organisation, observation calme.
**Wash de fond :** **vert olive tres dilue**.
**Vetement :** **petite veste ou cardigan vert olive doux**, par-dessus un top creme.
**Posture :** **posee, legerement de face avec tete tres legerement tournee**, mains posees ensemble, peut tenir un **petit carnet ferme** ou rien.
**Expression :** **observatrice et calme**, regard attentif **non surveillant**, **pas d'air professoral**.
**Particularites :** **plumage doux**, oreilles plumes discretes (pas hibou pour Halloween), **PAS de lunettes** (eviter le cliche professeur).
**Bec :** petit et integre, **pas exagere**.

```
Editorial illustration of an adult humanoid owl standing three-quarter view,
calm observant expression, soft round eyes with a single white highlight (not
huge ringed staring eyes), slight closed-mouth presence with a tiny soft beak,
warm taupe-brown plumage with cream chest and face plate, characteristic owl
face with subtle feather tufts (not pointy horns), small rounded body silhouette.
Wearing a soft cardigan or light jacket in muted olive green over a cream top,
adult cocoon-style clothing without any logo, no glasses. Composed posture,
shoulders relaxed, head very slightly tilted to one side as if listening, hands
softly resting together in front of belly, may hold a small closed notebook with
no visible text. Cream kraft paper background with visible grain and very
delicate light olive-green watercolor wash in the back. Style: watercolor wash
with fine sepia ink line, modern adult illustrated notebook aesthetic, visible
paper texture, matte organic colors, soft earth palette, diffuse morning light.
Centered composition, generous negative space. 2D illustration only, not 3D,
not anime cartoon, not chibi, not Disney style. Warm, mature, reassuring, soft
mood. Must match the existing capybara mascot in the same illustrated notebook
style.
```

**Specifique a eviter pour le Hibou :** professeur severe, lunettes (cliche infantilisant), air de surveillance, regard fixe perceant, hibou de nuit halloween, "wise old owl" anglais cliche, grands yeux ronds exageres.

---

### 7.6 — Koala (id : `koala`)

**Energie :** repos et recuperation, sommeil, lenteur, permission de se reposer.
**Wash de fond :** **gris-sauge ou creme tres pale**.
**Vetement :** **chandail ou pull-sur tenue detente adulte tres doux**, couleur **gris-sauge** ou **creme chaud**. Effet "cocoon" matin pluvieux. **Pas de pyjama enfantin**.
**Posture :** **enveloppee, posture calme un peu lovee**, epaules tres relachees, peut tenir un **mug de the chaud** dans les mains.
**Expression :** **reposee et calme**, **pas endormie a outrance**, **pas malade**. Paupieres detendues, leger sourire ferme.
**Particularites :** **grandes oreilles rondes et duveteuses** sur les cotes, **gros nez doux noir** (signature koala), fourrure gris-doux.

```
Editorial illustration of an adult humanoid koala standing three-quarter view,
calm restful expression (not sleepy, not sick), soft round eyes with a single
white highlight and gently relaxed eyelids, slight closed-mouth smile,
characteristic soft koala face with large fluffy round ears on the sides, soft
black nose, warm grey fur with cream chest and belly. Wearing a soft loose
adult lounge sweater in muted sage-grey or warm cream color, adult cocoon-style
clothing without any logo, not a childish pyjama. Calm enveloping posture,
shoulders very relaxed, hands gently holding a small warm tea mug in front of
the belly. Cream kraft paper background with visible grain and very delicate
light sage-grey watercolor wash in the back. Style: watercolor wash with fine
sepia ink line, modern adult illustrated notebook aesthetic, visible paper
texture, matte organic colors, soft earth palette, diffuse morning light.
Centered composition, generous negative space. 2D illustration only, not 3D,
not anime cartoon, not chibi, not Disney style. Warm, mature, reassuring, soft
mood. Must match the existing capybara mascot in the same illustrated notebook
style.
```

**Specifique a eviter pour le Koala :** bebe koala, koala accroche a une branche d'eucalyptus, pyjama enfantin a motifs, air trop endormi (yeux fermes), air malade ou patraque, mascotte cartoon "lazy koala".

---

### 7.7 — Louve (id : `louve`)

**Energie :** intuition et constance, retour a soi, stabilite apres une pause.
**Wash de fond :** **gris chaud / graphite tres dilue**.
**Vetement :** **chandail tricot ou veste souple couleur graphite ou brun doux**, par-dessus un top creme, pantalon souple. Tenue solide et adulte.
**Posture :** **droite mais non rigide**, ancree, mains posees devant le ventre ou une main qui repose sur l'avant-bras oppose. **Calme et confiante**.
**Expression :** **calme, confiante, non dominante**. Regard pose et chaleureux, **jamais predateur**.
**Particularites :** **fourrure gris chaud** (pas gris froid), **oreilles pointues mais arrondies**, museau **doux et plus court** que renard, **pas de canines visibles**.

```
Editorial illustration of an adult humanoid she-wolf standing three-quarter view,
calm confident expression (not dominant, not predatory), soft round eyes with a
single white highlight and a gentle warm gaze, slight closed-mouth smile, warm
soft grey fur with cream chest and belly (warm grey, not cold steel grey),
characteristic wolf face with a softer rounded muzzle than a fox, pointed but
slightly rounded ears, no visible fangs. Wearing a soft knit sweater or light
jacket in muted graphite or warm brown color over a cream top, soft trousers,
adult cocoon-style clothing without any logo. Grounded upright posture (not
rigid), shoulders dropped, hands resting in front of belly or one hand softly
on the opposite forearm. Cream kraft paper background with visible grain and
very delicate light warm-grey watercolor wash in the back. Style: watercolor
wash with fine sepia ink line, modern adult illustrated notebook aesthetic,
visible paper texture, matte organic colors, soft earth palette, diffuse morning
light. Centered composition, generous negative space. 2D illustration only, not
3D, not anime cartoon, not chibi, not Disney style. Warm, mature, reassuring,
soft mood. Must match the existing capybara mascot in the same illustrated
notebook style.
```

**Specifique a eviter pour la Louve :** louve agressive, regard predateur, posture de chasse, fantasy warrior, loup garou, dents visibles, gris froid steel, hurlement, meute.

---

## 8. Criteres de validation (checklist par asset)

Pour **chaque** image generee, valider sur cette grille avant integration. Si **un seul** critere strict echoue : rejeter, regenerer.

| # | Critere | Strict / Important |
|---|---|---|
| 1 | Reconnaissable comme l'animal correct (museau + oreilles + fourrure characteristiques) | Strict |
| 2 | Expression calme et neutre (pas grand sourire dents, pas yeux surpris, pas air triste) | Strict |
| 3 | Vetement simple, adulte, visible (pas sport, pas costume cute, pas logo) | Strict |
| 4 | Aucune ref fitness/regime/medical (pas balance, mesure, nourriture, gym) | Strict |
| 5 | Style coherent avec Capybara (lavis aquarelle + trait sepia + texture papier) | Strict |
| 6 | Palette terre + couleur secondaire respectee | Strict |
| 7 | Posture non-coachante (pas pouce leve, pas doigt qui pointe, pas geste de demo) | Strict |
| 8 | Adulte, pas bebe / chibi / infantile | Strict |
| 9 | Composition centree, espace negatif suffisant | Important |
| 10 | Pas uncanny valley (visage anime-honnete, pas creepy hybride humain) | Strict |
| 11 | Crop circulaire OK : la tete + epaules restent lisibles quand on coupe en cercle 512×512 | Important |
| 12 | Lisible sur fond creme app (#FBF8F3) | Important |
| 13 | Distinct des autres mascottes generees (silhouette + posture + palette uniques) | Strict |
| 14 | Cohérent en lot : meme grain de papier + meme palette globale terre que Capybara | Strict |

**Critere decisif :** poser les 8 mascottes (Capybara + les 7 nouvelles) cote a cote en cercles 512×512. Doivent former une **serie visuellement coherente** mais chaque mascotte doit etre **immediatement distincte** au scan. Si deux mascottes se ressemblent trop (ex : Loutre et Renarde indiscernables), regenerer la moins reussie.

---

## 9. Recommandations de generation (tool-specific)

### Workflow recommande

1. **Generer en lot de 4** pour chaque mascotte (varier juste le seed). Choisir la meilleure.
2. **Iterer sur de petites variations** plutot que tout reecrire (changer juste la couleur du vetement, juste la posture des mains).
3. **Apres chaque mascotte validee, garder le prompt exact + seed/parametres** dans un petit fichier de notes — c'est crucial pour reproduire ou ajuster.
4. **Ne pas valider en isolation** : poser la nouvelle mascotte a cote de Capybara visuellement avant d'accepter. La coherence en lot prime sur la beaute en isolation.

### Si Midjourney v6 / v6.1

- Coller le prompt anglais + ajouter `--no <liste>` + `--ar 1:1` + `--style raw`
- `--style raw` reduit la tendance Midjourney au "joli par defaut" et garde plus pres du brief
- Re-roll plusieurs fois si la premiere serie n'est pas alignee

### Si DALL-E 3 (ChatGPT)

- Coller le prompt anglais + la version "Important constraints: no X..." en fin
- DALL-E 3 a tendance a echouer sur "humanoide animal habille" — sois prete a regenerer 3-4 fois
- DALL-E 3 ne supporte pas de seed reproductible — chaque generation est unique

### Si Flux Pro / Schnell (via fal.ai, Replicate, Krea)

- Champ positif : prompt anglais
- Champ negatif : liste separee par virgules (sans `no` prefix)
- Flux Pro donne les meilleurs resultats pour ce style editorial illustre
- Flux Schnell suffit pour iterer rapidement

### Si Sora Image / Gemini Imagen

- Format "no X, no Y" colle en fin du prompt
- Generer en lot car le rendu varie pas mal

---

## 10. Risques a eviter (transverses aux 7 mascottes)

| Risque | Comment l'eviter dans le prompt |
|---|---|
| Style **kawaii / chibi** | Toujours specifier "adult", "not chibi", "not kawaii" explicite |
| Style **3D rendu / Pixar** | "2D illustration only, not 3D" — repeter si necessaire |
| **Logos / texte / ecriture** | "no logo, no text, no written words" — meme sur le carnet/sacoche |
| Tenue **fitness** | "no fitness gear, no leggings, no sports bra, no gym clothes" |
| **Yeux trop grands / sparkle** | "soft round eyes with a single white highlight" (pas "big sparkle eyes") |
| **Sourire dents visibles** | "slight closed-mouth smile" |
| **Posture coach** | "not pointing, not demonstrating, no thumb up" |
| Style **mascotte corporate** | "editorial illustration" + "modern adult illustrated notebook aesthetic" |
| **Couleurs neon / saturees** | "matte organic colors, soft earth palette" |
| **Uncanny valley** | "humanoid animal" (pas "human-animal hybrid") + insister sur "adult character" pas "anthropomorphic human-faced" |
| Manque de **coherence en lot** | Toujours generer en evoquant "must match the existing capybara mascot in the same illustrated notebook style" |

---

## 11. Resume — copie rapide pour ton outil

### Les 7 prompts (anglais, prets a coller)

Versions condensees pour copie rapide. Les versions completes restent les sections 7.1 a 7.7.

1. **Loutre** → otter, water-green/sage-blue sweater, leaning hip, sage-blue wash
2. **Renarde** → fox, terracotta cardigan, slightly turned + small closed notebook, terracotta wash
3. **Biche** → doe, dusty rose cardigan + linen scarf, hands at heart, dusty-rose wash
4. **Ourse** → bear, cocoa/honey chunky knit, grounded posture, honey-amber wash
5. **Hibou** → owl, olive cardigan, slightly tilted head, olive-green wash (no glasses)
6. **Koala** → koala, sage-grey lounge sweater + tea mug, restful, sage-grey wash
7. **Louve** → she-wolf, graphite/brown sweater, upright grounded, warm-grey wash

Pour chaque, utiliser le **prompt anglais complet (section 7.x)** + le **negative prompt approprie a ton outil (section 6)** + format `--ar 1:1` ou equivalent.

---

## 12. Apres generation

Quand les 7 images sont validees :

1. **Telecharger** les versions propres en `.webp` 512×512.
2. **Renommer** au pattern exact : `<id>-avatar.webp` (ex : `loutre-avatar.webp`).
3. **Deposer** dans `public/mascots/`.
4. **Activer dans le code** : ajouter les 7 ids dans le set `MASCOTS_WITH_CUSTOM_AVATAR` dans [components/mascot-avatar.tsx](components/mascot-avatar.tsx). C'est une **modification d'une seule ligne** (le set).
5. **Tester** : `npm run typecheck` + `npm run build` + preview locale → ouvrir Profil → Ma compagne → verifier les 8 mascottes apparaissent comme illustrations coherentes.
6. **Mettre a jour** la table "Etat actuel des assets" dans [CLAUDE.md](CLAUDE.md) pour refleter les 8 mascottes activees.
7. **Commit + PR** avec validation visuelle.

Cette derniere etape (activation + verification) peut etre lancee comme une Passe B3.2 ultra-courte une fois les 7 assets disponibles.

---

## Notes finales

- **Ne pas valider en isolation.** Toujours comparer cote a cote avec Capybara.
- **Iterer.** Generer 4 variantes par mascotte minimum, choisir la meilleure.
- **Garder les sources hi-res.** Si l'outil sort des 1024×1024, garder le fichier original a cote du 512 (comme on a fait pour `capybara-avatar-1024.webp`).
- **Rejeter sans hesiter** si le critere "coherence en lot avec Capybara" n'est pas atteint. Une mascotte hors-style abime le ressenti des 8 ensemble.

Document genere pour la Passe B3.1. A relire avec l'historique de la session pour le contexte complet.
