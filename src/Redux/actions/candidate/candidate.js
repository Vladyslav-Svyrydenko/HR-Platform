import {
  REGISTER_SUCCESS_CANDIDATE,
  REGISTER_FAIL_CANDIDATE,
  SET_MESSAGE_CANDIDATE,
  SET_CANDIDATE,
  UPDATE_CANDIDATE,
  REMOVE_CANDIDATE,
  RETRIEVE_CANDIDATE,
} from "./types";
import updateService from "../../../service/candidateService/updateService";

import CandidateService from "../../../service/candidateService/authservice";

export const register = (
  fullName,
  profilePhoto,
  birthday,
  phoneNumber,
  location,
  cv,
  education,
  experience,
  skills,
  user
) => (dispatch) => {
  return CandidateService.register(
    fullName,
    profilePhoto,
    birthday,
    phoneNumber,
    location,
    cv,
    education,
    experience,
    skills,
    user
  ).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS_CANDIDATE,
      });

      dispatch({
        type: SET_MESSAGE_CANDIDATE,
        payload: Promise.all([
          response.data.data,
          response.email,
          response.username,
        ]),
      });
      console.log(response);
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL_CANDIDATE,
      });

      dispatch({
        type: SET_MESSAGE_CANDIDATE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const updateCandidate = (id, data) => async (dispatch) => {
  try {
    const res = await updateService.update(id, data);

    dispatch({
      type: UPDATE_CANDIDATE,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const retrieveCandidate = (id) => async (dispatch) => {
  try {
    const res = await updateService.get(id);

    dispatch({
      type: RETRIEVE_CANDIDATE,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export function setCandidate(candidate) {
  return {
    type: SET_CANDIDATE,
    candiate: candidate,
  };
}

export function removeCandidate(_id) {
  return {
    type: REMOVE_CANDIDATE,
    _id: _id,
  };
}
