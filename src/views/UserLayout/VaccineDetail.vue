<template>
  <div class="row justify-content-center mt-md-4 mt-sm-4" v-if="GStore.user">
    <div class="container col-md-12 col-sm-12" v-if="this.GStore.user.vaccination.length!==0">
    <div
      class="container col-md-9 col-sm-12"
      id="content"
      v-for="(vaccine, index) in GStore.user.vaccination"
      :key="index"
     
    >
      <div class="row justify-content-center" >
        <div class="container col-md-4 col-sm-12">
          <img
            v-if="vaccine.imageUrls.length"
            :src="vaccine.imageUrls[0]"
            style="height: 150px"
          />
        </div>
        <div class="container col-md-7 col-sm-12">
          <h4>Dose {{ index + 1 }} detail</h4>
          <!-- add Vaccine Brand -->
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Brand:</span
            >
            {{ vaccine.brand }}
          </p>
          <!-- Add Vaccine Inject -->
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Injected on:</span
            >
            {{ GStore.user.injectedAt[index] }}
          </p>
          <!-- Add Suggestion -->
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Suggestion:</span
            >
            <ul v-if="index == 0">
              <li v-for="(s,i) in showSuggestF" :key="i" >{{s}}</li>
            </ul>
            
            <ul v-if="index == 1">
              <li v-for="(s,i) in showSuggestS" :key="i" >{{s}}</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
    </div>

    <div v-else class="container col-md-9 col-sm-12" style="color: red">
      <h2>Have not vaccine informatiom yet</h2>
    </div>

    <div
      class="container col-md-9 col-sm-12"
      id="content"
      v-if="isDoctor"
    >
      <form @submit.prevent="addSuggest" >
        <select v-model="selectDose" id="selectOption">
          <option value="">--Select Dose--</option>
          <option
            v-if="GStore.user.vaccination.length > 0"
            value="First Dose: "
          >
            1 st Dose
          </option>
          <option
            v-if="GStore.user.vaccination.length > 1"
            value="Second Dose: "
          >
            2 nd Dose
          </option>
        </select>
        <input id="input" type="text" v-model="suggestion" v-if="!showInput" />
        <button id="button" class="btn btn-primary btn-block">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
import UserService from "@/service/UserService";
import AuthService from "@/service/AuthService.js";
import PatientService from "@/service/PatientService.js";

export default {
  inject: ["GStore"],
  data() {
    return {
      suggestion: "",
      selectDose: "",
      newData: null,
    };
  },
  methods: {
    addSuggest() {
        let myTarget = JSON.parse(JSON.stringify(this.GStore.user));
        if(this.GStore.currentUser.authorities[0].name == "ROLE_ADMIN"){
          myTarget.suggestion = [...myTarget.suggestion, this.combineSuggest];
          this.newData = myTarget;
          UserService.updateUser(this.GStore.user.id, this.newData);
        }else{
          myTarget.suggestion = [...myTarget.suggestion, this.combineSuggest];
          this.newData = myTarget;
          let obj = {}
          obj["id"] = this.$router.currentRoute.value.params.id
          obj["user"] = this.newData
         console.log(obj)
          PatientService.updateUser(this.$router.currentRoute.value.params.id, obj)
        }
      this.$router.go();
    },
    // hideVaccine(){
    //   if(this.GStore.user.vaccination.length == 0){
    //     return true
    //   }
    // }
  },
  computed: {
    showInput() {
      return this.selectDose == "";
    },
    combineSuggest() {
      return this.selectDose + this.suggestion;
    },
    isDoctor() {
      return AuthService.hasRoles("ROLE_DOCTOR");
    },
    showSuggestF(){
              // return this.GStore.user.suggestion.filter(item => item.startsWith("Second"))
        return this.GStore.user.suggestion.filter(item => item.startsWith("First"))
    },
    showSuggestS(){
        return this.GStore.user.suggestion.filter(item => item.startsWith("Second"))
    }
    
  },
 
};
</script>

<style scoped>
#content {
  border: 1px solid #39bbc7;
  border-radius: 10px;
  background-color: #9addd1;
  padding-top: 20px;
  margin: 10px auto 10px auto;
}
#title {
  background-color: #00c2cb;
  margin-right: 5px;
  border-radius: 2px;
  padding-left: 5px;
}
#button {
  color: white;
  background-color: #28787a;
  margin: 10px auto 10px auto;
  width: 150px;
}
#selectOption {
  margin-right: 30px;
  border-radius: 3px;
  background-color: #54d3c2;
}
#input {
  border-radius: 3px;
  width: 320px;
  background-color: #b7e9e0;
}

</style>
