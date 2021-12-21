<template>
  <div class="container-fluid p-0 h-100">
    <!--- Header --------------------------->
    <nav class="navbar fixed-top header">
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
              id="inpUsername"
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
              id="inpPassword"
              autocomplete="new-password"
              placeholder="Password"
              v-model="password"
            />
          </div>
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
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        let response = await fetch(`http://localhost:3000/login`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });
        let data = await response.json();
        console.log(data);
      } catch (error) {
          console.log(error);
      }
    },
  },
};
</script>