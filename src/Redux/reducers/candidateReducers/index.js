import { combineReducers } from "redux";
import candidate from "./candidate";
import message from "./messages";

export default combineReducers({
  candidate,
  message,
});
