import {
  FETCH_RECOM_JOB_SUCCESS,
  FETCH_RECOM_JOB_LOADING,
  FETCH_RECOM_JOB_ERROR,
} from "../../actions/user/types";
const defaultState = {
  jobRecom: [],
  error: null,
  isLoading: false,
};

const JobRecomReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_RECOM_JOB_SUCCESS:
      return { ...state, jobRecom: action.payload };

    case FETCH_RECOM_JOB_LOADING:
      return { ...state, isLoading: action.payload };

    case FETCH_RECOM_JOB_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default JobRecomReducer;
