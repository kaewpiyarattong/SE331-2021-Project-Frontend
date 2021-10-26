<template>
  <div class="col-md-12">
    <div class="col-md-9 col-sm-12" id="content">
      <h3>Add Role & Vaccine</h3>
      <Form @submit="saveRole" :validation-schema="schema">
        <div v-if="!successful">
          <div class="row justify-content-center">
            <div class="col-12 col-md-5 col-sm-12 pr">
              <!-- Add Role-->
              <div class="form-group">
                <select
                  class="form-control"
                  v-model="role"
                  @change="showVaccine"
                >
                  <option value="">Select Role</option>
                  <option
                    v-for="role in GStore.authorities"
                    :key="role.id"
                    :value="role.name"
                  >
                    {{ role.name }}
                  </option>
                </select>
              </div>

              <!-- {{Gstore.authorities}} -->

              <!-- Add 1st vaccine -->
              <div class="form-group" v-if="showVaccine">
                <select
                  class="form-control"
                  v-model="firstDose"
                  @change="showFDate"
                >
                  <option value="">
                    Add 1st vaccine
                  </option>
                  <option
                    v-for="vaccine in GStore.vaccines"
                    :key="vaccine.id"
                    :value="vaccine.brand"
                  >
                    {{ vaccine.brand }}
                  </option>
                </select>
              </div>

              <!-- Add 1st date date -->
              <div class="form-group" v-if="!showFDate && showVaccine">
                <label
                  >Date:
                  <input type="date" id="fdate" name="fdate" />
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
                    :value="vaccine.brand"
                  >
                    {{ vaccine.brand }}
                  </option>
                </select>
              </div>

              <!-- Add 2st date date -->
              <div class="form-group" v-if="!showSDose && showVaccine">
                <label
                  >Date:
                  <input type="date" id="sdate" name="sdate" />
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
      </Form>
    </div>
  </div>
</template>

<script>
import { Form } from "vee-validate";

export default {
  name: "AddRole",
  components: {
    Form,
  },
  data() {
    return {
      firstDose: "",
      secondDose: "",
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
      return this.role == "ROLE_PATIENT";
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
