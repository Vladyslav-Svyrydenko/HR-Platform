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
  alljobs: [],
  error: null,
  isLoading: false,
};

const allJobsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_AllJOB_SUCCESS:
      return { ...state, alljobs: action.payload };

    case FETCH_AllJOB_LOADING:
      return { ...state, isLoading: action.payload };

    case FETCH_AllJOB_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default allJobsReducer;
