import apiClient from "@/service/AxiosClient.js";

export default {
  getUsersAll() {
    return apiClient.get("/users");
  },
  getUsers(page, limit) {
    return apiClient.get("/users" + "?_page=" + page + "&_limit=" + limit);
  },
  getUsersName(name, page, limit) {
    return apiClient.get(
      "/users" + "?_page=" + page + "&_limit=" + limit + "name=" + name
    );
  },
  getuser(id) {
    return apiClient.get("/user/" + id);
  },
  postSuggestion(id, user) {
    return apiClient.put("/patient/" + id, user);
  },
};
