<template>
  <div class="x-navbar">
    <router-link class="navbar-item" to="/staff">Staff</router-link>
    <router-link class="navbar-item" to="/hospital">Hospital</router-link>
    <router-link class="navbar-item" to="/testcamp">Testcamp</router-link>
    <router-link class="navbar-item" to="/patient">Patient</router-link>
  </div>
</template>

<script>
export default {
  name: "TheNavbar",
};
</script>