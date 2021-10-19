import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Gstore from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";

createApp(App)
  .provide("Gstore", Gstore)
  .use(router)
  .use(VueSweetalert2)
  .use(VueChartkick)
  .mount("#app");
