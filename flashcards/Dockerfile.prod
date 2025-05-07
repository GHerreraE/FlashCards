# Dockerfile.prod

# Étape 1 : Image Node.js légère
FROM node:18-alpine

# Étape 2 : Créer le dossier de travail
WORKDIR /app

# Étape 3 : Copier les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste de l'application
COPY . .

# Étape 6 : Compiler l’application AdonisJS (build TypeScript)
RUN npm run build

# Étape 7 : Exposer le port utilisé par l'application
EXPOSE 3333

# Étape 8 : Lancer l’application avec le script "start"
CMD ["npm", "start"]
