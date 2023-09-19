import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categoria from '../components/Categoria.vue'
import Articulo from '../components/Articulo.vue'
import Rol from '../components/Rol.vue'
import Usuario from '../components/Usuario.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: Categoria
  },
  {
    path: '/articulos',
    name: 'articulos',
    component: Articulo
  },
  {
    path: '/roles',
    name: 'roles',
    component: Rol
  },
  {
    path: '/Usuarios',
    name: 'usuarios',
    component: Usuario
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
