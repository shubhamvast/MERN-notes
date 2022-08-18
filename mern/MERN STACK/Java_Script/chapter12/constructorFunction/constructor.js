// function Dog(name, breed, weight,voice) {
//   this.name = name;
//   this.breed = breed;
//   this.weight = weight;
//   this.bark = function (){
//     console.log(voice);
//   }
// }

// let dog1 = new Dog("sid", "mixed", 23 ,"boo boo");
// console.log(dog1);


function Album(title,artist,year){
    this.title = title;
    this.artist = artist;
    this.year = year;
    this.play = function (){
        console.log("play game");
    }
}

var darkside = new Album("Dark Side of the Cheese","Pink Mouse",1971);
darkside.name ="shubham";
darkside.play();
console.log(darkside.title);
console.log(darkside.name);

let obj2 = new Album();
console.log(obj2.name);