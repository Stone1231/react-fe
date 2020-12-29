import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navbar from "./Navbar";
import * as serviceWorker from "./serviceWorker";
import { store, context } from "stores/index";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider context={context} store={store}>
      <Navbar />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
