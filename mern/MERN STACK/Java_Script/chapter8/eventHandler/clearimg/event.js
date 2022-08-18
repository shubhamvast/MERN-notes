
function afterClickMe(){
    let image = document.getElementById("image");

    image.setAttribute("src","./images/img/zero.jpg");
    
}
let btn = document.getElementById("btn");
btn.onclick = afterClickMe;