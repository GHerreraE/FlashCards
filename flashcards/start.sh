#!/bin/bash

PROJECT_KEYWORD="flashcards"

echo "🧹 Nettoyage : arrêt et suppression des conteneurs liés à '$PROJECT_KEYWORD'..."

# Trouver et supprimer tous les conteneurs contenant "flashcards" dans leur nom
docker ps -a --format '{{.Names}}' | grep "$PROJECT_KEYWORD" | while read c; do
  echo "🛑 Suppression du conteneur : $c"
  docker rm -f "$c"
done

# 1. Générer la clé APP_KEY si elle est absente ou vide
if ! grep -q "APP_KEY=" .env || [[ $(grep APP_KEY .env | cut -d= -f2) == "" ]]; then
  echo "🔐 Génération de la clé APP_KEY..."
  docker-compose run --rm adonis node ace generate:key
fi

# 2. Démarrage des conteneurs
echo "🚀 Démarrage des conteneurs..."
docker-compose up --build -d

# 3. Attente que MySQL soit prêt
echo "⏳ Attente que MySQL soit prêt..."
until docker exec db_flashcards mysqladmin ping -h "db" --silent; do
  printf "."
  sleep 2
done
echo "✅ MySQL est prêt."

# 4. Création de la base de données (si absente)
echo "🛠️ Création de la base de données (si absente)..."
docker exec db_flashcards mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS db_flashcards;"
echo "✅ Base de données prête."

# 5. Attribution des droits à l'utilisateur
echo "🔐 Attribution des droits à db_user sur db_flashcards..."
docker exec db_flashcards mysql -u root -proot -e "GRANT ALL PRIVILEGES ON db_flashcards.* TO 'db_user'@'%'; FLUSH PRIVILEGES;"
echo "✅ Droits attribués."

# 6. Lancer les migrations
echo "📦 Lancement des migrations..."
docker-compose exec adonis node ace migration:run

echo "✅ Application disponible sur : http://localhost:3333"
