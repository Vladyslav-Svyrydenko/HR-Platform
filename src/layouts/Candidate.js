import { Switch, Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
// components

//import CandidateNavbar from "components/Navbars/CandidateNavbar";
import HeaderStats from "components/Headers/HeaderStatsCandidate.js";
import FooterAdmin from "components/Footers/FooterCandidate.js";

// views
import Profile from "views/candidate/Profile.js";
import Dashboard from "views/candidate/Dashboard.js";
import Tests from "views/candidate/Tests.js";
import Settings from "views/candidate/Settings.js";
import Tables from "views/candidate/Tables.js";
import Chat from "../components/Chat/App";
import Question from "views/candidate/Question";

import taketest from "../components/Test/TakeTest.component";
import SidebarCandidate from "components/Sidebar/SidebarCandidate";
import NavbarCandidate from "components/Navbars/CandidateNavbar";
import Event3D from "views/EventManagement/Event3D";
import webcam from "views/candidate/webcam";
import WebcamCapture from "views/candidate/WebcamCapture";
import WebcamStreamCapture from "views/candidate/WebcamStreamCapture";
import Homenav from "../components/Test/HomeHeader.component";
import Loginnav from "../components/Test/LoginNav.component";
import Login from "../components/Test/LoginRegister.component";
import alltests from "../components/Test/Dashboard.component";
import Testresult from "../components/Test/TestResult.component";
import Ques from "../components/Test/Question.component";
import Alljobs from "views/candidate/candidateJob/allJobs";
import savedJobs from "views/candidate/candidateJob/savedJobs";
import JobDetails from "views/candidate/candidateJob/JobDetails";
import AppliedJobs from "views/candidate/candidateJob/AppliedJobs";
import Maps from "views/candidate/candidateJob/Maps";

export default function Candidate() {
  const [loggedin, setloggedin] = useState(false);
  return (
    <>
      <NavbarCandidate />
      <SidebarCandidate />
      <div className="relative md:ml-64  md:pt-3 pb-32 pt-12">
        {/* Header */}
        <HeaderStats />

        <div className="px-4 md:px-10 mx-auto w-full mt-8">
          <Switch>
            <Route path="/candidate/dashboard" exact component={Dashboard} />
            <Route path="/candidate/profile" exact component={Profile} />
            <Route path="/candidate/tests" exact component={Tests} />
            <Route path="/candidate/settings" exact component={Settings} />
            <Route path="/candidate/tables" exact component={Tables} />
            <Route path="/candidate/tables" exact component={Tables} />
            <Route path="/candidate/jobs" exact component={Alljobs} />
            <Route path="/candidate/map" exact component={Maps} />

            <Route path="/candidate/details/:id" exact component={JobDetails} />
            <Route
              path="/candidate/submittedJobs"
              exact
              component={AppliedJobs}
            />

            <Route path="/candidate/savedJobs" exact component={savedJobs} />

            <Route path="/candidate/question" exact component={Question} />{" "}
            <Route path="/event3D" exact component={Event3D} />{" "}
            <Route path="/candidate/webcam" exact component={webcam} />{" "}
            <Route
              path="/candidate/webcamCapture"
              exact
              component={WebcamCapture}
            />{" "}
            <Route
              path="/candidate/webcamStreamCapture"
              exact
              component={WebcamStreamCapture}
            />{" "}
            <Route path="/candidate/chat" exact component={Chat} />
            <Route path="/candidate/abouttest" exact component={Testresult} />
            <Route path="/candidate/login" exact component={Login} />
            <Route
              exact
              path={["/login", "/register"]}
              render={() => <Login setloggedin={setloggedin} />}
            />
            <Route path="/candidate/ques" exact component={Ques} />
            <Route path="/candidate/alltests" exact component={alltests} />
            <Route path="/candidate/taketest" exact component={taketest} />
            <Route
              path="/candidate/webcamCapture"
              exact
              component={WebcamCapture}
            />{" "}
            <Route
              path="/candidate/webcamStreamCapture"
              exact
              component={WebcamStreamCapture}
            />{" "}
            <Redirect from="/candidate" to="/candidate/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
