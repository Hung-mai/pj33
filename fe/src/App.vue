<template>
  <div id="app">
    <router-view></router-view>
    <div class="m-loading" v-show="storedState.loading">
      <div class="m-loading-icon"></div>
    </div>
  </div>
</template>

<script>
import {store} from './script/store'
export default {
  name: "App",
  data() {
    return {
      storedState: store.state
    }
  }
};
</script>

<style>
@import url("../node_modules/bootstrap/dist/css/bootstrap.min.css");
@import url("./style/main.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
