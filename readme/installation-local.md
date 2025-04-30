# 🚀 FlashCards – Procédure d’installation (local)

## 📋 Prérequis

- Git
- Node.js (v14+ recommandé)
- Docker & Docker Compose

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

- Se rendre dans le dossier Docker : `cd ../Docker-Container`
- Lancer les conteneurs en arrière-plan : `docker compose up -d`
- Ouvrir un shell dans le conteneur MySQL : `docker exec -it db_flashcards /bin/bash`
- Créer la base de données :
  - `mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS db_flashcards;"`
- Quitter MySQL puis le conteneur : taper `exit` deux fois

---

## 4. Lancer les migrations & démarrer le serveur

- Revenir dans le dossier de l’application : `cd ../flashcards`
- Exécuter la commande de migration : `node ace migration:fresh`
- Démarrer le serveur en mode développement : `npm run dev`

---

## 5. Accéder à l’application

- Ouvrir votre navigateur à l’adresse suivante : [http://localhost:3333](http://localhost:3333)

---

✅ **Votre instance FlashCards est prête !**
