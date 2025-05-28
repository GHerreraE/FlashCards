# FlashCards-GHE

FlashCards est une application interactive d’apprentissage basée sur la technique des cartes mémoire (ou flashcards). L’objectif est de permettre à un utilisateur de créer, modifier et réviser des jeux de cartes contenant des questions-réponses, pour faciliter la mémorisation active.

Cette application a été développée dans le cadre du module P_Bulles 2, qui vise à combiner plusieurs compétences en développement web et mobile, déploiement Dockerisé, gestion de base de données, et architecture d’applications modernes.

## Installation

### Logiciels requis

- NodeJs: v20.11.0
- npm: v10.2.4
- Docker Desktop: v4.10.0
- Docker Engine: v20.10.17

# 🚀 Procédure d'installation – FlashCards

Ce projet peut être mis en place de **deux manières différentes** :

---

## ✅ 1. Installation en local (Node.js + Docker)

La base de données MySQL sera lancée via Docker grâce à `docker-compose`.

👉 [Voir la procédure complète](./readme/installation-local.md)

---

## 🐳 2. Installation avec Docker (environnement isolé)

Cette méthode est recommandée pour une configuration rapide avec **Docker** et **Docker Compose**.

👉 [Voir la procédure complète](./readme/installation-dockerisation.md)

---

## 🏁 3. Installation en environnement de production (Docker optimisé)

Cette méthode est destinée à un **déploiement final**, avec une image Docker allégée, des dépendances préinstallées, et un démarrage automatique de l’application.

👉 [Voir la procédure complète](./readme/mise-en-production.md)

- Lien = https://flashcards-production-993b.up.railway.app/home
---

## 🏁 4. Installation en environnement de staging

Cette méthode est destinée à un **déploiement final**, avec une image Docker allégée, des dépendances préinstallées, et un démarrage automatique de l’application.

👉 [Voir la procédure complète](./readme/mise-en-staging.md)

---
