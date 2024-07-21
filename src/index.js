import React from "react";
import ReactDOM from "react-dom";
import ChatBotRobot from "./components/Chatbot/Chatbot.compoenent";

import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store/store";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import ButterToast, { POS_RIGHT, POS_BOTTOM } from "butter-toast";
import { ToastProvider, useToasts } from "react-toast-notifications";

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider>
      <App />
    </ToastProvider>
    <ChatBotRobot />
    <ButterToast position={{ vertical: POS_BOTTOM, horizontal: POS_RIGHT }} />
  </Provider>,

  document.getElementById("root")
);
