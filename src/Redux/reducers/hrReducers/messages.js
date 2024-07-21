import { SET_MESSAGE_HR, CLEAR_MESSAGE_HR } from "../../actions/hr/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE_HR:
      return { message: payload };

    case CLEAR_MESSAGE_HR:
      return { message: "" };

    default:
      return state;
  }
}
