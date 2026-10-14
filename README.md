# Site de guides de voyage PDF

Site statique (HTML/CSS/JS), sans base de données ni serveur payant.

## Ajouter un nouveau guide
1. Placez le PDF dans le dossier `guides/` (ex. `japon.pdf`).
2. Placez sa couverture dans `images/` (ex. `couverture-japon.jpg`, format portrait 3:4).
3. Ouvrez `guides.json` et copiez-collez un bloc entre accolades `{ ... }` dans la liste, séparé du précédent par une virgule :

```json
{
  "id": "japon",
  "titre": "Japon — 15 expériences",
  "destination": "Japon",
  "description": "Votre texte ici.",
  "couverture": "couverture-japon.jpg",
  "pdf": "japon.pdf",
  "pages": "40",
  "prix": "",
  "disponible": true
}
```
- `id` : un mot sans accent ni espace, unique.
- `pages` : laissez `""` si vous ne le connaissez pas.
- `prix` : laissez `""` (version gratuite). Le prix n'est qu'un affichage, il ne déclenche aucun paiement.
- `disponible` : `false` affiche « Bientôt disponible » ; `true` active le téléchargement. Les noms de fichiers doivent être identiques (majuscules comprises).

## Guide Australie
Le guide est déclaré mais **aucun PDF n'est fourni**. Ajoutez votre fichier sous le nom `guides/australie.pdf`, puis passez `"disponible"` à `true`.

## Remplacer les images
- Couverture : déposez votre image dans `images/` puis changez `"couverture"` dans `guides.json`. Sans image, un dégradé s'affiche.
- Photo d'accueil : ajoutez `images/hero.jpg` (paysage, 1600 px de large minimum, moins de 500 Ko de préférence).

## Nom du site, YouTube, e-mail
En haut de `guides.json`, section `"site"`. Pensez aussi à remplir `legal.html` et le texte de `about.html`.

## Boutique payante plus tard
Ne mettez pas de lien direct vers un PDF payant : il serait accessible à tous. Option typique : un prestataire (Stripe Payment Links, Gumroad, Lemon Squeezy, Payhip) qui encaisse, puis envoie le fichier par e-mail ou lien de téléchargement temporaire. Le bouton de la fiche pointerait alors vers la page de paiement. Les PDF payants ne doivent plus être dans `guides/`.

## Tutoriel iPhone (GitHub Pages, gratuit)
1. Touchez le fichier ZIP dans l'app **Fichiers** : il se décompresse en dossier.
2. Dans **Safari**, allez sur github.com, touchez **Sign up** et créez un compte.
3. Touchez **+** puis **New repository**. Nom : `mon-site-voyage`. Cochez **Public**. Touchez **Create repository**.
4. Touchez **uploading an existing file**. Touchez **choose your files**, puis **Choisir des fichiers**, et sélectionnez ensemble : `index.html`, `guides.html`, `guide.html`, `about.html`, `contact.html`, `legal.html`, `style.css`, `script.js`, `guides.json`, `README.md`. Touchez **Commit changes**.
5. Créez les dossiers : touchez **Add file** > **Create new file**. Dans le nom, tapez `images/LISEZ-MOI.txt`, écrivez une ligne de texte, touchez **Commit changes**. Recommencez avec `guides/LISEZ-MOI.txt`.
6. Ouvrez le dossier `images` du dépôt > **Add file** > **Upload files** > choisissez `couverture-australie.svg` > **Commit changes**.
7. Touchez **Settings** > **Pages**. Sous **Branch**, choisissez **main** puis **Save**.
8. Attendez 1 à 2 minutes, rechargez : l'adresse de votre site s'affiche en haut de la page Pages.

## Mettre à jour (nouveau PDF)
1. Dans le dépôt, ouvrez le dossier `guides` > **Add file** > **Upload files** > choisissez le PDF > **Commit changes**.
2. Faites pareil dans `images` pour la couverture.
3. Ouvrez `guides.json` > icône crayon > ajoutez le bloc du guide > **Commit changes**.
4. Attendez 1 à 2 minutes : le site est à jour.
