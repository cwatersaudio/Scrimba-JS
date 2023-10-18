import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-list-2524d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const voidEl = document.getElementById("void-message")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot) {
    voidEl.textContent = ""     
    if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()
    
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
          
            
            appendItemToShoppingListEl(currentItem)
        }
    } else {
       shoppingListEl.innerHTML= ""
        voidEl.textContent = "There's nothing on the list yet!" //I like this solution better than the scrimba one because it lets me style the message separately

    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue= item[1]
    let newItem = Object.assign(document.createElement('li'), { //creates the li element and assigns it a class and id
        id: itemID,
        // class:"list-item"
      });
    newItem.setAttribute("class", "list-item")  
    shoppingListEl.appendChild(newItem)  //places the li item on the page
    newItem.innerHTML = itemValue;   //gives the li item text

    newItem.addEventListener("dblclick", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB) //
    })
    
}