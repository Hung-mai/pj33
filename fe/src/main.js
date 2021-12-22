import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Index from './view/index/Index.vue';
import Login from './view/login/Login.vue';

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Index
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false

Vue.use(VueRouter);

Vue.prototype.$server = `http://localhost:3000`;

const app = new Vue({
  router,
  render: h => h(App),
});

app.$mount('#app')