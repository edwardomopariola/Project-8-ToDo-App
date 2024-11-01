let itemContainer = document.getElementById("items"); // Declaring a varible of itemContainer with ID element "items"
let itemTemplate = document.getElementById("itemTemplate"); // Declaring a varible of itemTemplate with ID element "itemTemplate"
let btn = document.getElementById("add"); // Declaring a varible of button with ID element "add"

let items = getItems();

function getItems() {
    let value = localStorage.getItem("todo-list") || " [] "; // creating my local storage for "todo-list" with an empty list

    return JSON.parse(value); // Using json parse method to convert the object to an array
 
};

function setItems(items) { // set items
    let itemsJson = JSON.stringify(items); // Using JSON to convert the array into string

    localStorage.setItem("todo-list", itemsJson); // to store my array in the local storage, am passing in the todo-list and itemsjson
};

function addItem() { // Adding new item
    items.unshift({ // With the unshift method, user can add one or more items to the beginning of my array
        description: "", // the description is an empty string where the user put whatever item they want
        completed: false // it change to "true" once the item has been checked
    });

    setItems(items)
    refreshList(); // it refresh anytime a user add a new item
};

function updateItem(item, key, value) { //To save my items; user need the items, the key am updating and the value the user wants to set the key too.
    item[key] = value;

    setItems(items);
    refreshList();

}

function refreshList() { // sorting the item
    items.sort((a, b ) => {
        if (a.completed) { // if a is completed, it goes to the buttom
            return 1;
        }

        if (b.completed) { // 
            return -1
        }
        return a.description < b.description ? -1 : 1;
    });

    itemContainer.innerHTML = "";

    for (let item of items) {
        let itemElement = itemTemplate.content.cloneNode(true);
        let descriptionInput = itemElement.querySelector(".item-description");
        let completedInput = itemElement.querySelector(".item-completed");

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;

        descriptionInput.addEventListener("change", () => {
            updateItem(item, "description", descriptionInput.value); // to update item, i need the item,  the key which is "description" and value
        });

        completedInput.addEventListener("change", () => {
            updateItem(item, "completed", completedInput.checked);
        });

        itemContainer.append(itemElement);

    };
};

btn.addEventListener("click", () => {
    addItem();
});


refreshList();
