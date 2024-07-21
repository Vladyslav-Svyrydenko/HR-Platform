import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardSettings from "components/Cards/CardsCandidate/CardSettings.js";
import CardProfile from "components/Cards/CardsCandidate/CardProfile.js";
import axios from "axios";

export default function Settings() {
  const [selectFile, setSelectfile] = useState(null);

  const onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectfile(event.target.files[0]);
  };
  const onClickHandler = () => {
    const data = new FormData();
    data.append("file", selectFile);
    axios
      .post("http://localhost:8082/cv/index/upload", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
      });
  };

  const Jumbotron = ({ className, children }) => (
    <div
      className={`${className} shadow-lg border font-light border-solid rounded-sm py-1 px-4 mb-0
      `}
    >
      {children}
    </div>
  );
  return (
    <>
      <div className="container">
        <Jumbotron className="text-white bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <p className="mb-0">
            HR HUB provide for you our online CV builder tool. Try it, it's for
            Simple, Straight-forward and Free!
          </p>

          <Link
            className="text-sm px-6 py-1 mt-4 text-white active:bg-yellow-500 focus:outline-none border-solid border"
            to="/resume"
          >
            CV online builder
          </Link>
        </Jumbotron>

        <div className="py-10">
          <input type="file" name="file" onChange={onChangeHandler} />
          <button
            type="button"
            className="bg-green-500  text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            onClick={onClickHandler}
          >
            Upload
          </button>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}
