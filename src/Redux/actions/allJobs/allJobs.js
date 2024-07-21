import {
  ADD_JOB_SUCCESS,
  ADD_JOB_LOADING,
  ADD_JOB_ERROR,
  DELETE_JOB_SUCCESS,
  DELETE_JOB_LOADING,
  DELETE_JOB_ERROR,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_LOADING,
  EDIT_JOB_ERROR,
  FETCH_JOB_SUCCESS,
  FETCH_JOB_LOADING,
  FETCH_JOB_ERROR,
  FETCH_AllJOB_SUCCESS,
  FETCH_AllJOB_LOADING,
  FETCH_AllJOB_ERROR,
} from "../../actions/user/types";

import axios from "axios";
var GET_ALL_URL = "http://localhost:8082/job/jobs/";

export const fetchAlljobsuccess = (data) => {
  console.log(data[0]);
  return {
    type: FETCH_AllJOB_SUCCESS,
    payload: data,
  };
};

export const fetchAllJobsLoading = (data) => {
  return {
    type: FETCH_AllJOB_LOADING,
    payload: data,
  };
};

export const fetchAllJobsError = (data) => {
  return {
    type: FETCH_AllJOB_ERROR,
    payload: data,
  };
};

export const fetchAllJobs = () => {
  let isLoading = true;
  return (dispatch) => {
    dispatch(fetchAllJobsLoading(isLoading));
    return axios
      .get(GET_ALL_URL)
      .then((response) => {
        const data = response.data;
        dispatch(fetchAlljobsuccess(data));
        isLoading = false;
        dispatch(fetchAllJobsLoading(isLoading));
      })
      .catch((error) => {
        const errorPayload = {};
        errorPayload["message"] = error.response;
        errorPayload["status"] = error.response;
        dispatch(fetchAllJobsError(errorPayload));
        isLoading = false;
        dispatch(fetchAllJobsLoading(isLoading));
      });
  };
};
