import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.$server = `http://localhost:3000`;

const app = new Vue({
  render: h => h(App),
});

app.$mount('#app')