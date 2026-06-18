# competition-front

Front-end de la compétition (ECV). **Vite + React + TypeScript**, hébergé sur Vercel.

🔗 **En ligne :** https://competition-front-eight.vercel.app

---

## Démarrer

```bash
git clone https://github.com/YaniECV/competition-front.git
cd competition-front
npm install
npm run dev        # → http://localhost:5173
```

## Configurer ton identité git (à faire une fois)

Pour que tes commits soient bien à TON nom :

```bash
git config user.name "Ton Prénom Nom"
git config user.email "ton-email-github@exemple.com"
```

## Workflow : on bosse tous sur `main`

Projet simple, petite équipe → **pas de branches, tout le monde push direct sur `main`.**

```bash
git pull                       # 1. récupère le boulot des autres AVANT de coder
# ... tu codes ...
git add .
git commit -m "ce que t'as fait"
git push                       # 2. déploie tout seul sur Vercel (~1 min)
```

⚠️ **Toujours `git pull` avant de push** (sinon Git refuse si quelqu'un a push entre-temps), et **dites qui bosse sur quelle page** pour éviter de vous écraser mutuellement.

**En cas de conflit :** Git te liste les fichiers concernés. Ouvre-les, garde le bon code (entre les `<<<<<<<`, `=======` et `>>>>>>>`), puis `git add .` + `git commit`. Dans le doute, demandez avant de forcer.

## ⚠️ Wording : « audit » / « diagnostic » INTERDITS

Metal AXS **n'est pas un organisme d'audit/diagnostic agréé** → interdiction de se positionner comme tel. Les mots **« audit », « diagnostic », « diagnostique », « évaluer / évaluation »** sont **bannis de tout texte visible** (boutons, liens, titres, descriptions, recherche).

→ À la place : **« Améliorer mon accessibilité »**. L'outil est un **formulaire d'accompagnement** (questions sur le festival → pistes d'action perso), pas un verdict officiel.

La route interne est `/accessible/ameliorer` (et non `/diagnostic`).

## Déploiement

Hébergé sur **Vercel**, branché au repo : **chaque push sur `main` met à jour le site en ligne** automatiquement (~1 min). Rien à faire à la main.

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de dev (localhost:5173, hot reload) |
| `npm run build` | Build de prod (dans `dist/`) |
| `npm run preview` | Prévisualise le build de prod en local |
| `npm run lint` | Vérifie le code avec ESLint |
