// Importation du module http
const http = require('http');
// Importation de l'application Express depuis le fichier app.js
const app = require('./app');

// Fonction pour normaliser le port
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // Retourne la valeur telle quelle si ce n'est pas un nombre
    return val;
  }
  if (port >= 0) {
    // Retourne le port s'il est valide
    return port;
  }
  // Retourne faux si le port est invalide
  return false;
};

// Définition du port d'écoute en utilisant la valeur de l'environnement ou 3000 par défaut
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Fonction de gestion des erreurs liées au serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    // Propage l'erreur si elle n'est pas liée à la fonction listen
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' nécessite des privilèges élevés.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + "est déjà en cours d'utilisation.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Création du serveur HTTP en utilisant l'application Express
const server = http.createServer(app);

// Gestionnaire d'erreur en cas de problème lors du démarrage du serveur
server.on('error', errorHandler);

// Écouteur d'événement pour le serveur en cours d'écoute
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Le serveur écoute sur ' + bind);
});

// Écoute du serveur sur le port spécifié
server.listen(port);
