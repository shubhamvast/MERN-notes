function palindrome(){
    for (let index = 0 , lastIndex = this.length -1; index <=this.length/2; index++,lastIndex--) {
        const element = this[index];
        const lastElement = this[lastIndex]
        if(element != lastElement)  return false;
    }
    return true;
}

// console.log(palindrome("madam"));

 String.prototype.palindrome = palindrome;

 let str  = "mada"; 

console.log(str.palindrome());