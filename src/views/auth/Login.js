import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Alert from "react-s-alert";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import { login } from "../../Redux/actions/user/auth";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import ProfileCard from "../../Linkedin/src/components/ProfileCard";

const required = (value) => {
  if (!value) {
    return <div>This field is required!</div>;
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const history = useHistory();
  var data = "";
  const currentUser = JSON.parse(localStorage.getItem("user"));
  console.log("current user", currentUser);
  const [isAuthorized, setisAuthorized] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [pictureURL, setpictureURL] = useState("");
  const handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      updateProfile(event.data.profile);
      console.log("3&", isAuthorized);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handlePostMessage);

    console.log("waaaaaaaaaaaa", firstName);
    // return () => window.removeEventListener("message", handlePostMessage);
  }, []);
  console.log("from outside", firstName);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.userReducer.auth);
  const { message } = useSelector((state) => state.userReducer.message);

  const dispatch = useDispatch();
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
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77vfbhloepwrqa&scope=r_liteprofile&state=123456&redirect_uri=http://localhost:8082/callback`;
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  const updateProfile = (profile) => {
    console.log("aaaaaa", profile);
    data = profile;
    setisAuthorized(true);
    console.log("2&", isAuthorized);

    setfirstName(_.get(profile, "localizedFirstName", ""));
    setLastName(_.get(profile, "localizedLastName", ""));
    setpictureURL(
      _.get(
        _.last(_.get(profile, "profilePicture.displayImage~.elements", "")),
        "identifiers[0].identifier",
        ""
      )
    );
  };
  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          //  props.history.push("/profile");
          // window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  if (isLoggedIn) {
    if (currentUser.roles[0].name === "admin") {
      history.push("/admin");
      window.location.reload();
    }
    if (currentUser.roles[0].name === "user") {
      history.push("/candidate");
      window.location.reload();
    }
  }

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative shadow-lg flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-gray-600 text-sm font-bold">
                  Sign in with
                </h6>
              </div>
              <div className="btn-wrapper text-center">
                <button
                  onClick={requestProfile}
                  className="bg-white active:bg-gray-100 text-gray-800 font-normal  px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
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
              {isAuthorized && (
                // <Redirect
                //   to={{
                //     pathname: "/profile",
                //     state: { firstName: firstName },
                //   }}
                // />
                <ProfileCard
                  firstName={firstName}
                  lastName={LastName}
                  pictureURL={pictureURL}
                />
              )}
            </div>

            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="text-gray-500 text-center mb-3 font-bold">
                <small>Or sign in with credentials</small>
              </div>
              <Form onSubmit={handleLogin} ref={form}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Username
                  </label>
                  <Input
                    type="text"
                    name="username"
                    value={username}
                    onChange={onChangeUsername}
                    validations={[required]}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    placeholder="Userame"
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChangePassword}
                    validations={[required]}
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                  />
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      className="text-gray-800"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <Link to="/auth/register" className="text-gray-800">
                      <small>Create new account</small>
                    </Link>
                  </div>
                </div>
                <div className="text-center mt-6">
                  <button
                    className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    disabled={loading}
                  >
                    {loading && <span></span>}
                    Sign In
                  </button>
                </div>
                {message && (
                  <div>
                    <div role="alert">{message}</div>
                  </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
