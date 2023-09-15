const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');
const authenticate = require('../middleware/auth');

// Route pour récupérer la liste des tâches de l'utilisateur
router.get('/', authenticate, taskController.getTask);

//Route pour récupérer les informations d'une seule tâche
router.get('/:id',authenticate ,  taskController.getOneTask)

// Route pour créer une nouvelle tâche
router.post('/newtask', authenticate, taskController.createTask);

// Route pour mettre à jour une tâche par son ID
router.put('/updatetask/:taskId', authenticate, taskController.updateTask);

// Route pour supprimer une tâche par son ID
router.delete('/deletetask/:taskId', authenticate, taskController.deleteTask);

module.exports = router;
