import apiClient from "@/service/AxiosClient.js";

export default {
  getPatientsAll() {
    return apiClient.get("/patients");
  },
  getPatients(page, limit) {
    return apiClient.get("/patients" + "?_page=" + page + "&_limit=" + limit);
  },
  getPatient(id) {
    return apiClient.get("/patient/" + id);
  },
  postSuggestion(id, user) {
    return apiClient.put("/patient/" + id, user);
  },
};
