import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://funeral-home-list-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const funeralHomes =  ref(database, "homes")

const nameFieldEl = document.getElementById("name-field")
const addButtonEl = document.getElementById("add-button")
const cityEl = document.getElementById("city-field")
const addressEl = document.getElementById("address-field")
const websiteEl = document.getElementById("website-field")
const phoneEl = document.getElementById("phone-field")
const emailEl =document.getElementById("email-field")

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
    
    name = nameFieldEl.value;
    city= cityEl.value;
    address= addressEl.value;
    phone = phoneEl.value;
    email = emailEl.value;
    website = websiteEl.value;
    
    
    push(funeralHomes, location)
    console.log(location)
})
