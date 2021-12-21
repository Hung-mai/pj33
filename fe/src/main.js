import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

const app = new Vue({
  render: h => h(App),
});
app.$mount('#app')

app.prototype.$server = `http://localhost:3000`;