import { SET_MESSAGE_HR_TEST, CLEAR_MESSAGE_HR_TEST } from "../../actions/hrtest/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE_HR_TEST:
      return { message: payload };

    case CLEAR_MESSAGE_HR_TEST:
      return { message: "" };

    default:
      return state;
  }
}
