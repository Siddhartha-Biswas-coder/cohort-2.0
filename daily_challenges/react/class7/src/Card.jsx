import React from "react";

const Card = (props) => {
  return (
    <div className="lg:w-[23vw] md:w-[30vw] sm:w-[45vw] rounded-xl py-8 px-8 flex items-center flex-col text-center bg-gray-800 text-white">
      <img
        src={props.elem.image}
        className="h-24 w-24 rounded-full object-cover object-center"
      />

      <h1 className="text-2xl font-semibold mt-5 text-white">
        {props.elem.name}
      </h1>
      <h5 className="text-lg text-blue-500 font-semibold my-2">
        {props.elem.role}
      </h5>
      <p className="text-sm font-medium text-white">{props.elem.description}</p>

      <button
        onClick={() => {
          props.deleteHandler(props.index);
        }}
        className="px-4 py-2 rounded  text-xs cursor-pointer active:scale-95 bg-red-600 text-white font-semibold mt-3"
      >
        Remove
      </button>
    </div>
  );
};

export default Card;
