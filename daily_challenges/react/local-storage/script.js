// localStorage.setItem("name", "Siddhartha");
// localStorage.setItem("age", "25");
// const name = localStorage.getItem("name");
// console.log(name);
// const age = localStorage.getItem("age");
// console.log(age);

// localStorage.clear();
var obj = {
  name: "Siddhartha",
  age: 21,
  gender: "Male",
  city: "Kolkata",
};

localStorage.setItem("user", JSON.stringify(obj));

const newObj = JSON.parse(localStorage.getItem("user"));
console.log(newObj);
