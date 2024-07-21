import {
  SUBMIT_JOB_SUCCESS,
  SUBMIT_JOB_LOADING,
  SUBMIT_JOB_ERROR,
  FETCH_SUBMIT_JOB_SUCCESS,
  FETCH_SUBMIT_JOB_LOADING,
  FETCH_SUBMIT_JOB_ERROR,
} from "../user/types";
import { initialState } from "Redux/reducers/candidateReducers/candidate";

import axios from "axios";
import { history } from "helpers/history";
var str = window.location.pathname;
let id = str.slice(19);
console.log(id);
/*const candidate = JSON.parse(localStorage.getItem("candidate"));

var candidateID = candidate.data._id;
console.log(candidateID);*/
var SUBMIT_JOB_URL =
  "http://localhost:8082/job/submit/607c5d570f3bae21e06f5782/" + id;

var GET_SUBMITJOB_URL =
  "http://localhost:8082/job/submittedJobs/607c5d570f3bae21e06f5782";
export const submitJobsSuccess = (data) => {
  return {
    type: SUBMIT_JOB_SUCCESS,
    payload: data,
  };
};
export const submitJob = (data) => {
  return (dispatch) => {
    return axios
      .post(SUBMIT_JOB_URL, data)
      .then((response) => {
        dispatch(submitJobsSuccess(response.data));
      })

      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        const errorPayload = {};
        errorPayload["message"] = error.response.data;
        errorPayload["status"] = error.response.status;
        dispatch(submitJobError(errorPayload));
      });
  };
};
export const fetchjobsuccess = (data) => {
  console.log(data[0]);
  return {
    type: FETCH_SUBMIT_JOB_SUCCESS,
    payload: data,
  };
};
export const submitJobError = (data) => {
  return {
    type: SUBMIT_JOB_ERROR,

    payload: data,
  };
};
export const fetchJobsLoading = (data) => {
  return {
    type: FETCH_SUBMIT_JOB_LOADING,
    payload: data,
  };
};

export const fetchJobsError = (data) => {
  return {
    type: FETCH_SUBMIT_JOB_ERROR,
    payload: data,
  };
};
export const fetchSubmittedJobs = () => {
  let isLoading = true;
  return (dispatch) => {
    dispatch(fetchJobsLoading(isLoading));
    return axios
      .get(GET_SUBMITJOB_URL)
      .then((response) => {
        const data = response.data.SubmittedJobs;

        dispatch(fetchjobsuccess(data));
        isLoading = false;
        dispatch(fetchJobsLoading(isLoading));
      })
      .catch((error) => {
        const errorPayload = {};
        errorPayload["message"] = error.response;
        errorPayload["status"] = error.response;
        dispatch(fetchJobsError(errorPayload));
        isLoading = false;
        dispatch(fetchJobsLoading(isLoading));
      });
  };
};
