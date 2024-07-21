import {
    DELETE_TEAM_SUCCESS,
    EDIT_TEAM_SUCCESS,
    FETCH_TEAM_SUCCESS,
  } from "./types";

import axios from "axios";

const URL = "http://localhost:8082/teams/";

export const FetchTeams = () => axios.get(URL + "allTeams");
export const AddTeams = () => axios.post(URL + "addTeams");
export const UpdateT = (id, updatedTeam) => axios.put(URL + "updateTeam/" + id, updatedTeam);
export const DeleteT = (id) => axios.delete(URL + "deleteTeam/" + id);
export const FetchCandTeam = (id) => axios.get(URL + "teamCand/" + id);
export const AffectCand = (id,team) => axios.post(URL + "affect/" + id + "/"+ team );


//FETCH-------------------
export const AllTeams = () => (dispatch) => {
    FetchTeams()
      .then((res) => {
        console.log(res);
        dispatch({
          type: FETCH_TEAM_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };

//ADD--------------------
export const CreateTeams = (team) => {
  
  const data = {
    teamName: team.teamName,
    participantNumber: team.participantNumber,
    description: team.description,
  };

  return (dispatch) => {
    return axios
      .post(URL + "addTeams", data)
      .then((response) => {
        const data = response.data;

        const normalizedData = {
          teamName: data.teamName,
          participantNumber: data.participantNumber,
          description: data.description,
        };

        dispatch(normalizedData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

//UPDATE-----------------
export const UpdateTeams = (id, data, onSuccess) => (dispatch) => {
    UpdateT(id,data)
      .then((res) => {
        dispatch({
          type: EDIT_TEAM_SUCCESS,
          payload: res.data,
        });
        onSuccess();
      })
      .catch((error) => console.log(error));
  };

//DELETE-----------------
export const DeleteTeams = (id, onSuccess) => (dispatch) => {
    DeleteT(id)
      .then((res) => {
        dispatch({
          type: DELETE_TEAM_SUCCESS,
          payload: id,
        });
        onSuccess();
      })
      .catch((error) => console.log(error));
  };
 
//FETCH CAND-----------------
export const ViewCandTeam = (id, onSuccess) => (dispatch) => {
  FetchCandTeam(id)
    .then((res) => {
      dispatch({
        payload: res.data
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};

//Affect CAND-----------------
export const CandToTeam = (id, data, onSuccess) => (dispatch) => {
  AffectCand(id,data)
    .then((res) => {
      dispatch({
        payload: res.data
      });
      onSuccess();
    })
    .catch((error) => console.log(error));
};  


  
