import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Provider } from "react-redux";

import "./index.css";

import App from "./App";
import store from "./Store/store";

axios.defaults.baseURL = "";
//axios.defaults.withCredentials = true; //refreshToken cookie 주고받기위한 코드

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
