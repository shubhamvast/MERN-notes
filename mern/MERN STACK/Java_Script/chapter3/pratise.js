function first(){
    return function second(){
        let a=9;
    return function third(){
        console.log("I am in third");
        }
    
    }
}

console.log(first()());