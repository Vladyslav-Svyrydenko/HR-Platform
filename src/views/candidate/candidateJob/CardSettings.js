import React, { useEffect } from "react";
import { Component } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import JobCandidate from "./jobCandidate";
import "../../../../src/assets/styles/pagination.css";

// components

class AllJobs extends Component {
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
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
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
  onChange = (e) => {
    this.setState({ search: e.target.value });
  };

  render() {
    return (
      <>
        <div className="relative py-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0 ">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between ">
              <h6 className="text-gray-800 text-xl font-bold">All jobs</h6>
              <form class="w-6 ">
                <div class="flex items-center border-b border-b-2 border-teal py-2">
                  <span className=" text-gray-400  bg-transparent rounded ">
                    <i className="fas fa-search"></i>
                  </span>

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
          {
            ((this.slice = this.props.jobs.slice(
              this.state.offset,
              this.state.offset + this.state.perPage
            )),
            this.slice.map((job) => {
              const { search } = this.state;

              if (
                search !== "" &&
                job.title.toLowerCase().indexOf(search.toLocaleLowerCase()) ===
                  -1
              ) {
                return null;
              }
              return (
                <>
                  <JobCandidate key={job._id} job={job} />
                </>
              );
            }))
          }
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

const mapStateToProps = (state) => {
  return {
    jobs: state.jobsData.alljobs || [],
    error: state.jobsData.error || null,
    isLoading: state.jobsData.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(AllJobs);
