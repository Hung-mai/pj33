<template>
  <div>
    <the-header :user="user"></the-header>

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
  data() {
    return {
      user: {
        hospitalId: "",
        staffName: "",
        dob: "",
        phone: "",
        address: "",
        roleId: "",
        username: "",
        staffId: "",
      },
    };
  },
  components: {
    TheHeader,
    TheNavbar,
    TheContent,
  },
  methods: {
    async getUserInfo() {
      const response = await fetch(`http://localhost:3000/api/staff/userInfo`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data == false) {
        document.cookie = '';
        this.$router.push('/login');
      } else {
        this.user = data;
      }
    },
  },
  async created() {
    await this.getUserInfo();
  },
};
</script>