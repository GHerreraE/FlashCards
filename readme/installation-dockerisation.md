# 🚀 FlashCards – Procédure d’installation (dockerisé)

## 📋 Prérequis

- Git
- Node.js (v14+ recommandé)
- Docker desktop

---

## 1. Cloner le dépôt

- Exécuter `git clone https://github.com/GHerreraE/FlashCards.git`

---

## 2. Lancer le script

- Ouvrez une console bash dans le dossier `Flashcards` et executez `cd flashcards`
- Ensuite exécutez : `./start.sh`
- Ce script va faire :

  - Installer les dépendances (npm install)
  - Générer la clé d’application (node ace generate:key)
  - Monter et initialise la base MySQL via Docker

## 3. Accéder à l’application

- Ouvrir votre navigateur à l’adresse suivante : [http://localhost:3333](http://localhost:3333/home)
- Gérez votre base de données avec une interface DBeaver👉 [Voir la procédure complète](./readme/connexion-db-dev.md)

---

✅ **Votre instance FlashCards est prête !**
