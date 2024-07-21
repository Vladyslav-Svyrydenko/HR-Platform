import {
  REGISTER_SUCCESS_CANDIDATE,
  REGISTER_FAIL_CANDIDATE,
  UPDATE_CANDIDATE,
} from "../../actions/candidate/types";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../../actions/user/types";
const candidate = JSON.parse(localStorage.getItem("candidate"));
console.log(candidate);
export const initialState = candidate
  ? { isLoggedIn: true, candidate }
  : { isLoggedIn: false, candidate: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS_CANDIDATE:
      return {
        ...state,
        isLoggedIn: true,
        candidate: payload.candidate,
      };
    case REGISTER_FAIL_CANDIDATE:
      return {
        ...state,
        isLoggedIn: false,
      };
    case UPDATE_CANDIDATE:
      if (candidate.id === payload.id) {
        return { ...state, payload };
      } else {
        return candidate;
      }

    default:
      return state;
  }
}
