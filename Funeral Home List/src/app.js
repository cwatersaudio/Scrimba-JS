import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://funeral-home-list-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const funeralHomes =  ref(database, "homes")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const addressEl = document.getElementById("location-field")

addButtonEl.addEventListener("click", function() {
    let location = {
        // name: "",
        // city: "",
        // address: "",
        // phone: "",
        // email: "",
        // website: ""
    }

    let {name, city, address, phone, email, website} = location;
    
    name = inputFieldEl.value;
    address= addressEl.value;
    
    
    push(funeralHomes, location)
    console.log(location)
    
    // console.log(`${inputValue} added to database`)
})
