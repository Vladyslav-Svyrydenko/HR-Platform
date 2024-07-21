import React, { useState } from "react";
import styles from "./Taketest.module.css";
import style from "./Dashboard.module.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function Taketest() {
  let history = useHistory();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pin, setpin] = useState("");

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("name");
    localStorage.removeItem("loggedin");
  };

  const submithandler = (e) => {
    e.preventDefault();
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("http://localhost:8082/api/test/", { pin, email, name }, options)
      .then((res) => {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("pin", pin);
        console.log("good");
        history.push({
          pathname: "/candidate/ques",
          state: { res: res.data },
        });
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <>
      <h1
        className={styles.heading}
        style={{ background: "white", fontSize: "3em", padding: "2%" }}
      >
        Welcome in our E-learning platform
      </h1>
      <div className={style.buttons}>
        <Link to="/candidate/taketest" onClick={logout}>
          Logout
        </Link>
        <br />
      </div>
      <div className={styles.parent}>
        <div className={styles.taketest}>
          <h1 className={styles.heading}>Take Test</h1>
          <br />
          <form onSubmit={submithandler}>
            <label className={styles.labels} htmlFor="name">
              Name:
            </label>
            <input
              className={styles.inputs}
              onChange={(e) => setname(e.target.value)}
              id="name"
              name="name"
              type="text"
            />
            <br />
            <label className={styles.labels} htmlFor="email">
              Email:
            </label>
            <input
              className={styles.inputs}
              id="email"
              name="email"
              type="email"
              onChange={(e) => setemail(e.target.value)}
            />
            <br />
            <label className={styles.labels} htmlFor="pin">
              Pin:
            </label>
            <input
              className={styles.inputs}
              onChange={(e) => setpin(e.target.value)}
              id="pin"
              name="pin"
              type="text"
            />
            <br />
            <button type="submit" className={styles.buttons}>
              Submit
            </button>
            <button
              className={styles.buttons}
              style={{ float: "left", display: "block" }}
              onClick={() => history.goBack()}
            >
              &lt;- Back
            </button>
            <br />
            <br />
          </form>
        </div>
      </div>
    </>
  );
}

export default Taketest;
