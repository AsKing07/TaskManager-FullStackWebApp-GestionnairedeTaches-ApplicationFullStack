<template>
  <div>
    <h3>Modifier la tâche</h3>
    <form @submit.prevent="updateTask">
      <div class="form-group">
        <label for="title">Titre :</label>
        <input type="text" id="title" v-model="taskData.title" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="description">Description :</label>
        <textarea id="description" v-model="taskData.description" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="deadline">Date limite :</label>
        <input type="date" id="deadline" v-model="taskData.deadline" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="status">Statut :</label>
        <select id="status" v-model="taskData.status" class="form-control" required>
          <option  selected :value="taskData.status">{{ taskData.status }}</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
          <option value="Reportée">Reportée</option>
        </select>
      </div>
      <div v-if="loading">
        <div class="loading-animation">Chargement en cours...</div>
      </div>
      <div v-else>
        <button type="submit" class="btn btn-primary">Mettre à jour</button>
      </div>
      <div v-if="successMessage" class="text-success">{{ successMessage }}</div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default 
{
  data() 
  {
    return {
      taskData: 
      {
        title: '',
        description: '',
        deadline: '',
        status: 'En cours',
      },
      taskId: this.$route.params.taskId,
      loading: false, // Variable pour gérer l'affichage de l'animation de chargement
      successMessage: '', // Message de succès
    };
  },

  methods: 
  {
    async updateTask() 
    {
      try {
        this.loading = true; // Activez l'animation de chargement pendant la soumission
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        await axios.put(`/api/tasks/updatetask/${this.taskId}`, this.taskData, { headers });
        // Émettez un message de succès
        this.successMessage = 'Tâche mise à jour avec succès.';
      } 
      
      catch (error) 
      {
        console.log(error);
      } 

      finally 
      {
        this.loading = false; // Désactivez l'animation de chargement après la soumission
      }
    },

    async fetchTaskData() 
    {
      try 
      {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(`/api/tasks/${this.taskId}`, { headers });
        // Formatez la date au format "yyyy-MM-dd"
        const taskData = response.data;
        taskData.deadline = new Date(taskData.deadline).toISOString().split('T')[0];
        this.taskData = response.data;
      } 

      catch (error) 
      {
        console.log(error.message);
      }
    },
  },

  watch: 
  {
    taskId: 'fetchTaskData',
  },
  
  created() 
  {
    this.fetchTaskData();
  },
};
</script>

<style scoped>
/* Ajoutez des styles CSS pour le message de succès */
.text-success
{
  margin-top: 10px;
  color: green;
}
</style>
