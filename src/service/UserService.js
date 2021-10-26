import apiClient from "@/service/AxiosClient.js";

export default {
  getUsersAll() {
    return apiClient.get("/users");
  },
  getUsers(page, limit) {
    return apiClient.get("/users" + "?_page=" + page + "&_limit=" + limit);
  },
  getUsersName(page, limit, name, gender) {
    return apiClient.get(
      "/users" +
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
  getUser(id) {
    return apiClient.get("/user/" + id);
  },
  postSuggestion(id, user) {
    return apiClient.put("/patient/" + id, user, { useCredentails: true });
  },
  deleteUserById(id) {
    return apiClient.delete("/user/" + id);
  },
};
