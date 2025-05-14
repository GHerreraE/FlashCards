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

- Ouvrez un shell Bash dans le dossier flashcards puis exécutez : `./start.sh`
- Ce script :

  - Installe les dépendances (npm install)
  - Génére la clé d’application (node ace generate:key)
  - Monte et initialise la base MySQL via Docker

## 3. Accéder à l’application

- Ouvrir votre navigateur à l’adresse suivante : [http://localhost:3333](http://localhost:3333/home)

---

✅ **Votre instance FlashCards est prête !**
