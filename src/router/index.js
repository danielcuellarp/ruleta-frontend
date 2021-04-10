import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ruleta from '../views/Ruleta.vue'
import Usuario from '../views/Usuario.vue'
import Registrar from '../views/Registrar.vue'
import store from '../store';

Vue.use(VueRouter)

// Rutas
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ruleta',
    name: 'Ruleta',
    component: Ruleta,
    meta: { requiredAuth: true }
  },
  {
    path: '/usuario',
    name: 'Usuario',
    component: Usuario,
    meta: { requiredAuth: true }
  },
  {
    path: '/registrar',
    name: 'Registrar',
    component: Registrar
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// Seguridad en las paginas
// si no estoy logueado devolver al login
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredAuth)) {
      if (!store.state.userLogged) {
          next({ path: '/' });
      } else {
          next();
      }
  } else {
      next();
  }
});

export default router