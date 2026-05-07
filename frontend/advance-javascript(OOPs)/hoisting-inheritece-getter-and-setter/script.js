
//hoisting is not possible (not usable before declaring)
// class expression
// let Animal = class{
//     constructor(){
//         this.name = "Dodo";
//         this.breed = "dig";
//     }
// };

// let animal1 = new Animal();

//inheritence
// class Animal{
//     constructor(){
//         this.hand = 2;
//         this.legs = 2;
//     }

//     eat(){}
//     breathe(){}
// }

// class Kekda extends Animal{
//     constructor(){
//         super();
//         this.legs = 8;
//         this.hands = 0;
//     }
//     susu(){}
// }

// let k1 = new Kekda();

// getter and setter
// class Animal{
//     constructor(){
//         this._age = 12;
//     }

//     set age(val){
//         if (val < 0){
//             console.error("not possible")
//             return;
//         }
//         this._age = val;
//         return this._age
//     }

//     get age(){
//         return this._age
//     }

// }

// let animal = new Animal();
// animal.age = 37
// console.log(animal.age)