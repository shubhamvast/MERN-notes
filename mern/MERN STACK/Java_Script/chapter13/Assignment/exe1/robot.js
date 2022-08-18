function Robot(name,owner,year){
    this.name = name;
    this.owner= owner;
    this.year = year;
}

Robot.prototype.makeCoffe = function(){
    console.log(this.name + " making coffe...");
}

Robot.prototype.speak = function(){
    console.log(this.name + " is speaking....");
}

Robot.prototype.blinkLights= function(){
    console.log(this.name + " 's lights are blinking...");
}

let Robby = new Robot("Robby","Dr. Morbius",1956);
let Rosie = new Robot("Rosie","Geroge Jetson",1962);