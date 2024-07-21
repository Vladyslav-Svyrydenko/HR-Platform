import React, { useState, useRef } from "react";
import { ToastProvider, useToasts } from "react-toast-notifications";
import { useSelector, useDispatch } from "react-redux";
import { updateCandidate } from "../../Redux/actions/candidate/candidate";

const CandidateProfile = ({ candidate, ViewProfile }) => {
  return (
    <>
      <div className=" bg-gray-300 w-full md:w-4/12 mb-6 mr-1 md:mb-0 md:p-1">
        <img
          class="w-3"
          src={candidate.profilePhoto}
          alt="Sunset in the mountains"
        />
        <div class="px-3 py-2">
          <div class="font-bold text-xl mb-2">{candidate.fullName}</div>

          <p class="text-gray-600 text-base">{candidate.title}</p>
        </div>
        <div class="px-3 py-2">
          <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
            {candidate.education}
          </span>
          <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
            {candidate.location}
          </span>
          <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">
            {candidate.background}{" "}
          </span>
        </div>
        <div>
          {" "}
          <button
            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            onClick={() => ViewProfile(candidate._id)}
          >
            <i class="far fa-eye"></i> View Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default CandidateProfile;
