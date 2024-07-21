import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  setCandidate,
  removeCandidate,
} from "../../Redux/actions/candidate/candidate";

function Read(props) {
  console.log("propsss", props.match.params._id);
  const candidate = useSelector(
    (state) => state.candidateReducer.candidate.state.candidate.data
  );
  console.log("candidateeeee", candidate);
  const dispatch = useDispatch();

  useEffect(
    function () {
      axios
        .get(`http://localhost:8082/candidate/` + candidate._id)
        .then(function (response) {
          dispatch(setCandidate(response.data));
          console.log("waaaaaaaaaaaaaaaaaa", response.data);
        })
        .catch(function (error) {
          console.log("error", error);
        });
    },
    [dispatch, props, candidate._id]
  );

  function handleDelete() {
    axios
      .delete(`/api/articles/${candidate._id}`)
      .then(function () {
        dispatch(removeCandidate(candidate._id));
        props.history.push("/");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  }

  return (
    <div>
      <h3 className="mt-10">id: {candidate._id}</h3>
    </div>
  );
}
export default Read;
