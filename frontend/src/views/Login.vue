<template>
  <div class="container">
    <h2>Connexion</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
    <p v-if="error" class="text-danger">{{ error }}</p>
    <p><router-link to="/forgotpassword">Mot de passe oublié ?</router-link></p>
    <p>Pas encore de compte? <router-link to="/register">Inscrivez-vous</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name:"LoginPage",
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post('/api/auth/login', 
        {
          email: this.email,
          password: this.password,
        });

        // Enregistrez le token JWT reçu dans le localStorage
        localStorage.setItem('token', response.data.token);

        // Redirigez l'utilisateur vers la page d'accueil ou une autre page après la connexion
        this.$router.push('/UserPage');
      }
       catch (error) 
       {
        this.error = 'Paire email/mot de passe incorrecte';
        console.error(error);
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
