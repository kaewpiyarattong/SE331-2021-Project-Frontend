<template>
  <div class="col-md-6 col-sm-12">
    <h4>{{ dosenum }} dose</h4>
    <pie-chart
      :data="[
        ['Astrazeneca', this.data.az],
        ['Sinovac', this.data.sv],
        ['Sinopharm', this.data.sp],
      ]"
      :colors="['#d6a4eb', '#e0858c', '#81f9c9']"
    ></pie-chart>
  </div>
</template>
<script>
// import PatientService from "@/service/PatientService.js";

export default {
  name: "pchart",
  props: ["data", "dosenum"],
};
</script>
