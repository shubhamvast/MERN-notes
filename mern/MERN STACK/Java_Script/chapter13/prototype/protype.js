function Dog(name,breed,weight){
    this.name = name;
    this.breed = breed;
     this.weight = weight;
}

Dog.prototype.bark = function () {
    if(this.weight <20){
        console.log("woof woof");
    }
    else{
        console.log("bhow bhow");
    }
 }

let fido = new Dog("sid","Mixed",22);

fido.bark();