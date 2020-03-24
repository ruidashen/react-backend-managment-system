import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import storageUtils from "./utils/storeageUtils";
import memoryUtils from "./utils/memoryUtils";

/*
Application entry
*/

const user = storageUtils.getUser();
memoryUtils.user = user;
ReactDOM.render(<App></App>, document.getElementById("root"));
