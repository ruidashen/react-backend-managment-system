import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(<App store={store}></App>, document.getElementById("root"));

store.subscribe(() => {
  ReactDOM.render(<App store={store}></App>, document.getElementById("root"));
});
