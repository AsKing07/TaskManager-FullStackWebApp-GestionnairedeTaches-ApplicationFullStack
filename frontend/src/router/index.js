import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import UserPage from '../views/UserPage.vue';
import TaskUpdateForm from '../views/TaskUpdateForm.vue';
import forgotPassword from '../views/ForgotPassword.vue';
import resetPassword from '../views/ResetPassword.vue'


const routes = [

  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },

  {
    path: '/UserPage',
    name: 'UserPage',
    component: UserPage,
    meta: { requiresAuth: true }, // Indique que la page nécessite une authentification


  },

 
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },

  {
    path: '/update/:taskId',
    name: "UpdateTask",
    component :  TaskUpdateForm ,
    meta: { requiresAuth: true }, 

  },

  {
    path: '/forgotpassword',
    name: 'Password forgot',
    component: forgotPassword
  },

  {
    path: '/resetpassword',
    name: "Reset Password",
    component: resetPassword
  }

];




const router = createRouter(
{
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  
  // Vérifiez si l'utilisateur est connecté
  if (!token && to.path !== '/login' && to.path !== '/register' && to.path !== '/forgotpassword' && to.path !== '/resetpassword') 
  {
    // Utilisateur non connecté, redirigez-le vers la page de connexion
    next('/login');
  } 
  else 
  {
    // Utilisateur connecté ou sur la page de connexion
    next();
  }
});


export default router
