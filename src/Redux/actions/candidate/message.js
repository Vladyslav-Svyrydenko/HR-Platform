import { SET_MESSAGE_CANDIDATE, CLEAR_MESSAGE_CANDIDATE } from "./types";

export const setMessage = (message) => ({
  type: SET_MESSAGE_CANDIDATE,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE_CANDIDATE,
});
