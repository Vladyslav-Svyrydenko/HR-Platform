import {
  ADD_EV_SUCCESS,
  FETCH_EV_SUCCESS,
  EDIT_EV_SUCCESS,
  DELETE_EV_SUCCESS,
} from "./types";

import axios from "axios";

const URL = "http://localhost:8082/events/";
export const FetchEvents = () => axios.get(URL + "allEvents");
export const AddEvents = () => axios.post(URL + "addEvents");
export const UpdateEv = (id, updatedEvent) => axios.put(URL + "updateEvent/" + id, updatedEvent);
export const DeleteEv = (id) => axios.delete(URL + "deleteEvent/" + id);
export const AffectTe = (idt , id) => axios.post(URL + "affectTeam/" + idt + "/" + id);

//FETCH-------------------
export const AllEvents = () => (dispatch) => {
  FetchEvents()
    .then((res) => {
      console.log(res);
      dispatch({
        type: FETCH_EV_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//ADD------------------
export const createEventSuccess = (data) => {
  return {
    type: ADD_EV_SUCCESS,
    payload: data,
  };
};

export const CreateEvents = (event) => {
  const data = {
    eventName: event.eventName,
    eventDate: event.eventDate,
    description: event.description,
    file: event.file,
  };

  return (dispatch) => {
    return axios
      .post(URL + "addEvents", data)
      .then((response) => {
        const data = response.data;

        const normalizedData = {
          eventName: data.eventName,
          eventDate: data.eventDate,
          description: data.description,
          
        };

        dispatch(createEventSuccess(normalizedData));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

//UPDATE-----------------
export const UpdateEvents = (id, data, onSuccess) => (dispatch) => {
  UpdateEv(id, data)
    .then((res) => {
      dispatch({
        type: EDIT_EV_SUCCESS,
        payload: res.data,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//DELETE-----------------
export const DeleteEvents = (id, onSuccess) => (dispatch) => {
  DeleteEv(id)
    .then((res) => {
      dispatch({
        type: DELETE_EV_SUCCESS,
        payload: id,
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};



//Affect-----------------
export const AffectTeamEvent = (idt, id) => (dispatch) => {
  AffectTe(idt, id)
    .then((res) => {
      dispatch({
        type: EDIT_EV_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => console.log(error));
};
