<template>
  <div class="col-md-12">
    <div class="col-md-9 col-sm-12" id="content">
      <h3>Add Role & Vaccine</h3>
      <form @submit.prevent="updateUser" :validation-schema="schema">
        <div v-if="!successful">
          <div class="row justify-content-center">
            <div class="col-12 col-md-5 col-sm-12 pr">
              <!-- Add Role-->
              <div class="form-group">
                <select class="form-control" v-model="role" required>
                  <option selected disabled hidden value="">Select Role</option>
                  <option
                    v-for="role in GStore.authorities"
                    :key="role.id"
                    :value="role"
                  >
                    {{ role.name }}
                  </option>
                </select>
              </div>

              <!-- Add 1st vaccine -->
              <div class="form-group" v-if="showVaccine">
                <select
                  class="form-control"
                  v-model="firstDose"
                  @change="showFDate"
                >
                  <option value="">Add 1st vaccine</option>
                  <option
                    v-for="vaccine in GStore.vaccines"
                    :key="vaccine.id"
                    :value="vaccine"
                  >
                    {{ vaccine.brand }}
                  </option>
                </select>
              </div>

              <!-- Add 1st date date -->
              <div class="form-group" v-if="!showFDate && showVaccine">
                <label
                  >Date:
                  <input
                    type="date"
                    id="fdate"
                    name="fdate"
                    v-model="fDate"
                    required
                  />
                </label>
              </div>

              <!-- Add 2nd vaccine -->
              <div class="form-group" v-if="!showFDate && showVaccine">
                <select
                  class="form-control"
                  v-model="secondDose"
                  @change="showSDate"
                >
                  <option selected disabled hidden value="">
                    Add 2st vaccine
                  </option>
                  <option
                    v-for="vaccine in GStore.vaccines"
                    :key="vaccine.id"
                    :value="vaccine"
                  >
                    {{ vaccine.brand }}
                  </option>
                </select>
              </div>
              <!-- Add 2st date date -->
              <div class="form-group" v-if="!showSDose && showVaccine">
                <label
                  >Date:
                  <input
                    type="date"
                    id="sdate"
                    name="sdate"
                    v-model="sDate"
                    required
                  />
                </label>
              </div>

              <!-- button Submit -->
              <div class="form-group">
                <button id="button" class="btn btn-primary btn-block">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import UserService from "@/service/UserService";

export default {
  name: "AddRole",
  data() {
    return {
      firstDose: "",
      secondDose: "",
      fDate: "",
      sDate: "",
      role: "",
    };
  },
  inject: ["GStore"],
  computed: {
    showFDate() {
      return this.firstDose == "";
    },
    showSDose() {
      return this.secondDose == "";
    },
    showVaccine() {
      return this.role.name == "ROLE_PATIENT";
    },
  },
  methods: {
    updateUser() {
      let myTarget = this.GStore.user;
      myTarget.authorities = [this.role];
      console.log(this.role.name);
      if (this.firstDose != "" && this.fDate != "") {
        myTarget.vaccination[0] = this.firstDose;
        myTarget.injectedAt[0] = this.fDate;
      }
      if (this.secondDose != "" && this.sDate != "") {
        myTarget.vaccination[1] = this.secondDose;
        myTarget.injectedAt[1] = this.sDate;
      }

      this.newData = myTarget;
      UserService.updateUser(this.GStore.user.id, this.newData);
      this.$router.go();
    },
  },
};
</script>

<style scoped>
#title {
  background-color: #00c2cb;
  margin-right: 5px;
  border-radius: 2px;
  padding-left: 5px;
}

#button {
  color: white;
  background-color: #28787a;
}

#content {
  border: 1px solid #39bbc7;
  border-radius: 10px;
  background-color: #9addd1;
  color: black;
  margin: 25px auto auto auto;
  padding-top: 20px;
  justify-content: center;
}
h3 {
  margin-bottom: 20px;
  color: #1a4f50;
}
</style>
