import React from "react";
import { useState } from "react";

const App = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    const newAllUsers = [...allUsers, username];
    console.log(newAllUsers);

    setAllUsers(newAllUsers);
    setUsername("");
  };

  const [username, setUsername] = useState("");

  const [allUsers, setAllUsers] = useState([]);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Name: "
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button>Submit</button>
      </form>

      {allUsers.map((user, index) => {
        return <h1 key={index}>{user}</h1>;
      })}
    </div>
  );
};

export default App;
