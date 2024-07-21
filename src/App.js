import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Router, Switch, Link, Route, Redirect } from "react-router-dom";
import Basic from "./components/Left/Basic";
import "./container/styles.css";
import ResumeContextProvider from "../src/contexts/ResumeContext";
import Right from "./components/Right/Right";

import myClasses from "./components/Left/Left.module.css";
import thumbn from "../src/assets/img/templateA.png";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//navbars to change based on auth
import NavbarCandidate from "./components/Navbars/CandidateNavbar";

// layouts
import ChatBotRobot from "./components/Chatbot/Chatbot.compoenent";

import Admin from "layouts/Admin";
import Candidate from "layouts/Candidate";
import Auth from "layouts/Auth.js";

// views without layouts
import Index from "views/Index";
import Event3D from "./views/EventManagement/Event3D";
import BoardUser from "./views/candidate/BoardUser";
import BoardAdmin from "./views/candidate/BoardAdmin";

import { logout } from "./Redux/actions/user/auth";
import { clearMessage } from "./Redux/actions/user/message";
import Linkedin from "./Linkedin/src/Linkedin";

import { history } from "./helpers/history";
import RegisterCandidate from "views/auth/RegisterCandidate";
import RegisterHR from "views/auth/RegisterHR";
import Profile from "views/candidate/Settings";
import Chat from "./components/Chat/App";

import ProfileCard from "./Linkedin/src/components/ProfileCard";
import Logo from "assets/img/HR HUB CANDIDATE.png";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showUserBoard, setShowUserBoard] = useState(false);

  const { user: currentUser } = useSelector((state) => state.userReducer.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      // setShowUserBoard(currentUser.roles.includes("ROLE_USER"));
      //  setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };

  function Templates() {
    const useStyles = makeStyles({
      headerLink: {
        color: "#FF8E53 ",
        minWidth: 100,
        marginLeft: 30,
      },
    });

    const classes = useStyles();

    return (
      <div className="app">
        <div className="left">
          <Link to="/candidate/settings">
            <i className="mt-4 p-3 w-full fas fa-arrow-circle-left"></i>
          </Link>
          <div className={myClasses.headerLeft}>
            <Link to="/candidate/settings">
              <img src={Logo} alt="logo" className={myClasses.img2} />
            </Link>
          </div>
          <hr className={myClasses.hr2} />
          <h2 className={myClasses.templatesH2}>Templates</h2>
          <div className={myClasses.cards}>
            <div className={myClasses.templateCard}>
              <img
                src={thumbn}
                alt="thumbnail"
                className={myClasses.imgThumb}
              />
              <Button
                className={classes.headerLink}
                component={Link}
                to="/basic/header"
              >
                The Basic
              </Button>
            </div>
            {/* Placeholder for a second template */}
            {/* <div className={myClasses.templateCard}>
          <img src={thumbn} alt="thumbnail" className={myClasses.imgThumb} />
          <Button
            className={classes.headerLink}
            component={Link}
            to="/basic/header"
          >
            The Stylish
          </Button>
        </div> */}
          </div>
        </div>
        <Right />
      </div>
    );
  }

  return (
    <ResumeContextProvider>
      <Router history={history}>
        {/* {currentUser && (
        <NavbarCandidate User={currentUser.username} close={logOut} />
      )} */}
        <Switch>
          {/* <Route
          path="/admin"
          render={() =>
            currentUser ? (
              <Redirect to="/admin/jobs" />
            ) : (
              <Redirect to="/auth" />
            )
          }
        /> */}
          <Route path="/profile" component={ProfileCard} />
          <Route path="/admin" component={Admin} />
          <Route path="/candidateadd" component={RegisterCandidate} />
          <Route path="/auth" component={Auth} />
          {/* add routes without layouts */}
          <Route path="/resume" component={Templates} />
          <Route path="/basic" component={Basic} />
          <Route path="/user" component={BoardUser} />
          <Route path="/chat" component={Chat} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/linkedin" component={Linkedin} />
          <Route path="/event3D" component={Event3D} />
          <Route path="/candidate" component={Candidate} />

          <Route
            path="/admin"
            render={() =>
              currentUser ? (
                <Redirect to="/admin/jobs" />
              ) : (
                <Redirect to="/auth" />
              )
            }
          />
          <Route path="/hradd" component={RegisterHR} />
          <Route path="/" component={Index} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </ResumeContextProvider>
  );
};

export default App;
