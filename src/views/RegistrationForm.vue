<template>
  <div class="col-md-12">
    <div class="col-md-9 col-sm-12" id="content">
      <img
        id="profile-img"
        src="../assets/person.png"
        class="profile-img-card"
      />
      <Form @submit="handleRegister" :validation-schema="schema">
        <div v-if="!successful">
          <div class="row justify-content-center">
            <div class="col-12 col-md-5 col-sm-12 pr">
              <!-- Add username -->
              <div class="form-group">
                <Field
                  placeholder="Username"
                  name="username"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage name="username" class="error-feedback" />
              </div>

              <!-- Add Firstname -->
              <div class="form-group">
                <Field
                  placeholder="First name"
                  name="firstname"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage name="firstname" class="error-feedback" />
              </div>

              <!-- Add Lastname -->
              <div class="form-group">
                <Field
                  placeholder="Last name"
                  name="lastname"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage name="lastname" class="error-feedback" />
              </div>

              <!-- Add Hometown -->
              <div class="form-group">
                <Field
                  placeholder="Home Town"
                  name="hometown"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage name="hometown" class="error-feedback" />
              </div>

              <!-- Add tel -->
              <div class="form-group">
                <Field
                  placeholder="Telephone number"
                  name="tel"
                  type="text"
                  class="form-control"
                />
                <ErrorMessage name="tel" class="error-feedback" />
              </div>

              <!-- Add Email -->
              <div class="form-group">
                <Field
                  placeholder="Email"
                  name="email"
                  type="email"
                  class="form-control"
                />
                <ErrorMessage name="email" class="error-feedback" />
              </div>

              <!-- Add password -->
              <div class="form-group">
                <Field
                  placeholder="Password"
                  name="password"
                  type="password"
                  class="form-control"
                />
                <ErrorMessage name="password" class="error-feedback" />
              </div>
            </div>
            <div class="col-12 col-md-5 col-sm-12">
              <!-- Add Age -->
              <div class="form-group">
                <Field
                  placeholder="Age"
                  name="age"
                  type="age"
                  class="form-control"
                />
                <ErrorMessage name="age" class="error-feedback" />
              </div>

              <!-- Add gender -->
              <div class="form-group">
                <Field name="gender" type="radio" value="FEMALE"></Field> Female
                <Field name="gender" type="radio" value="MALE"></Field> Male
                <Field name="gender" type="radio" value="OTHERS"></Field> Others
                <p><ErrorMessage name="gender" class="error-feedback" /></p>
              </div>

              <!-- Add photo -->
              <div class="form-group">
                <UploadImages
                  name="photo"
                  type="photo"
                  @changed="handleImages"
                  :max="1"
                />
              </div>
            </div>
            <!-- button Sing up -->
            <div class="form-group">
              <button
                id="button"
                class="btn btn-primary btn-block"
                :disabled="loading"
              >
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </Form>
      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      ></div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
// eslint-disable-next-line
import AuthService from '@/service/AuthService.js'
import UploadImages from "vue-upload-drop-images";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
    UploadImages,
  },
  // eslint-disable-next-line
  inject: ['GStore'],
  data() {
    const schema = yup.object().shape({
      username: yup
        .string()
        .required("Username is required!")
        .min(3, "Must be at least 3 characters!")
        .max(20, "Must be maximum 20 characters!"),
      firstname: yup
        .string()
        .required("First name is required!")
        .max(50, "Must be maximum 50 characters!"),
      lastname: yup
        .string()
        .required("Home town is required!")
        .max(50, "Must be maximum 50 characters!"),
      tel: yup
        .string()
        .required("Telephone number is required!")
        .max(10, "Must be maximum 10 characters!"),
      hometown: yup
        .string()
        .required("Telephone number is required!")
        .max(50, "Must be maximum 50 characters!"),
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
      age: yup.string().required("Age is required!"),
      gender: yup.string().required("Gender is required!"),
    });
    return {
      successful: false,
      loading: false,
      message: "",
      schema,
      files: [],
    };
  },
  // mounted() {
  //   if (this.GStore.currentUser) {
  //     this.$router.push("/event");
  //   }
  // },

  methods: {
    // eslint-disable-next-line
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      Promise.all(
        this.files.map((file) => {
          return AuthService.uploadFile(file);
        })
      ).then((res) => {
        user.imageUrl = res.map((r) => r.data);
        AuthService.register(user)
          .then(() => {
            this.$router.push({ name: "Login" });
          })
          .catch(() => {
            this.message = "could not register";
          });
      });
    },
    handleImages(files) {
      this.files = files;
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.profile-img-card {
  width: 120px;
  height: 120px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  margin-bottom: 20px;
}

.error-feedback {
  color: rgb(187, 0, 0);
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
</style>
