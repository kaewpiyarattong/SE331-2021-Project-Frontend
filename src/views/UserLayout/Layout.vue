<template>
  <div class="col-md-12 col-sm-12" v-if="GStore.user">
    <div class="row justify-content-center">
      <router-link
        :to="{ name: 'UserInformation' }"
        class="btn m-1"
        id="button"
      >
        Information
      </router-link>

      <div v-if="GStore.user.authorities.length > 0">
        <router-link
          :to="{ name: 'VaccineDetail' }"
          class="btn m-1"
          id="button"
          v-if="this.GStore.user.vaccination.length !== 0"
        >
          Vaccine's detail
        </router-link>
      </div>

      <router-link
        :to="{ name: 'AddRole' }"
        class="btn m-1"
        id="button"
        v-if="isAdmin"
      >
        Add Role & Vaccine
      </router-link>
      <!-- Delete Button -->
      <a
        type="button"
        id="deleteButton"
        class="btn btn-danger btn m-1"
        v-if="isAdmin"
        @click="deleteUserById(GStore.user.id)"
        >Delete</a
      >
    </div>
  </div>

  <div class="pcontent container">
    <router-view />
  </div>
</template>
<script>
import AuthService from "@/service/AuthService.js";
import UserService from "@/service/UserService.js";

export default {
  inject: ["GStore"],
  computed: {
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
    // hideVaccineDetail(){
    //   if(Gstore. != "ROLE_PATIENT"){
    //     return true;
    //   }
    // }
  },
  methods: {
    deleteUserById(id) {
      // console.log(id)
      UserService.deleteUserById(id);
      this.$router.push({ name: "UserList" });
    },
  },
};
</script>
<style>
.pcontent {
  min-height: 84vh;
}
.link a {
  color: #25726f;
}
.link a:hover {
  color: rgb(0, 0, 0);
}

#button {
  background-color: #65c4c4;
  border: 2px solid #73bdbd;
  color: black;
}
#deleteButton {
  background-color: #b10000;
  color: rgb(255, 255, 255);
}
.setButton {
  margin: 3px 20px 5px 20px;
}
</style>
