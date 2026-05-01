import React from "react";

const Card = (props) => {
  return (
    <div className="w-[20vw] rounded-xl py-8 px-8 flex items-center flex-col text-center ml-5 mt-5 bg-[#333]">
      <img
        src="https://images.unsplash.com/photo-1773332585815-f106a5d6ed6c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="h-24 w-24 rounded-full"
      />

      <h1 className="text-2xl font-semibold mt-5 text-white">{props.name}</h1>
      <h5 className="text-lg text-blue-500 font-semibold my-2">{props.role}</h5>
      <p className="text-sm font-medium text-white">{props.description}</p>

      <button onClick={deleteHandler} className="px-4 py-2 rounded  text-xs cursor-pointer active:scale-95 bg-red-600 text-white font-semibold mt-3">Remove</button>
    </div>
  );
};

export default Card;
