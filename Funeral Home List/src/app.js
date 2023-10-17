// import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
// import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// const appSettings = {
//     databaseURL: "https://funeral-home-list-default-rtdb.firebaseio.com/"
// }

// const app = initializeApp(appSettings);
// const database = getDatabase(app);
// const funeralHomes =  ref(database, "homes")

const nameFieldEl = document.getElementById("name-field")
const addButtonEl = document.getElementById("add-button")
const cityEl = document.getElementById("city-field")
const addressEl = document.getElementById("address-field")
const websiteEl = document.getElementById("website-field")
const phoneEl = document.getElementById("phone-field")
const emailEl =document.getElementById("email-field")

addButtonEl.addEventListener("click", function() {
       
    let newHome = newEntry()
    // push(funeralHomes, newHome)
    console.log(newHome)
    resetFields ();
})

// onValue(funeralHomes, function(snapshot) {
//     let itemsArray = Object.values(snapshot.val())
    
    
//     for (let i = 0; i < itemsArray.length; i++) {
//         appendItemToShoppingListEl(itemsArray[i])
//     }
// })

function newEntry () {
    let location = { //this works --but can I use destructuring to make the variables nicer?
        name: "",
        city: "",
        address: "",
        phone: "",
        email: "",
        website: ""
    }

    // let {name, city, address, phone, email, website} = location;
    
    // name = nameFieldEl.value;
    // city= cityEl.value;
    // address= addressEl.value;
    // phone = phoneEl.value;
    // email = emailEl.value;
    // website = websiteEl.value;

    location.name = nameFieldEl.value;
    location.city= cityEl.value;
    location.address= addressEl.value;
    location.phone = phoneEl.value;
    location.email = emailEl.value;
    location.website = websiteEl.value;

    return location;
}

function resetFields () {
    nameFieldEl.value= ""
    cityEl.value= ""
    addressEl.value= ""
    phoneEl.value= ""
    emailEl.value= ""
    websiteEl.value= ""
    console.log("the fields have been reset")
}