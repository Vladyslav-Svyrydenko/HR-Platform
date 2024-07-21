import {
  FETCH_SIMILAR_JOB_SUCCESS,
  FETCH_SIMILAR_JOB_LOADING,
  FETCH_SIMILAR_JOB_ERROR,
} from "../user/types";
import axios from "axios";
var str = window.location.pathname;
let id = str.slice(19);
console.log(id);
var SIMILAR_JOB_URL = "http://localhost:8082/job/similarJobs/" + id;

export const fetchSimilarjobsuccess = (data) => {
  console.log(data[0]);
  return {
    type: FETCH_SIMILAR_JOB_SUCCESS,
    payload: data,
  };
};

export const fetchSimilarJobsLoading = (data) => {
  return {
    type: FETCH_SIMILAR_JOB_LOADING,
    payload: data,
  };
};

export const fetchSimilarJobsError = (data) => {
  return {
    type: FETCH_SIMILAR_JOB_ERROR,
    payload: data,
  };
};

export const fetchSimilarJobs = () => {
  let isLoading = true;
  return (dispatch) => {
    dispatch(fetchSimilarJobsLoading(isLoading));
    return axios
      .get(SIMILAR_JOB_URL)
      .then((response) => {
        const data = response.data;

        dispatch(fetchSimilarjobsuccess(data));
        isLoading = false;
        dispatch(fetchSimilarJobsLoading(isLoading));
      })
      .catch((error) => {
        const errorPayload = {};
        errorPayload["message"] = error.response;
        errorPayload["status"] = error.response;
        dispatch(fetchSimilarJobsError(errorPayload));
        isLoading = false;
        dispatch(fetchSimilarJobsLoading(isLoading));
      });
  };
};
