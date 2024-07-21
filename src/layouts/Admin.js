import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import AddJob from "views/admin/AddJob";
import UpdateHr from "views/auth/updateHR";
import Tables from "views/admin/Tables.js";
import Profile from "views/admin/Profile";
import SearchCandidate from "views/admin/SearhCandidate";
import Tests from "views/admin/Tests";
import JobsDispaly from "views/admin/jobsDisplay";
import CardEditJob from "components/Cards/CardsHR/CardEditJob";
import CardAddJob from "components/Cards/CardsHR/CardAddJob";
import TestJob from "components/Cards/CardsHR/testjob";
import Events from "views/EventManagement/EventsView";
import Teams from "views/TeamManagement/TeamView";
import TeamStats from "../components/TeamStats/TeamStats"
import AddTest from "views/admin/AddTest";
import UpdateTest from "views/admin/UpdateTest";

import Question from "views/admin/Question";
import Response from "views/admin/Response";
import Tasks from "views/admin/Tasks";
import { NotificationContainer } from "react-notifications";
export default function Admin() {
  return (
    <>
      <AdminNavbar />
      <Sidebar />
      <div className="relative md:ml-64">
        <div className="px-4 md:px-10 mx-auto w-full m-24 mt-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/profile" exact component={Profile} />
            <Route path="/admin/setting" exact component={Settings} />
            <Route path="/admin/tests" exact component={Tests} />{" "}
            <Route path="/admin/question" exact component={Question} />{" "}
            <Route path="/admin/response" exact component={Response} />{" "}
            <Route path="/admin/tasks" exact component={Tasks} />{" "}
            <Route path="/admin/UpdateHr" exact component={UpdateHr} />{" "}
            <Route path="/admin/AddTest" exact component={AddTest} />{" "}
            <Route path="/admin/UpdateTest" exact component={UpdateTest} />{" "}
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/addJob" exact component={AddJob} />
            <Route path="/admin/jobs" exact component={JobsDispaly} />
            <Route path="/admin/test" exact component={TestJob} />
            <Route path="/admin/edit/:id" exact component={CardEditJob} />
            <Route path="/admin/search" component={SearchCandidate} />
            <Route path="/admin/event" exact component={Events} />
            <Route path="/admin/teams" exact component={Teams} />
            <Route path="/admin/teamStats" exact component={TeamStats} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

/*
import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Maps from "views/admin/Maps.js";
import Settings from "views/admin/Settings.js";
import UpdateHr from "views/auth/updateHR";
import AddJob from "views/admin/AddJob";
import Tables from "views/admin/Tables.js";
import Profile from "views/admin/Profile";

import Tests from "views/admin/Tests";

import AddTest from "views/admin/AddTest";
import UpdateTest from "views/admin/UpdateTest";

import Question from "views/admin/Question";
import Response from "views/admin/Response";
import Tasks from "views/admin/Tasks";
import JobsDispaly from "views/admin/jobsDisplay";
import CardEditJob from "components/Cards/CardsHR/CardEditJob";
import TestJob from "components/Cards/CardsHR/testjob";
import Events from "views/EventManagement/EventsView";
import Teams from "views/TeamManagement/TeamView";
export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
  
        <div className="px-4 md:px-10 mx-auto w-full m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/profile" exact component={Profile} />
            <Route path="/admin/setting" exact component={Settings} />
            <Route path="/admin/tests" exact component={Tests} />{" "}
            <Route path="/admin/question" exact component={Question} />{" "}
            <Route path="/admin/response" exact component={Response} />{" "}
            <Route path="/admin/tasks" exact component={Tasks} />{" "}
            <Route path="/admin/UpdateHr" exact component={UpdateHr} />{" "}
            <Route path="/admin/AddTest" exact component={AddTest} />{" "}
            <Route path="/admin/UpdateTest" exact component={UpdateTest} />{" "}
            <Route path="/admin/maps" exact component={Maps} />
            <Route path="/admin/tables" exact component={Tables} />
            <Route path="/admin/jobs" exact component={JobsDispaly} />
            <Route path="/admin/test" exact component={TestJob} />
            <Route path="/admin/edit/:id" exact component={CardEditJob} />
            <Route path="/admin/event" exact component={Events} />
            <Route path="/admin/teams" exact component={Teams} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
*/
