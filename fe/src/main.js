import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'
import 'bootstrap'
import {store} from './script/store';

// import Index from './view/index/Index.vue';
import Login from './view/login/Login.vue';

import AdminIndex from './view/admin/AdminIndex.vue';
import HospitalAdminIndex from './view/hospitaladmin/HospitalAdminIndex.vue';
import HospitalStaffIndex from './view/hospitalstaff/HospitalStaffIndex.vue';
import TestcampStaffIndex from './view/testcampstaff/TestcampStaffIndex.vue';

import AdminHospital from './view/admin/hospital/AdminHospital.vue';
import AdminStaff from './view/admin/staff/AdminStaff.vue';
import AdminTestcamp from './view/admin/testcamp/AdminTestcamp.vue';
import AdminPatient from './view/admin/patient/AdminPatient.vue';

// import Staff from './view/index/staff/Staff.vue';
// import Hospital from './view/index/hospital/Hospital.vue';
// import Patient from "./view/index/patient/Patient";
// import testcamp from "./view/index/testcamp/testcamp.vue";
// import NotFound from './view/index/error/NotFound.vue';

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/admin',
    component: AdminIndex,
    children: [
      {
        path: "/admin/staff",
        component: AdminStaff
      },
      {
        path: "/admin/hospital",
        component: AdminHospital
      },
      {
        path: "/admin/testcamp",
        component: AdminTestcamp
      },
      {
        path: "/admin/patient",
        component: AdminPatient
      }
    ]
  },
  {
    path: '/hospitaladmin',
    component: HospitalAdminIndex
  },
  {
    path: '/hospitalstaff',
    component: HospitalStaffIndex
  },
  {
    path: '/testcampstaff',
    component: TestcampStaffIndex
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/login'
  // }
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