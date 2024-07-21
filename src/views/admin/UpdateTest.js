import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { update } from "../../Redux/actions/hrtest/hrtest";

export default function HR() {
  const form = useRef();
  const history = useHistory();

  const checkBtn = useRef();
  //const { user: currentUser } = useSelector((state) => state.userReducer.auth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [tags, setTags] = useState("");
  const [result, setResult] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [color, setColor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")).id);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeTitle = (e) => {
    const Title = e.target.value;
    setTitle(Title);
  };
  const onChangeUser = (e) => {
    const user = e.target.value;
    setUser(user);
  };
  const onChangeDescription = (e) => {
    const Description = e.target.value;
    setDescription(Description);
  };
  const onChangeType = (e) => {
    const Type = e.target.value;
    setType(Type);
  };
  const onChangeResult = (e) => {
    const Result = e.target.value;
    setResult(Result);
  };

  const onChangeCompanyName = (e) => {
    const CompanyName = e.target.value;
    setCompanyName(CompanyName);
  };

  const dispatch = useDispatch();

  const onChangeColor = (e) => {
    const Color = e.target.value;
    setColor(Color);
  };

  const onChangeStartDate = (e) => {
    const StartDate = e.target.value;
    setStartDate(StartDate);
  };

  const onChangeEndDate = (e) => {
    const EndDate = e.target.value;
    setEndDate(EndDate);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    /*
 id,
  title,
  description,
  tags,
  result,
  companyName,
  color,
  startDate,
  endDate,

     */
    dispatch(
      update(
        localStorage.getItem("idTest"),
        title,
        description,
        tags,
        result,
        companyName,
        color,
        startDate,
        endDate,
        JSON.parse(localStorage.getItem("user"))._id
      )
    ).then(
      (response) => {
        // setMessage(response.data.message);
        //setSuccessful(true);
      },
      (error) => {
        // setSuccessful(false);
      }
    );

    history.push("/admin/tests");
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-gray-600 text-sm font-bold"></h6>
                </div>

                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Edit Test</small>
                </div>
                <Form onSubmit={handleRegister} ref={form}>
                  {!successful && (
                    <div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          HR
                        </label>
                        <Input
                          type="text"
                          name="user"
                          disabled={true}
                          value={JSON.parse(localStorage.getItem("user"))._id}
                          onChange={onChangeUser}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          title
                        </label>
                        <Input
                          type="text"
                          name="username"
                          value={title}
                          onChange={onChangeTitle}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="title"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          description
                        </label>
                        <Input
                          type="text"
                          name="description"
                          onChange={onChangeDescription}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="description"
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          type
                        </label>
                        <input
                          type="text"
                          onChange={onChangeType}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="type"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          result
                        </label>
                        <input
                          type="text"
                          name="username"
                          defaultCountry="TN"
                          value={result}
                          onChange={onChangeResult}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="result"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          companyName
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={onChangeCompanyName}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="companyName"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          color
                        </label>
                        <input
                          type="text"
                          value={color}
                          onChange={onChangeColor}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="color"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          startDate
                        </label>
                        <input
                          type="date"
                          onChange={onChangeStartDate}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="start Date"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          endDate
                        </label>
                        <input
                          type="date"
                          onChange={onChangeEndDate}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="end Date"
                        />
                      </div>

                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox text-gray-800 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            I agree with the{" "}
                            <a
                              href="#pablo"
                              className="text-blue-500"
                              onClick={(e) => e.preventDefault()}
                            >
                              Privacy Policy
                            </a>
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">
                          Edit Test
                        </button>
                      </div>
                    </div>
                  )}

                  {message && (
                    <div className="form-group">
                      <div
                        className={
                          successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {message}
                      </div>
                    </div>
                  )}
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
