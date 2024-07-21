import React from "react";
import PropTypes from "prop-types";
import Scrollbars from "react-custom-scrollbars";

// components

import TableDropdown from "components/Dropdowns/CandidateDropDowns/TableDropdown.js";

export default function JobSubmitted({ color, cand }) {
  return (
    <>
      {" "}
      <tbody>
        <tr>
          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
            <img
              src={require("assets/img/bootstrap.jpg")}
              className="h-12 w-12 bg-white rounded-full border"
              alt="..."
            ></img>{" "}
            <span
              className={
                "ml-3 font-bold " +
                +(color === "light" ? "text-gray-700" : "text-white")
              }
            >
              {cand.fullName}{" "}
            </span>
          </th>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4"></td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
            <i className="fas fa-circle text-orange-500 mr-2"></i> Processed
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
            <h1 className="text-xl">Microsoft</h1>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
            <button
              className="bg-red-500 px-4 py-2 text-white active:bg-blue-600 font-bold uppercase 
                  text-xs  py-0 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
            >
              Delete{" "}
            </button>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right">
            <TableDropdown />
          </td>
        </tr>
      </tbody>
    </>
  );
}

JobSubmitted.defaultProps = {
  color: "light",
};

JobSubmitted.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
