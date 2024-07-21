import { REGISTER_SUCCESS_HR, REGISTER_FAIL_HR } from "../../actions/hr/types";

const hr = JSON.parse(localStorage.getItem("hr"));
console.log(hr);
export const initialState = hr
  ? { isLoggedIn: true, hr }
  : { isLoggedIn: false, hr: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS_HR:
      return {
        ...state,
        isLoggedIn: true,
        hr: payload.hr,
      };
    case REGISTER_FAIL_HR:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
