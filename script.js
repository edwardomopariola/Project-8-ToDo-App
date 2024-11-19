let inputBox = document.getElementById("input-box"); // Declaring a varible of "input-box"
let listContainer = document.getElementById("list-container"); // Declaring a varible of "list-container"

let myArray = []; //declaring a varible empty array
console.log(myArray)

let myObj = '{"name":"Eddy," "age""25, "car":"Nissan"}';
myArray.push(myObj.value)

function saveData() {
localStorage.setItem("items", JSON.stringify(myArray))
}

function list() {
    let myArray = ""
    for(let i = 0 ; i < myObj.length; i++) {
        myArray += `<ul id="list-container">
                        <!-- <li class="checked">Task 1</li>
                        <li>Task 1</li>
                        <li>Task 1</li> -->
                    </ul>`
    }
}
document.getElementById("list-container").innerHTML = myArray

function addTask() {
    if(inputBox.value === ''){ //Creeating a inputbox with an empty string for user to write their todo list
        alert("make a list");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value
        listContainer.appendChild(li);
        let span = document.createElement("span") //creating a span element
        span.innerHTML = "\u00d7" //
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData()
};

listContainer.addEventListener("click", function(e) { 
    if(e.target.tagName === "LI") { //when a user click on li, it will check the class list
        e.target.classList.toggle("checked"); 
        saveData()
    }
    else if (e.target.tagName === "SPAN") { //when a user click on span, it will delete the parent element
        e.target.parentElement.remove()
        saveData()
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML)
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("data");
};
showList();