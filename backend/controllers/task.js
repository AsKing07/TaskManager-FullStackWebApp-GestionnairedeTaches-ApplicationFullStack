const Task = require('../models/task'); // Importez le modèle de données des tâches ici

// Récupérer la liste des tâches pour l'utilisateur authentifié
exports.getTask = (req, res, next) => {
  Task.find({ user: req.auth.userId })
    .then((tasks) => {
      res.status(200).json(tasks); // Utilisez la variable 'tasks' ici pour envoyer la liste des tâches
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

// Charger les informations d'une seule tâche
exports.getOneTask = (request, response) => {
  const taskId = request.params.id; // Utilisez la déstructuration pour extraire taskId de request.params
  console.log(taskId);
  console.log(request.auth.userId);
  Task.findById(taskId)
    .then((task) => {
      if (!task || task.user.toString() !== request.auth.userId) {
        console.log("Tâche non trouvée");
        return response.status(404).json({ message: 'Tâche non trouvée' });
      }
      response.status(200).json(task);
    })
    .catch((error) => {
      response.status(500).json({ error: error.message });
      console.log(error.message);
    });
};

// Créer une nouvelle tâche
exports.createTask = (req, res, next) => {
  const taskObject = req.body.data;
  if (taskObject.deadline) {
    taskObject.deadline = new Date(taskObject.deadline);
  }
  const task = new Task({ ...taskObject, user: req.auth.userId, status: "Envisagé" });
  task.save()
    .then(() => { res.status(201).json({ message: 'Tâche enregistrée !' }); })
    .catch(error => { res.status(400).json({ error }); });
}

// Mettre à jour une tâche par son ID
exports.updateTask = async (req, res) => {
  const { taskId } = req.params; // Utilisez la déstructuration pour extraire taskId de request.params
  const taskUpdates = req.body;
  console.log(taskId);
  console.log(taskUpdates);
  try {
    const task = await Task.findOne({ _id: taskId, user: req.auth.userId });
    if (!task) {
      console.log("Tâche non trouvée");
      return res.status(404).json({ error: 'Tâche non trouvée.' });
    }
    if (task && task.user && task.user.toString() !== req.auth.userId) {
      console.log('Utilisateur non autorisé');
      return res.status(403).json({ error: 'Accès non autorisé.' });
    }
    // Mettez à jour les champs de la tâche
    for (const field in taskUpdates) {
      task[field] = taskUpdates[field];
    }
    await task.save();
    res.json(task);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};

// Supprimer une tâche par son ID
exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).json({ error: 'Tâche non trouvée.' });
    }
    console.log(task);
    console.log(req.auth.userId);
    if (task.user.toString() !== req.auth.userId) {
      return res.status(403).json({ error: 'Accès non autorisé.' });
    }
    await Task.deleteOne({ _id: taskId }); // Supprimer la tâche en utilisant Task.deleteOne
    res.json({ message: 'Tâche supprimée avec succès.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};