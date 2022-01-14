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
  name: "TestcampStaffIndex",
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
          name: "Patient",
          link: "/hospitaladmin/patient",
        },
        {
          name: "Staff",
          link: "/hospitaladmin/staff",
        }
      ],
    };
  },
  methods: {
    async getUserInfo() {
      const result = await this.$storedAction.getUser();
      this.user = this.$store.state.user;
      if (result == false) {
        document.cookie = "";
        this.$router.push("/login");
      } else {
        if (
          this.$store.state.user.roleId == 1 &&
          this.$store.state.user.hospitalId == 1
        ) {
          this.$router.push("/hospital");
        }
      }
    },
  },
  async created() {
    this.getUserInfo();
  },
};
</script>