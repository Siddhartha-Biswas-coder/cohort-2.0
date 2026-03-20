import React from "react";
import Navbar from "./components/Navbar";
import Men from "./components/Men";
import Women from "./components/Women";

const App = () => {
  const buttonClicked = () => {
    console.log("button Clicked");
  };

  // const user1 = {
  //   name: "Siddhartha",
  //   age: 20,
  //   gender: "male",
  // };

  // const user2 = {
  //   name: "Shreya",
  //   age: 20,
  //   gender: "female",
  // };

  // const user3 = {
  //   name: "Soumik",
  //   age: 8,
  //   gender: "male",
  // };

  return (
    <div>
      {/* <Navbar
        title="Sheryians"
        color="pink"
        links={["Courses", "Bootcamp", "Classroom", "Profile"]}
      />
      <Navbar
        title="Apple"
        color="Black"
        links={["iphone", "Mac", "iPad", "Store"]}
      /> */}

      {/* {user1.gender == "male" ? <Men /> : <Women />}
      {user2.gender == "male" ? <Men /> : <Women />}
      {user3.gender == "male" ? user3.age > 10 ? <Men /> : <Women />: <Women />} */}
      <button
        onClick={buttonClicked}
        className="active:scale-95 bg-emerald-600 text-white px-6 py-3 rounded font-bold m-2"
      >
        Click to download
      </button>
    </div>
  );
};

export default App;
