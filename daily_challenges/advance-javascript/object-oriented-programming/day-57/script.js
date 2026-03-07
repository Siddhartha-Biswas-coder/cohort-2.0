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


// call apply bind
// for any function for whose this value is -> "window" , but we dont want the value of this as window but any other object , at that time , we will use call apply bind

let obj = {
    name: "Siddhartha",
}

function abcd1(a,b,c){
    console.log(this);
}

abcd1.call(obj,1,2,3);

function abcd2(a,b,c){
    console.log(this);
}

abcd2.apply(obj,[1,2,3]);

function abcd3(a,b,c){
    console.log(this);
}

let newfunc = abcd3.bind(obj,1,2,3); 
newfunc()