<template>
  <div class="nav mt-4">
    <div class="link container justify-content-between">
      <router-link :to="{ name: 'PatientDetail' }" class="btn m-1" id="button">
        Patient's detail
      </router-link>
      <router-link :to="{ name: 'VaccineDetail' }" class="btn m-1" id="button">
        Vaccine's detail
      </router-link>
      <router-link :to="{ name: 'AddRole' }" class="btn m-1" id="button" v-if="isAdmin">
        Add Role
      </router-link>
    </div>
    <div class="pcontent container">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import AuthService from "@/service/AuthService.js";

export default {
  computed: {
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    }
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
</style>
