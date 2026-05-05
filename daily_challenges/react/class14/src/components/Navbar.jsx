import React, { useContext } from "react";
import { UserDataContext } from "../context/UserContext";
import { PostDataCOntext } from "../context/PostContext";

const Navbar = () => {
  const data = useContext(PostDataCOntext);
  console.log(data);

  return (
    <div className="w-full h-10 bg-green-600">
      <h1>This is Navbar</h1>
    </div>
  );
};

export default Navbar;
