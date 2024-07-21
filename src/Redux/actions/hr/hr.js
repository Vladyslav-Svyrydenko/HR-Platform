import { REGISTER_SUCCESS_HR, REGISTER_FAIL_HR, SET_MESSAGE_HR } from "./types";

import HrService from "../../../service/HRservice/authservice";

export const register = (
  fullName,
  profilePhoto,
  birthday,
  phoneNumber,
  location,
  company,
  companyLogo,
  companyPhotos,
  user
) => (dispatch) => {
  return HrService.register(
    fullName,
    profilePhoto,
    birthday,
    phoneNumber,
    location,
    company,
    companyLogo,
    companyPhotos,
    user
  ).then(
    (response) => {

       console.log("response from actions auth ",response)
       localStorage.setItem("data",JSON.stringify(response.data))
      dispatch({
        type: REGISTER_SUCCESS_HR,
        payload: response.data,

      });

      dispatch({
        type: SET_MESSAGE_HR,
        payload: response.data,
      });

      //history.push("/admin");


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
        type: REGISTER_FAIL_HR,
      });

      dispatch({
        type: SET_MESSAGE_HR,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const update = (
  id,
  fullName,
  profilePhoto,
  birthday,
  email,
  phoneNumber,
  location,
  company,
  companyLogo,
  companyPhotos
) => (dispatch) => {
  return HrService.update(
    id,
    fullName,
    profilePhoto,
    birthday,
    email,
    phoneNumber,
    location,
    company,
    companyLogo,
    companyPhotos
  ).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS_HR,
      });

      dispatch({
        type: SET_MESSAGE_HR,
        payload: response.data,
      });

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
        type: REGISTER_FAIL_HR,
      });

      dispatch({
        type: SET_MESSAGE_HR,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteHr = () => (dispatch) => {
  return HrService.deleteHr().then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS_HR,
      });

      dispatch({
        type: SET_MESSAGE_HR,
        payload: response.data,
      });

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
        type: REGISTER_FAIL_HR,
      });

      dispatch({
        type: SET_MESSAGE_HR,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const findallHr = () => (dispatch) => {
  return HrService.findallHr().then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS_HR,
      });

      dispatch({
        type: SET_MESSAGE_HR,
        payload: response.data,
      });

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
        type: REGISTER_FAIL_HR,
      });

      dispatch({
        type: SET_MESSAGE_HR,
        payload: message,
      });

      return Promise.reject();
    }
  );
};


export const uploadFile = (file) => (dispatch) => {
  return HrService.uploadFile(file).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS_HR,
      });

      dispatch({
        type: SET_MESSAGE_HR,
        payload: response.data,
      });

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
        type: REGISTER_FAIL_HR,
      });

      dispatch({
        type: SET_MESSAGE_HR,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
