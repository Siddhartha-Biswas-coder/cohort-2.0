// class Sketch{
//     constructor(character,color){
//         this.character = character;
//         this.color = color;
//         this.someFunc = function(){};
//     }
// }

// Sketch.prototype.speak = function(){}
// Sketch.prototype.walk = function(){}

// let sketch1 = new Sketch("Doremon","blue");


// global -> window
// console.log(this); //window

// function -> window
// function abcd() {
//   console.log(this);
// }
// abcd(); // window

// es5 function inside object -> object
// let obj1 = {
//   name: "siddhartha",
//   func: function () {
//     console.log(this); //obj1
//   },
// };
// obj1.func();

// es6 function inside object -> window
// let obj4 = {
//     fuc: () => {
//         console.log(this) //window
//     }
// }
// obj4.fuc()

// es5 function inside es5 function inside object -> window
// let obj2 = {
//   name: "siddhartha",
//   func: function () {
//     function def() {
//       console.log(this); //window
//     }
//     def();
//   },
// };
// obj2.func();

// es6 function inside es5 function inside object -> object
// let obj3 = {
//   name: "siddhartha",
//   func: function () {
//     let def = () => {
//       console.log(this); //obj3
//     };
//     def();
//   },
// };
// obj3.func();


