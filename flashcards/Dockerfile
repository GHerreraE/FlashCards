# Image de docker lègere et simple
FROM node:20.10-alpine

# On définit le repertoire de travail dans le conteneur
# On va copier le code de l'application dans le conteneur 
WORKDIR /app

# on copie le package.json et le package-lock.json dans le conteneur et on installe les dependances
COPY package*.json ./

# On installe les dépendances de l'application
RUN npm install

# On copie le reste du code de l'application dans le conteneur
# On utilise le .dockerignore pour ne pas copier les fichiers inutiles
# . veut dire le repertoire courant et le deuxieme . veut dire le repertoire parent
COPY . .

RUN npm run build

# On expose le port 3333 pour l'application
EXPOSE 3333

# On lance l'application avec la commande npm run dev
CMD ["node", "build/bin/server.js"]