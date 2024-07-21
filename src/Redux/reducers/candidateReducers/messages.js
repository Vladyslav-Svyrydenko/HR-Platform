import {
  SET_MESSAGE_CANDIDATE,
  CLEAR_MESSAGE_CANDIDATE,
} from "../../actions/candidate/types";

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE_CANDIDATE:
      return { message: payload };

    case CLEAR_MESSAGE_CANDIDATE:
      return { message: "" };

    default:
      return state;
  }
}
