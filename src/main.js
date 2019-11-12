import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";
import console from 'Console'
import * as WPS from './static/jwps.es6'

// 配置默认路径前缀（须和wps开放平台回调URL一致）
axios.defaults.baseURL = "http://127.0.0.1:8088";

Vue.prototype.axios = axios;
Vue.prototype.console = console;
Vue.prototype.wps = WPS;

Vue.use(Element);

// 定义的公共方法，如果觉得不爽，也可以换地方
Vue.prototype.showErrMeg = function (msg) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'error'
  });
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
