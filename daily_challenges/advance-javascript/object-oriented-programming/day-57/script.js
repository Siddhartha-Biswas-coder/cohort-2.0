class Sketch{
    constructor(character,color){
        this.character = character;
        this.color = color;
        this.someFunc = function(){};
    }
}

Sketch.prototype.speak = function(){}
Sketch.prototype.walk = function(){}


let sketch1 = new Sketch("Doremon","blue");