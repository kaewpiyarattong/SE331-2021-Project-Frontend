import apiClient from "@/service/AxiosClient.js";

export default {
  getDoctorsAll() {
    return apiClient.get("/doctors");
  },
  getDoctorsForAdd() {
    return apiClient.get("/doctorsForAdd");
  },
  getDoctors(page, limit) {
    return apiClient.get("/doctors" + "?_page=" + page + "&_limit=" + limit);
  },
  getDoctor(id) {
    return apiClient.get("/doctor/" + id);
  },
  postSuggestion(id, user) {
    return apiClient.put("/doctor/" + id, user);
  },
};
