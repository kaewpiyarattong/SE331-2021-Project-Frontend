import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL,
  withCredentials: false,
});

export default {
  getPatientsAll() {
    return apiClient.get("/patients");
  },
  getPatients(page, limit) {
    return apiClient.get("/patients" + "?_page=" + page + "&_limit=" + limit);
  },
  getPatient(id) {
    return apiClient.get("/patients/" + id);
  },
  postSuggestion(id, suggest) {
    return apiClient.put("/patients/" + id, suggest);
  },
  getAstrazeneca(dose) {
    if (dose == 1) {
      return apiClient.get(
        "/patients/?vaccination.firstdose.brand=Astrazeneca"
      );
    }
    return apiClient.get("/patients/?vaccination.seconddose.brand=Astrazeneca");
  },
  getSinovac(dose) {
    if (dose == 1) {
      return apiClient.get("/patients/?vaccination.firstdose.brand=Sinovac");
    }
    return apiClient.get("/patients/?vaccination.seconddose.brand=Sinovac");
  },
  getSinopharm(dose) {
    if (dose == 1) {
      return apiClient.get("/patients/?vaccination.firstdose.brand=Sinopharm");
    }
    return apiClient.get("/patients/?vaccination.seconddose.brand=Sinopharm");
  },
};
