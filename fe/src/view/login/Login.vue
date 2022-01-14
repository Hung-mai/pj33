<template>
  <div class="p-0 h-100">
    <!--- Header --------------------------->
    <nav class="navbar fixed-top m-header m-header-login">
      <div class="container-fluid p-0">
        <div class="d-flex align-items-center ms-3">
          <div class="navbar-brand logo">
            <img alt="Brand" src="../../assets/images/logo.png" />
          </div>
          <div class="navbar-text title">Hospital Management System</div>
        </div>
      </div>
    </nav>
    <!--- Header Ends Here --------------------------->

    <form class="row d-flex flex-column bg-transparent mx-auto login-form">
      <div class="col col-5 m-auto bg-white p-3">
        <h5>Đăng nhập</h5>
        <div class="row mt-3">
          <div class="input-group">
            <input
              type="text"
              autocomplete="username"
              class="form-control"
              name="username"
              placeholder="Username"
              v-model="username"
            />
          </div>
        </div>
        <div class="row mt-3">
          <div class="input-group">
            <input
              type="password"
              name="password"
              class="form-control"
              autocomplete="new-password"
              placeholder="Password"
              v-model="password"
            />
          </div>
          <span v-show="errorMessage != ''" class="m-label-error">{{errorMessage}}</span>
        </div>
        <div class="col col-6 m-auto bg-white p-3">
          <button
            class="btn btn-primary"
            @click="
              $event.preventDefault();
              login();
            "
          >
            Login
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { store } from '../../script/store';
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: ""
    };
  },
  methods: {
    async login() {
      try {
        let response = await fetch(`http://localhost:3000/login`, {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        if (response.status == 200) {
          store.state.user = await response.json();
          console.log(store.state.user);
          if (store.state.user.roleId == 1) {
            this.$router.push('/admin/staff');
          } else if (store.state.user.roleId == 5) {
            this.$router.push('/hospitaladmin/staff');
          } else if (store.state.user.roleId == 4) {
            this.$router.push('/testcampstaff');
          } else if (store.state.user.roleId == 2 || store.state.user.roleId == 3) {
            this.$router.push('/hospitalstaff')
          }
          
        } else {
          this.errorMessage = await response.text();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    // Check valid credential
    const response = await fetch("http://localhost:3000/login", {
      credentials: 'include'
    });
    const data = await response.text();
    if (data == "true") {
      this.$router.push('/');
    }
  },
};
</script>