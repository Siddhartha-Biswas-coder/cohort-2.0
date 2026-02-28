// DOM - Document Object Model
// javascript for Frontend Development
// DOM has 4 pillars
// 1. Selection of an Element
// 2. Chaning HTML
// 3. Changing CSS
// 4. Event Listeners

// const h1 = document.querySelector("h1");

// console.log(h1);

// h1.innerHTML = "Hello PUBG Mobile";

// h1.style.color = "red";
// h1.style.backgroundColor = "black";

// const box = document.querySelector("#box");
const box = document.getElementById("box");
const box2 = document.getElementsByClassName("box2")[0];
const h1 = document.querySelector("h1");
box.innerHTML = "Click Me";
box.style.backgroundColor = "royalblue";
box.style.color = "gold";

h1.addEventListener("click", function () {
  console.log("You Clicked the Box");
  h1.innerHTML = "Hello PUBG Mobile";
  h1.style.color = "red";
  h1.style.fontSize = "50px";
});

box2.innerHTML = "Click Me Too";
box2.style.backgroundColor = "royalblue";
box2.style.color = "gold";

const counter = document.getElementById("counter");
const inc = document.getElementById("inc");
const dec = document.getElementById("dec");

inc.addEventListener("click", function () {
  let count = parseInt(counter.innerHTML);
  count++;
  counter.innerHTML = count;
});
dec.addEventListener("click", function () {
  let count = parseInt(counter.innerHTML);
  count--;
  counter.innerHTML = count;
});