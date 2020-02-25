import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'index',
    component:() => import('../views/index.vue'),
    redirect: 'webFile',
    children:[
      {
        path: '/webFile',
        name: 'webFile',
        component: () => import('../views/webFile.vue')
      },
      {
        path: '/dbFile',
        name: 'dbFile',
        component: () => import('../views/dbFile.vue')
      }
    ]
  },
  {
    path: '/viewFile',
    name: 'viewFile',
    component: () => import('../views/viewFile.vue')
  }
];

const router = new Router({
  mode: 'history',
  base: '/',
  routes
});

// 通过路由修改title
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = 'wps-view';
  next()
});

export default router
