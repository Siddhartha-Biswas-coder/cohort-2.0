import React, { useState } from "react";

const App = () => {
  const [userName, setuserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [imageURL, setimageUrl] = useState("");
  const [userDescription, setUserDescription] = useState("");

  const localData = localStorage.getItem("all-users")
    ? JSON.parse(localStorage.getItem("all-users"))
    : [];

  console.log(localData);
  const [allUsers, setallUsers] = useState(localData);

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

    localStorage.setItem("all-users", JSON.stringify(oldUsers));

    setuserName("");
    setUserRole("");
    setimageUrl("");
    setUserDescription("");
  };

  const deleteHandler = (index) => {
    const copyUsers = [...allUsers];

    const conf = window.confirm("Are you sure you want to delete this user?");

    if (conf) {
      copyUsers.splice(index, 1);
      localStorage.setItem("all-users", JSON.stringify(copyUsers));
      setallUsers(copyUsers);
    }else{
      window.alert("User not deleted");
    }
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
            <div
              key={index}
              className="lg:w-[23vw] md:w-[30vw] sm:w-[45vw] rounded-xl py-8 px-8 flex items-center flex-col text-center bg-gray-800 text-white"
            >
              <img
                src={elem.image}
                className="h-24 w-24 rounded-full object-cover object-center"
              />

              <h1 className="text-2xl font-semibold mt-5 text-white">
                {elem.name}
              </h1>
              <h5 className="text-lg text-blue-500 font-semibold my-2">
                {elem.role}
              </h5>
              <p className="text-sm font-medium text-white">
                {elem.description}
              </p>

              <button
                onClick={() => {
                  deleteHandler(index);
                }}
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