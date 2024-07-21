import axios from "axios";

const API_URL = "http://localhost:8082/api/auth/";

const register = (username, email, password, roles) => {
  return axios
    .post(API_URL + "signup", {
      username,
      email,
      password,
      roles,
    })
    .then((response) => {
      if (response.data) {
        console.log("herreeeee");
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      // if (response.data.token) {
      if (response.data) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("hr", JSON.stringify(response.data.hr));
        localStorage.setItem(
          "candidate",
          JSON.stringify(response.data.candidate)
        );
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("hr");
  localStorage.removeItem("candidate");
};

export default {
  register,
  login,
  logout,
};
