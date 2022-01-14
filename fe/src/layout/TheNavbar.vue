<template>
  <div class="m-navbar">
    <router-link class="navbar-item" v-for="link in links" :key="link.name" :to="link.link">{{link.name}}</router-link>
  </div>
</template>

<script>
import {store} from '../script/store';

export default {
  name: "TheNavbar",
  props: ['links'],
  data() {
    return {
      storedState: store.state
    }
  }
};
</script>