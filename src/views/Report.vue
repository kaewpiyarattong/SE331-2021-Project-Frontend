<template>
  <div class="row mt-4 p-4 rounded justify-content-center mx-4" id="chart">
    <h2 class="text px-3 rounded mt-5" id="title">
      Total vaccine brand injection
    </h2>
    <BarChart :fdose="fdose" :sdose="sdose"></BarChart>
    <h2 class="text px-3 rounded mt-5" id="title">
      Vaccine brand injection of each dose
    </h2>
    <PieChart :data="fdose" dosenum="First" style="color: black"></PieChart>
    <PieChart :data="sdose" dosenum="Second" style="color: black"></PieChart>
  </div>
</template>
<script>
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";
import PatientService from "@/service/PatientService.js";

export default {
  name: "Report",
  components: {
    PieChart,
    BarChart,
  },
  data() {
    return {
      fdose: { az: null, sv: null, sp: null },
      sdose: { az: null, sv: null, sp: null },
    };
  },
  created() {
    PatientService.getAstrazeneca(1)
      .then((res) => {
        this.fdose.az = res.data.length;
      })
      .catch((e) => {
        console.log(e);
      });
    PatientService.getAstrazeneca(2)
      .then((res) => {
        this.sdose.az = res.data.length;
      })
      .catch((e) => {
        console.log(e);
      });
    PatientService.getSinovac(1)
      .then((res) => {
        this.fdose.sv = res.data.length;
      })
      .catch((e) => {
        console.log(e);
      });
    PatientService.getSinovac(2)
      .then((res) => {
        this.sdose.sv = res.data.length;
      })
      .catch((e) => {
        console.log(e);
      });
    PatientService.getSinopharm(1)
      .then((res) => {
        this.fdose.sp = res.data.length;
      })
      .catch((e) => {
        console.log(e);
      });
    PatientService.getSinopharm(2)
      .then((res) => {
        this.sdose.sp = res.data.length;
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
<style scoped>
#title {
  background-color: #2adbd0;
  color: black;
}
</style>
