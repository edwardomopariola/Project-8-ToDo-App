let inputBox = document.getElementById("input-box"); // Declaring a varible of "input-box"
let listContainer = document.getElementById("list-container"); //Declaring a varible of "list-container"

let myArray = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []; // using the ternary operator, am declaring an empty array 

function saveData() {  //local storage save data function
  localStorage.setItem('todos', JSON.stringify(myArray));
};

function loadTodos () {
    if(localStorage.getItem("todos") === null) {
      axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        for (let i = 0; i < 5; i++) {   //Using for loop to loop through the first 5 todos
          let todo = { title: response.data[i].title, id: response.data[i].id };
          displayTodo(todo);
          myArray.push(todo);  //pushing into myarray
        } 
        saveData()  //save updated code in localStorage
        console.log('todos loaded from API:', myArray);
      })
      .catch(error => {
        console.error('Error fetching todos from API:', error);  //catching any error
      });
    } else {
      console.log('todos from localStorage:', myArray);  //if todos already in localStorage, load them
    };
};
loadTodos()


window.onload = function () {  //show list function
  loadTodos();
  for(let i = 0 ; i < myArray.length; i++) {  //using for loop to loop thru my array
    displayTodo(myArray[i]);
  };
};

function addTask() {  //add task function
  if(inputBox.value === ''){ //Creeating a inputbox with an empty string for user to write their todo list
    alert("make a list");
  }
  else{
    let todoObj = {title: inputBox.value, id: Date.now()};  //getting my key name ID AND TEXT
    displayTodo(todoObj);
    inputBox.value = "";
    myArray.push(todoObj);
    saveData();
  };
};

function displayTodo(todo) {  //Adding todo as a perameter
  let li = document.createElement("li");
  li.innerHTML = todo.title;
  li.id = todo.id;
  listContainer.appendChild(li);
  let span = document.createElement("span");  //creating  span element
  span.innerHTML = "\u00d7" //adding the X symbol as my delete button
  li.appendChild(span);
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