import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { FuneralHome } from './FHClass.js';

const appSettings = {
    databaseURL: "https://funeral-home-list-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const funeralHomes =  ref(database, "homes")
let latestItem = {}
let updateButton;
let updateButtonEl = false;
let newButtonEl;

const nameFieldEl = document.getElementById("name-field")
const addButtonEl = document.getElementById("add-button")
const cityStateEl = document.getElementById("city-state-field")
const addressEl = document.getElementById("address-field")
const zipEl = document.getElementById("zip-field")
const websiteEl = document.getElementById("website-field")
const phoneEl = document.getElementById("phone-field")
const emailEl =document.getElementById("email-field")

const buttonContainer = document.getElementById("button-container")


addButtonEl.addEventListener("click", function() {
       
    let nextHome = new FuneralHome (
        nameFieldEl.value, 
        cityStateEl.value, 
        addressEl.value,
        phoneEl.value,
        emailEl.value,
        websiteEl.value,
        zipEl.value
        )

        console.log(nextHome)
    // push(funeralHomes, nextHome)
    // let newHome = addEntry()
    // push(funeralHomes, newHome)
    // let latestID = Object.(latestItem)
    // console.log(latestID)

    if (!updateButton) { //is this an insane way to keep the add button to keep adding update buttons?
    addUpdateButton()
    addNewButton()
    }
})




onValue(funeralHomes, function(snapshot) {  //keeps track of the most recent item added to the database for the purspose of updating
    let homesArray = Object.entries(snapshot.val())
    
    for (let i = 0; i < homesArray.length; i++) {
        latestItem =homesArray[i]
        console.log(`latest item is ${latestItem}`)
    }
    
    latestItem = homesArray[1]
    
    
    
   
})

function addEntry () {
    let location = { //this works --but can I use destructuring to make the variables nicer?
        // name: "",
        // cityState: "",
        // address: "",
        // phone: "",
        // email: "",
        // website: "",
        // zip: ""
    }

    
    location.name = nameFieldEl.value;
    location.cityState= cityStateEl.value;
    location.address= addressEl.value
    location.phone = phoneEl.value;
    location.email = emailEl.value;
    location.website = websiteEl.value;
    location.zip = zipEl.value;
    location.fullAddress = `${addressEl.value}, ${cityStateEl.value} ${zipEl.value }`
    return location;
}



function newEntry() {
    resetFields()
}

function resetFields () {
    nameFieldEl.value= ""
    cityStateEl.value= ""
    addressEl.value= ""
    phoneEl.value= ""
    emailEl.value= ""
    websiteEl.value= ""
    zipEl.value = ""
}

const addUpdateButton = () => {
    updateButtonEl = document.createElement("button");
    updateButtonEl.setAttribute("id", "update-button")
    updateButtonEl.setAttribute("class" , "")
    updateButtonEl.textContent = "Update";
    // updateButtonEl =document.getElementById("update-button")
    buttonContainer.appendChild(updateButtonEl)
    // updateButtonEl.addEventListener("click", function () { //is this how to grab an entry from the firebase database?
    //     let updatedEntry = addEntry()
    //     funeralHomes[latestItem] = updatedEntry;
    // })

}

const addNewButton = () => {
    const newButtonEl = document.createElement("button");
    newButtonEl.setAttribute("id", "new-button")
    newButtonEl.setAttribute("class" , "")
    newButtonEl.textContent = "New Entry"
    buttonContainer.appendChild(newButtonEl)
    newButtonEl.addEventListener("click", function () {
        resetFields()
        newButtonEl.classList.add("invisible")
        updateButtonEl.classList.add("invisible")
    })
}