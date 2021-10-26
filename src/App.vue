<template>
  <nav
    class="navbar navbar-light justify-content-between flex-nowrap flex-row"
    style="background-color: #6ec2b8"
  >
    <div class="container">
        <router-link :to="{ name: 'UserList' }" class="navbar-brand float-left" v-if="!isPatient">
        <img src="../src/assets/logo.png" style="width: 100px" />
      </router-link>

      <div v-if="GStore.currentUser">
        <a style="color: #09606a">
          <font-awesome-icon icon="user" />
          {{ GStore.currentUser.username }}
        </a>
      </div>

      <ul
        class="nav navbar-nav flex-md-row flex-sm-column flexed-top float-right"
      >
        <li class="nav-item">
          <router-link :to="{ name: 'AvailableVaccine' }" class="nav-link pr-3"
            >Available Vaccines</router-link
          >
        </li>
        <ul v-if="GStore.currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" @click="logout">
              <font-awesome-icon icon="sign-out-alt" /> LogOut
            </a>
          </li>
        </ul>
      </ul>
    </div>
  </nav>

  <div class="container mt-3">
    <router-view />
  </div>
  <nav
    class="navbar navbar-light mt-4 justify-content-center flex-nowrap flex-row"
    style="background-color: #6ec2b8; color: black"
  >
    <div class="text-center p-3">© 2021 Copyright: Tong and Kai</div>
  </nav>
</template>

<script>
import AuthService from "@/service/AuthService.js";
export default {
  inject: ["GStore"], // <----
  computed: {
    currentUser() {
      return localStorage.getItem("user");
    },
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
    isPatient() {
      return AuthService.hasRoles("ROLE_PATIENT");
    },
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style>
#app {
  font-family: monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-image: url("../src/assets/background.png");
  background-size: cover;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#nprogress .bar {
  background: #09606a !important;
}

#nprogress .peg {
  box-shadow: 0 0 10px #09606a, 0 0 5px #09606a;
}

#nprogress .spinner .spinner-icon {
  border-top-color: #09606a;
  border-left-color: #09606a;
}
</style>
