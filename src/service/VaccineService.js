import apiClient from "@/service/AxiosClient.js";

export default {
  getVaccines() {
    return apiClient.get("/vaccines");
  },
  getVaccinesForAdd() {
    return apiClient.get("/vaccinesForAdd");
  },
};
