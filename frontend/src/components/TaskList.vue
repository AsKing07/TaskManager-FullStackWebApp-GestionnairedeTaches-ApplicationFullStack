<template>
  <div class="d-flex justify-content-center">
    <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Description</th>
          <th>Date limite</th>
          <th>Statut</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task._id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ formatDeadline(task.deadline) }}</td>
          <td>{{ task.status }}</td>
          <td>
            <button @click="deleteTask(task._id)" class="btn btn-danger">Supprimer</button>
            <router-link :to="'/update/' + task._id" class="btn btn-primary">Mêttre à jour</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['tasks'],
  methods: {
    formatDeadline(deadline) {
      return new Date(deadline).toLocaleDateString();
    },
    async deleteTask(taskId) {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        await axios.delete(`/api/tasks/deletetask/${taskId}`, { headers });
        this.$emit('task-deleted');
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Vos styles CSS pour la liste des tâches */

</style>
