import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { StatusBarContextProvider } from "./context/statusbarContext";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StatusBarContextProvider>
        <App />
      </StatusBarContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
