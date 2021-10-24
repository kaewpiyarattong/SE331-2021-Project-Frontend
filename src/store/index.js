import { reactive } from "vue";

export default reactive({
  patient: null,
  vaccines: null,
  currentUser: JSON.parse(localStorage.getItem("user")),
  authorities: null,
});
