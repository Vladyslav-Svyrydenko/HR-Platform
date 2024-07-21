import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../service/candidateService/authservice";
import Select from "react-select";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import Navbar from "components/Navbars/AuthNavbar.js";

export default function CandidateRegister() {
  useEffect(() => {
    async function fetchData() {
      const response = await axios
        .get(`http://universities.hipolabs.com/search`, {})
        .then((response) => setEducation(parseEducation(response.data)));
    }
    fetchData();
  }, []);
  function parseEducation(stations) {
    return stations.slice(0, 1000).map((station) => {
      return { label: station.name, value: station.name };
    });
  }
  const skill = [
    { value: "reactjs", label: "React JS" },
    { value: "nodejs", label: "Node JS" },
  ];

  const fields = [
    { value: "Infromation Technology", label: "Infromation Technology" },
    { value: "Business Intelligence", label: "Business Intelligence" },
    { value: "Web Dev", label: "Web Dev" },
    { value: "Finance", label: "Finance" },
    { value: "English", label: "English" },
  ];
  /* FORM VALIDATORS */
  const required = (value) => {
    if (!value) {
      return (
        <div
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">REQUIRED!</strong>
          <span className="block sm:inline">This field is required.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      );
    }
  };

  const history = useHistory();
  const checkBtn = useRef();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [title, setTitle] = useState("");
  const [education, setEducation] = useState();
  const [skills, setSkills] = useState("");
  const [region, setRegion] = useState("");
  const [user, setUser] = useState(currentUser.id);
  const [successful, setSuccessful] = useState(false);
  const [aboutMe, setAboutme] = useState("");
  const [message, setMessage] = useState("");
  const [background, setBackground] = useState("");
  const [file, setFile] = useState("");
  const [show, toggleShow] = useState(false);
  const [displayImage, setDisplayImage] = useState(false);

  const onChangeTitle = (e) => {
    const Title = e.target.value;
    setTitle(Title);
  };

  const onChangeRegion = (e) => {
    const Region = e;
    setRegion(Region);
  };
  const onChangeBackground = (e) => {
    const Background = e;
    Background.forEach((item) => {
      setBackground(item.value);
    });
  };

  const onChangeAboutme = (e) => {
    const AboutMe = e.target.value;
    setAboutme(AboutMe);
  };
  const onChangeEducation = (e) => {
    const Education = e;
    // Education.forEach((item) => {
    //   console.log(item.value);

    //   setEducation(item.value);
    // });
    setEducation(Education.value);
  };

  const onChangeSkills = (e) => {
    const skills = e;
    skills.forEach((item) => {
      setSkills(item.value);
    });
  };

  const onChangefullName = (e) => {
    const FullName = e.target.value;
    setFullName(FullName);
  };

  const onChangeProfilePhoto = (e) => {
    const profilePhoto = e.target.files[0];
    const File = URL.createObjectURL(e.target.files[0]);
    setProfilePhoto(profilePhoto);
    setFile(File);
    setDisplayImage(true);
  };
  const onChangeBirthday = (e) => {
    const Birthday = e.target.value;
    setBirthday(Birthday);
  };
  const onChangephoneNumber = (e) => {
    const PhoneNumber = e;
    setPhoneNumber(PhoneNumber);
  };
  const onChangeLocation = (e) => {
    const Location = e;
    setLocation(Location);
    toggleShow(true);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);
    const form = new FormData();
    form.append("user", user);
    form.append("fullName", fullName);
    form.append("profilePhoto", profilePhoto);
    form.append("birthday", birthday);
    form.append("phoneNumber", phoneNumber);
    console.log("phone number react", phoneNumber);
    form.append("location", location);
    form.append("region", region);
    form.append("education", education);
    console.log("education react", education);
    form.append("background", background);
    form.append("skills", skills);
    form.append("aboutMe", aboutMe);
    form.append("title", title);
    form.append("experience", {});
    console.log(form);
    if (checkBtn.current.context._errors.length === 0) {
      console.log("hererrrrrr");
      AuthService.register(form).then(
        (response) => {
          setMessage(response.data);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          console.log("errreur react", error);
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
      history.push("/candidate");
    }
  };
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-20 min-h-screen">
          <div className="absolute top-0 w-full h-full bg-no-repeat bg-full"></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign up with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-white active:bg-gray-100 text-gray-800 font-normal  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                        type="button"
                      >
                        <img
                          alt="..."
                          className="w-5 mr-3"
                          src={require("assets/img/linkedin.png")}
                        />
                        Connect with linkedIn account
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                      <small>Or sign up with credentials</small>
                    </div>
                    <Form onSubmit={handleRegister}>
                      {" "}
                      {!successful && (
                        <div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              User
                            </label>
                            <Input
                              type="text"
                              name="user"
                              disabled={true}
                              value={user}
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Full Name
                            </label>
                            <Input
                              type="text"
                              name="fullName"
                              value={fullName}
                              onChange={onChangefullName}
                              validations={[required]}
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              placeholder="Full Name"
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Birthday
                            </label>
                            <input
                              type="date"
                              value={birthday}
                              onChange={onChangeBirthday}
                              validations={[required]}
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              placeholder="birthday"
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Profile Photo
                            </label>
                            <Input
                              type="file"
                              name="profilePhoto"
                              //value={profilePhoto}
                              onChange={onChangeProfilePhoto}
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              placeholder="profilePhoto"
                            />
                            {displayImage && (
                              <img
                                src={file}
                                alt="profilePhoto"
                                className="block shadow-xl my-4 mx-auto w-28"
                              />
                            )}
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              {" "}
                              Phone Number{" "}
                            </label>
                            <PhoneInput
                              international
                              countryCallingCodeEditable={false}
                              defaultCountry="TN"
                              value={phoneNumber}
                              onChange={onChangephoneNumber}
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              placeholder="phoneNumber"
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                              Country
                            </label>
                            <div>
                              <CountryDropdown
                                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                value={location}
                                onChange={onChangeLocation}
                              />
                            </div>
                            <div>
                              {show && (
                                <div className="relative w-full mb-3">
                                  <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                                    Region
                                  </label>
                                  <RegionDropdown
                                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                                    country={location}
                                    value={region}
                                    onChange={onChangeRegion}
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Background
                            </label>
                            <Select
                              isMulti
                              options={fields}
                              onChange={onChangeBackground}
                            />
                          </div>

                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              College
                            </label>
                            <Select
                              options={education}
                              onChange={onChangeEducation}
                            />
                          </div>

                          <div className="relative w-full mb-3">
                            <label className="block uppercase text-gray-700 text-xs font-bold mb-2">
                              Skills
                            </label>
                            <Select
                              isMulti
                              options={skill}
                              onChange={onChangeSkills}
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Title
                            </label>
                            <Input
                              type="text"
                              name="title"
                              value={title}
                              onChange={onChangeTitle}
                              validations={[required]}
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              placeholder="Title"
                            />
                          </div>
                          <div className="relative w-full mb-3">
                            <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                            >
                              About Me
                            </label>
                            <textarea
                              type="textarea"
                              name="aboutMe"
                              value={aboutMe}
                              onChange={onChangeAboutme}
                              validations={[required]}
                              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                              placeholder="About Me"
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
                              Create Account
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
        </section>
      </main>
    </>
  );
}
