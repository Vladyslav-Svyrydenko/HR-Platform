import "../App.css";

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProfileCard = (props) => {
  /* const location = useLocation();

  useEffect(() => {
    console.log("testing", location.pathname); // result: '/secondpage'
    console.log("testing", location.state); // result: 'some_value'
    console.log("testing", location.state); // result: 'some_value'
    console.log("testing", location.state); // result: 'some_value'
  }, [location]);
*/
  return (
    <div className="profile">
      <div className="profile-container">
        <img src={props.pictureURL} alt="" height="200px" width="200px" />
        <h1>
          {props.firstName} {props.lastName}
        </h1>
      </div>
    </div>
  );
};
export default ProfileCard;
