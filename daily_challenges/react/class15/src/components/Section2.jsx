import React, { useContext } from "react";
import { ThemeDataContext } from "../context/ThemeContext";

const Section2 = () => {
  const theme = useContext(ThemeDataContext);

  return (
    <div>
      <h2>Section2</h2>
      <p>{theme}</p>
    </div>
  );
};

export default Section2;
