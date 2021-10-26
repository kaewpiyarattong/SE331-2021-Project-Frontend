<template>
  <div class="nav mt-4">
    <div class="link container justify-content-between">
      <router-link
        :to="{ name: 'UserInformation' }"
        class="btn m-1"
        id="button"
      >
        Information
      </router-link>
      <router-link :to="{ name: 'VaccineDetail' }" class="btn m-1" id="button">
        Vaccine's detail
      </router-link>
      <router-link
        :to="{ name: 'AddRole' }"
        class="btn m-1"
        id="button"
        v-if="isAdmin"
      >
        Add Role & Vaccine
      </router-link>
      <!-- Delete Button -->
      <router-link
        :to="{ name: 'UserList' }"
        @click="deleteUserById(GStore.user.id)"
        class="btn m-1"
        id="deleteButton"
      >
        Delete
      </router-link>
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
</style>
