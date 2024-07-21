import { history } from "helpers/history";
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

const defaultState = {
  jobs: [],
  error: null,
  isLoading: false,
};

const jobReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_JOB_SUCCESS:
      return {
        ...state,

        jobs: [...state.jobs, action.payload],
      };
    case ADD_JOB_ERROR:
      return { ...state, error: action.payload };
    case EDIT_JOB_SUCCESS:
      const updatedJob = state.jobs.filter(
        (job) => job.id !== action.payload.id
      );
      return { ...state, jobs: [...updatedJob, action.payload] };

    case EDIT_JOB_ERROR:
      return { ...state, error: action.payload };
    case FETCH_JOB_SUCCESS:
      return { ...state, jobs: action.payload };

    case FETCH_AllJOB_SUCCESS:
      return { ...state, jobs: action.payload };

    case FETCH_AllJOB_LOADING:
      return { ...state, isLoading: action.payload };

    case FETCH_JOB_LOADING:
      return { ...state, isLoading: action.payload };

    case FETCH_AllJOB_ERROR:
      return { ...state, error: action.payload };
    case FETCH_JOB_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;

    case DELETE_JOB_SUCCESS:
      const filteredJobs = state.jobs.filter(
        (job) => job._id !== action.payload.id
      );
      return { ...state, jobs: filteredJobs };

    case DELETE_JOB_ERROR:
      return { ...state, error: action.payload };
  }
};

export default jobReducer;
