import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ruleta from '../views/Ruleta.vue'
import Usuario from '../views/Usuario.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ruleta',
    name: 'Ruleta',
    component: Ruleta
  },
  {
    path: '/usuario',
    name: 'Usuario',
    component: Usuario
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
