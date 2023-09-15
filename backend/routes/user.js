// Importation des modules
const express = require('express');
const router = express.Router();

// Importation du contrôleur utilisateur
const userCtrl = require('../controllers/user');

// Route pour l'enregistrement d'un utilisateur
router.post('/register', userCtrl.register);

// Route pour la connexion d'un utilisateur
router.post('/login', userCtrl.login);

// Route pour la récupération du mot de passe oublié
router.post('/forgot-password', userCtrl.forgotPassword);

// Route pour la réinitialisation du mot de passe
router.post('/reset-password', userCtrl.resetPassword);

// Exportation du routeur
module.exports = router;