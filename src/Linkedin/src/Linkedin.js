import "./App.css";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";

import React, { Component } from "react";

import Alert from "react-s-alert";
import ProfileCard from "./components/ProfileCard";

import _ from "lodash";

class Linkedin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthorized: false,
      firstName: null,
      lastName: null,
      profileURL: null,
      pictureURL: null,
    };
  }

  componentDidMount() {
    window.addEventListener("message", this.handlePostMessage);
  }

  handlePostMessage = (event) => {
    if (event.data.type === "profile") {
      this.updateProfile(event.data.profile);
      Alert.success(
        `Login successful: ${event.data.profile.localizedFirstName}`,
        { position: "top" }
      );
    }
  };

  updateProfile = (profile) => {
    console.log(profile);
    this.setState({
      isAuthorized: true,
      firstName: _.get(profile, "localizedFirstName", ""),
      lastName: _.get(profile, "localizedLastName", ""),
      profileURL: `https://www.linkedin.com/in/${_.get(
        profile,
        "vanityName",
        ""
      )}`,
      pictureURL: _.get(
        _.last(_.get(profile, "profilePicture.displayImage~.elements", "")),
        "identifiers[0].identifier",
        ""
      ),
    });
  };

  requestProfile = () => {
    var oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77vfbhloepwrqa&scope=r_liteprofile&state=123456&redirect_uri=http://localhost:8082/callback`;
    var width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  render() {
    return (
      <div className="App">
        <Alert />

        <div className="App-body">
          <button onClick={this.requestProfile}>Linkedin Login</button>
          {this.state.isAuthorized && (
            <ProfileCard
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              profileURL={this.state.profileURL}
              pictureURL={this.state.pictureURL}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Linkedin;
