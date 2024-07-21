import React from "react";
import { Component } from "react";
import Scrollbars from "react-custom-scrollbars";
import { connect } from "react-redux";
import "../../../../src/assets/styles/job.css";
import RecomJOb from "./RecomJob";

// components

class CardProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 text-center mt-20">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                      {this.props.recJob.length}
                    </span>
                    <span className="text-sm text-gray-500">
                      Recommended Jobs
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Scrollbars autoHide style={{ width: 350, height: 600 }}>
              {this.props.recJob.map((job) => {
                return (
                  <>
                    <RecomJOb key={job._id} job={job} />
                  </>
                );
              })}
            </Scrollbars>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recJob: state.RecomJob.jobRecom || [],
    errorr: state.RecomJob.error || null,
    isLoadingg: state.RecomJob.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(CardProfile);
