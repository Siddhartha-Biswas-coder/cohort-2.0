import React from "react";

const User = (props) => {
  const color = () => {
    return Math.floor(Math.random() * 256);
  };

  return (
    <div
      style={{ backgroundColor: `rgb(${color()}, ${color()}, ${color()})` }}
      className="user-card"
    >

        <img src={props.elem.download_url} alt="" className="user-image"/>

        <h3>{props.elem.author}</h3>
    </div>
  );
};

export default User;
