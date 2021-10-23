import apiClient from "@/service/AxiosClient.js";

export default {
  getUsersAll() {
    return apiClient.get("/users");
  },
  getUserS(page, limit) {
    return apiClient.get("/users" + "?_page=" + page + "&_limit=" + limit);
  },
  getuser(id) {
    return apiClient.get("/user/" + id);
  },
  postSuggestion(id, user) {
    return apiClient.put("/patient/" + id, user);
  },
};
