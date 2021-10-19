import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: false,
});

export default {
  getVaccines() {
    return apiClient.get("/vaccines");
  },
};
