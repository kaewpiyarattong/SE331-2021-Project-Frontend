<template>
  <div class="row justify-content-center">
    <img
      class="img-fluid"
      src="../assets/banner.png"
      style="width: 650px; height: auto"
    />
    <div class="container mt-2">
      <div
        class="row mb-4 p-5 rounded"
        id="vaccineBox"
        v-for="vaccine in Gstore.vaccines"
        :key="vaccine.id"
      >
        <!-- vaccine pic -->
        <div class="col-md-4">
          <img
            class="img-fluid mt-3"
            src="../assets/astrazeneca.png"
            style="width: 300px"
            v-if="vaccine.brand == 'Astrazeneca'"
          />
          <img
            class="img-fluid mt-3"
            src="../assets/sinovac.png"
            style="width: 300px"
            v-else-if="vaccine.brand == 'Sinovac'"
          />
          <img
            class="img-fluid mt-3"
            src="../assets/sinopharm.png"
            style="width: 300px"
            v-else
          />
        </div>

        <!-- vaccine details -->
        <div class="col-md-7">
          <!-- <h1>  add vaccine brand </h1> -->
          <h1>{{ vaccine.brand }}</h1>
          <p>
            <span class="font-weight-bold p-1 mr-2 rounded" id="title"
              >Country:</span
            >
            <!-- add vaccine country  -->
            {{ vaccine.country }}
          </p>
          <p>
            <span class="font-weight-bold p-1 mr-2 rounded" id="title"
              >Age recommend:</span
            >
            <!-- add vaccine age range -->
            {{ vaccine.ageRange }}
          </p>
          <p>
            <span class="font-weight-bold p-1 mr-2 rounded" id="title"
              >Dose:</span
            >
            <!-- add vaccine dose   -->
            {{ vaccine.dose }} dose(s)
          </p>
          <p>
            <a
              :href="vaccine.website"
              class="btn btn-info p-1 rounded"
              target="_blank"
            >
              Website
            </a>
          </p>
          <h5 class="font-weight-bold px -1 rounded d-inline px-1" id="title">
            Side effects:
          </h5>
          <!-- add side effect -->
          <ul style="list-style-type: none">
            <li v-for="(effect, key) in vaccine.sideEffect" :key="key">
              {{ effect }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "available-vaccine",
  inject: ["Gstore"],
};
</script>

<style scoped>
#vaccineBox {
  background-color: #9addd1;
  color: black;
  border-radius: 30px;
}
#title {
  background-color: #00c2cb;
}
</style>
