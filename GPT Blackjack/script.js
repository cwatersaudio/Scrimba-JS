// Initialize game state
let playerState = {
    name: "",
    wager: 0,
    hand: [],
    score: 0,
    isAlive: true,
    hasBlackjack: false,
};

let dealerState = {
    hand: [],
    score: 0,
    isAlive: true,
};


// Get DOM elements
const playerNameInput = document.getElementById("name");
const wagerInput = document.getElementById("wager");
const startButton = document.getElementById("startButton");
const hitButton = document.getElementById("hitButton");
const stayButton = document.getElementById("stayButton");
const messageElement = document.getElementById("message");
const playerHandElement = document.getElementById("player-cards");
const playerScoreElement = document.getElementById("player-total");
const dealerHandElement = document.getElementById("dealer-hand");
const dealerScoreElement = document.getElementById("dealer-total");

// Start the game
function startGame() {
    clearGame();
    const playerName = playerNameInput.value.trim();
    const wager = parseInt(wagerInput.value);
    
    if (!validateInputs(playerName, wager)) {
        return;
    }

    playerState.name = playerName;
    playerState.wager = wager;
    
    // Initialize player and dealer hands
    playerState.hand = [dealCard(), dealCard()];
    dealerState.hand = [dealCard(), dealCard()];

    // Calculate initial scores
    calculateScores();
    displayPlayerHand();
    displayDealerHand();

    if (playerState.score === 21) {
        endGame("You've got Blackjack! You win!");
    } else {
        messageElement.textContent = "Do you want to draw a new card? Or stay?";
        showButtons();
    }
}

// Validate player inputs
function validateInputs(name, wager) {
    if (name === "") {
        showError("Please enter your name.");
        return false;
    }

    if (isNaN(wager) || wager <= 0) {
        showError("Please enter a valid wager.");
        return false;
    }

    return true;
}

// Deal a random card
function dealCard() {
    const min = 2;
    const max = 11;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Calculate player and dealer scores
function calculateScores() {
    playerState.score = calculateScore(playerState.hand);
    dealerState.score = calculateScore(dealerState.hand);
}

// Calculate the score of a hand
function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;

    for (const card of hand) {
        if (card === 11) {
            aceCount++;
        }
        score += card;
    }

    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount--;
    }

    return score;
}

// Display the player's hand
function displayPlayerHand() {
    playerHandElement.textContent = `Player's Hand: ${playerState.hand.join(", ")}`;
    playerScoreElement.textContent = `Player's Score: ${playerState.score}`;
}

// Display the dealer's hand (initially showing one card)
function displayDealerHand() {
    dealerHandElement.textContent = `Dealer's Hand: ${dealerState.hand[0]}, ?`;
    dealerScoreElement.textContent = `Dealer's Score: ?`;
}

// Handle the "Hit" button click
function hit() {
    if (playerState.isAlive && !playerState.hasBlackjack) {
        const newCard = dealCard();
        playerState.hand.push(newCard);
        calculateScores();
        displayPlayerHand();

        if (playerState.score > 21) {
            endGame("You're out of the game!");
        }
    }
}

// Handle the "Stay" button click
function stay() {
    if (playerState.isAlive && !playerState.hasBlackjack) {
        playerState.isAlive = false;
        dealerPlay();
    }
}

// Dealer's turn
function dealerPlay() {
    while (dealerState.isAlive && dealerState.score < 17) {
        dealerState.hand.push(dealCard());
        calculateScores();
        displayDealerHand();
    }

    if (dealerState.score > 21 || dealerState.score < playerState.score) {
        endGame("Dealer busts! You win!");
    } else if (dealerState.score > playerState.score) {
        endGame("The dealer beat you!");
    } else {
        endGame("It's a push.");
    }
}

// End the game and display the result
function endGame(message) {
    messageElement.textContent = message;
    hideButtons();
}

// Show game action buttons
function showButtons() {
    hitButton.style.display = "inline";
    stayButton.style.display = "inline";
}

// Hide game action buttons
function hideButtons() {
    hitButton.style.display = "none";
    stayButton.style.display = "none";
}

// Clear game state and UI
function clearGame() {
    playerState = {
        name: "",
        wager: 0,
        hand: [],
        score: 0,
        isAlive: true,
        hasBlackjack: false,
    };

    dealerState = {
        hand: [],
        score: 0,
        isAlive: true,
    };

    playerNameInput.value = "";
    wagerInput.value = "";
    playerHandElement.textContent = "Player's Hand: ";
    playerScoreElement.textContent = "Player's Score: ";
    dealerHandElement.textContent = "Dealer's Hand: ";
    dealerScoreElement.textContent = "Dealer's Score: ";
    messageElement.textContent = "";
    hideButtons();
}

// Error handling
function showError(message) {
    messageElement.textContent = message;
}

//Event Listeners
startButton.addEventListener("click", startGame);
hitButton.addEventListener("click", hit);
stayButton.addEventListener("click", stay);