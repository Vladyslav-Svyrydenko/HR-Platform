import axios from "axios";

const API_URL = "http://localhost:8082/candidate/";

const searching = (search) => {
  return axios.get(API_URL + `/fetchtext/${search}`).then((response) => {
    if (response) {
      console.log("responseeeeee", response);
      return response;
    }
  });
};
const get = (id) => {
  return axios.get(`http://localhost:8082/hr/fetch/${id}`);
};

export default {
  searching,
  get,
};
