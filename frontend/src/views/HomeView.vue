<template>
  <div class="home-container">
    <h1>Bienvenue sur Gestionnaire de Tâches</h1>
    <div class="options">
      <router-link to="/register" class="option">
        <button class="btn btn-register">S'inscrire</button>
      </router-link>
      <router-link to="/login" class="option">
        <button class="btn btn-login">Se connecter</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped lang="scss">
.home-container {
  text-align: center;
  margin: 50px auto;
  max-width: 600px;
  padding: 20px;

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .option {
      text-align: center;
    }

    .btn {
      padding: 10px 20px;
      font-size: 1rem;
      cursor: pointer;
      border: none;
      border-radius: 5px;
      transition: background-color 0.3s;

      &.btn-register {
        background-color: #4caf50;
        color: white;
      }

      &.btn-register:hover
      {
        color: #4caf50;
        background-color: white;
      }

      &.btn-login {
        background-color: #2196f3;
        color: white;
      }

      &.btn-login:hover
      {
        color: #2196f3;
        background-color: white;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .options {
      flex-direction: row;

      .option {
        flex: 1;
      }
    }
  }
}
</style>
