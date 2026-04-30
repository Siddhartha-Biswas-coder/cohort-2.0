import React from "react";
import Card from "./components/Card";

const App = () => {

  const users = ['Anubhav','Abhishek','Siddhartha',]

  return (
    <div className="p-3 h-screen text-red-600 bg-black">
      {users.map((user, index) => {
        return <Card key={index} user={user} age={index + 20} />;
      })}
    </div>
  );
};

export default App;
