import React, { useState } from "react";
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
        {allUsers.map((elem, index) => {
          return (
            <Card
              elem={elem}
              key={index}
              index = {index}
              deleteHandler={() => {
                deleteHandler(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
