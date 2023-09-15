<template>
  <div class="container">
    <h2>Inscription</h2>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmez le mot de passe :</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">S'inscrire</button>
    </form>
    <p v-if="error !== ''" class="text-danger">{{ error }}</p>
    <p>Déjà inscrit? <router-link to="/login">Connectez-vous</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
    };
  },
  methods: {
    async registerUser() {
      try {
        // Vérifiez si le mot de passe et la confirmation correspondent
        if (this.password !== this.confirmPassword) {
          this.error = 'Les mots de passe ne correspondent pas.';
          return;
        }

        // Vérifiez la longueur du mot de passe
        if (this.password.length < 5) {
          this.error = 'Le mot de passe doit comporter au moins 5 caractères.';
          return;
        }

        // Vérifiez s'il y a au moins un caractère spécial dans le mot de passe
        const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"|,.<>/?]+/;
        if (!specialCharacterRegex.test(this.password)) {
          this.error = 'Le mot de passe doit contenir au moins un caractère spécial.';
          return;
        }

        const response = await axios.post('/api/auth/register', {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem('token', response.data.token);
        this.$router.push('/login');
      } catch (error) {
        this.error = 'Erreur lors de l\'inscription.';
        console.log(error);
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
