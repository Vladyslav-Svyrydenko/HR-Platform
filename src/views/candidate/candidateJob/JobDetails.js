import React, { useState } from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { submitJob } from "Redux/actions/submittedJobs/submittedJob.action";
import { PieChart, Tooltip, Pie } from "recharts";
import axios from "axios";

import Chart from "./Chart";
import { history } from "helpers/history";
import Scrollbars from "react-custom-scrollbars";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import "react-notifications/lib/notifications.css";

class JobDetails extends Component {
  constructor(props) {
    super(props);
    var str = window.location.pathname;

    let id = str.slice(19);
    console.log(id);

    this.state = {
      responseData: 0,
      jobStatus: "",

      _id: 0,
      title: "",
      description: "",
      salary: 0,
      requirement: "",
      status: "",
      black: true,

      disable: false,
      SUBMIT_JOB_URL: "http://localhost:8082/job/submit/",

      color:
        "bg-green-500  text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150",
    };

    console.log(id);
  }
  createNotification = (type) => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success("Success message", "Title here");
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            3000
          );
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
        default:
          return type;
      }
    };
  };
  handleSubmit(e) {
    const status = localStorage.getItem("candidate");
    var candidateStatus = JSON.parse(status).data.status;
    console.log(candidateStatus);
    var str = window.location.pathname;
    let idJOb = str.slice(19);
    history.push(this.SUBMIT_JOB_URL);

    axios
      .post(
        "http://localhost:8082/job/submit/607c5d570f3bae21e06f5782/" + idJOb
      )
      .then((response) => {
        var test = response.data;

        console.log(test);
        this.setState({ jobStatus: response.data });

        if (this.state.jobStatus === "job already exist") {
          NotificationManager.error("Error ", "Job already submitted", 3000);
        } else {
          NotificationManager.success("Success ", "Job submitted", 3000);
        }
      });

    this.setState({ black: !this.state.black });
    this.setState({ disable: !this.state.disable });

    this.setState({ color: !this.state.color });
    e.preventDefault();

    localStorage.setItem(
      "Applied Job" + this.state.title,
      JSON.stringify(this.state.title)
    );
    const name = localStorage.getItem("candidate");
    console.log(JSON.parse(name).fullName);
    var candidateName = JSON.parse(name).fullName;
    const subscriberId = "foo1";
    let endpoint =
      "	https://api.ravenhub.io/company/pfxz6Wrhd9/subscribers/" +
      subscriberId +
      "/events/lbi7wDLzYn";

    axios.post(
      endpoint,

      {
        headers: { "Content-type": "application/json" },
        candidate: candidateName,
      }
    );
  }

  componentWillMount() {
    var str = window.location.pathname;

    let id = str.slice(19);
    console.log(id);

    axios
      .get(
        "http://localhost:8082/job/match/" + id + "/607c5d570f3bae21e06f5782"
      )
      .then((response) => {
        var score = response.data;

        console.log(score);
        this.setState({ responseData: response.data });
      });

    if (!true === true) {
      this.setState({ disable: !this.state.disable });
      this.setState({ color: !this.state.color });
    }
    const props = this.props;
    if (props.location && props.location.state) {
      const job = props.location.state.job;
      this.setState({
        _id: job._id,
        title: job.title,
        description: job.description,
        salary: job.salary,
        requirement: job.requirement,
      });
    }
  }

  render() {
    const job = this.props.job;
    const data = [
      {
        name: "Accepted",
        value: this.state.responseData,
        fill: "#90cdf4",
      },
      {
        name: "Not accepted",
        value: 1.0 - this.state.responseData,
        fill: "#3182ce",
      },
    ];
    let disabled = this.state.disable;

    let color = this.state.color
      ? " bg-green-500  text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      : "bg-orange-500  text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150";
    let btn_class = this.state.black ? "Apply now" : "Processed";

    return (
      <>
        <div className="w-full  px-10">
          <div className="relative py-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white  ">
            <div className="rounded-t bg-white mb-0 px-12 py-12">
              <img
                alt="..."
                src={require("assets/img/team-3-800x800.jpg")}
                className=" h-auto align-middle border-none absolute py-8 -m-16 -ml-20 lg:-ml-24 max-w-200-px"
              />
              <div className="text-center flex justify-start px-20  ">
                <h6 className="text-gray-800  text-3xl font-bold left-260-px ">
                  {this.state.title}
                </h6>
              </div>
              <div className="text-sm leading-normal px-20 py-4 text-gray-500 font-bold uppercase">
                <i className="fas fa-map-marker-alt  text-sm leading-normal   text-gray-500 font-bold uppercase  ">
                  {" "}
                </i>{" "}
                Los Angeles, California
                <i class="fas fa-money-bill-wave px-12">
                  {this.state.salary} dt
                </i>{" "}
                <button
                  type="button"
                  style={{ color: "white" }}
                  className={color}
                  onClick={this.handleSubmit.bind(this)}
                  disabled={disabled}
                >
                  {btn_class}
                </button>
              </div>

              <div className="mt-6 lg:mb-0 mb-6 py-22 px-40">
                <div className="text-sm leading-normal  py-4 text-gray-500 font-bold uppercase">
                  {" "}
                  Share this job{" "}
                </div>

                <button
                  className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-twitter"></i>
                </button>
                <button
                  className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-facebook-square"></i>
                </button>
                <button
                  className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-dribbble"></i>
                </button>
                <button
                  className="bg-white text-gray-900 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
                  type="button"
                >
                  <i className="fab fa-github"></i>
                </button>
              </div>
              <div className="text-sm leading-normal px-30 text-gray-500 font-bold uppercase"></div>
            </div>
          </div>
          <div></div>
        </div>
        <NotificationContainer />
        <div className="flex flex-wrap">
          <div className="w-full lg:w-8/12 px-4">
            <div className="w-full  px-10">
              <div className="relative py-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white  ">
                <h5 className="text-gray-800 py-4 px-12 text-2xl font-bold left-100-px ">
                  Description :
                </h5>{" "}
                <p className="mb-4 px-12 text-base leading-relaxed text-gray-800">
                  {this.state.description}
                </p>
                <h5 className="text-gray-800 py-4 px-12 text-2xl font-bold left-100-px ">
                  Requirement :
                </h5>{" "}
                <p className="mb-4 px-12 text-base leading-relaxed text-gray-800">
                  {this.state.requirement}
                </p>
              </div>
              <div></div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
              <h5 className="text-gray-800 py-4 px-10 text-center text-2xl font-bold left-100-px ">
                Job matching
              </h5>{" "}
              <div className=" ">
                <PieChart width={400} height={250}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={true}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                  />

                  <Tooltip />
                </PieChart>
              </div>
            </div>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
              <h5 className="text-gray-800 py-4 px-10 text-center text-2xl font-bold left-100-px ">
                Similar Jobs
              </h5>{" "}
            </div>
            <Scrollbars autoHide style={{ width: 400, height: 600 }}>
              {this.props.similar.map((job) => {
                return (
                  <>
                    <Chart key={job._id} job={job} />
                  </>
                );
              })}
            </Scrollbars>
          </div>
        </div>
        ;
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    job: state.jobDetailData.jobDetail || [],
    error: state.jobDetailData.error || null,
    isLoading: state.jobDetailData.isLoading,

    similar: state.SimilarJob.similarjobs || [],
    error: state.SimilarJob.error || null,
    isLoading: state.SimilarJob.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (job) => {
      dispatch(submitJob(job));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
