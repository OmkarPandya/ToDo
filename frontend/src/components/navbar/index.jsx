import React from "react";
import "./navbar.css";
import { RiTodoLine } from "react-icons/ri";

const index = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <b>
          <RiTodoLine /> ToDo
        </b>
      </div>
    </nav>
  );
};

export default index;
