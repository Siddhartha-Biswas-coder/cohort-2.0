import React, { useEffect, useState } from "react";
import axios from "axios";

const App2 = () => {
  const [name, setName] = useState("");
  const [num, setNum] = useState(0);

  const getData = async () => {
    const response = await axios.get("https://randomuser.me/api/");
    setName(
      response.data.results[0].name.first +
        " " +
        response.data.results[0].name.last,
    );
  };

  useEffect(() => {
    getData();
  }, [num]);

  return (
    <div>
      <h1>{name}</h1>
      <h1>{num}</h1>

      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        Click Here
      </button>
    </div>
  );
};

export default App2;
