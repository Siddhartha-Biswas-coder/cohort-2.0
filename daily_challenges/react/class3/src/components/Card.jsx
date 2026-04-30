import React from "react";

const Card = (props) => {
  return (
    <div className="bg-white border-2 border-red-700 m-2 rounded px-5 py-3 w-40 h-20">
      <h1 className="text-2xl font-semibold">
        {props.user}
      </h1>
    </div>
  );
};

export default Card;
