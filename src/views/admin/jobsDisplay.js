import React, { Component } from "react";
import Jobs from "container/jobs";

import CardBarChart from "components/Cards/CardsHR/CardBarChart.js";
import TestJob from "components/Cards/CardsHR/testjob";
import CardAddJob from "components/Cards/CardsHR/CardAddJob";

class JobsDispaly extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="relative flex-col ">
        <div className="w-full  ">
          <CardAddJob />
        </div>

        <div
          className="  flex 	  align-content:space-between; flex-wrap 
        "
        >
          <Jobs />
        </div>
      </div>
    );
  }
}
export default JobsDispaly;
