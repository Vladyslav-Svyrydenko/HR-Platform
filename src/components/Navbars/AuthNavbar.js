/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import Logo from "assets/img/hrnavlogo.png";
// components

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <img
              alt="logo"
              src={require("../../assets/img/logositebig.png")}
              style={{ width: "40px", height: "40px" }}
              className="mr-4"
            />
          </div>
        </div>
      </nav>
    </>
  );
}
