import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import Forgot from '../views/layout/Forgot.vue';
import Registered from '../views/layout/Registered.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registered',
    name: 'Registered',
    component: Registered,
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
