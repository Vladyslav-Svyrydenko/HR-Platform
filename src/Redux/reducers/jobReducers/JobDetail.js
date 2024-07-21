import {
  FETCH_SINGLEJOB_SUCCESS,
  FETCH_SINGLEJOB_LOADING,
  FETCH_SINGLEJOB_ERROR,
} from "../../actions/user/types";
const defaultState = {
  jobDetail: [],
  error: null,
  isLoading: false,
};

const JobDetailReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_SINGLEJOB_SUCCESS:
      return { ...state, jobDetail: action.payload };

    case FETCH_SINGLEJOB_LOADING:
      return { ...state, isLoading: action.payload };

    case FETCH_SINGLEJOB_ERROR:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default JobDetailReducer;
