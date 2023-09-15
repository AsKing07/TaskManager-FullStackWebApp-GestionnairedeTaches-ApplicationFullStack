<template>
   
      <!-- Barre de navigation Bootstrap -->
      <nav class="navbar navbar-expand-lg navbar-light bg-success" id="app">
        <div class="container-fluid">

            <!-- Marque de la navigation (Logo ou nom du site) -->
            <a class="navbar-brand" href="/">Gestionnaire de Tâches</a>

            <!-- Bouton de basculement pour les petits écrans -->
            <button
                class="navbar-toggler"
                type="button"
                data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown"
                aria-expanded="false"
                aria-label="navigation"
                @click="toggleNavbar"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

                    <!-- Contenu de la barre de navigation -->

            <div class="collapse navbar-collapse" :class="{ 'show': isNavbarOpen }" id="navbarNavDropdown">
                <!-- Liste des liens de navigation -->
                <ul class="navbar-nav">


                    <li class="nav-item">
                        <!-- Lien vers la page 'UserPage' -->
                        <router-link to="/UserPage" class="nav-link">Ma Page</router-link>
                      </li>
                      <li class="nav-item">
                        <!-- Lien vers la page 'login' -->
                        <router-link to="/login" class="nav-link">Connexion</router-link>
                      </li>
                      <li class="nav-item">
                        <!-- Lien vers la page 'register' -->
                        <router-link to="/register" class="nav-link">Inscription</router-link>
                      </li>


                </ul>
            </div>

        </div>
        
      </nav>
      <!-- Vue du routeur, où les composants s'affichent en fonction de la route actuelle -->
      <router-view />
    
  </template>
  
  <script>
  export default {
    name: 'NavBar',
    data() {
      return {
        isNavbarOpen: false, // Contrôle l'état d'ouverture/fermeture de la barre de navigation
      };
    },
    methods: {
      toggleNavbar() {
        // Méthode pour basculer l'état de 'isNavbarOpen' (Ouvrir/Fermer la barre de navigation)
        this.isNavbarOpen = !this.isNavbarOpen;
      },
    },
  };
  </script>
  
  <style lang="scss">
  /* Styles CSS pour l'apparence */
  
  .navbar {
    padding: 20px;
  }
  
  .navbar-brand {
    font-weight: bold;
    color: #fff;
    font-size: 20px;
  }
  
  .navbar-toggler-icon {
    background-color: #fff;
  }
  
  .nav-link {
    font-weight: bold;
    color: #fff;
    margin-right: 20px;
    font-size: 18px;
  }
  
  .router-link-exact-active {
    text-decoration: underline;
  }
  </style>
  