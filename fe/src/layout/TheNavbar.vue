<template>
  <div class="m-navbar">
    <router-link class="navbar-item" to="staff" v-show="storedState.user.roleId == 1 || storedState.user.roleId == 5">Staff</router-link>
    <router-link class="navbar-item" to="hospital" v-show="storedState.user.roleId == 1">Hospital</router-link>
    <router-link class="navbar-item" to="testcamp">Testcamp</router-link>
    <router-link class="navbar-item" to="patient">Patient</router-link>
  </div>
</template>

<script>
import {store} from '../script/store';

export default {
  name: "TheNavbar",
  data() {
    return {
      storedState: store.state
    }
  }
};
</script>