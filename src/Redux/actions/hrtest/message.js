import { SET_MESSAGE_HR_TEST, CLEAR_MESSAGE_HR_TEST } from "./types";

export const setMessage = (message) => ({
  type: SET_MESSAGE_HR_TEST,
  payload: message,
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE_HR_TEST,
});
