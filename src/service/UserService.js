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
  updateUser(id, user) {
    console.log(user);
    return apiClient.post("/user/" + id, user);
  },
  deleteUserById(id) {
    return apiClient.post("/user/" + id + "/delete");
  },
};
