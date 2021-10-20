<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h3><strong>Login</strong></h3>
      <img
        id="profile-img"
        src="../assets/person.png"
        class="profile-img-card"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <!-- <label for="username"><strong>Username</strong></label> -->
          <Field
            placeholder="Username"
            name="username"
            type="text"
            class="form-control"
          />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <i class="bi bi-lock"></i>
          <!-- <label for="password"><strong>Password</strong></label> -->
          <Field
            placeholder="Password"
            name="password"
            type="password"
            class="form-control"
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button
            class="btn btn-primary btn-block"
            id="button"
            :disabled="loading"
          >
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <p>Don't have an account? REGISTER HERE(add register page link)</p>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import AuthService from "@/service/AuthService.js";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  methods: {
    handleLogin(user) {
      AuthService.login(user)
        .then(() => {
          this.$router.push({ name: "EventList" });
        })
        .catch(() => {
          this.message = "could not login";
        });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}
.card {
  background-color: #6ec2b8;
  padding: 0px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 10px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  color: #09555e;
}
.profile-img-card {
  width: 120px;
  height: 120px;
  margin: 20px auto 30px auto;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
.error-feedback {
  color: rgb(187, 0, 0);
}
#button {
  color: white;
  background-color: #28787a;
}
</style>
