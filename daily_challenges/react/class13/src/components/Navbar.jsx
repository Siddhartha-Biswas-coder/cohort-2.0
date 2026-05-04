import React from "react";
import { useState } from "react";

const Navbar = (props) => {
  const [newTheme, setNewTheme] = useState("second");
  return (
    <div className="nav">
      <h1>Theme is {props.theme}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          props.changedTheme(newTheme);

          setNewTheme("");
        }}
      >
        <input
          type="text"
          placeholder="Enter Theme"
          value={newTheme}
          onChange={(e) => {
            setNewTheme(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Navbar;
