<template>
  <img
    class="img-fluid"
    src="../assets/banner.png"
    style="width: 650px; height: auto"
  />
  <div
    div
    class="row justify-content-center mt-md-4 mt-sm-4"
    v-if="GStore.vaccines"
  >
    <div
      class="container col-md-9 col-sm-12"
      id="content"
      v-for="(vaccine, index) in GStore.vaccines"
      :key="index"
    >
      <div class="row justify-content-center">
        <div class="container col-md-4 col-sm-12">
          <img
            class="img"
            v-if="vaccine.imageUrls.length"
            :src="vaccine.imageUrls[0]"
            style="height: 280px"
          />
        </div>
        <div class="container col-md-7 col-sm-12">
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Brand:</span
            >
            {{ vaccine.brand }}
          </p>
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Country:</span
            >
            {{ vaccine.country }}
          </p>
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Age Range:</span
            >
            {{ vaccine.ageRange }}
          </p>
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Fully Vaccinated:</span
            >
            {{ vaccine.dose }} dose
          </p>
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >Interval between the first & second dose:</span
            >
            {{ vaccine.duration }}
          </p>
          <p>
            <span class="font-weight-bold p-1 rounded mr-1" id="title"
              >sideEffect:</span
            >
            {{ vaccine.sideEffect }}
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "available-vaccine",
  inject: ["GStore"],
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
#content {
  border: 1px solid #39bbc7;
  border-radius: 10px;
  background-color: #9addd1;
  padding-top: 20px;
  margin: 10px auto 10px auto;
}
</style>
