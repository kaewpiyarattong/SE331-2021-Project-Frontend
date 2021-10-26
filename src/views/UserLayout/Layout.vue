<template>
  <div class="nav mt-4" v-if="GStore.user">
    <div class="container link">
      <div class="row justify-content-center ">

        <div class=" col-md-2 col-sm-12 setButton">
          <router-link
            :to="{ name: 'UserInformation' }"
            class="btn m-1"
            id="button"
          >
            Information
          </router-link>
        </div>

        <div class="col-md-3 col-sm-12 setButton" v-if="GStore.user.authorities.length > 0">
          <router-link
            :to="{ name: 'VaccineDetail' }"
            class="btn m-1"
            id="button"
            :v-if="GStore.user.authorities[0].id == 1"
          >
            Vaccine's detail
          </router-link>
        </div>

        <div class="col-md-3 col-sm-12 setButton">
          <router-link
            :to="{ name: 'AddRole' }"
            class="btn m-1"
            id="button"
            v-if="isAdmin"
          >
            Add Role & Vaccine
          </router-link>
        </div>
        <!-- Delete Button -->
        <div class="col-md-1 col-sm-12 setButton">
          <router-link
            :to="{ name: 'UserList' }"
            @click="deleteUserById(GStore.user.id)"
            class="btn m-1"
            id="deleteButton"
            v-if="isAdmin"
          >
            Delete
          </router-link>
        </div>
      </div>
    </div>

    <div class="pcontent container">
      <router-view />
    </div>
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
      UserService.deleteUserById(id);
      // return this.$router.go()
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
.setButton{
  margin: 3px 20px 5px 20px;
}
</style>
