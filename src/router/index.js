import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import getMenuRoutes from '@/utils/permission';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const asyncRouterMap = [
  {
    path: '/product',
    name: 'Product',
    component: Home,
    meta: {
      title: '商品',
      hidden: false,
      icon: 'inbox',
    },
    children: [
      {
        path: 'list',
        name: 'ProductList',
        meta: {
          title: '商品列表',
          hidden: false,
          icon: 'unordered-list',
        },
        component: () => import('@/views/page/ProductList.vue'),
      },
      {
        path: 'add',
        name: 'ProductAdd',
        meta: {
          title: '添加商品',
          icon: 'file-add',
          hidden: false,
        },
        component: () => import('@/views/page/ProductAdd.vue'),
      },
      {
        path: 'category',
        name: 'Category',
        meta: {
          title: '类目管理',
          hidden: false,
          icon: 'project',
        },
        component: () => import('@/views/page/Category.vue'),
      },
    ],

  },
];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [{
      path: 'statistics',
      name: 'Statistics',
      meta: {
        title: '统计',
        hidden: false,
        icon: 'number',
      },
      component: () => import('@/views/page/Statistics.vue'),
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/registered',
    name: 'Registered',
    meta: {
      title: '注册',
      hidden: true,
    },
    component: () => import('@/views/Registered.vue'),
  },
];

const router = new VueRouter({
  routes,
});

let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && to.path !== '/registered') {
    if (store.state.user.appkey
      && store.state.user.username
      && store.state.user.email
      && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.user.role, asyncRouterMap);

        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          next();
          router.addRoutes(menuRoutes);
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  } if (to.path === '/login') {
    if (store.state.user.appkey
      && store.state.user.username
      && store.state.user.email
      && store.state.user.role) {
      return next('/');
    }
  }
  return next();
});

export default router;
