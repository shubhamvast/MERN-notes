let form = document.getElementById("form");

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    console.log(form);
    console.log(form.elements[0].value);
});

function fetchData(e){
    
    console.log(e);
    
}