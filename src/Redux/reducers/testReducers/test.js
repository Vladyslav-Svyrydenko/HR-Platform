import {
  REGISTER_SUCCESS_HR_TEST,
  REGISTER_SUCCESS_HR_TEST_QUESTION,
} from "../../actions/hrtest/types";

const defaultState = {
  list: [],
  error: null,
};
export default function (state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS_HR_TEST:
      return {
        list: payload,
      };
    case REGISTER_SUCCESS_HR_TEST_QUESTION:
      return {
        list: payload,
      };

    default:
      return state;
  }
}
