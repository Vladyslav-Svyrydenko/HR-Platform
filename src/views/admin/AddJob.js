import React, { Component } from "react";
import CardAddJob from "components/Cards/CardsHR/CardAddJob";

import Jobs from "container/jobs";
class AddJob extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <Jobs /> <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
        <div>saaa</div>
      </div>
    );
  }
}

export default AddJob;
