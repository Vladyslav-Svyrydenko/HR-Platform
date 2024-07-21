import axios from "axios";

const API_URL = "http://localhost:8082/candidate";

const register = (form) => {
  return axios({
    method: "post",
    url: "http://localhost:8082/candidate/addCandidate",
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((response) => {
    console.log("responseone", response);
    console.log("responsetwo", response.data);
    console.log("responsethree", response.data.data);

    if (response) {
      console.log("herrre from react");
      localStorage.setItem(
        "candidate",
        JSON.stringify(response.data.data, response.email, response.username)
      );
      localStorage.setItem("hr", JSON.stringify(null));
    }
  });
};

export default {
  register,
};
