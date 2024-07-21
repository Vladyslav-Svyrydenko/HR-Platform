import { history } from "helpers/history";
import {
  SUBMIT_JOB_SUCCESS,
  SUBMIT_JOB_LOADING,
  SUBMIT_JOB_ERROR,
  FETCH_SUBMIT_JOB_SUCCESS,
  FETCH_SUBMIT_JOB_LOADING,
  FETCH_SUBMIT_JOB_ERROR,
} from "../../actions/user/types";

const defaultState = {
  submittedjobs: [],
  error: null,
  isLoading: false,
};

const submitJobReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SUBMIT_JOB_SUCCESS:
      return {
        jobs: [...state.submittedjobs, action.payload],
      };
    case SUBMIT_JOB_ERROR:
      return { ...state, error: action.payload };
    case FETCH_SUBMIT_JOB_SUCCESS:
      return { ...state, submittedjobs: action.payload };

    case FETCH_SUBMIT_JOB_LOADING:
      return { ...state, isLoading: action.payload };

    case FETCH_SUBMIT_JOB_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default submitJobReducer;
