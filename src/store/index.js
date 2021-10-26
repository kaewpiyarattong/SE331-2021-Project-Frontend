import { reactive } from "vue";

export default reactive({
  user: null,
  vaccines: null,
  currentUser: JSON.parse(localStorage.getItem("user")),
  authorities: null,
  doctors: null,
});
