# 🚀 FlashCards – Procédure d’installation (local)

## 📋 Prérequis

- Git
- Node.js (v14+ recommandé)
- Docker Desktop

---

## 1. Cloner le dépôt

- Exécutez

```bash
git clone https://github.com/GHerreraE/FlashCards.git
cd FlashCards
```

---

## 2. Installer les dépendances & générer la clé

```bash
cd flashcards
npm install
cp .env.example .env
node ace generate:key
```

---

## 3. Démarrer MySQL avec Docker

```bash
docker compose up -d
```

- Ouvre `Docker Desktop` et lancez une console dans le conteneur `db_flashcards` et execute

```bash
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS db_flashcards;
```

- Fermez la console.

---

## 4. Lancer les migrations & démarrer le serveur

- Revenir sur la console dans le dossier `flashcards` et executez

```bash
node ace migration:fresh
npm run dev
```

---

## 5. Accéder à l’application

- Ouvrir votre navigateur à l’adresse suivante : [http://localhost:3333](http://localhost:3333)
- Gérez votre base de données avec une interface DBeaver👉 [Voir la procédure complète](./connexion-db-dev.md)

---

✅ **Votre instance FlashCards est prête !**
