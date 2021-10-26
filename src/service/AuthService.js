import apiClient from "@/service/AxiosClient.js";
import GStore from "@/store";

export default {
  login(user) {
    return apiClient
      .post("/auth", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        GStore.currentUser = response.data.user;
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  register(user) {
    return apiClient
      .post("/register", {
        username: user.username,
        password: user.password,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        hometown: user.hometown,
        tel: user.tel,
        age: user.age,
        imageUrl: user.imageUrl,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        GStore.currentUser = response.data.user;
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    GStore.currentUser = null;
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  hasRoles(role) {
    if (GStore.currentUser && role) {
      let containRoles = GStore.currentUser.authorities[0].name;
      if (containRoles == role) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  uploadFile(file) {
    let formData = new FormData();
    formData.append("file", file);
    return apiClient.post("/uploadFile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
