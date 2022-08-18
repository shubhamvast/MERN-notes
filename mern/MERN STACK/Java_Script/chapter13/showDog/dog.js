function Dog(breed,weight){
    // this.name = name;
    this.breed = breed;
     this.weight = weight;
     bark = function () {
        if(this.weight <20){
            console.log("Dog if ");
        }
        else{
            console.log("dog elese");
        }
    
     }
}

Dog.prototype.bark = function () {
    if(this.weight <20){
        console.log("prototype if");
    }
    else{
        console.log("prototype else");
    }
 }
Dog.prototype.name = "dog";
let fido = new Dog("sid","Mixed",22);

function ShowDog() {
    // this.name = name;
    // this.breed = breed;
    // this.weight = weight;
    // this.handler = handler;
    }
ShowDog.prototype = new Dog();
// Showdog.prototype.league = "Webville";
// ShowDog.prototype.stack = function() {
// console.log("Stack");
// };
// ShowDog.prototype.bait = function() {
// console.log("Bait");
// };
// ShowDog.prototype.gait = function(kind) {
// console.log(kind + "ing");
// };
// ShowDog.prototype.groom = function() {
// console.log("Groom");
// };

let danial = new ShowDog("chit","mixed",23,)
danial.bark()