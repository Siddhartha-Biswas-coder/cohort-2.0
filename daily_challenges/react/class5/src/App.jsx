import React, { useState } from "react";

const App = () => {
  const [num, setNum] = useState(0);

  const btnClicked = () => {
    console.log("btn clicked");
    setNum(num + 1);
  };

  return (
    <div>
      <h1>{num}</h1>
      <button
        className="bg-emerald-600 w-40 px-5 py-3 text-white rounded-2xl"
        onClick={btnClicked}
      >
        Increase
      </button>
    </div>
  );
};

export default App;
