import React from "react";
import axios from "axios";
import { useState } from "react";
import User from "./components/User";

const App = () => {
  const localData = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];

  const [allData, setAllData] = useState(localData);

  async function getData() {
    const response = await axios.get(
      "https://picsum.photos/v2/list?page=2&limit=100",
    );
    setAllData(response.data);
    localStorage.setItem("data", JSON.stringify(response.data));
    console.log(response.data);
  }

  return (
    <div>
      <button onClick={getData}>Get Data</button>

      <div className="cards">
        {allData.map(function (elem, idx) {
          return (
            <div key={idx}>
              <User elem={elem} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
