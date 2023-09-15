<template>
    <div>
      <h3>Ajouter une nouvelle tâche</h3>
      <form @submit.prevent="addTask">
        <div class="form-group">
          <label for="title">Titre :</label>
          <input type="text" id="title" v-model="title" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="description">Description :</label>
          <textarea id="description" v-model="description" class="form-control" required></textarea>
        </div>
        <div class="form-group">
          <label for="deadline">Date limite :</label>
          <input type="date" id="deadline" v-model="deadline" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="status">Statut :</label>
            <select id="status" v-model="status" class="form-control" required>
              <option selected value="Envisagé">Envisagé</option>
              <option value="En cours">En cours</option>
              <option value="Terminée">Terminée</option>
              <option value="En attente">En attente</option>
            </select>
        </div>
        <button type="submit" class="btn btn-success">Ajouter</button>
      </form>
      <p class="text-success"> {{ message }}   </p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        description: '',
        deadline: '',
        status: 'Envisagé', // Valeur par défaut du statut,
        message: ""
      };
    },
    methods: {
        async addTask() 
        {
            try {
                const token = localStorage.getItem('token'); // Assurez-vous de stocker le token correctement
                const headers = { Authorization: `Bearer ${token}` };
                const data = 
                {
                title: this.title,
                description: this.description,
                deadline: this.deadline,
                status: this.status, // Ajout du statut
                };
                //console.log(data)
                await axios.post('/api/tasks/newtask',  {data: data} ,  { headers: {...headers,'Content-Type': 'application/json', },});
                this.$emit('task-added'); // Émet un événement pour informer le parent de l'ajout de la tâche
                this.title = '';
                this.description = '';
                this.deadline = '';
                
                this.message = "Tâche ajoutée avec succès"

                setTimeout(()=>
                {
                  this.message = ""
                }, 5000)
            } 
            catch (error) 
            {
                console.log(error);
            }
        },
    },
  };
  </script>
  
  <style scoped>
  /* Utilisez ici vos styles CSS pour personnaliser l'apparence du formulaire de tâche */
  </style>
  