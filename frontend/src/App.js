import React from "react";
import Navbar from "../src/components/navbar";
import ToDo from "./components/todo/ToDo";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <Navbar />
      <ToDo />
      <ToastContainer />
    </div>
  );
};

export default App;
