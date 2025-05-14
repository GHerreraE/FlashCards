# 🚀 FlashCards – Procédure d’installation (local)

## 📋 Prérequis

- Git
- Node.js (v14+ recommandé)
- Docker Desktop

---

## 1. Cloner le dépôt

- Exécuter `git clone https://github.com/GHerreraE/FlashCards.git`
- Se placer dans le dossier : `cd FlashCards`

---

## 2. Installer les dépendances & générer la clé

- Se placer dans le dossier de l’application : `cd flashcards`
- Installer les dépendances : `npm install`
- Copier et renommer le fichier d’exemple : `cp .env.example .env`
- Générer la clé d’application : `node ace generate:key`

---

## 3. Démarrer MySQL avec Docker

- Lancer les conteneurs en arrière-plan : `docker compose up -d`
- Ouvre `Docker Desktop` et lancez une console dans le conteneur `db_flashcards` et executez `mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS db_flashcards;"`
- Fermez la console.

---

## 4. Lancer les migrations & démarrer le serveur

- Revenir sur la console dans le dossier `flashcards`
- Exécuter la commande de migration : `node ace migration:fresh`
- Démarrer le serveur en mode développement : `npm run dev`

---

## 5. Accéder à l’application

- Ouvrir votre navigateur à l’adresse suivante : [http://localhost:3333](http://localhost:3333)
- Gérez votre base de données avec une interface DBeaver👉 [Voir la procédure complète](./readme/connexion-db-dev.md)

---

✅ **Votre instance FlashCards est prête !**
