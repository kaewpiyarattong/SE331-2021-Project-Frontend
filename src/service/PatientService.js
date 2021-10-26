import apiClient from "@/service/AxiosClient.js";

export default {
  getPatientsAll() {
    return apiClient.get("/patients");
  },
  getPatients(page, limit) {
    return apiClient.get("/patients" + "?_page=" + page + "&_limit=" + limit);
  },
  getPatientsName(page, limit, name, gender) {
    return apiClient.get(
      "/patients" +
        "?_page=" +
        page +
        "&_limit=" +
        limit +
        "&name=" +
        name +
        "&gender=" +
        gender
    );
  },
  getPatient(id) {
    return apiClient.get("/patient/" + id);
  },
  updateUser(id, user) {
    return apiClient.post("/patient/" + id, user);
  },
};
