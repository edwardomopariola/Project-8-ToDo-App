let inputBox = document.getElementById("input-box"); // Declaring a varible of "input-box"
let listContainer = document.getElementById("list-container"); //Declaring a varible of "list-container"

let myArray = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []; // using the ternary operator, am declaring an empty array 

function saveData() {  //local storage save data function
  localStorage.setItem('todos', JSON.stringify(myArray));
};

function loadTodos() {  //API Function
  let todos = JSON.parse(localStorage.getItem('todos'));  // Get todos from localStorage

  if (todos && todos.length > 0) {
    myArray = todos;
    todos.forEach((todo) => {
      let li = document.createElement('li');
      li.innerHTML = todo.text || todo.title;
      li.id = todo.id;
      listContainer.appendChild(li);
      let span = document.createElement('span');
      span.innerHTML = '\u00d7';
      li.appendChild(span);
    });
    return;
  
   axios  // fetch data from the API using AXIOS
    .get('https://jsonplaceholder.typicode.com/todos')
    .then((response) => {
      for (let i = 0; i < 5; i++) { // looping through the first five
        let todo = response.data[i];
        let transformedTodo = {
          text: todo.title,
          id: todo.id,
        };
        myArray.push(transformedTodo);
        let li = document.createElement('li');
        li.innerHTML = transformedTodo.text;
        li.id = transformedTodo.id;
        listContainer.appendChild(li)
        let span = document.createElement('span') 
        span.innerHTML = "\u00d7" 
        li.appendChild(span);
      }
      saveData();
    })
    .catch((error) => {    // catching any error 
      console.error('Error fetching todos from API:', error);
    });
  };
};
loadTodos()

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
      let todo = e.target.parentElement;
      let todoId = todo.id;
      todo.remove()   // remove from DOM
      myArray = myArray.filter((obj) => obj.id !== Number(todoId));   //    remove from myarray variable that hold local storage
        
      saveData()    // save updated array to localstorage
    };
});