import React from "react";
import "./Nav.scss";
import DataTime from "./DataTime";

const Nav = () => {
  return (
    <nav>
      <div className="left">
        <div className="apple-icon">
          <img src="./navbar-icons/apple.svg" alt="" />
        </div>

        <div className="nav-item">
          <p>Siddhartha Biswas</p>
        </div>

        <div className="nav-item">
          <p>File</p>
        </div>

        <div className="nav-item">
          <p>Window</p>
        </div>

        <div className="nav-item">
          <p>Terminal</p>
        </div>
      </div>
      <div className="right">
        <div className="nav-icon wifi-icon">
          <img src="./navbar-icons/wifi.svg" alt="" />
        </div>
        <div className="nav-icon">
          <DataTime />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
