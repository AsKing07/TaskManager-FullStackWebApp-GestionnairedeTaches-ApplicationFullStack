<template>
    <div class="container">
      <h2>Mot de passe oublié</h2>
      <form @submit.prevent="requestPasswordReset">
        <div class="form-group">
          <label for="email">Adresse e-mail :</label>
          <input type="email" id="email" v-model="email" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Réinitialiser le mot de passe</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "forgotPassword",
    data() {
      return {
        email: '',
        message: '',
      };
    },
    methods: {
      async requestPasswordReset() {
        try {
          const response = await axios.post('/api/auth/forgot-password', { email: this.email });
          this.message = response.data.message;
        } catch (error) {
          console.error(error);
          this.message = "Erreur lors de la réinitialisation du mot de passe. Veuillez vous assurer de rentrer l'email utilisé lors de l'inscription";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .btn-primary {
    width: 100%;
  }
  </style>
  