import {
  FETCH_RECOM_JOB_SUCCESS,
  FETCH_RECOM_JOB_LOADING,
  FETCH_RECOM_JOB_ERROR,
} from "../user/types";
import axios from "axios";

var SUBMIT_JOB_URL = "http://localhost:8082/job/rec/607c5d570f3bae21e06f5782";

export const fetchRecomjobsuccess = (data) => {
  console.log(data[0]);
  return {
    type: FETCH_RECOM_JOB_SUCCESS,
    payload: data,
  };
};

export const fetchRecomJobsLoading = (data) => {
  return {
    type: FETCH_RECOM_JOB_LOADING,
    payload: data,
  };
};

export const fetchRecomJobsError = (data) => {
  return {
    type: FETCH_RECOM_JOB_ERROR,
    payload: data,
  };
};

export const fetchRecomJobs = () => {
  let isLoading = true;
  return (dispatch) => {
    dispatch(fetchRecomJobsLoading(isLoading));
    return axios
      .get(SUBMIT_JOB_URL)
      .then((response) => {
        const data = response.data;

        dispatch(fetchRecomjobsuccess(data));
        isLoading = false;
        dispatch(fetchRecomJobsLoading(isLoading));
      })
      .catch((error) => {
        const errorPayload = {};
        errorPayload["message"] = error.response;
        errorPayload["status"] = error.response;
        dispatch(fetchRecomJobsError(errorPayload));
        isLoading = false;
        dispatch(fetchRecomJobsLoading(isLoading));
      });
  };
};
