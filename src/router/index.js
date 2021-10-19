import { createRouter, createWebHistory } from "vue-router";
import PatientList from "../views/PatientList.vue";
import AvailableVaccine from "@/views/AvailableVaccine.vue";
import Report from "../views/Report.vue";
import Layout from "@/views/PatientLayout/Layout.vue";
import PatientDetail from "@/views/PatientLayout/PatientDetail.vue";
import VaccineDetail from "@/views/PatientLayout/VaccineDetail.vue";
import PatientService from "@/service/PatientService";
import VaccineService from "@/service/VaccineService";
import Gstore from "@/store";
import Nprogress from "nprogress";
import NotFound from "@/views/NotFound.vue";
import NetworkError from "@/views/NetworkError.vue";

const routes = [
  {
    path: "/",
    name: "PatientList",
    component: PatientList,
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
      limit: parseInt(route.query.limit) || 9,
    }),
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
  },
  {
    path: "/404/:resource",
    name: "NotFound",
    component: NotFound,
    props: true,
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
      return VaccineService.getVaccines()
        .then((res) => {
          Gstore.vaccines = res.data;
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
    path: "/patient/:id",
    name: "Layout",
    props: true,
    component: Layout,
    beforeEnter: (to) => {
      return PatientService.getPatient(to.params.id)
        .then((res) => {
          // console.log(res);
          Gstore.patient = res.data;
        })
        .catch((err) => {
          if (err.response && err.response.status == 404) {
            return {
              name: "NotFound",
              params: { resource: "patient" },
            };
          } else {
            return { name: "NetworkError" };
          }
        });
    },
    children: [
      {
        path: "",
        name: "PatientDetail",
        component: PatientDetail,
      },
      {
        path: "vaccinedetail",
        name: "VaccineDetail",
        props: true,
        component: VaccineDetail,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});
router.beforeEach(() => {
  Nprogress.start();
});

router.afterEach(() => {
  Nprogress.done();
});

export default router;
