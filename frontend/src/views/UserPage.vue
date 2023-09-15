<template>
  <div class="container">
    <h2>Bienvenue sur votre gestionnaire de tâches</h2>

    <!-- Bouton pour afficher le formulaire d'ajout de tâche -->
    <button @click="toggleTaskForm" class="btn btn-success">Ajouter une nouvelle tâche</button>

    <!-- Formulaire d'ajout de tâche (affiché lorsque showTaskForm est vrai) -->
    <task-form v-if="showTaskForm" @task-added="fetchTasks" />

    <!-- Bouton pour afficher la liste des tâches -->
    <button @click="toggleTaskList" class="btn btn-primary">Voir la liste de vos tâches</button>

    <!-- Liste des tâches (affichée lorsque showTaskList est vrai) -->
    <div v-if="showTaskList">
      <task-list :tasks="tasks" @task-deleted="fetchTasks" />
      <div v-if="loadingTasks" class="loading-animation">Chargement en cours...</div>
    </div>

    <!-- Bouton de déconnexion -->
    <button @click="logout" class="btn btn-danger">Se déconnecter</button>
  </div>
</template>

<script>
import axios from 'axios';
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';

export default 
{
  name: "UserPage",
  components: 
  {
    TaskForm,
    TaskList,
  },

  data() 
  {
    return {
      tasks: [],
      showTaskForm: false, // Indicateur pour afficher/masquer le formulaire d'ajout de tâche
      showTaskList: true, // Indicateur pour afficher/masquer la liste des tâches par défaut
      loadingTasks: false, // Indicateur pour activer/désactiver l'animation de chargement
    };
  },

  created() 
  {
    // Chargez les tâches de l'utilisateur lors de l'affichage de la page d'accueil
    this.fetchTasks();
  },

  methods: 
  {
    // Fonction pour charger les tâches de l'utilisateur
    async fetchTasks() 
    {
      try 
      {
        this.loadingTasks = true; // Activez l'animation de chargement
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get('/api/tasks/', { headers });
        this.tasks = response.data;
      } 

      catch (error) 
      {
        console.error(error);
      } 
      
      finally 
      {
        this.loadingTasks = false; // Désactivez l'animation de chargement une fois les tâches chargées
      }
    },

    // Fonction pour se déconnecter
    async logout() 
    {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },

    // Fonction pour basculer l'affichage du formulaire d'ajout de tâche
    toggleTaskForm() 
    {
      this.showTaskForm = !this.showTaskForm;
      // Si la liste des tâches est visible, la masquer
      if (this.showTaskList) 
      {
        this.showTaskList = false;
      }
    },

    // Fonction pour basculer l'affichage de la liste des tâches
    toggleTaskList() 
    {
      this.showTaskList = !this.showTaskList;
      // Si le formulaire d'ajout de tâche est visible, le masquer
      if (this.showTaskForm) 
      {
        this.showTaskForm = false;
      }
    },
  },
};
</script>

<style scoped>
.container 
{
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h2 
{
  margin-top: 20px;
}

.btn 
{
  margin-top: 20px;
  width: 100%;
}
</style>
