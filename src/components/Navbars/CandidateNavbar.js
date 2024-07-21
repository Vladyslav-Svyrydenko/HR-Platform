import React from "react";
import DarkMode from "../../components/Theme/Dark";
import UserDropdown from "components/Dropdowns/CandidateDropDowns/UserDropdown";
import PagesDropdown from "components/Dropdowns/CandidateDropDowns/PagesDropdown.js";

export default function CandidateNavbar(props) {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10  py-0 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center">
        <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-2">
          <a
            className="text-white text-sm uppercase  lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <div> {props.User}</div>
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>

              <input
                type="text"
                placeholder="Search here..."
                className="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
              />
            </div>
          </form>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <li className="flex items-center">
              <PagesDropdown />
            </li>
          </ul>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <DarkMode />
          </ul>
          {/* User */}
          <ul className="pl-4 flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
