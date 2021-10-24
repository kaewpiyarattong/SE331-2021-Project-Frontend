<template>
  <div class="col-md-4 mt-2">
    <router-link
      :to="{ name: 'PatientDetail', params: { id: user.id } }"
      style="text-decoration: none"
    >
      <!-- Show information for Admin -->
      <div class="card" v-if="isAdmin">
        <!-- add patient's image -->
        <img
          class="img-fluid"
          v-if="user.imageUrl.length"
          :src="user.imageUrl"
          alt="profile"
          style="height: 230px; object-fit: cover"
        />
        <img
          class="img-fluid"
          src="https://i.pinimg.com/474x/04/f0/42/04f0421b45476cc63c3266a70a9de1b7--worlds-largest-mondo.jpg"
          alt="profile"
          v-else
          style="height: 230px; object-fit: cover"
        />

        <div class="card-body">
          <h5 class="card-title">
            {{ user.firstname }}
          </h5>
          <h5 class="card-title">
            {{ user.surname }}
          </h5>
          <p class="card-text" v-if="user.authorities.length">
            {{ user.authorities[0].name }}
          </p>
          <p class="card-text" v-else>No Role</p>
        </div>
      </div>

      <!-- Show information for Doctor -->
      <div class="card" v-else>
        <!-- add patient's image -->
        <img
          class="img-fluid"
          v-if="user.user.imageUrl.length"
          :src="user.user.imageUrl"
          alt="profile"
          style="height: 230px; object-fit: cover"
        />
        <img
          class="img-fluid"
          src="https://i.pinimg.com/474x/04/f0/42/04f0421b45476cc63c3266a70a9de1b7--worlds-largest-mondo.jpg"
          alt="profile"
          v-else
          style="height: 230px; object-fit: cover"
        />

        <div class="card-body">
          <h5 class="card-title">
            {{ user.user.firstname }}
          </h5>
          <h5 class="card-title">
            {{ user.user.surname }}
          </h5>
          <p class="card-text" v-if="user.user.authorities.length">
            {{ user.user.authorities[0].name }}
          </p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import AuthService from "@/service/AuthService.js";

export default {
  name: "Card",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
    isDocter() {
      return AuthService.hasRoles("ROLE_DOCTOR");
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #86d4cb;
  color: #000000;
  margin-bottom: 20px;
  padding-bottom: 8px;
  border-radius: 10px;
}
.card:hover {
  background-color: #46ccbc;
}
.event-card {
  padding: 20px;
  cursor: pointer;
  border: 1px solid #39495c;
  margin-bottom: 18px;
}

.event-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}

.event-link {
  color: #2c3e50;
  text-decoration: none;
}
</style>
