//initial variables
let card1, card2, sum;
let cards = [];
let message = "";

//players
let dealer = {
    dealerHand: [],
    dHandSum: 0,
    dAlive : true
}
let player = {
    name: "", 
    wager: 0,
    playerHand: [],
    handSum: 0
}

//DOM elements
let cardsEl = document.getElementById("player-cards");
let wagerEl = document.getElementById("player-wager");
let nameEl = document.getElementById("player-name");
let totalEl = document.getElementById("player-total");
let messageEl = document.getElementById("message");
let buttonsEl = document.getElementById("game-buttons");
let dHandEl = document.getElementById("dealer-hand");
let dTotalEl = document.getElementById("dealer-total");

//gameplay
function startGame () {
    makePlayer();
    playGame();

}

function playGame () {
    nameEl.textContent = "Name: " + player.name;
    wagerEl.textContent = "Wager: $" + player.wager;
    cardsEl.textContent = "Cards: "
    
    for (let i = 0; i < player.playerHand.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    totalEl.textContent = "Sum: " + player.handSum;
    if (player.handSum <= 20) {
        message = "Do you want to draw a new card? Or stay?"
    } else if (player.handSum === 21) {
        message = "You've got Blackjack!  You win!"
        player.hasBlackJack = true
        dealerPlay ();
        restartButton();
    } else {
        message = "You're out of the game!"
        player.isAlive = false
        dealerPlay ();
        restartButton();
    }
    messageEl.textContent = message
}

const makeCard = () => {
    let min = Math.ceil(4);
    let max = Math.floor(11);
    return Math.floor(Math.random() * (max - min) + min);
  }
 
  function makePlayer () {
    player.name = document.getElementById("name").value;
    player.wager = document.getElementById("wager").value;
    player.playerHand = makeHand();
    player.isAlive = true;
    player.hasBlackJack = false;
    player.handSum = totalHand(player.playerHand);
}
  function restartButton () {
    let restart = document.createElement("button");
    restart.innerHTML = "Play Again";
    restart.setAttribute("id", "restart-button");
    restart.setAttribute("onclick", "playAgain()");
    buttonsEl.appendChild(restart);
 }



function playAgain () {
    player.playerHand = [];
    player.isAlive = true;
    player.hasBlackJack = false;
    dealer.dealerHand = [];
    dealer.dAlive = true;
    vanishElement("restart-button");
    dHandEl.textContent = "";
    dTotalEl.textContent = "";
    startGame();
}

function vanishElement (id) {
    let vanishEl = document.getElementById(id);
    vanishEl.remove();
    console.log("attempted to remove element: " + id);
}
function makeHand () {
     card1 = makeCard();
     card2 = makeCard();
     cards = [card1,card2];
    return cards;      
}

function addCard (currentHand) {
    if (player.isAlive === true && player.hasBlackJack === false && dealer.dAlive === true) {
    let newCard = makeCard();
    currentHand.push(newCard);
    console.log("new card is " + newCard +" and your total is" + totalHand(currentHand));
    player.playerHand =currentHand;
    player.handSum = totalHand(player.playerHand);
    playGame();
    }
}

function totalHand (hand) {
    sum = 0;
    for (let i = 0; i < hand.length; i++) {
        sum += hand[i];
        }
        console.log(sum);
        return sum;
}

function stay () {
    if (dealer.dAlive) {
    dealerPlay ();
    if (dealer.dHandSum > 21) {
        dealer.dAlive = false;
        message = "Dealer busts!  You win!"
    } else if (dealer.dHandSum > player.handSum) {
        message = "The dealer beat you!"
        dealer.dAlive = false;
    } else if (player.handSum > dealer.dHandSum) {
        message = "You beat the dealer!  You win!"
        dealer.dAlive = false;
    } else if (player.handSum === dealer.dHandSum) {
        dealer.dAlive = false;
        message = "It's a push"
    }
    message += " Play again?";
    messageEl.textContent = message;
    restartButton ();
}
}

function dealerPlay () {
    dealer.dealerHand = makeHand();
    dealer.dHandSum = totalHand(dealer.dealerHand);
    while (dealer.dHandSum <= 16) {
        let dNewCard = makeCard ();
        dealer.dealerHand.push(dNewCard);
        dealer.dHandSum = totalHand(dealer.dealerHand);
    }     
    dHandEl.textContent = "The dealer drew " + dealer.dealerHand;
    dTotalEl.textContent = "Dealer's total is: " + dealer.dHandSum;
}