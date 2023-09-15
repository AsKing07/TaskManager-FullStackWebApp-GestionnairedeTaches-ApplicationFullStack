# Gestionnaire de Tâches FullStack



Ce projet est un gestionnaire de tâches FullStack développé par [Charbel SONON](https://github.com/AsKing07). Il est conçu pour vous aider à organiser et suivre vos tâches de manière efficace et a été réalisé dans un cadre d'apprentissage

## Démo en ligne

Vous pouvez essayer une démo du projet en suivant ce lien : [Démo du Gestionnaire de Tâches](https://taskmanager-asking.vercel.app/).

## Technologies Utilisées

Ce projet a été développé en utilisant les technologies suivantes :

- Vue.js
- Node.js
- MongoDB
- Express.js
- Vercel (pour le déploiement de la démo)

## Configuration

Dans le fichier `.env`, vous devez configurer les variables d'environnement suivantes :

- `MONGODB_URI` : Lien de connexion à la base de données MongoDB.
- `JWT_SECRET` : Code secret pour le décodage des tokens JWT.
- `GMAIL_SECRET` : Code de l'application Gmail pour l'envoi de mails.

## Structure du Projet

Le dossier principal est nommé `GestionnaireDeTaches-FullStack-App` et est composé de deux sous-dossiers :

### Backend

Le contenu du dossier `backend` comprend :

-`.env` : fichier des variables d'environnement.
- `controllers` : Contrôleurs de l'application.
- `dist` : Fichiers de distribution générés lors de la construction.
- `middleware` : Middlewares utilisés dans l'application, en particulier le middlewares d'authentification.
- `models` : Modèles de données MongoDB.
- `routes` : Définition des routes de l'API.
- `server.js` : Script de démarrage du serveur.
- `app.js` : Fichier principal de l'application backend.

### Frontend

Le contenu du dossier `frontend` comprend :

- `dist` : Fichiers de distribution générés lors de la construction.
- `node_modules` : Dépendances Node.js.
- `public` : Fichiers statiques publics.
- `src` : Code source de l'application Vue.js.
- `README.md` : Ce fichier README.
- `vue.config.js` : Configuration spécifique à Vue.js.

## Installation

Pour exécuter ce projet localement, suivez ces étapes :

1. Clonez ce dépôt : `git clone https://github.com/AsKing07/TaskManager-FullStackWebApp-GestionnairedeTaches-ApplicationFullStack.git`.
2. Accédez au dossier backend : `cd backend`.
3. Installez les dépendances : `npm install`.
4. Accédez au dossier frontend : `cd ../frontend`.
5. Installez les dépendances : `npm install`.

## Utilisation

- Backend : Exécutez `npm start` dans le dossier backend pour démarrer le serveur (Port 3000 par défaut).
- Frontend : Exécutez `npm run serve` dans le dossier frontend pour démarrer l'application Vue.js en mode développement (Port 8080 par défaut).
- Assurez-vous que le serveur backend est en cours d'exécution avant de lancer l'application frontend.
- L'application sera accessible à l'adresse `http://localhost:8080/`.



## Contribution

N'hésitez pas à contribuer ou à signaler des problèmes et à faire des suggestions d'amélioration. Bonne utilisation !

## Auteur
[Charbel SONON](https://github.com/AsKing07)

## Licence

Ce projet est sous licence MIT. Voir le fichier [MIT](LICENSE) pour plus de détails.
