import axios from "axios";

export default {
  login(login, password) {
    return axios.post("/api/login", {
      username: login,
      password: password
    });
  },
  signUp(login, password) {
    return axios.post("/api/users/sign-up", {
      username: login,
      password: password
    });
  }
}