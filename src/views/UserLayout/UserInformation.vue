<template>
  <div class="row justify-content-center mt-md-3 mt-sm-2">
    <div class="col-md-5 col-sm-12 mt-3" style="color: black;">
        {{data.user}}
        <p>{{data.user.username}}</p>
      <!-- add User's image
      <img
        class="img-thumbnail"
          v-if="GStore.user.imageUrl.length"
          :src="GStore.user.imageUrl"
        style="height: 300px"
      />
      <img
        class="img-thumbnail"
        src="https://i.pinimg.com/474x/04/f0/42/04f0421b45476cc63c3266a70a9de1b7--worlds-largest-mondo.jpg"
        style="height: 300px"
        v-else
      /> -->
    </div>
    <!-- <div class="col-md-5 col-sm-12 mt-3" style="color: black;">
        <h3>User's detail</h3>
        <div class="container mt-5">
            <p>
                <strong id="title">Name:</strong>{{ data.user.firstname }}
                {{ data.user.lastname }}
            </p>
        </div>
    </div> -->
    </div>
</template>
<script>

export default {
    props: ['data']

    
};
</script>
<style scoped>
#content {
  border: 1px solid #35393d;
  border-radius: 6px;
  background-color: #9addd1;
  margin-top: 15px;
  
}
#title {
  background-color: #00c2cb;
  margin-right: 5px;
  border-radius: 2px;
  padding-left: 5px;
}
</style>
