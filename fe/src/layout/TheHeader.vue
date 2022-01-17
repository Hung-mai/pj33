<template>
  <div class="m-row m-header">
    <div class="m-col m-col-9">
      <div class="m-row app-title align-items-center">
        Hospital Mangement System
      </div>
    </div>

    <div class="m-col m-col-3 d-flex">
      <div class="m-row name align-items-center">
        <div>{{ storedState.user.staffName }}</div>
        <!-- <button class="m-btn btn-danger" @click="logout()">Log out</button> -->
        <div class="dropdown position-absolute top-1 end-0 mx-5">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" @click="logout()" href="#">Logout</a></li>
                <!-- <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li> -->
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      storedState: this.$store.state,
    };
  },
  methods: {
    async logout() {
      this.$store.action.showLoading();
      let response = await fetch(`http://localhost:3000/login/logout`, {
        credentials: "include",
      });
      let data = await response.text();
      console.log(data);
      this.$store.action.hideLoading();
      this.$router.push('/login');
    },
  },
};
</script>