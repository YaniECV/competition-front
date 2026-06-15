# competition-front

Front-end de la compétition (ECV). Stack **Vite + React + TypeScript**.

🔗 **Site en ligne (prod) :** https://competition-front-eight.vercel.app

> Le site se déploie tout seul : chaque push sur `main` met à jour la prod, chaque Pull Request génère une preview. Voir [Déploiement](#-déploiement).

---

## Stack

- [Vite](https://vite.dev) (build + serveur de dev)
- React 19 + TypeScript
- ESLint
- Hébergé sur [Vercel](https://vercel.com)

---

## Démarrer (première fois)

```bash
# 1. Cloner le repo
git clone https://github.com/YaniECV/competition-front.git
cd competition-front

# 2. Installer les dépendances
npm install

# 3. Lancer en local
npm run dev   # → http://localhost:5173
```

---

## ⚙️ Configurer ton identité git (à faire une fois)

**Important** pour que tes commits soient bien rattachés à TON compte GitHub (et pas à un email random). Dans le dossier du projet :

```bash
git config user.name "Ton Prénom Nom"
git config user.email "ton-email-github@exemple.com"
```

> Utilise l'email associé à ton compte GitHub (GitHub → Settings → Emails). Sinon GitHub ne reliera pas tes commits à ton profil.

---

## 🔁 Le workflow (à chaque fois qu'on bosse)

> **Règle d'or : on ne bosse JAMAIS directement sur `main`.**
> On bosse sur une branche, et on l'intègre via une Pull Request (PR).

### 1. Récupérer les dernières modifs des autres

```bash
git checkout main
git pull
```

### 2. Créer une branche pour ta feature

```bash
git checkout -b feat/nom-de-ta-feature
```

### 3. Bosser, puis sauvegarder (commit)

```bash
git add .
git commit -m "feat: ajoute la page d'accueil"
```

> Commit souvent, au fil de l'eau : chaque commit sauvegarde ton travail.

### 4. Envoyer ta branche sur GitHub (push)

```bash
git push -u origin feat/nom-de-ta-feature
# les fois suivantes sur la même branche : juste "git push"
```

### 5. Ouvrir une Pull Request

1. Va sur le repo GitHub → un bandeau **« Compare & pull request »** apparaît → clique dessus
2. Mets un titre clair, décris ce que tu as fait → **Create pull request**
3. 🔗 **Vercel poste automatiquement une URL de preview** dans la PR → tu peux montrer ton travail aux autres avant de merger
4. Idéalement, un coéquipier relit, puis → **Merge pull request**
5. ✅ Le site de prod se met à jour tout seul (~1 min)

### 6. Repartir propre pour la suite

```bash
git checkout main
git pull
```

---

## 🆘 Cas courants

**`main` a bougé pendant que je bossais sur ma branche ?** Mets ta branche à jour :

```bash
git checkout main
git pull
git checkout ta-branche
git merge main
```

**Un conflit au merge ?** Git te liste les fichiers en conflit. Ouvre-les, garde le bon code (entre les `<<<<<<<`, `=======` et `>>>>>>>`), puis :

```bash
git add .
git commit
```

**Dans le doute (mauvaise branche, peur de tout casser) :** demande avant de forcer quoi que ce soit, on regarde ensemble. Ne jamais faire `git push --force` sur `main`.

---

## 📜 Conventions

- **Commits** : `type: description`
  `feat:` nouvelle feature · `fix:` bug · `style:` CSS/UI · `docs:` doc · `chore:` config/divers
- **Branches** : `type/description-courte` → ex. `feat/page-contact`, `fix/bouton-mobile`

---

## 📦 Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de dev (localhost:5173, hot reload) |
| `npm run build` | Build de prod (dans `dist/`) |
| `npm run preview` | Prévisualise le build de prod en local |
| `npm run lint` | Vérifie le code avec ESLint |

---

## 🚀 Déploiement

Hébergé sur **Vercel**, connecté à ce repo. Rien à faire à la main :

| Action | Résultat |
|---|---|
| Push / merge sur `main` | Déploie la **prod** → https://competition-front-eight.vercel.app |
| Ouverture d'une **PR** | Déploie une **preview** sur une URL dédiée (commentée dans la PR) |
