<template>
  <div class="row justify-content-center mt-md-3 mt-sm-2" v-if="GStore.user">
    <div class="col-md-5 col-sm-12 mt-3">
      <!--add User's image -->
      <img
        class="img-thumbnail"
        v-if="GStore.user.imageUrl.length"
        :src="GStore.user.imageUrl"
        style="height: 300px"
      />
      <img
        class="img-thumbnail"
        src="https://i.pinimg.com/474x/04/f0/42/04f0421b45476cc63c3266a70a9de1b7--worlds-largest-mondo.jpg"
        style="height: 300px"
        v-else
      />
    </div>
    <div class="col-md-5 col-sm-12 p-4 mt-3" id="content">
      <h3>Information</h3>
      <div class="container mt-5">
        <p>
          <strong id="title">Name:</strong>{{ GStore.user.firstname }}
          {{ GStore.user.lastname }}
        </p>
        <p><strong id="title">Tel:</strong>{{ GStore.user.tel }}</p>
        <p>
          <strong id="title">Email:</strong
          ><span v-if="GStore.user.email">{{ GStore.user.email }}</span
          ><span class="text text-danger" v-else>Email is not provided.</span>
        </p>
        <p><strong id="title">Gender:</strong>{{ GStore.user.gender }}</p>
        <p><strong id="title">Age:</strong>{{ GStore.user.age }} years old</p>
        <p><strong id="title">Hometown:</strong>{{ GStore.user.hometown }}</p>
        <div v-if="isAdmin">
          <p v-if="GStore.user.authorities.length > 0">
            <strong id="title">Role:</strong
            >{{ GStore.user.authorities[0].name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthService from "@/service/AuthService.js";
export default {
  inject: ["GStore"],
  computed: {
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
  },
};
</script>
<style scoped>
#content {
  border: 1px solid #39bbc7;
  border-radius: 10px;
  background-color: #9addd1;
  margin-top: 15px;
}
#title {
  background-color: #00c2cb;
  margin-right: 5px;
  border-radius: 2px;
  padding-left: 5px;
}
</style>
