// import React, { useState } from "react";

// const App = () => {
//   const [num, setNum] = useState(0);
//   const btnClicked = () => {
//     setNum(num+1);
//   };

//   return (
//     <div>
//       <h1>{num}</h1>
//       <button
//         onClick={btnClicked}
//         className="active:scale-95 bg-emerald-600 text-white px-6 py-3 rounded font-bold m-2"
//       >
//         Increase
//       </button>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";

// const App = () => {
//   const arr = ["Siddhartha", "Uday", "Soumik", "Shambo", "Arpan"];

//   const [num, setNum] = useState(0);

//   return (
//     <div>
//       <h1>{arr[num]}</h1>
//       <button
//         onClick={() => {
//           let user = Math.floor(Math.random() * arr.length);
//           setNum(user);
//         }}
//       >
//         Change User
//       </button>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";

// const App = () => {
//   const [marks, setMarks] = useState([88, 90, 86, 45, 22]);

//   function graceStudent() {
//     setMarks(
//       marks.map(function (elem) {
//         return elem > 95 ? elem : elem + 5;
//       }),
//     );
//   }

//   return (
//     <div>
//       {marks.map(function (elem, idx) {
//         return (
//           <h1 key={idx}>
//             Students {idx + 1} = {elem} ({elem > 33 ? "Pass" : "Fail"})
//           </h1>
//         );
//       })}
//       <button onClick={graceStudent}>Give them grace</button>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import Washroom from "./components/Washroom";

const App = () => {
  const [gender, setGender] = useState("Male");
  const changeGender = () => {
    // return gender == "Male" ? setGender("Female") : setGender("Male");
    setGender(gender == "Male" ? "Female" : "Male");
  };
  return (
    <div className="parent">
      {/* <div>
        <input type="radio" name="gender" id="male" />
        <label htmlFor="male"> Male</label>
      </div>
      <div>
        <input type="radio" name="gender" id="female" />
        <label htmlFor="female"> Female</label>
      </div> */}

      <h1 className="text-4xl font-bold text-white">{gender}</h1>
      <button onClick={changeGender}>Change Gender</button>
      {/* <Men/>
      <Women/> */}
      <Washroom gender={gender} />
    </div>
  );
};

export default App;
