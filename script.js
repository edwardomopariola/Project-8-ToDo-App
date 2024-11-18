let array = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
console.log(array)

addTask.addEventListener("click", () => {   //Click event
    let item = document.querySelector("#item")
    createItem(item)
});

function displayItems() {  //creating a function to display the items
    let items = ""  //varible of item with empty string
    for(let i = 0 ; i < array.length; i++) { //using for loop to loop the array
        items += ` <div class="item">
                    <div class="input-controller">
                        <textarea disabled>${array[i]}</textarea>
                        <div class="edit-controller"></div>
                        <i class="fa-solid fa-check deleteBtn"></i>
                    </div>
                    <div class="update-controller">
                        <button class="saveBtn">save</button>
                        <button class="cancelBtn">cancel</button>
                    </div>
                   </div>`
    }
    document.querySelector(".toDo-list").innerHTML = items
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCencelListeners()
};

function activateDeleteListeners() {  //Creating a function for delete item
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((db, i) => {  //using forEach to add eventlistener to the button
        db.addEventListener("click", () => { deleteItem(i) })
    })
};

function activateEditListeners() {  //creating function for edit item so user can edit their item
    let editBtn = document.querySelectorAll(".editBtn")
    let updateController = document.querySelectorAll(".update-controller")
    let inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eb, i) => {  //using forEach to add eventlistener to the button
        eb.addEventListener("click", () => {
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        })
    })

};

function activateSaveListeners() { //creating save button so user can save their item when they add or edit their item
    let saveBtn = document.querySelectorAll(".saveBtn")
    let inputs = document.querySelectorAll(".input-controller textarea")
    saveBtn.forEach((sb, i) => { //using forEach to add eventlistener to the button
        sb.addEventListener("click", () => {
            updateItem(inputs[i].value, i)
        })
    })
};

function activateCencelListeners() {  //Creating cancel button, when a user click cancel, it goes back to it formal page 
    let cancelBtn = document.querySelectorAll(".cancelBtn")
    let updateController = document.querySelectorAll(".update-controller")
    let inputs = document.querySelectorAll(".input-controller textarea")
    cancelBtn.forEach((cb, i) => {  //using forEach to add eventlistener to the button
        cb.addEventListener("click", () => {
            updateController[i].style.display = "none"
            inputs[i].disabled = true
        })
    })
};  

function updateItem(text, i) {
    array[i] = text
    localStorage.setItem("items", JSON.stringify(array))
    location.reload()
};


function deleteItem(i) { //delete function
    array.splice(i, 1) //Using splice method i can delete an item from the array
    localStorage.setItem("items", JSON.stringify(array)) //updating local storage once an item has been deleted
    location.reload()
};

function createItem(item) {  //item function
    array.push(item.value) //push item to array
    localStorage.setItem("items", JSON.stringify(array)) //saving item in local storage with the key name "items" and pass in json 
    location.reload
};

function displayDate() {
    let date = new Date()
    date = date.toString().split(" ")
    document.querySelector("#date").innerHTML = date[1] + " " + date[2] + " " + date[3]
}

window.onload = function() {
    displayDate()
    displayItems()
}

