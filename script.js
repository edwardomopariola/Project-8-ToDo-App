let inputBox = document.getElementById("input-box"); // Declaring a varible of "input-box"
let listContainer = document.getElementById("list-container"); //Declaring a varible of "list-container"

let myArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []; //declaring a varible empty array

console.log(myArray)

function saveData() {
    localStorage.setItem("items", JSON.stringify(myArray))
};

function showList() {

    for(let i = 0 ; i < myArray.length; i++) {
        let todoObj = myArray[i];
        
        let li = document.createElement("li");
        li.innerHTML = todoObj.text;
        li.id = todoObj.text
        listContainer.appendChild(li);
        let span = document.createElement("span") //creating a span element
        span.innerHTML = "\u00d7" //
        li.appendChild(span);
    };
};
showList();

function addTask() {
    if(inputBox.value === ''){ //Creeating a inputbox with an empty string for user to write their todo list
        alert("make a list");
    }
    else{

        let todoObj = {text: inputBox.value, id: Date.now() };

        let li = document.createElement("li");
        li.innerHTML = todoObj.text;
        li.id = todoObj.id
        listContainer.appendChild(li);
        let span = document.createElement("span") //creating a span element
        span.innerHTML = "\u00d7" //
        li.appendChild(span);

        inputBox.value = "";
        myArray.push(todoObj)
        saveData()
    }
};

listContainer.addEventListener("click", function(e) { 
    if(e.target.tagName === "LI") { //when a user click on li, it will check the class list
        e.target.classList.toggle("checked"); 
        saveData()
    }

    else if (e.target.tagName === "SPAN") { //when a user click on span, it will delete the parent element
        e.target.parentElement.remove()
        saveData()
    };
}, false);