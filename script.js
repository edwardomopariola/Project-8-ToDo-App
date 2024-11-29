let inputBox = document.getElementById("input-box"); // Declaring a varible of "input-box"
let listContainer = document.getElementById("list-container"); //Declaring a varible of "list-container"

let myArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []; //declaring a varible empty array

function saveData() {
    localStorage.setItem("items", JSON.stringify(myArray))
};


function showList() {

    for(let i = 0 ; i < myArray.length; i++) {
        
        let todoObj = myArray[i];
        let li = document.createElement("li");
        li.innerHTML = todoObj.text;
        li.id = todoObj.id
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
    if (e.target.tagName === "SPAN") {
        const todo = e.target.parentElement
        const todoId = todo.id
        // remove from DOM
       todo.remove()
        //    remove from myarray variable that hold local storage
        myArray = myArray.filter((todo) => todo.id != todoId);
        // save updated array to localstorage
    saveData()
    }
});