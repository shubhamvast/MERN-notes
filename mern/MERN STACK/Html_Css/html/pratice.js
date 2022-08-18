function Dog(name){
    this.name = name;
    // console.log(this.name);
    return ()=>"shubham " +this.name;

}

let dog = Dog("fido");
let d = new Dog("asd");

console.log(d());