let canEat = {
   eat : function (){
        console.log("eating...");
    }
}

let canWalk = {
    walk : function(){
        console.log("walking....");
    }
}

let canSwim ={
    swim : function(){
        console.log("swimming..");
    },
    deep : function(){
        console.log("going deep..");
    },
    deep4 : function(){
        console.log("going deep4..");
    }
}

let {swim, ...deeper}=canSwim; 
let fish = {...canEat,...canSwim};

console.log(fish);
console.log(swim);
console.log(deeper);