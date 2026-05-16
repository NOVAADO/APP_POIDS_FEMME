# APP_POIDS_FEMME — guide Claude

Ce fichier definit les regles immutables du produit. Toute session Claude Code (ou autre assistant) doit les respecter par defaut. Elles **ne peuvent pas etre contredites** par une demande utilisateur ponctuelle sans alignement explicite documente.

## Vision produit

Application compagne (non punitive, non comparative) pour femmes en preménopause, périménopause et ménopause, avec surplus de poids possible, résistance à l'insuline possible, charge mentale élevée et besoins neurocompatibles (TDAH, hypersensibilité, réactance, trauma complexe).

Mission : soutenir la **reconstruction musculaire douce**, la **stabilité glycémique**, les **repas familiaux simples**, la **réduction de la charge mentale** et l'**adhésion durable**.

## Public cible

- Femmes 40-60 ans en transition hormonale.
- Souvent profils neurodivergents (TDAH déclaré ou suspecté, hypersensibilité).
- Souvent histoire de régimes répétés, parfois trouble du comportement alimentaire.
- Géographie : Québec. Épiceries cibles : IGA, Métro, Super C, Loblaws, Maxi, Walmart.

## Stack

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS.
- Persistance LocalStorage uniquement. **Pas de backend, pas d'auth, pas de base de données.**
- Une route API server-only existe (`app/api/ai/`) pour l'agent d'analyse de repas. Clé OpenAI jamais côté client.
- Tests : Playwright disponible en dev.

---

# Règles produit non négociables — APP Poids Femme

## Interdictions absolues

Aucune session ne peut introduire les éléments suivants. Si une demande utilisateur va dans ce sens, l'expliciter et proposer une alternative compatible avec l'ADN.

1. **Pas de calories au centre.** Aucune kcal affichée nulle part : ni par repas, ni par exercice, ni en total journalier ou hebdomadaire. Aucun champ "calories" dans les données, aucune estimation calorique même indicative.
2. **Pas de kcal dans les exercices.** Aucune métrique de calories brûlées par exercice, par séance, par mode énergie.
3. **Pas de score alimentaire.** Aucune note 0-10, aucun Nutri-Score-like, aucune qualification "bon repas" / "mauvais repas", aucun système de points alimentaires.
4. **Pas de macros détaillées.** L'agent IA et toute autre couche ne donnent jamais de grammes de protéines/glucides/lipides, ni de pourcentages de macros. La structure d'un repas est qualitative (présent / à compléter / à confirmer), jamais quantitative.
5. **Pas de "plan personnel" rigide.** Aucun parcours d'onboarding ou de quiz ne génère une prescription qui enferme l'utilisatrice dans un cadre fixe. Les sorties d'un parcours sont des **defaults doux**, tous modifiables à tout moment.
6. **Pas de transformation promise en X jours.** Aucune promesse temporelle de résultat ("perdez X kg en Y jours", "votre énergie sera transformée en Z semaines"). Aucun countdown, milestone de comportement, "challenge X jours", before/after.
7. **Pas de mascotte déçue, triste ou inquiète selon le comportement de l'utilisatrice.** La mascotte n'a **aucune attente** envers l'utilisatrice. Sa présence est inconditionnelle. Elle ne dit jamais "j'aimerais que tu...", "je serais content si...", "je suis triste que tu n'aies pas...", "tu m'as déçue". Son humeur ne change jamais en réaction à une action ou inaction.
8. **Pas de logique "tout compléter".** La complétion par exercice / par case est valorisée individuellement, mais aucune célébration de l'exhaustivité globale ("100%", "tout est fait", "objectif atteint", "journée parfaite"). Constance > completeness.
9. **Pas de CTA qui pousse à faire plus par défaut.** Les actions primaires de chaque écran ne défaultent jamais à "+ ajouter une activité", "+ ajouter un repas", "+ ajouter une mesure". Les CTA primaires permettent **d'adapter / d'alléger** au moins autant que **d'ajouter**.
10. **Pas de vocabulaire régime.** Bannir : "régime", "diète", "Keto", "Paléo", "Végane comme identité", "bon/mauvais aliment", "triche", "compenser", "déficit", "calories restantes", "brûler", "performance".
11. **Pas de culpabilisation.** Bannir : "tu dois", "tu n'as pas", "manqué", "raté", "échec", "discipline", "laisser-aller".
12. **Pas de "rattrapage".** Aucun écran, microcopy, notification ou message d'agent IA ne propose de "rattraper" une journée, une semaine, un repas, une séance.
13. **Pas de "objectif manqué".** Aucune notion d'objectif chiffré qui pourrait être manqué. Si une cible numérique apparaît (ex. nombre de jours actifs cette semaine), elle est descriptive, pas prescriptive.
14. **Pas de promesse minceur agressive.** Pas de "perdez X kg", "atteignez votre poids idéal", "transformez votre silhouette". Le poids est optionnel, jamais central, jamais demandé en obligation.

