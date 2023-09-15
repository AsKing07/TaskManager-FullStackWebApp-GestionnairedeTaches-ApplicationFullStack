// Importation du module mongoose
const mongoose = require('mongoose');

// Définition du schéma de la tâche
const taskSchema = new mongoose.Schema({
  title: String, // Titre de la tâche
  description: String, // Description de la tâche
  deadline: Date, // Date limite de la tâche
  status: String, // Statut de la tâche
  user: { // Utilisateur associé à la tâche
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Exportation du modèle Task basé sur le schéma taskSchema
module.exports = mongoose.model('Task', taskSchema);