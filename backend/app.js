// Importation des modules
const path = require('path');
const history = require('connect-history-api-fallback');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRouter = require('./routes/user');
const taskRouter = require('./routes/tasks');
require('dotenv').config();

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à la base de données :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB !');
});

// Création de l'application Express
const app = express();

// Configuration des middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '/dist'), { maxAge: '1y', etag: false }));
app.use(history());

// Configuration des en-têtes de réponse pour gérer les requêtes CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  
  // Répondre aux pré-requêtes OPTIONS avec un statut 200 OK 
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Route d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue dans votre gestionnaire de tâches !');
});

// Utilisation des routes
app.use('/api/tasks', taskRouter);
app.use('/api/auth', authRouter);

// Route par défaut pour les autres requêtes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// Exportation de l'application
module.exports = app;