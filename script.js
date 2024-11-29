let inputBox = document.getElementById("input-box"); // Declaring a varible of "input-box"
let listContainer = document.getElementById("list-container"); //Declaring a varible of "list-container"

let myArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []; // using the ternary operator, am declaring an empty array 

function saveData() {  //local storage save data function
    localStorage.setItem("items", JSON.stringify(myArray))
};


function showList() {  //show list function

    for(let i = 0 ; i < myArray.length; i++) {  //using for loop to loop thru my array
        
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

function addTask() {  //add task function
    if(inputBox.value === ''){ //Creeating a inputbox with an empty string for user to write their todo list
        alert("make a list");
    }
    else{

        let todoObj = {text: inputBox.value, id: Date.now()};  //getting my key name ID AND TEXT

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
    };
};

listContainer.addEventListener("click", function(e) {  
    if (e.target.tagName === "SPAN") {
        let todo = e.target.parentElement
        let todoId = todo.id
        todo.remove()   // remove from DOM
        myArray = myArray.filter((obj) => obj.id !== Number(todoId));   //    remove from myarray variable that hold local storage
        
        saveData()    // save updated array to localstorage
    };
});