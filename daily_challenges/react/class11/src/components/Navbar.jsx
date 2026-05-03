import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between px-8 py-4 bg-pink-400 mb-10">
        <h2>Navbar</h2>
        <div className="flex gap-8">
          <Link to='/'>Home Page</Link>
          <Link to='/about'>About Page</Link>
          <Link to='/products'>Product Page</Link>
          <Link to='/courses'>Courses' Page</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
