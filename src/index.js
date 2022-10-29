import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import "./index.css";

import { store } from "./services/store";
import { saveStateToLocalStorage } from "./services/utils/localStorage";

import Wordle from "./Wordle";

store.subscribe(() => {
  saveStateToLocalStorage("userAuth", store.getState().userAuth);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Wordle />
    </Provider>
  </React.StrictMode>
);
