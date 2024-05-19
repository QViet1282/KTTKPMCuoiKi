import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Add_classes from "./Component/Add_classes";
import Add_lesson from "./Component/Add_subject";
import Login from "./Component/Login";
import Register_subject from "./Component/Register_subject";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from "jquery";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="app" element={<App />}>
          <Route path="add_classes" element={<Add_classes />} />
          <Route path="add_lesson" element={<Add_lesson />} />
          <Route path="register_subject" element={<Register_subject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
