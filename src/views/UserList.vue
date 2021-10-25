<template>
  <div class="home">
    <img class="img-fluid mb-3" src="../assets/logo.png" />
    <div class="row justify-content-center">
      <div class="col-md-3 col-sm-12 p-4 mt-md-3" id="sidebar">
        <div class="container mb-3 p-3 rounded" id="insidebar">
          <h5>Vaccine Brands</h5>
          <div class="row mt-3">
            <img src="../assets/astrazeneca.png" style="width: 50px" />
            <label class="text mt-3">Astrazeneca</label>
          </div>

          <div class="row mt-3">
            <img src="../assets/sinovac.png" style="width: 50px" />
            <label class="text mt-3">Sinovac</label>
          </div>
          <div class="row mt-3">
            <img src="../assets/sinopharm.png" style="width: 50px" />
            <label class="text mt-3">Sinopharm</label>
          </div>
        </div>
        <button
          class="btn mb-3 mt-3"
          id="button"
          @click="filterShow = !filterShow"
        >
          <span v-if="!filterShow">Show Filters</span>
          <span v-else>Close Filters</span>
        </button>
        <div :class="{ collapse: !filterShow }">
          <form>
            <!-- Filter name -->
            <div class="form-group">
              <h5>Search by name or username:</h5>
              <input
                class="form-control"
                type="text"
                v-model="search"
                placeholder="Name or Username"
              />
            </div>

            <!-- Filter gender -->
            <div class="form-group">
              <h5>Filter gender</h5>
              <select
                class="form-control"
                id="gender"
                v-model="gender"
              >
                <option value="">Any</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>

            <!-- Filter age -->
            <div class="form-group">
              <h5>Filter by age range:</h5>
              <span v-if="age != 75"> 5 </span>
              <input type="range" v-model="age" min="10" max="75" step="5" />
              <span>{{ age }}</span>
              <span v-if="age == 75">+ </span>
            </div>

            <!-- Filter Role -->
            <div class="form-group">
              <h5>Filter role</h5>
              <select class="form-control" id="role" >
                <option value="">Any</option>
                <option value="ROLE_ADMIN">Admin</option>
                <option value="ROLE_DOCTOR">Docter</option>
                <option value="ROLE_PATIENT">Patient</option>
                <option>No role</option>
              </select>
            </div>
          </form>
          <button
            class="btn btn-outline-danger rounded btn-sm mt-2"
            @click="clearFilter"
          >
            Clear the filter
          </button>
        </div>
      </div>
      <div class="col-md-8 col-sm-12 p-3 mt-3 ml-md-4" id="content">
        <p
          v-if="search!=null"
        >
          All users: {{ totalUsers }}
        </p>
        <p v-else>Filter found: {{ totalUsers }}</p>

        <div class="row row-cols-1 row-cols-md-3 g-4">
          <Card v-for="user in users" :user="user" :key="user.id"></Card>
        </div>
        <nav
          class="navbar mt-10 justify-content-center"
          v-if="filterPatientList != 0"
        >
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <router-link
                class="page-link"
                :to="{ name: 'UserList', query: { page: page - 1 } }"
                >Previous</router-link
              >
            </li>
            <li class="page-link">{{ page }}</li>
            <li class="page-item">
              <router-link
                class="page-link"
                :to="{ name: 'UserList', query: { page: page + 1 } }"
                v-if="hasNextPage"
                >Next</router-link
              >
            </li>
          </ul>
        </nav>
        <h3 class="text text-danger mt-4" v-else>
          There is no one you are looking for.
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card";
import { watchEffect } from "@vue/runtime-core";
import AuthService from "@/service/AuthService.js";
import UserService from "@/service/UserService.js";
import PatientService from "@/service/PatientService.js";

export default {
  name: "UserList",
  components: {
  Card,
  },
  data() {
    return {
      filterShow: false,
      users: null,
      search: "",
      gender:"",
      age: 75,
      totalUsers: null,      
    };
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
  },
  async created() {
    await watchEffect(() => {
      if (
        JSON.parse(localStorage.getItem("user")).authorities[0].name ==
        "ROLE_ADMIN"
      ) {
        if(this.search!= null){
          UserService.getUsersName(this.search, this.gender, this.page, this.limit)
          .then((res) => {
            this.users = res.data;
            this.totalUsers = res.headers["x-total-count"];
          })
          .catch((e) => {
            console.log(e);
          });
        }else{
          UserService.getUsers(this.page, this.limit)
          .then((res) => {
            this.users = res.data;
            this.totalUsers = res.headers["x-total-count"];
          })
          .catch((e) => {
            console.log(e);
          });
        }

       
      } else {
        PatientService.getPatients(this.page, this.limit)
          .then((res) => {
            this.users = res.data;
            this.totalUsers = res.headers["x-total-count"];
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  },

  methods: {
    clearFilter() {
     
      this.search = "";
      this.age = 75;
      this.$swal.fire(
        "Clear succesfully!",
        "You have cleared up the filter",
        "success"
      );
      this.window.scroll(0, 0);
    },
    // filterByName(patients) {
    //   return patients.filter((patient) => {
    //     return patient.firstname
    //       .toLowerCase()
    //       .includes(this.search.toLowerCase());
    //   });
    // },
    // filterByFBrand(patients) {
    //   return patients.filter((patient) => {
    //     return patient.vaccination.firstdose.brand == this.selected.fbrand;
    //   });
    // },
    // filterBySBrand(patients) {
    //   return patients.filter((patient) => {
    //     return patient.vaccination.seconddose != null
    //       ? patient.vaccination.seconddose.brand == this.selected.sbrand
    //       : null;
    //   });
    // },
    // filterByGender(patients) {
    //   return patients.filter((patient) => {
    //     return patient.gender == this.selected.gender;
    //   });
    // },
    // filterByAgeRange(patients) {
    //   return patients.filter((patient) => {
    //     return this.age < 75 ? patient.age <= this.age : patient.age >= 5;
    //   });
    // },
    // filterByRole() {},
  },
  computed: {
      hasNextPage() {
        let totalPage = Math.ceil(this.totalUsers / this.limit);
        return this.page < totalPage;
      },
    //   filterPatientList() {
    //     let npatients = this.patients;
    //     if (this.search != "") {
    //       npatients = this.filterByName(npatients);
    //     }
    //     if (this.selected.fbrand != "Any") {
    //       npatients = this.filterByFBrand(npatients);
    //     }
    //     if (this.selected.sbrand != "Any") {
    //       npatients = this.filterBySBrand(npatients);
    //     }
    //     if (this.selected.gender != "Any") {
    //       npatients = this.filterByGender(npatients);
    //     }
    //     if (this.age < 75) {
    //       npatients = this.filterByAgeRange(npatients);
    //     }
    //     // filterByRole
    //     return npatients;
    //   },
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
    isDoctor() {
      return AuthService.hasRoles("ROLE_DOCTOR");
    },
  },
};
</script>

<style>
#content {
  border: 1px solid #39bbc7;
  border-radius: 6px;
  background-color: #9addd1;
  color: black;
}

#sidebar {
  border: 1px solid #27828b;
  border-radius: 6px;
  background-color: #9addd1;
  height: fit-content;
  color: black;
}

#insidebar {
  border: 1px solid #27828b;
  border-radius: 6px;
  background-color: #86d4cb;
  height: fit-content;
  color: black;
}

#button {
  background-color: #39bbc7;
}
</style>
