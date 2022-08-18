function Dog(name, age, weight) {
  this.name = name;
  this.age = age;
  this.weight = weight;
}
//adding common propety to prototpe of Dog
Dog.prototype.bark = function () {
  console.log("bhow bhow..... Dog prototype ");
};

let tommy = new Dog("tommy", 12, 20);

// console.log(tommy);


function ShowDog(name, age, weight, trainer) {
//   this.names = names;
//   this.age = age;
//   this.weight = weight;
//   this.trainer = trainer;

 Dog.call(this,name,age,weight);
 this.trainer = trainer;

}


ShowDog.prototype = new Dog();
ShowDog.prototype.constructor = ShowDog;
// console.log(ShowDog.prototype.constructor);

ShowDog.prototype.bait =function (){
  console.log(this.name + " is bait dog");
};

let gimmy = new ShowDog("gimmy", 10, 12, "shubham");

// console.log(gimmy);
gimmy.bait();                          // error
// gimmy.bark();

