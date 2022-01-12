import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'
import 'bootstrap'
import {store} from './script/store';

import Index from './view/index/Index.vue';
import Login from './view/login/Login.vue';

import Staff from './view/index/staff/Staff.vue';
import Hospital from './view/index/hospital/Hospital.vue';
import Patient from "./view/index/patient/Patient";
import testcamp from "./view/index/testcamp/testcamp.vue";
import NotFound from './view/index/error/NotFound.vue';

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '/staff',
        component: Staff
      },
      {
        path: '/hospital',
        component: Hospital
      },
      {
        path: '/patient',
        component: Patient
      },
      {
        path: '/notfound',
        component: NotFound
      },
      {
        path: '/testcamp',
        component: testcamp,
        // beforeEnter: (to, from, next) => {
        //   if (store.state.user.roleId == 1 && store.state.user.hospitalId == 1) next();
        //   else next('/staff');
        // }
      },
      {
        path: '/',
        redirect: "/patient"
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.config.productionTip = false

Vue.use(VueRouter);

Vue.use(Notifications)

Vue.prototype.$server = `http://localhost:3000`;
Vue.prototype.$store = store;
Vue.prototype.$storedAction = store.action;

const app = new Vue({
  router,
  render: h => h(App),
});

app.$mount('#app')