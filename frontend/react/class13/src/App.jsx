import React from "react";
import Navbar from "./components/Navbar";
import AllSections from "./components/AllSections";
import { useState } from "react";
import Footer from "./components/Footer";

const App = () => {
  

  const [theme, setTheme] = useState("light");

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <div>
      <Navbar theme={theme} changedTheme = {changeTheme}/>

      
      <AllSections />
      <Footer />
    </div>
  );
};

export default App;
