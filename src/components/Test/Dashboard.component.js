import React, { useState, useEffect, Fragment } from "react";
import Test from "./TestElement.component";
import styles from "./Dashboard.module.css";
import axios from "axios";
import Modal from "react-modal";
import { Link, useHistory } from "react-router-dom";
import modalstyles from "./Modal.module.css";
import teststyles from "./Testelement.module.css";
import resultstyles from "./TestResult.module.css";

const topics = [
  { id: 1, name: "<--select category-->" },
  { id: 9, name: "General Knowledge" },
  { id: 10, name: "Entertainment: Books" },
  { id: 11, name: "Entertainment: Film" },
  { id: 12, name: "Entertainment: Music" },
  { id: 13, name: "Entertainment: Musicals & Theatres" },
  { id: 14, name: "Entertainment: Television" },
  { id: 15, name: "Entertainment: Video Games" },
  { id: 16, name: "Entertainment: Board Games" },
  { id: 17, name: "Science & Nature" },
  { id: 18, name: "Science: Computers" },
  { id: 19, name: "Science: Mathematics" },
  { id: 20, name: "Mythology" },
  { id: 21, name: "Sports" },
  { id: 22, name: "Geography" },
  { id: 23, name: "History" },
  { id: 24, name: "Politics" },
  { id: 25, name: "Art" },
  { id: 26, name: "Celebrities" },
  { id: 27, name: "Animals" },
  { id: 28, name: "Vehicles" },
  { id: 29, name: "Entertainment: Comics" },
  { id: 30, name: "Science: Gadgets" },
  { id: 31, name: "Entertainment: Japanese Anime & Manga" },
  { id: 32, name: "Entertainment: Cartoon & Animations" },
];

Modal.setAppElement("#root");
function Dashboard(props) {
  let history = useHistory();
  if (!localStorage.getItem("auth-token")) {
    localStorage.clear();
    history.push("/");
  }
  const [tests, setTests] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [topic, settopic] = useState("");
  const [amount, setamount] = useState("");
  const [time, settime] = useState("");
  const [expiry, setexpiry] = useState(new Date());

  const options = {
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    },
  };
  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("name");
    localStorage.removeItem("loggedin");
  };
  useEffect(() => {
    axios
      .post("http://localhost:8082/api/test/gettests", {}, options)
      .then((res) => {
        for (let x of res.data) {
          for (let y of topics) {
            if (y["id"] == x["topic"]) x.topicname = y["name"];
          }
        }
        setTests(res.data);
      })
      .catch((err) => {
        if (!localStorage.getItem("auth-token")) history.push("/");
        else alert("couldn't fetch please reload");
      });
  }, [modalIsOpen]);

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:8082/api/test/addtest",
        { topic, amount, time, expiry, created: new Date() },
        options
      )
      .then((res) => {
        console.log("added");

        setmodalIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
        alert("ma nhebsh nmshy ");
      });
  };

  return (
    <>
      <React.Fragment>
        <div>
          <h1
            className={styles.heading}
            style={{
              background: "#3f63c5",
              fontSize: "2.5em",
              padding: "2%",
              color: "white",
            }}
          >
            Welcome {localStorage.getItem("name")}
          </h1>
        </div>
        <br />
        <button
          className={styles.buttons}
          style={{ float: "left", display: "block" }}
          onClick={() => setmodalIsOpen(true)}
        >
          + Add Test
        </button>

        <div className={styles.buttons}>
          <Link
            to="/candidate/login"
            onClick={logout}
            style={{ textDecoration: "none", color: "white" }}
          >
            Logout
          </Link>
          <br />
        </div>
        <br />
        <br />
        <br />

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setmodalIsOpen(false)}
          className={modalstyles.modal}
          overlayClassName={modalstyles.overlay}
        >
          <Fragment>
            <h1 className={modalstyles.heading}>Create Test</h1>
            <form onSubmit={onSubmit}>
              <label className={modalstyles.labels} htmlFor="topic">
                Topic:
              </label>
              <select
                id="topic"
                name="topic"
                className={modalstyles.inputs}
                onChange={(e) => settopic(e.target.value.toString())}
              >
                {topics.map((obj) => (
                  <option key={obj.id} value={obj.id}>
                    {obj.name}
                  </option>
                ))}
              </select>
              <br />
              <label className={modalstyles.labels} htmlFor="amount">
                Number of Questions:
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                className={modalstyles.inputs}
                onChange={(e) => setamount(e.target.value)}
              />
              <br />
              <label className={modalstyles.labels} htmlFor="time">
                Time Duration :
              </label>
              <input
                type="text"
                id="time"
                name="time"
                className={modalstyles.inputs}
                onChange={(e) => settime(e.target.value)}
              />
              <br />
              <label className={modalstyles.labels} htmlFor="expiry">
                Expiry:
              </label>
              <input
                type="date"
                id="expiry"
                name="expiry"
                className={modalstyles.inputs}
                onChange={(e) => setexpiry(e.target.value)}
              />
              <br />
              <button className={modalstyles.buttons} type="submit">
                Submit
              </button>
              <br />
            </form>
          </Fragment>
        </Modal>
        <div className={teststyles.parent}>
          <div className={resultstyles.row}>
            <div className={teststyles.element}>
              <strong>Pin</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Topic</strong>
            </div>
            <div className={teststyles.element}>
              <strong>No. of Ques</strong>
            </div>
            <div className={teststyles.element}>
              <strong>Time Duration </strong>
            </div>
            <div className={teststyles.element}>
              <strong>Expiry</strong>
            </div>
          </div>
          <div className={styles.testcontainer}>
            {tests.map((obj) => (
              <Test key={obj._id} {...obj} />
            ))}
          </div>
        </div>
        <br />
        <br />
      </React.Fragment>
    </>
  );
}

export default Dashboard;
