<template>
    <div class="copyright">
      <p>
        &copy; {{ currentYear }} Charbel SONON. Tous droits réservés.
        <a :href="githubProfile" target="_blank" class="github-link">
            <i class="fa fa-github github-icon" aria-hidden="true"></i>
        </a>
      </p>
    </div>
  </template>
  
  <script>
  import 'font-awesome/css/font-awesome.css';

  export default 
  {
    name: "CopyRight",
    data() 
    {
      return {
        currentYear: new Date().getFullYear(),
        githubProfile: 'https://github.com/AsKing07', // Remplacez par le lien vers votre profil GitHub
      };
    },
  };
  </script>
  
  <style scoped>
  .copyright 
  {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
    color: #888;
  }
  
  .github-link 
  {
    text-decoration: none;
  }
  
  .github-icon 
  {
    font-size: 20px; /*Ajustez la taille de l'icône GitHub selon vos préférences*/
    vertical-align: middle;
    margin-left: 5px;
    color: black;
  }
  </style>
  