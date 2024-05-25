import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Creted from "./pages/products/create.jsx"
import MenuItem from "./components/menuItem"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <Creted /> */}
    {/* <MenuItem /> */}
    
    <ToastContainer/>
  </React.StrictMode>
);
