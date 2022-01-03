<template>
  <div>Not Found</div>
</template>

<script>
import { store } from "../../../script/store";
export default {
  name: "NotFound",
  data() {
    return {
      roleId: store.state.user.roleId,
      checkRoleIdInterval: null,
    };
  },
  watch: {
    // roleId: function () {
    //   if (this.roleId == 1 || this.roleId == 5) {
    //     this.$router.push("/hospital");
    //   }
    // },
  },
  created() {
    // this.checkRoleIdInterval = setInterval(() => {
    //     console.log(this.roleId);
    //   if (this.roleId == 1 || this.roleId == 5) {
    //     this.$router.push("/staff");
    //     clearInterval(this.checkRoleIdInterval);
    //   }
    // }, 1000);
  },
};
</script>