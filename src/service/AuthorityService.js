import apiClient from "@/service/AxiosClient.js";

export default {
  getAuthorities() {
    return apiClient.get("/authorities");
  },
};
