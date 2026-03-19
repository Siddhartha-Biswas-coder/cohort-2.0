import React from "react";
import Card from "./components/card";
import Button from "./components/Button";

const App = () => {
  const users = ["Anubhav", "Sarthak", "Siddhartha", "Harsh"];
  return (
    <div className="bg-black h-screen p-3">
      {users.map(function(elem){
        return <Card user={elem}/>
      })}
      {/* <Button text="Download" />
      <Button text="Explore" /> */}
    </div>
  );
};

export default App;
