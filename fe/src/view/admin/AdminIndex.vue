<template>
  <div>
    <the-header></the-header>

    <div class="m-row">
      <the-navbar :links="links"></the-navbar>
      <the-content :user="user"></the-content>
    </div>
  </div>
</template>

<script>
import TheHeader from "../../layout/TheHeader.vue";
import TheNavbar from "../../layout/TheNavbar.vue";
import TheContent from "../../layout/TheContent.vue";

export default {
  name: "AdminIndex",
  components: {
    TheHeader,
    TheNavbar,
    TheContent,
  },
  data() {
    return {
      user: {},
      links: [
        {
          name: "Hospital",
          link: "/admin/hospital"
        },
        {
          name: "Staff",
          link: "/admin/staff"
        },
        {
          name: "Testcamp",
          link: "/admin/testcamp"
        },
        {
          name: "Patient",
          link: "/admin/patient"
        }
      ]
    }
  },
  methods: {
    async getUserInfo() {
      const result = await this.$storedAction.getUser();
      this.user = this.$store.state.user;
      if (result == false) {
        document.cookie = "";
        this.$router.push("/login");
      } else {
        if (this.$store.state.user.roleId == 1 && this.$store.state.user.hospitalId == 1) {
          this.$router.push("/admin/hospital");
        }
      }
    },
  },
  async created() {
    this.getUserInfo();
  },
};
</script>