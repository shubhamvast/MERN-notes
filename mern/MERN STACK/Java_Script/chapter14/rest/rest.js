let canEat ={
    eat(){
        console.log("eating");
    }
}

let canWalk ={
    walk(){
        console.log("walking");
    }
}
let canSwim = {
    swim(){
        console.log("swimming");
    }
}
let canFly = {
    fly(){
    console.log("flying");
    }
}


function createObj(...objects){
    let newObj = Object.assign({},...objects);// imp this to create assenmble object
    return  newObj;

}

let dog = createObj(canEat,canWalk);


function Dog(){

}

function createObjt(target,...objects){
    let newObj = Object.assign(target,...objects);
    return newObj;
}

createObjt(Dog.prototype,canEat,canWalk);

let fido = new Dog("Fido",45);