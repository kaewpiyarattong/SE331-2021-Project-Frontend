import { createRouter, createWebHistory } from "vue-router";
import UserList from "../views/UserList.vue";
import AvailableVaccine from "@/views/AvailableVaccine.vue";
import Layout from "@/views/UserLayout/Layout.vue";
import UserInformation from "@/views/UserLayout/UserInformation.vue";
import VaccineDetail from "@/views/UserLayout/VaccineDetail.vue";
import UserService from "@/service/UserService";
import VaccineService from "@/service/VaccineService";
import Nprogress from "nprogress";
import NotFound from "@/views/NotFound.vue";
import PatientInformation from "@/views/PatientInformation.vue";
import NetworkError from "@/views/NetworkError.vue";
import Login from "@/views/LoginForm.vue";
import Register from "@/views/RegistrationForm.vue";
import AddRole from "@/views/UserLayout/AddRole.vue";
import GStore from "@/store";
import AuthorityService from "../service/AuthorityService";
import PatientService from "@/service/PatientService.js";

const routes = [
  {
    path: "/",
    name: "UserList",
    component: UserList,
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
      limit: parseInt(route.query.limit) || 9,
    }),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/404/:resource",
    name: "NotFound",
    component: NotFound,
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/:catchAll(.*)",
    name: "PageNotFound",
    component: NotFound,
  },
  {
    path: "/network-error",
    name: "NetworkError",
    component: NetworkError,
  },
  {
    path: "/availableVaccine",
    name: "AvailableVaccine",
    component: AvailableVaccine,
    beforeEnter: () => {
      GStore.vaccines = null;
      return VaccineService.getVaccines()
        .then((res) => {
          GStore.vaccines = res.data;
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            return {
              name: "NotFound",
              params: { resource: "vaccine" },
            };
          } else {
            return { name: "NetworkError" };
          }
        });
    },
  },
  {
    path: "/user/:id",
    name: "Layout",
    props: true,
    component: Layout,
    beforeEnter: (to) => {
      GStore.user = null;
      AuthorityService.getAuthorities()
        .then((res) => (GStore.authorities = res.data))
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            return {
              name: "NotFound",
              params: { resource: "role" },
            };
          } else {
            return { name: "NetworkError" };
          }
        });
      VaccineService.getVaccinesForAdd()
        .then((res) => (GStore.vaccines = res.data))
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            return {
              name: "NotFound",
              params: { resource: "vaccine" },
            };
          } else {
            return { name: "NetworkError" };
          }
        });
      if (GStore.currentUser.authorities[0].name == "ROLE_ADMIN") {
        UserService.getUser(to.params.id)
          .then((res) => {
            GStore.user = res.data;
          })
          .catch((err) => {
            if (err.response && err.response.status == 404) {
              return {
                name: "NotFound",
                params: { resource: "user" },
              };
            } else {
              return { name: "NetworkError" };
            }
          });
      } else {
        PatientService.getPatient(to.params.id)
          .then((res) => {
            GStore.user = res.data.user;
          })
          .catch((err) => {
            if (err.response && err.response.status == 404) {
              return {
                name: "NotFound",
                params: { resource: "user" },
              };
            } else {
              return { name: "NetworkError" };
            }
          });
      }
    },

    children: [
      {
        path: "",
        name: "UserInformation",
        component: UserInformation,
      },
      {
        path: "vaccinedetail",
        name: "VaccineDetail",
        props: true,
        component: VaccineDetail,
      },
      {
        path: "add-role",
        name: "AddRole",
        props: true,
        component: AddRole,
      },
    ],
  },
  {
    path: "/PatientInformation",
    name: "PatientInformation",
    component: PatientInformation,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});
router.beforeEach((to, from, next) => {
  let user = JSON.parse(localStorage.getItem("user"));
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem("user") == null) {
      next({ name: "Login" });
    } else if (user.authorities[0].name == "ROLE_PATIENT" && to.path == "/") {
      next({ name: "PatientInformation", params: user.id });
    } else {
      next(); // go to wherever I'm going
    }
  } else {
    next(); // does not require auth, make sure to always call next()!
  }
  Nprogress.start();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
