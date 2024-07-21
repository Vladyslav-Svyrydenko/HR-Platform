import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { register, uploadFile } from "../../Redux/actions/hr/hr";

export default function HR() {
  const form = useRef();
  const history = useHistory();

  const checkBtn = useRef();
  //const { user: currentUser } = useSelector((state) => state.userReducer.auth);
  const [fullName, setFullName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [birthday, setBirthday] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyPhotos, setCompanyPhotos] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")).id);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangefullName = (e) => {
    const FullName = e.target.value;
    setFullName(FullName);
  };
  const onChangeUser = (e) => {
    const user = e.target.value;
    //setUser(user);
  };
  const onChangeProfilePhoto = (e) => {
    const file = e.target.files[0]; // accesing file
    console.log(file);
    setProfilePhoto(file);
  };
  const onChangeBirthday = (e) => {
    const Birthday = e.target.value;
    setBirthday(Birthday);
  };
  const onChangephoneNumber = (e) => {
    const PhoneNumber = e.target.value;
    setPhoneNumber(PhoneNumber);
  };
  const onChangeLocation = (e) => {
    const Location = e.target.value;
    setLocation(Location);
  };

  const onChangeComapny = (e) => {
    const company = e.target.value;
    setCompany(company);
  };

  const dispatch = useDispatch();

  const onChangeCampanyLogo = (e) => {
    const file = e.target.files[0]; // accesing file
    setCompanyLogo(file);
  };
  const onChangeCompanyPhotos = (e) => {
    const file = e.target.files[0]; // accesing file
    setCompanyPhotos(file);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(uploadFile(profilePhoto))
        .then(() => {})
        .catch(() => {
          //setSuccessful(false);
        });

      dispatch(uploadFile(companyLogo))
        .then(() => {})
        .catch(() => {
          //setSuccessful(false);
        });

      dispatch(uploadFile(companyPhotos))
        .then(() => {})
        .catch(() => {
          //setSuccessful(false);
        });
      dispatch(
        register(
          fullName,
          profilePhoto.name,
          birthday,
          phoneNumber,
          location,
          company,
          companyLogo.name,
          companyPhotos.name,
          JSON.parse(localStorage.getItem("user")).id
        )
      ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          setSuccessful(false);
        }
      );

      history.push("/admin");
    }
  };
  return (
    <>
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

                <hr className="mt-6 border-b-1 border-gray-400" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-gray-500 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <Form onSubmit={handleRegister} ref={form}>
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
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Name
                        </label>
                        <Input
                          type="name"
                          name="username"
                          value={fullName}
                          onChange={onChangefullName}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="Full Name"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          profilePhoto
                        </label>
                        <Input
                          type="file"
                          name="profilephoto"
                          onChange={onChangeProfilePhoto}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="profilePhoto"
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          birthday
                        </label>
                        <input
                          type="date"
                          value={birthday}
                          onChange={onChangeBirthday}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="birthday"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          phoneNumber
                        </label>
                        <input
                          type="text"
                          name="username"
                          defaultCountry="TN"
                          value={phoneNumber}
                          onChange={onChangephoneNumber}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="phoneNumber"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          location
                        </label>
                        <input
                          type="text"
                          value={location}
                          onChange={onChangeLocation}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="location"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          company
                        </label>
                        <input
                          type="text"
                          value={company}
                          onChange={onChangeComapny}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="company"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          CompanyLogo
                        </label>
                        <input
                          type="file"
                          onChange={onChangeCampanyLogo}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="companyLogo"
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          companyPhotos
                        </label>
                        <input
                          type="file"
                          onChange={onChangeCompanyPhotos}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          placeholder="companyPhotos"
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
    </>
  );
}
