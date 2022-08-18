let imageElement = document.getElementsByTagName("img");

for (let i = 0; i < imageElement.length; i++) {
  imageElement[i].setAttribute("width", "350px");
  imageElement[i].setAttribute("height", "300px");
  imageElement[i].onclick = function () {
     // console.log("print" + i);
  // console.log(i);
  let src = imageElement[i].getAttribute("src");
  // console.log(src);
  srcPath = src.replace("blur", "");
  console.log(srcPath);

  imageElement[i].setAttribute("src", srcPath);

  setTimeout(function () {
    imageElement[i].setAttribute("src", src);
    console.log(imageElement[i].getAttribute("src"));
    // console.log("set" + i);
  }, 2000);
  };
}


// var someEventHander=function(){
// 	console.log(event,param1,param2);
// }
// //add listener
// document.getElementById("someid").addEventListener('click',someEventHander.bind(event,param1,param2));
