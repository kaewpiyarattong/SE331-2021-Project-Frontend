<template>
  <div class="notfound container mt-5">
    <h2>Oops!</h2>
    <h3>The {{ resource }} you're looking for is not here.</h3>
    <router-link :to="{ name: 'PatientList' }"
      >Back to the home page</router-link
    >
  </div>
</template>
<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: "page",
    },
  },
};
</script>
<style>
.notfound {
  min-height: 85vh;
  color: black;
}
</style>
