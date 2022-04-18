import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "./index.css";

import App from "./App";

axios.defaults.baseURL = "";
axios.defaults.withCredentials = true; //refreshToken cookie 주고받기위한 코드

ReactDOM.render(<App />, document.getElementById("root"));
