<template>
  <div>
    <the-header></the-header>

    <div class="m-row">
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
  methods: {
    async getUserInfo() {
      const result = await this.$storedAction.getUser();
      if (result == false) {
        document.cookie = "";
        this.$router.push("/login");
      }
    },
  },
  async created() {
    this.getUserInfo();
    
  },
};
</script>