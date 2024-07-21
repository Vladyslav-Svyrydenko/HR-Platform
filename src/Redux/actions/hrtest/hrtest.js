import {
  REGISTER_SUCCESS_HR_TEST,
  REGISTER_FAIL_HR_TEST,
  SET_MESSAGE_HR_TEST,
  REGISTER_SUCCESS_HR_TEST_QUESTION,
} from "./types";

import HrTestService from "../../../service/HRservice/HrTestService";

export const findallHrTest = () => (dispatch) => {
  return HrTestService.findallHrTest().then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS_HR_TEST,
        payload: response.data.data,
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
        type: REGISTER_FAIL_HR_TEST,
      });

      dispatch({
        type: SET_MESSAGE_HR_TEST,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const AddTest = (
  title,
  description,
  type,
  tags,
  result,
  companyName,
  color,
  startDate,
  endDate,
  hr
) => (dispatch) => {
  return HrTestService.addHrTest(
    title,
    description,
    type,
    tags,
    result,
    companyName,
    color,
    startDate,
    endDate,
    hr
  ).then(
    (response) => {
      console.log("response from actions auth ", response);
      localStorage.setItem("data", JSON.stringify(response.data));
      dispatch({
        type: REGISTER_SUCCESS_HR_TEST,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE_HR_TEST,
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
        type: REGISTER_FAIL_HR_TEST,
      });

      dispatch({
        type: SET_MESSAGE_HR_TEST,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const update = (
  id,
  title,
  description,
  type,
  tags,
  result,
  companyName,
  color,
  startDate,
  endDate
) => (dispatch) => {
  return HrTestService.updateHrTest(
    id,
    title,
    description,
    type,
    tags,
    result,
    companyName,
    color,
    startDate,
    endDate
  ).then(
    (response) => {
      /*  dispatch({
        type: REGISTER_SUCCESS_HR_TEST,
      });

      dispatch({
        type: SET_MESSAGE_HR_TEST,
        payload: response.data,
      });*/

      return Promise.resolve();
    },
    (error) => {
      /*
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL_HR_TEST,
      });

      dispatch({
        type: SET_MESSAGE_HR_TEST,
        payload: message,
      });

      return Promise.reject();*/
    }
  );
};

export const findallHrTestQuestion = (id) => (dispatch) => {
  return HrTestService.findallHrTestQuestion(id).then(
    (response) => {
      dispatch({
        type: REGISTER_SUCCESS_HR_TEST_QUESTION,
        payload: response.data.data,
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
        type: REGISTER_FAIL_HR_TEST,
      });

      dispatch({
        type: SET_MESSAGE_HR_TEST,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteTestHr = (id) => (dispatch) => {
  return HrTestService.deleteHrTest(id).then(
    (response) => {
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
        type: REGISTER_FAIL_HR_TEST,
      });

      dispatch({
        type: SET_MESSAGE_HR_TEST,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const deleteQuestion = (id) => (dispatch) => {
  console.log("okkkkkkkk id ", id);
  return HrTestService.deleteHrTestQuestion(id).then(
    (response) => {
      console.log("okkkk ", response);
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
        type: REGISTER_SUCCESS_HR_TEST_QUESTION,
      });

      dispatch({
        type: SET_MESSAGE_HR_TEST,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const AddtestResponse = (response, candidat, hrTest) => (dispatch) => {
  return HrTestService.testResponse(response, candidat, hrTest).then(
    (response) => {
      console.log("response from actions auth ", response);
      localStorage.setItem("data", JSON.stringify(response.data));
      dispatch({
        type: REGISTER_SUCCESS_HR_TEST,
        payload: response.data,
      });

      dispatch({
        type: SET_MESSAGE_HR_TEST,
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
        type: REGISTER_FAIL_HR_TEST,
      });

      dispatch({
        type: SET_MESSAGE_HR_TEST,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
