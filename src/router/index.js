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
  },
  {
    path: '/createFile',
    name: 'createFile',
    component: () => import('../views/createFile.vue')
  }
];

const router = new Router({
  // 此处使用默认的hash模式，即在浏览器地址栏中会出现那个#
  // 若要使用history模式，则需要在后端做相应的配置
  // 相关解释说明：
  // https://router.vuejs.org/zh/guide/essentials/history-mode.html
  // https://www.cnblogs.com/yszblog/p/10255458.html
  // mode: 'history',
  routes
});

// 通过路由修改title
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  document.title = 'wps-view';
  next()
});

export default router
