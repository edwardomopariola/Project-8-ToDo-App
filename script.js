let inputBox = document.getElementById("input-box"); // Declaring a varible of "input-box"
let listContainer = document.getElementById("list-container"); //Declaring a varible of "list-container"
// let url = 'https://jsonplaceholder.typicode.com/todos/';

let myArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []; // using the ternary operator, am declaring an empty array 

function saveData() {  //local storage save data function
    localStorage.setItem("items", JSON.stringify(myArray))
    localStorage.setItem('todos', JSON.stringify(firstFiveTodos));

};

function loadTodos() {
    // Get todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos'));
  
    // Check if todos are already in localStorage
    if (!todos || todos.length === 0) {
      // If no todos are stored, user fetch from the API
      axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
          // Initialize an empty array to hold the first 5 todos
          let firstFiveTodos = [];
  
          // using for Loop to loop through the first 5 items in the response and push them into the array
            for (let i = 0; i < 5; i++) {
                let todo = response.data[i];
                firstFiveTodos.push(todo);
            }
  
          // log the todos load frrom api
          console.log('Todos loaded from API:', firstFiveTodos);
        })
        // catching any error 
        .catch(error => {
          console.error('Error fetching todos from API:', error);
        });
    } else {
      // If todos are already in localStorage, load them 
      console.log('Todos from localStorage:', todos);
    }
}
  // Call the function to load todos when the page loads
loadTodos();
  
window.onload = function () {  //show list function

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