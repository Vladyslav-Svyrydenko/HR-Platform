import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import * as actions from "../../Redux/actions/team/TeamAction";
import "./App.css";

let socket;
const CONNECTION_PORT = "localhost:3000/";

const App = (props) => {
  // Before Login
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    props.fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  return (
    <>
      {!loggedIn ? (
        <div className="flex flex-wrap mt-50">
          <div className="w-full mb-12 px-4">
            <div className=" logIn mx-auto">
              <div className=" bannerdarkmode flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
                <div className="w-full text-center lg:w-8/12">
                  <h3 className="font-semibold text-3xl">
                    Welcome to Live Chat Room
                  </h3>

                  <div className="sm:block flex flex-col mt-10">
                    <input
                      type="text"
                      placeholder="Name..."
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                    />

                    <select
                      onChange={(e) => {
                        setRoom(e.target.value);
                      }}
                    >
                      <option value="">Select your Team</option>

                      {props.TeamsList.map((team, index) => {
                        return (
                          <Fragment key={index}>
                            <option>{team.teamName} </option>
                          </Fragment>
                        );
                      })}
                    </select>

                    <button
                      onClick={connectToRoom}
                      className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-blue-500 active:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                    >
                      Enter Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="flex h-screen antialiased text-gray-800">
          <div class="flex flex-row h-full w-full overflow-x-hidden">
            <div class="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
              <div class="flex flex-row items-center justify-center h-12 w-full">
                <div class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                </div>
                <div class="ml-2 font-bold text-2xl">QuickChat</div>
              </div>

              <div class="flex flex-col mt-8">
                <div class="flex flex-row items-center justify-between text-xs">
                  <span class="font-bold">Active Room </span>
                </div>
                <div class="ml-2 text-sm font-semibold">{room}</div>
              </div>
            </div>
            <div class="flex flex-col flex-auto h-full p-6">
              <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div class="flex flex-col h-full overflow-x-auto mb-4">
                  <div class="flex flex-col h-full">
                    <div class="grid grid-cols-4 gap-y-2">
                      <div className="messages">
                        {messageList.map((val, key) => {
                          return (
                            <div
                              className="messageContainer"
                              id={val.author == userName ? "You" : "Other"}
                            >
                              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0 text-white">
                                {val.author}
                              </div>

                              <div className="messageIndividual">
                                {val.message}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div>
                    <button class="flex items-center justify-center text-gray-400 hover:text-gray-600"></button>
                  </div>
                  <div class="flex-grow ml-4">
                    <div class="relative w-full">
                      <input
                        type="text"
                        placeholder="Message..."
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                        class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                    </div>
                  </div>
                  <div class="ml-4">
                    <button
                      target="_blank"
                      onClick={sendMessage}
                      className="get-started text-white font-bold px-3 py-3 rounded outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  TeamsList: state.teamsReducer.list,
});

const mapActionToProps = {
  fetchAll: actions.AllTeams,
  deleteTeams: actions.DeleteTeams,
};

export default connect(mapStateToProps, mapActionToProps)(App);
