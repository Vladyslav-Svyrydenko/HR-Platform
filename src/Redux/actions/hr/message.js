import { SET_MESSAGE_HR, CLEAR_MESSAGE_HR } from "./types";

export const setMessage = (message) => ({
  type: SET_MESSAGE_HR,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE_HR,
});
