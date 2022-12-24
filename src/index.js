import React from "react";
import ReactDOM from "react-dom/client";
import "../src/styles/style.scss";
import App from "../src/components/app/App.js";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
