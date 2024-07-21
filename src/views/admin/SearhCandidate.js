import React, { useState, useRef } from "react";
import CandidateProfile from "./CandidateProfile";
import HrCRUDService from "../../service/HRservice/crudservice";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useSelector, useDispatch } from "react-redux";
import { updateCandidate } from "../../Redux/actions/candidate/candidate";

export default function SearchCandidate(props) {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const data = props.location.state.detail;
  const [candidates, setcandidates] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  React.useEffect(() => {
    HrCRUDService.searching(data).then((response) => {
      setisLoading(false);
      console.log("useeffff", response.data.Candidate);
      setcandidates(response.data.Candidate);
      console.log("useeffff", candidates);
    });
  }, [data]);

  const ViewProfile = (id) => {
    console.log("idddd", id);
    const HR_viewed = JSON.parse(localStorage.getItem("hr"));

    console.log(HR_viewed);
    dispatch(
      updateCandidate(id, {
        HR_viewed,
      })
    )
      .then((response) => {
        console.log("lennan", response);
        addToast("Profile viewd", { appearance: "success" });
      })
      .catch((e) => {
        console.log(e);
        addToast("Profile viewd", { appearance: "success" });
      });
  };
  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-4 md:w-2 mb-2 md:mb-0 md:p-1"></div>
        {candidates.map((item) => (
          <CandidateProfile
            key={item._id}
            candidate={item}
            ViewProfile={ViewProfile}
          />
        ))}
      </div>
    </>
  );
}
