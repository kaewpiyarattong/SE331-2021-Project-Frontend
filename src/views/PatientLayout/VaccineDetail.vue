<template>
  <div class="row justify-content-center mt-md-4 mt-sm-4">
    <h2 style="color: black">Vaccine's detail</h2>
    <div class="container col-md-12 col-sm-12" id="content">
      <div class="row justify-content-center">
        <div class="col-md-5 col-sm-12">
          <!-- add vaccine's image -->
          <img
            class="img-fluid"
            style="height: 250px"
            src="../../assets/astrazeneca.png"
            v-if="Gstore.patient.vaccination.firstdose.brand == 'Astrazeneca'"
          />
          <img
            class="img-fluid"
            style="height: 250px"
            src="../../assets/sinopharm.png"
            v-else-if="
              Gstore.patient.vaccination.firstdose.brand == 'Sinopharm'
            "
          />
          <img
            class="img-fluid"
            style="height: 250px"
            src="../../assets//sinovac.png"
            v-else
          />
        </div>

        <!-- Show first dose infornation  -->
        <div class="col-md-5 col-sm-12">
          <h3>First dose</h3>
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Brand:</span
            >
            <!-- add Vaccine Brand Name -->
            {{ Gstore.patient.vaccination.firstdose.brand }}
          </p>
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Injected at:</span
            >
            <!-- add Vaccine Brand Name -->
            {{ Gstore.patient.vaccination.firstdose.injected_at }}
          </p>
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Timestamp:</span
            >
            <!-- add timestamp  -->
            {{ Gstore.patient.vaccination.firstdose.timestamp }}
          </p>
          <!-- suggestion box first dose -->
          <form @submit.prevent="addSuggest(1)">
            <input
              type="text"
              placeholder="Suggest for 1st dose"
              v-model="suggest1"
              required
            />
            <button class="btn btn-success btn-sm ml-1">Add</button>
          </form>
          <br />
          <p class="font-weight-bold p-1 d-inline rounded" id="title">
            Suggestion from doctor:
          </p>
          <!-- Show suggestion if no suggestion show  "No suggestion yet" -->
          <ul
            v-if="Gstore.patient.vaccination.firstdose.suggestion.length != 0"
            style="list-style-type: none"
          >
            <li
              v-for="(val, key) in Gstore.patient.vaccination.firstdose
                .suggestion"
              :key="key"
            >
              {{ val }}
            </li>
          </ul>
          <p class="font-weight-bold text-danger mt-3" v-else>
            No suggestion yet
          </p>
        </div>
      </div>
    </div>

    <!-- Show seccond dose infornation if haven't got seccond dose show "Have not got seccond dose yet" -->
    <div
      class="container p-4 mt-3"
      id="content"
      v-if="!Gstore.patient.vaccination.seconddose"
    >
      <h2 class="text-danger">Have not got seccond dose yet</h2>
    </div>
    <div
      class="container p-4 mt-3"
      id="content"
      v-if="Gstore.patient.vaccination.seconddose"
    >
      <div class="row justify-content-center">
        <div class="col-md-5 col-sm-12">
          <!-- add vaccine's image -->
          <img
            class="img-fluid"
            style="height: 250px"
            src="../../assets/astrazeneca.png"
            v-if="Gstore.patient.vaccination.seconddose.brand == 'Astrazeneca'"
          />
          <img
            class="img-fluid"
            style="height: 250px"
            src="../../assets/sinopharm.png"
            v-else-if="
              Gstore.patient.vaccination.seconddose.brand == 'Sinopharm'
            "
          />
          <img
            class="img-fluid"
            style="height: 250px"
            src="../../assets//sinovac.png"
            v-else
          />
        </div>
        <div class="col-md-5 col-sm-12">
          <h3>Second dose</h3>
          <p>
            <span class="font-weight-bold p-1 rounded" id="title">Brand:</span>
            {{ Gstore.patient.vaccination.seconddose.brand }}
          </p>
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Injected at:</span
            >
            <!-- add Vaccine Brand Name -->
            {{ Gstore.patient.vaccination.firstdose.injected_at }}
          </p>
          <p>
            <span class="font-weight-bold p-1 rounded" id="title"
              >Timestamp:</span
            >
            {{ Gstore.patient.vaccination.seconddose.timestamp }}
          </p>

          <!-- suggestion box seccond dose -->
          <form @submit.prevent="addSuggest(2)">
            <input
              type="text"
              placeholder="Suggest for 2nd dose"
              v-model="suggest2"
              required
            />
            <button class="btn btn-success btn-sm ml-1">Add</button>
          </form>
          <br />
          <p class="font-weight-bold p-1 d-inline rounded" id="title">
            Suggestion from doctor:
          </p>
          <!-- suggestion box second dose if no suggestion show  "No suggestion yet"-->
          <ul
            v-if="Gstore.patient.vaccination.seconddose.suggestion.length != 0"
            style="list-style-type: none"
          >
            <li
              v-for="(val, key) in Gstore.patient.vaccination.seconddose
                .suggestion"
              :key="key"
            >
              {{ val }}
            </li>
          </ul>
          <p class="font-weight-bold text-danger mt-3" v-else>
            No suggestion yet
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//
// import PatientService from "@/service/PatientService.js";

export default {
  inject: ["Gstore"],
  data() {
    return {
      suggest1: "",
      suggest2: "",
      newData: null,
    };
  },
  methods: {
    addSuggest(dose) {
      let myTarget = JSON.parse(JSON.stringify(this.Gstore.patient));
      if (dose == 1) {
        myTarget.vaccination.firstdose.suggestion = [
          ...myTarget.vaccination.firstdose.suggestion,
          this.suggest1,
        ];
      } else {
        myTarget.vaccination.seconddose.suggestion = [
          ...myTarget.vaccination.seconddose.suggestion,
          this.suggest2,
        ];
      }
      this.newData = myTarget;
      this.confirmAddSuggest(dose);
    },
    confirmAddSuggest(dose) {
      // Use sweetalert2
      this.$swal
        .fire({
          title: "Do you want to add the suggestion?",
          showDenyButton: true,
          confirmButtonText: `Save`,
          denyButtonText: `Cancel`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.$swal.fire("Suggestion saved!", "", "success");
            if (dose == 1) {
              this.Gstore.patient.vaccination.firstdose.suggestion = [
                ...this.Gstore.patient.vaccination.firstdose.suggestion,
                this.suggest1,
              ];
              this.suggest1 = "";
            } else {
              this.Gstore.patient.vaccination.seconddose.suggestion = [
                ...this.Gstore.patient.vaccination.seconddose.suggestion,
                this.suggest2,
              ];
              this.suggest2 = "";
            }
            // PatientService.postSuggestion(
            //   this.Gstore.patient.id,
            //   this.newData
            // ).catch((err) => {
            //   console.log(err);
            // });

            // setTimeout(() => {
            //   this.$router.go();
            // }, 1000);
          } else {
            this.suggest1 = "";
            this.suggest2 = "";
          }
        });
    },
  },
};
</script>

<style scoped>
#content {
  border: 1px solid #35393d;
  border-radius: 6px;
  background-color: #9addd1;
  padding-top: 20px;
}
#title {
  background-color: #00c2cb;
  margin-right: 5px;
  border-radius: 2px;
  padding-left: 5px;
}
</style>
