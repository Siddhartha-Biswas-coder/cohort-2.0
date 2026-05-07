import React, { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log("hello");
  }, [counter]);

  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [number3, setNumber3] = useState(0);

  useEffect(() => {
    console.log('number 1 changed');
    
  },[number1])

  return (
    <div>
      {/* <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        placeholder="Enter: "
      />
      <h1>{counter}</h1>
      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        Increase
      </button> */}

      <h1>{number1}</h1>
      <button
        onClick={() => {
          setNumber1(Math.floor(Math.random() * 100));
        }}
      >
        Change Number 1
      </button>
      <br />

      <h1>{number2}</h1>
      <button
        onClick={() => {
          setNumber2(Math.floor(Math.random() * 100));
        }}
      >
        Change Number 2
      </button>
      <br />

      <h1>{number3}</h1>
      <button
        onClick={() => {
          setNumber3(Math.floor(Math.random() * 100));
        }}
      >
        Change Number 3
      </button>
      <br />
    </div>
  );
};

export default App;