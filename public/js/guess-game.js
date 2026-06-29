// Stores the random target number that the player must guess
let targetValue = 0;

// Stores how many guesses the player has already used
let attempt = 0;

// Stores the maximum number of chances allowed
const maxAttempt = 5;

// Gets the HTML elements from the page using their IDs
const guessInput = document.getElementById("guess-value");
const guessButton = document.getElementById("guess-btn");
const restartButton = document.getElementById("restart-btn");
const attemptText = document.getElementById("attempt");
const resultText = document.getElementById("result");

// This function checks whether a value can be converted into a valid number
function isNumeric(value) {
    return value !== "" && !isNaN(value);
}

// This function runs when the page is first opened or refreshed
function initialSetup() {
// The guess text field must be empty at the start
    guessInput.value = "";

// At the start, only the Restart button should be shown
    guessButton.style.display = "none";
    restartButton.style.display = "block";

// Attempt must start at 0/5
    attempt = 0;
    attemptText.innerText = attempt;

// No result should be shown at the start
    resultText.innerText = "";
}

// This function runs when the Restart button is clicked
function restartGame() {
// Create a random number from 1 to 20
    targetValue = Math.floor(Math.random() * 20) + 1;

// Reset the attempt count back to 0
    attempt = 0;
    attemptText.innerText = attempt;

// Clear the old result message
    resultText.innerText = "";

// Clear the input field
    guessInput.value = "";

// Hide the Restart button and show the Guess button
    restartButton.style.display = "none";
    guessButton.style.display = "block";

// Move the typing cursor into the guess input field
    guessInput.focus();

// This is only for learning/debugging, so you can see the answer in the console
    console.log("Target value:", targetValue);
}

// This function runs when the Guess button is clicked
function guessNumber() {
    const inputValue = guessInput.value;

// If the input is empty or not a number, do nothing
    if (!isNumeric(inputValue)) {
        return;
    }

// Convert the input from text into a number
    const guessValue = Number(inputValue);

// Increase attempt only after the player enters a valid number
    attempt = attempt + 1;
    attemptText.innerText = attempt;

// Compare the guess with the target number
    if (guessValue > targetValue) {
        resultText.innerText = guessValue + " is too high";
    } else if (guessValue < targetValue) {
        resultText.innerText = guessValue + " is too low";
    } else {
        resultText.innerText = "You WIN";

// If the player wins, switch back to Restart button
        guessButton.style.display = "none";
        restartButton.style.display = "block";
    }

// If the player used all attempts and still did not win, they lose
    if (attempt >= maxAttempt && guessValue !== targetValue) {
        resultText.innerText = "You LOSE";

// If the player loses, switch back to Restart button
        guessButton.style.display = "none";
        restartButton.style.display = "block";
    }

// Reset the guess text field to 0 after each valid guess
    guessInput.value = "0";

// Move the typing cursor back into the guess input field
    guessInput.focus();
}

// Connect the Restart button to the restartGame function
restartButton.onclick = restartGame;

// Connect the Guess button to the guessNumber function
guessButton.onclick = guessNumber;

// Run the initial setup when the page first loads
initialSetup();
