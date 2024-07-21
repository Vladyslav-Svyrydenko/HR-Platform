/*eslint-disable*/
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
//import { Link } from "react-router-dom";
import image1 from "../assets/img/cvs.svg";
import image3 from "../assets/img/team.svg";
import image4 from "../assets/img/teamwork.svg";
import image5 from "../assets/img/collab.svg";
import image6 from "../assets/img/remote_team.svg";
import image7 from "../assets/img/linkedin.svg";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";
import Fade from "react-reveal/Fade";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative  items-center flex h-screen max-h-860-px">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className=" titlelightmode text-HR-title font-semibold text-4xl">
                Recruitment made easier.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                People are the driving force behind the success of the
                enterprise. An efficient, user-centered experience for choosing
                one’s employees is crucial.
              </p>
              <div className="mt-12">
                <a
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  href="/admin/jobs"
                >
                  For HR
                </a>
                <a
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-gray-800 active:bg-gray-700 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                  target="_blank"
                  href="/candidate/jobs"
                >
                  Find a job
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute  right-0 sm:w-6/12 ">
          <AliceCarousel autoPlay infinite autoPlayInterval="250">
            <img src={image1} className="sliderimg" alt="" />
            <img src={image3} className="sliderimg" alt="" />
            <img src={image4} alt="" />
            <img src={image5} className="sliderimg" alt="" />
            <img src={image6} className="sliderimg" alt="" />
            <img src={image7} className="sliderimg" alt="" />
          </AliceCarousel>
        </div>
      </section>

      <section className="mt-48 md:mt-40 pb-40 relative bg-gray -200">
        <div className="container mx-auto overflow-hidden pb-20">
          <Fade right>
            <div className="flex  flex-wrap items-center">
              <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto ">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-briefcase text-xl"></i>
                </div>
                <h3 className="titlelightmode text-3xl mb-2 text-blue-600 font-semibold leading-normal">
                  HR HUB for Employers
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  We aim to help HR cabinets & headhunters to have the best
                  recruitment experience.
                </p>
                <br />
                <div className=" block pb-6">
                  <span className="text-xs shadow-lg font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-white uppercase last:mr-0 mr-2 mt-2">
                    Chatbot
                  </span>
                  <span className="text-xs shadow-lg font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-white uppercase last:mr-0 mr-2 mt-2">
                    Business Intelligence
                  </span>
                  <span className="text-xs shadow-lg font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-white uppercase last:mr-0 mr-2 mt-2">
                    Smart testing
                  </span>
                  <span className="text-xs shadow-lg font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-white uppercase last:mr-0 mr-2 mt-2">
                    Evaluation
                  </span>
                  <span className="text-xs shadow-lg font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-white uppercase last:mr-0 mr-2 mt-2">
                    Notes
                  </span>
                  <span className="text-xs shadow-lg font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-white uppercase last:mr-0 mr-2 mt-2">
                    Video-Conf
                  </span>
                  <span className="text-xs shadow-lg font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-600 bg-white uppercase last:mr-0 mr-2 mt-2">
                    Virtual events
                  </span>
                </div>
                <a
                  target="_blank"
                  className="font-bold text-blue-400 hover:text-blue-600 ease-linear transition-all duration-150"
                >
                  Learn more{" "}
                  <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
                </a>
              </div>

              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-32">
                <div className="relative flex flex-col min-w-0 w-full mb-0 mt-9  md:mt-0">
                  <img
                    alt="..."
                    src={require("../assets/img/hr_service/data.svg")}
                    className="w-full align-middle rounded-lg absolute shadow-lg -top-160-px left-260-px max-w-210-px"
                  />
                  <img
                    alt="..."
                    src={require("../assets/img/hr_service/cv.svg")}
                    className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px left-260-px  top-25-px"
                  />

                  <img
                    alt="..."
                    src={require("../assets/img/hr_service/grades.svg")}
                    className="w-full align-middle rounded-lg absolute shadow-lg max-w-180-px left-20-px -top-160-px  z-2"
                  />
                  <img
                    alt="..."
                    src={require("../assets/img/hr_service/connect.svg")}
                    className="w-full align-middle rounded-lg absolute shadow-2xl max-w-200-px -left-50-px top-25-px"
                  />
                </div>
              </div>
            </div>
          </Fade>
          <Fade left>
            <div className="flex flex-wrap items-center pt-32">
              <div className="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
                <div className="justify-center flex flex-wrap relative">
                  <div className="my-4 w-full lg:w-6/12 px-4">
                    <a target="_blank">
                      <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                        <img
                          alt="e-learning"
                          className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                          src={require("assets/img/icons/elearning.png")}
                        />
                        <p className="text-lg text-white mt-4 font-semibold">
                          Smart Testing
                        </p>
                      </div>
                    </a>
                    <a target="_blank">
                      <div className="bg-blue-500 shadow-lg rounded-lg text-center p-8 mt-8">
                        <img
                          alt="..."
                          className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                          src={require("assets/img/icons/grow.png")}
                        />
                        <p className="text-lg text-white mt-4 font-semibold">
                          Grow Skills
                        </p>
                      </div>
                    </a>
                    <a target="_blank">
                      <div className="bg-gray-800 shadow-lg rounded-lg text-center p-8 mt-8">
                        <img
                          alt="..."
                          className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                          src={require("assets/img/icons/bot.png")}
                        />
                        <p className="text-lg text-white mt-4 font-semibold">
                          Chatbot
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                    <a target="_blank">
                      <div className="bg-yellow-500 shadow-lg rounded-lg text-center p-8">
                        <img
                          alt="..."
                          className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                          src={require("assets/img/icons/suitcase.png")}
                        />
                        <p className="text-lg text-white mt-4 font-semibold">
                          Find your dream job
                        </p>
                      </div>
                    </a>
                    <a target="_blank">
                      <div className="bg-red-700 shadow-lg rounded-lg text-center p-8 mt-8">
                        <img
                          alt="..."
                          className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                          src={require("assets/img/icons/speaker.png")}
                        />
                        <p className="text-lg text-white mt-4 font-semibold">
                          Virtual Events
                        </p>
                      </div>
                    </a>
                    <a target="_blank">
                      <div className="bg-green-500 shadow-lg rounded-lg text-center p-8 mt-8">
                        <img
                          alt="..."
                          className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                          src={require("assets/img/icons/chat.png")}
                        />
                        <p className="text-lg text-white mt-4 font-semibold">
                          Connect with your employer
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
                <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <i className="fas fa-user-friends text-xl"></i>
                </div>
                <h3 className=" titlelightmode text-3xl mb-2 text-blue-600 font-semibold leading-normal">
                  HR HUB for Candidates
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  We provide for our candidates a recommendation system and an
                  E-learning side to improve their skills for a better future.
                </p>

                <a
                  target="_blank"
                  className="font-bold text-blue-400 hover:text-blue-600 ease-linear transition-all duration-150"
                >
                  Learn more{" "}
                  <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
                </a>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      <section className="  pb-16 bg-gray-300 relative pt-32">
        <div
          className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className=" container mx-auto">
          <div className=" bannerdarkmode flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
            <div className="w-full text-center lg:w-8/12">
              <p className="text-4xl text-center">
                <span role="img" aria-label="love">
                  😍
                </span>
              </p>
              <h3 className="font-semibold text-3xl">
                Do you want to know more about us?
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mt-4 mb-4">
                Our staff are available 24/7. You can contact us via email or
                social media platforms showen below.
              </p>
              <div className="sm:block flex flex-col mt-10">
                <a
                  target="_blank"
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-blue-500 active:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Take a tour
                </a>
                <a
                  target="_blank"
                  className="github-star sm:ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-gray-800 active:bg-gray-700 uppercase text-sm shadow hover:shadow-lg"
                >
                  <i className="fab fa-github text-lg mr-1"></i>
                  <span>Help With a Star</span>
                </a>
              </div>
              <div className="text-center mt-16"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
