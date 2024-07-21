import React, { useEffect } from "react";
import { Component } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import JobCandidate from "./jobCandidate";
import "../../../../src/assets/styles/pagination.css";
import JobSubmitted from "../candidateJob/JobSubmitted";

// components

class AppliedJob extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      search: "",
    };
  }

  onChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <>
        <div className="relative py-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0 ">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between ">
              <h6 className="text-gray-800 text-xl font-bold"></h6>
              <form class="w-6 ">
                <div class="flex items-center border-b border-b-2 border-teal py-2">
                  <input
                    class="appearance-none bg-transparent border-none w-full
     text-grey-darker mr-3  px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Search here..."
                    onChange={this.onChange}
                    aria-label="Full name"
                  />
                </div>
              </form>
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                refresh
              </button>
            </div>
          </div>
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
              "bg-white"
            }
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className={"font-semibold text-lg " + "text-gray-800"}>
                    Submitted jobs{" "}
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      Job
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      Salary
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      Status
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      Company Name{" "}
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      Action{" "}
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    ></th>
                  </tr>
                </thead>
                {this.props.jobs.map((job) => {
                  const { search } = this.state;

                  if (
                    search !== "" &&
                    job.title
                      .toLowerCase()
                      .indexOf(search.toLocaleLowerCase()) === -1
                  ) {
                    return null;
                  }
                  return (
                    <>
                      <JobSubmitted key={job._id} job={job} />
                    </>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobSubmitted.submittedjobs || [],
    error: state.jobSubmitted.error || null,
    isLoading: state.jobSubmitted.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(AppliedJob);
