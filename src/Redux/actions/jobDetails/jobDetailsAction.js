import {
  FETCH_SINGLEJOB_SUCCESS,
  FETCH_SINGLEJOB_LOADING,
  FETCH_SINGLEJOB_ERROR,
} from "../../actions/user/types";
import axios from "axios";
var str = window.location.pathname;
let id = str.slice(19);
console.log(id);
var GET_JOB_DETAILS = "http://localhost:8082/job/job/" + id;

export const fetchJobDetailsSuccess = (data) => {
  console.log(data[0]);
  return {
    type: FETCH_SINGLEJOB_SUCCESS,
    payload: data,
  };
};

export const fetchJobDetailsLoading = (data) => {
  return {
    type: FETCH_SINGLEJOB_LOADING,
    payload: data,
  };
};

export const fetchJobDetailsError = (data) => {
  return {
    type: FETCH_SINGLEJOB_ERROR,
    payload: data,
  };
};

export const fetchJobDetails = () => {
  let isLoading = true;
  return (dispatch) => {
    dispatch(fetchJobDetailsLoading(isLoading));
    return axios
      .get(GET_JOB_DETAILS)
      .then((response) => {
        const data = response.data;

        dispatch(fetchJobDetailsSuccess(data));
        isLoading = false;
        dispatch(fetchJobDetailsLoading(isLoading));
      })
      .catch((error) => {
        const errorPayload = {};
        errorPayload["message"] = error.response;
        errorPayload["status"] = error.response;
        dispatch(fetchJobDetailsError(errorPayload));
        isLoading = false;
        dispatch(fetchJobDetailsLoading(isLoading));
      });
  };
};
