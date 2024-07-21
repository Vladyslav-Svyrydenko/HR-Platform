import {
  FETCH_SIMILAR_JOB_SUCCESS,
  FETCH_SIMILAR_JOB_LOADING,
  FETCH_SIMILAR_JOB_ERROR,
} from "../../actions/user/types";

const defaultState = {
  similarjobs: [],
  error: null,
  isLoading: false,
};

const similarJobReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_SIMILAR_JOB_SUCCESS:
      return { ...state, similarjobs: action.payload };

    case FETCH_SIMILAR_JOB_LOADING:
      return { ...state, isLoading: action.payload };

    case FETCH_SIMILAR_JOB_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default similarJobReducer;
