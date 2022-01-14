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
  name: "HospitalAdminIndex",
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
        },
        {
          name: "Room",
          link: "/hospitaladmin/room",
        },
        {
          name: "Patient Queue",
          link: "/hospitaladmin/patient-queue",
        },
      ],
    };
  },
  methods: {
    async getUserInfo() {
      const result = await this.$store.action.getUser();
      this.user = this.$store.state.user;
      if (result == false) {
        document.cookie = "";
        this.$router.push("/login");
      } else {
        this.$router.push("/hospitaladmin/staff");
      }
    },
  },
  async created() {
    this.getUserInfo();
  },
};
</script>