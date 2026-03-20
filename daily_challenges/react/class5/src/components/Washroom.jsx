import React from "react";

const Washroom = (props) => {
  const color = props.gender == "Male" ? 'rgb(0,179,255)' : 'rgb(255,57,163)';
  return (
    <div style={{background: color}} className="wash">
      {props.gender}'s Washroom
    </div>
  );
};

export default Washroom;
