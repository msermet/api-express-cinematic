# Installation et démarrage de l'API REST avec Express.js
## Premier pas

Pour utiliser cette API, Node.js est essentiel pour l'exécution de celle-ci.
Pour l'installer, rendez-vous sur le site officiel de Node.js : [https://nodejs.org/fr/](https://nodejs.org/fr/)

## Installation de Express.js

Après avoir installé Node.js, vous devez installer Express.js, un framework web minimaliste pour Node.js conçu pour créer des applications web et des API robustes et rapides, en utilisant la commande suivante :
```
npm install express --save
```

## Base de données

Une base de données MySQL nommée `db_cinematic` a été préparée avec les tables suivantes :
- `genres` : catégories de films
- `films` : informations sur les films
- `seances` : séances de projection des films
- `utilisateurs` et `roles` : gestion des utilisateurs (non utilisés dans ce TP)

Le script de création de la base de données (`schema.sql`) est fourni à la racine du projet.

## Démarrage de l'API REST

L'API REST se situe dans le dossier myapp.
db.js contient les informations de connexion à la base de données.
app.js contient le code de l'API REST.

Pour démarrer l'API REST, veuillez vous rendre depuis le terminal dans `Projets API Rest version Etudiant\myapp` puis exécutez la commande suivante :
```
node app.js
```

L'API REST sera accessible à l'adresse suivante : [http://localhost:3000](http://localhost:3000)

## Endpoints de l'API REST

### 1. Liste des films

**Endpoint :** `GET /api/films`

### 2. Détails d'un film

**Endpoint :** `GET /api/films/:id`

### 3. Liste des séances d'un film

**Endpoint :** `GET /api/films/:id/seances`

## Lancement des applications web de test

Deux applications web de test sont disponibles dans le dossier `Projets API Rest version Etudiant` :
- `api-rest-test`
- `api-rest-test-javascript`

Pour lancer ces applications web, veuillez vous rendre dans le dossier correspondant depuis le terminal puis exécutez la commande suivante :
```
php -S localhost:8000
```
