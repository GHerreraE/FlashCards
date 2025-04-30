# Image de docker lègere et simple
FROM node:18-alpine

# On définit le repertoire de travail dans le conteneur
# On va copier le code de l'application dans le conteneur 
WORKDIR /app

# on copie le package.json et le package-lock.json dans le conteneur et on installe les dependances
COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /app

EXPOSE 3333

CMD ["npm", "run", "dev"]
