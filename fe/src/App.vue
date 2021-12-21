<template>
  <div id="app">
    <login></login>
  </div>
</template>

<script>
import Login from "./view/login/Login.vue";

export default {
  name: "App",
  components: {
    Login,
  },
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
