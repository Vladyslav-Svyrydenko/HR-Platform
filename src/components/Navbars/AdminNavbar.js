import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import DarkMode from "../../components/Theme/Dark";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import UserDropdown from "components/Dropdowns/HRDropDowns/UserDropdown.js";

export default function Navbar() {
  const dispatch = useDispatch();

  const form = useRef();
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const onChangeSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
  };
  const handleSearch = (e) => {
    e.preventDefault();

    history.push({
      pathname: "/admin/search",
      state: { detail: search },
    });
  };
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-no-wrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-no-wrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            Dashboard
          </a>
          {/* Form */}
          <Form
            onSubmit={handleSearch}
            ref={form}
            className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"
          >
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"></span>
              <Input
                type="text"
                placeholder="Search here..."
                className="px-2 py-2 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                value={search}
                onChange={onChangeSearch}
              />
              <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-2 py-2 rounded outline-none focus:outline-none  ease-linear transition-all duration-150">
                <i className=" fas fa-search "></i>
              </button>
            </div>
          </Form>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <DarkMode />
          </ul>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
