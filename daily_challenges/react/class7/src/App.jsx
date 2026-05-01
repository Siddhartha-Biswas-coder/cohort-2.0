import React, { use, useState } from "react";
import Card from "./Card";

const App = () => {
  const [userName, setuserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [imageURL, setimageUrl] = useState("");
  const [userDescription, setUserDescription] = useState("");

  const [allUsers, setallUsers] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();

    const oldUsers = [...allUsers];
    oldUsers.push({
      name: userName,
      role: userRole,
      image: imageURL,
      description: userDescription,
    });
    setallUsers(oldUsers);

    setuserName("");
    setUserRole("");
    setimageUrl("");
    setUserDescription("");
  };

  const deleteHandler = (index) => {
    const copyUsers = [...allUsers];
    copyUsers.splice(index, 1);
    setallUsers(copyUsers);
  };

  return (
    <div className="h-screen bg-black text-white">
      <form className="flex flex-wrap justify-center" onSubmit={submitHandler}>
        <input
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[45%]"
          type="text"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[45%]"
          type="text"
          value={imageURL}
          onChange={(e) => setimageUrl(e.target.value)}
          placeholder="Image URL"
        />
        <input
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[45%]"
          type="text"
          value={userRole}
          onChange={(e) => setUserRole(e.target.value)}
          placeholder="Enter Role"
        />
        <input
          className="border-2 text-xl font-semibold px-5 py-2 rounded m-2 w-[45%]"
          type="text"
          value={userDescription}
          onChange={(e) => setUserDescription(e.target.value)}
          placeholder="Enter Description"
        />

        <button className="text-xl font-semibold px-5 py-2 bg-emerald-700 rounded m-2 w-[92%] active:scale-95">
          Create User
        </button>
      </form>

      <div className="flex flex-wrap justify-center px-4 py-10 gap-4">
        {allUsers.map((props, index) => {
          return (
            <div key={index} className="w-[20vw] rounded-xl py-8 px-8 flex items-center flex-col text-center ml-5 mt-5 bg-[#333]">
              <img
                src="https://images.unsplash.com/photo-1773332585815-f106a5d6ed6c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="h-24 w-24 rounded-full"
              />

              <h1 className="text-2xl font-semibold mt-5 text-white">
                {props.name}
              </h1>
              <h5 className="text-lg text-blue-500 font-semibold my-2">
                {props.role}
              </h5>
              <p className="text-sm font-medium text-white">
                {props.description}
              </p>

              <button
                onClick={() => deleteHandler(index)}
                className="px-4 py-2 rounded  text-xs cursor-pointer active:scale-95 bg-red-600 text-white font-semibold mt-3"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
