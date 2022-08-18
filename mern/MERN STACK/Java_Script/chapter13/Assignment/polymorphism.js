// polymorphism using class syntax shape, sqaure,rectangle,circle

class Shape{
  area(){
    console.log("parent method...");
  }
  
}

class Sqaure extends Shape{

  constructor(side){
    super();
    this.side = side;
  }
  area(){
    console.log("area of square..: "+ this.side * this.side);
  }
}

let  square = new Sqaure(10);
square.area();

class Rectangle extends Shape{
  constructor(length,breadth){
    super();
    this.length = length;
    this.breadth = breadth;
  }
  area(){
    console.log("area of square..: "+ this.length * this.breadth);
  }
}

let rectangle = new Rectangle(10,20);
rectangle.area();
class Circle extends Shape{
  constructor(radius){
    super();
    this.radius = radius;
  }
  area(){
    console.log("area of square..: "+ Math.PI * this.radius * this.radius);
  }
}
let circle = new Circle(5);
circle.area();