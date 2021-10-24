<template>
  <div class="col-md-12">
    <div class="col-md-9 col-sm-12" id="content">
      <h3>Patient's detail</h3>
      <div class="form-group">
        <select class="form-control" id="role">
          <option selected disabled hidden>Select Role</option>
          <option>Admin</option>
          <option>Docter</option>
          <option>Patient</option>
        </select>
      </div>
      <!-- Add 1st vaccine -->
      <div class="form-group">
        <select class="form-control">
          <option selected disabled hidden>Add 1st vaccine</option>
          <option>Astrazeneca</option>
          <option>Sinovac</option>
          <option>Sinopharm</option>
        </select>
      </div>

      <!-- Add 1st date date -->
      <div class="form-group">
        <label
          >Date:
          <input type="date" id="fdate" name="fdate" />
        </label>
      </div>

      <!-- Add 2nd vaccine -->
      <div class="form-group">
        <select class="form-control">
          <option selected disabled hidden>Add 2nd vaccine</option>
          <option>-</option>
          <option>Astrazeneca</option>
          <option>Sinovac</option>
          <option>Sinopharm</option>
        </select>
      </div>
      <!-- Add 2st date date -->
      <div class="form-group">
        <label
          >Date:
          <input type="date" id="sdate" name="sdate" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddRole",
};
</script>

<style scoped>
.profile-img-card {
  width: auto;
  height: 200px;
  margin: 0 auto 15px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  margin-bottom: 20px;
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
  width: 200px;
}

#content {
  border: 1px solid #39bbc7;
  border-radius: 10px;
  background-color: #9addd1;
  color: black;
  margin: auto;
  padding-top: 20px;
}
h3 {
  margin-bottom: 20px;
}
</style>
