import React, { Component } from "react";

import PropTypes from "prop-types";
import Job from "./job";
import { connect } from "react-redux";
import { history } from "helpers/history";

import { deleteJob } from "Redux/actions/job.actions";
import { fetchJobs } from "Redux/actions/job.actions";
import Pagination from "react-js-pagination";
import ReactPaginate from "react-paginate";

// components

class Jobs extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      search: "",
      offset: 0,
      tableData: [],
      orgtableData: [],
      perPage: 3,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  onChange = (e) => {
    this.setState({ search: e.target.value });
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  handleEdit(job) {
    history.push({
      pathname: `/admin/edit/${job._id}`,
      state: {
        job: job,
      },
    });
  }
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.loadMoreData();
      }
    );
  };
  loadMoreData() {
    const data = this.props.jobs;

    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      tableData: slice,
    });
  }

  render() {
    if (this.props.isLoading) {
      return <p>Loading ...</p>;
    } else if (this.props.error) {
      return (
        <div
          class="bg-red-lightest border border-red-light text-red-dark pl-4 pr-8 py-3 rounded "
          role="alert"
        >
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">
            Something seriously went wrong.
            {this.props.error.message}
          </span>
          <span class="absolute pin-t pin-b pin-r pr-2 py-3">
            <svg
              class="h-6 w-6 text-red"
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
    } else {
      return (
        <>
          <div className="flex flex-col lg:ml-auto mr-3">
            <form className="flex flex-col flex-wrap lg:ml-auto mr-3 ">
              <div className=" flex w-full flex-wrap ">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-400  bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  onChange={this.onChange}
                  type="text"
                  placeholder="Search here..."
                  className="px-3 py-3 placeholder-gray-400 text-gray-700  bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pl-10"
                />
              </div>
            </form>
            <div className="flex flex-wrap">
              {
                ((this.slice = this.props.jobs.slice(
                  this.state.offset,
                  this.state.offset + this.state.perPage
                )),
                this.slice.map((job) => {
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
                      <Job
                        key={job._id}
                        job={job}
                        onEdit={this.handleEdit.bind(this)}
                        onDelete={this.props.onDelete}
                      />
                    </>
                  );
                }))
              }
              <div></div>{" "}
            </div>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={this.props.jobs.length / 2}
              pageRangeDisplayed={5}
              containerClassName={"pagination"}
              activeClassName={"active"}
              onPageChange={this.handlePageClick}
            />
          </div>
        </>
      );
    }
  }
}
Jobs.defaultProps = {
  color: "light",
};

Jobs.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
const mapStateToProps = (state) => {
  return {
    jobs: state.jobData.jobs || [],
    error: state.jobData.error || null,
    isLoading: state.jobData.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (id) => {
      dispatch(deleteJob(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
