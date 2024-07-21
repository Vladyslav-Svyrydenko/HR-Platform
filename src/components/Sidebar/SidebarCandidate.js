/*eslint-disable*/
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function SidebarCandidate() {
  const candidate = JSON.parse(localStorage.getItem("candidate"));

  // const candidate = useSelector((state) => state.candidateReducer.candidate);
  console.log("helloooo", candidate);

  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 bg-gray-300 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <div className="md:block text-left md:pb-2   text-gray-700  mt-8 mr-0 inline-block whitespace-no-wrap text-sm uppercase font-bold p-4 px-0">
            <img
              className=" mt-8  w-auto mx-auto"
              src={require("assets/img/HR HUB CANDIDATE.png")}
            />
          </div>

          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-2 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-3 py-2 h-12 border border-solid  border-gray-600 placeholder-gray-400 text-gray-700 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/candidate/dashboard") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/candidate/dashboard"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/candidate/dashboard") !==
                      -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Dashboard
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/candidate/tests") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/candidate/tests"
                >
                  <i
                    className={
                      "fas fa-file-alt mr-2 text-sm " +
                      (window.location.href.indexOf("/candidate/tests") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Tests
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/candidate/settings") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/candidate/settings"
                >
                  <i
                    className={
                      "fas fa-suitcase mr-2 text-sm " +
                      (window.location.href.indexOf("/candidate/settings") !==
                      -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Profile{" "}
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/candidate/jobs") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/candidate/jobs"
                >
                  <i
                    className={
                      "fas fa-suitcase mr-2 text-sm " +
                      (window.location.href.indexOf("/candidate/jobs") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Jobs
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/candidate/savedJobs") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/candidate/savedJobs"
                >
                  <i
                    className={
                      "fas fa-suitcase mr-2 text-sm " +
                      (window.location.href.indexOf("/candidate/savedJobs") !==
                      -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Saved Jobs
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf(
                      "/candidate/submittedJobs"
                    ) !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/candidate/submittedJobs"
                >
                  <i
                    className={
                      "fas fa-suitcase mr-2 text-sm " +
                      (window.location.href.indexOf(
                        "/candidate/submittedJobs"
                      ) !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Submited Jobs{" "}
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/candidate/map") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/candidate/map"
                >
                  <i
                    className={
                      "fas fa-map mr-2 text-sm " +
                      (window.location.href.indexOf("/candidate/map") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Map{" "}
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/candidate/tables") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/candidate/tables"
                >
                  <i
                    className={
                      "fas fa-bell mr-2 text-sm " +
                      (window.location.href.indexOf("/candidate/tables") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Notification Center
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/candidate/taketest") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/candidate/taketest"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/candidate/taketest") !==
                      -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Pass A Test
                </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/candidate/login") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/candidate/login"
                >
                  <i
                    className={
                      "fas fa-tv mr-2 text-sm " +
                      (window.location.href.indexOf("/candidate/login") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  E-learning Dashbord
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/event3D") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/event3D"
                >
                  <i
                    className={
                      "fas fa-calendar-alt mr-2 text-sm " +
                      (window.location.href.indexOf("/event3D") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Events
                </Link>
              </li>

              <li className="items-center">
                <Link
                  className={
                    "text-xs uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/candidate/chat") !== -1
                      ? "text-blue-500 hover:text-blue-600"
                      : "text-gray-800 hover:text-gray-600")
                  }
                  to="/candidate/chat"
                >
                  <i
                    className={
                      "fas fa-bell mr-2 text-sm " +
                      (window.location.href.indexOf("/candidate/chat") !== -1
                        ? "opacity-75"
                        : "text-gray-400")
                    }
                  ></i>{" "}
                  Chat
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
