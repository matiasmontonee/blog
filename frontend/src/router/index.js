import { createRouter, createWebHistory } from 'vue-router';
import Listado from '../views/Listado.vue';
import FormPost from '../views/FormPost.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', component: Listado, meta: { requiresAuth: true } },
  { path: '/crear_post', component: FormPost, meta: { requiresAuth: true } },
  { path: '/editar_post/:id', component: FormPost, props: true, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Redirige al login si no hay token
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router;