## Principes positifs

À appliquer activement à chaque ajout ou modification.

1. **Mascotte stable et soutenante.** Même présence, même ton, jour après jour. Elle accueille, n'évalue jamais. Elle est un **compagnon, pas un coach**.
2. **Une question à la fois.** Un écran = une décision principale. Pas de formulaires multi-champs hors profil.
3. **Version courte toujours valide.** Pour chaque activité proposée (séance, repas, planification), il y a une version courte qui compte **autant** que la version longue.
4. **Mode énergie visible.** Le niveau d'énergie du jour (low / medium / high) est en position dominante sur les écrans qui proposent une action physique. Modifiable à tout moment.
5. **Repas structurés sans rigidité.** La structure (protéine + fibres + féculent + lipide) est un **repère**, pas une **règle**. Les écarts sont accueillis, jamais corrigés.
6. **Mouvement pour soutenir le muscle et la glycémie.** Le cadrage du mouvement est **santé métabolique douce**, pas performance esthétique.
7. **Plan partiel accepté.** Une journée à moitié faite, c'est une journée. Une semaine à 3 jours, c'est une semaine.
8. **Aucune mauvaise réponse.** Toute question dans l'app a une porte de sortie "plus tard" / "je ne sais pas" / "ça dépend des jours".
9. **Compagnon, pas coach.** Le ton est celui d'une amie présente, pas d'un instructeur. Pas d'impératif sec, pas de "objectif", pas de "défi".
10. **Soutien, pas contrôle.** L'app n'évalue pas, ne mesure pas, ne note pas. Elle propose, accueille, accompagne.

## Vocabulaire interdit (liste exhaustive)

Bannir dans toute interface, microcopy, notification, message d'agent IA, libellé d'option :

- tu dois / il faut / vous devez
- manqué / raté / échec
- rattrapage / rattraper / compenser
- triche / cheat day
- discipline / laisser-aller
- objectif (au sens prescriptif) / objectif manqué / atteindre votre objectif
- mauvais aliment / aliment interdit
- déficit (calorique ou autre)
- calories / kcal / brûler
- macros / grammes de protéines / pourcentage de glucides
- régime / diète
- minceur (au sens d'identité ou de but)
- transformation (au sens chiffré ou temporel)
- discipline
- streak (au sens jeu vidéo)

## Vocabulaire à privilégier

- tu peux / si tu veux / quand tu veux
- ce n'est pas perdu / on reprend ici
- la version courte compte / une action suffit
- ce qui est fait compte
- aucun rattrapage / sans rattrapage
- repère doux / présence / soutien
- mouvement / muscle qui se reconstruit / énergie stable
- bouger pour soutenir / pour soi / pour le quotidien
- repas simple / repas prévisible / structure de repère

---

## Filtres à appliquer avant tout ajout de fonctionnalité

Toute fonctionnalité proposée doit passer les **4 questions** :

1. Réduit-elle la charge mentale ?
2. Peut-elle culpabiliser ?
3. Reste-t-elle codable rapidement (LocalStorage, sans backend) ?
4. Sert-elle muscle / glycémie / repas / constance ?

Si la réponse à (2) est "oui" ou "peut-être", **refuser** ou re-cadrer.

## Cas d'usage de référence

- L'utilisatrice ouvre l'app un jour de brouillard mental, sans énergie. Elle voit Today, choisit "Plus tard" sur tout, ferme. L'app ne lui en veut pas. La mascotte ne lui en veut pas. Demain est un autre jour.
- L'utilisatrice fait 2 exercices sur 6, s'arrête. L'app dit "Ce qui est fait compte." La mascotte reste présente. Aucun rattrapage proposé.
- L'utilisatrice oublie de planifier la semaine. L'épicerie est vide. L'app propose calmement de planifier quelques repas, jamais "vous êtes en retard".

## Références internes

- Brief produit complet : `cahier_creation_app_muscle_glycemie_neurodivergence.md` (racine).
- Audit stratégique des références : [docs/AUDIT_STRATEGIQUE_REFERENCES_APP_POIDS_FEMME.md](docs/AUDIT_STRATEGIQUE_REFERENCES_APP_POIDS_FEMME.md).
- Roadmap produit : [docs/ROADMAP_PRODUIT_APP_POIDS_FEMME.md](docs/ROADMAP_PRODUIT_APP_POIDS_FEMME.md).
- Document de rôles d'agents : `agents/agents_roles_application_muscle_glycemie.md`.

## Garde-fous techniques

- LocalStorage uniquement pour les données utilisateur. Pas de cookies de tracking, pas d'analytics tiers sans consentement explicite.
- Clé API OpenAI jamais exposée côté client. Toute analyse IA passe par `app/api/ai/`.
- Aucune dépendance lourde sans justification (l'app vise un Time To Interactive court sur mobile).
- Mobile-first. Tests à viewport 360-414px de large en priorité.
