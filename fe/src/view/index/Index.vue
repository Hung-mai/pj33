<template>
  <div>
    <the-header></the-header>

    <div class="x-row">
      <the-navbar></the-navbar>
      <the-content></the-content>
    </div>
  </div>
</template>

<script>
import TheHeader from "../../layout/TheHeader.vue";
import TheNavbar from "../../layout/TheNavbar.vue";
import TheContent from "../../layout/TheContent.vue";

export default {
  name: "Index",
  components: {
    TheHeader,
    TheNavbar,
    TheContent,
  },
};
</script>