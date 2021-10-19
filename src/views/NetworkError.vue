<template>
  <div class="network container mt-5">
    <h2>Uh-Oh!</h2>
    <h3>
      It looks like you're experiencing some network issues, please take a
      breath and
      <a href="#" @click="$router.go(-1)">click here</a> to try again.
    </h3>
  </div>
</template>
<style>
.network {
  min-height: 85vh;
  color: black;
}
</style>
