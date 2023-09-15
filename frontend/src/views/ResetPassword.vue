<template>
    <div class="container">
      <h2>Réinitialisation du mot de passe</h2>
      <form @submit.prevent="resetPassword">
        <div class="form-group">
          <label for="newPassword">Nouveau mot de passe :</label>
          <input type="password" id="newPassword" v-model="newPassword" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirmer le mot de passe :</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Réinitialiser le mot de passe</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import router from '@/router';
import axios from 'axios';
  
  export default 
  {
    name: "resetPassword",
    data() 
    {
      return {
        newPassword: '',
        confirmPassword: '',
        message: '',
      };
    },

    methods: 
    {
      async resetPassword() 
      {
        try 
        {
          // Vérifiez si les deux mots de passe correspondent
          if (this.newPassword !== this.confirmPassword) {
            this.message = 'Les mots de passe ne correspondent pas.';
            return;
          }
  
          // Récupérez le jeton de réinitialisation de l'URL (par exemple, via la route Vue Router)
          const token = this.$route.query.token;
  
          // Envoyez le nouveau mot de passe et le jeton au serveur
          const response = await axios.post('/api/auth/reset-password', { token, newPassword: this.newPassword });
          this.message = response.data.message;
          alert("Mot de passe réinitialisé avec succes!")

          router.push('/login')
        } 

        catch (error) 
        {
          console.error(error);
          this.message = 'Erreur lors de la réinitialisation du mot de passe.';
        }

      },
    },
  };
  </script>
  
  <style scoped>
  .container 
  {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
  }
  .form-group 
  {
    margin-bottom: 15px;
  }
  .btn-primary 
  {
    width: 100%;
  }
  </style>
  