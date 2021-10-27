<template>
  <nav
    class="navbar navbar-expand-lg navbar-light justify-content-between"
    id="nav"
  >
    <div>
      <router-link :to="{ name: 'UserList' }" class="navbar-brand float-left">
        <img src="../src/assets/logo.png" style="width: 100px" />
      </router-link>
    </div>
    <div v-if="GStore.currentUser" class="topnav-centered">
      <a style="color: #09606a">
        <font-awesome-icon icon="user" />
        {{ GStore.currentUser.username }}
      </a>
    </div>

    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="collapse navbar-collapse collapse w-100 order-3 dual-collapse2"
      id="navbarSupportedContent"
    >
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'AvailableVaccine' }" class="nav-link pr-3"
            >Available Vaccines</router-link
          >
        </li>
        <li class="nav-item" v-if="GStore.currentUser">
          <a class="nav-link" style="color: #09606a" @click="logout">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </ul>
    </div>

    <div class="collapse navbar-collapse" id="navbarSupportedContent"></div>
  </nav>

  <div class="container mt-3" id="page">
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
  padding: 10px;
  background-color: #6ec2b8;
  color: #188681;
}

#nav a {
  font-weight: bold;
  color: #09606a;
}

#nav a.router-link-exact-active {
  color: #087763;
}
#nav div :hover {
  color: #02302d;
  cursor: pointer;
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

.topnav-centered a {
  float: none;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
#page{
  min-height: 84vh;
}
</style>
