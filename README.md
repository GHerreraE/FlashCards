# FlashCards-GHE

Projet de Gonzalo Herrera pour P_Bulles 2

## Installation

### Logiciels requis

- NodeJs: v20.11.0
- npm: v10.2.4
- Docker Desktop: v4.10.0
- Docker Engine: v20.10.17

### Procédure d'installation

- Cloner le repo [Flashcards](https://github.com/GHerreraE/FlashCards)

- Ouvrir un cmd à la racine du projet

  - Dans le dossier `flashcards` (`cd flashcards`)
  - Executer `npm install`
  - Renommer le fichier `.env.example` en `.env`
  - Puis `node ace generate:key`

- Dans le dossier `Docker_MySQL` (`cd ../Docker-Container`)

  - Executer `docker compose up -d`
  - Puis `docker exec -it db_flashcards /bin/bash`
  - Puis `mysql -u root -proot`
  - Puis `create database db_flashcards;`

- Dans le dossier `flashcards` (`cd ../flashcards`)

  - Ensuite `node ace migration:fresh`
  - Ensuite `node ace db:seed`
  - Puis `npm run dev`

- Aller sur [localhost:3333](http://localhost:3333)
