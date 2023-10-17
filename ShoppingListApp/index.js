import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-list-2524d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.entries(snapshot.val())
    
    clearShoppingListEl()
    
    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentID = currentItem[0]
        let currentValue= currentItem[1]
        
        console.log (currentID)
        appendItemToShoppingListEl(currentID, currentValue)
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(itemID, itemValue) {
    let newItem = Object.assign(document.createElement('li'), { //creates the li element and assigns it a class and id
        id: itemID,
        // class:"list-item"
      });
    newItem.setAttribute("class", "list-item")  
    shoppingListEl.appendChild(newItem)  //places the li item on the page
    newItem.innerHTML = itemValue;   //gives the li item text
    
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
}