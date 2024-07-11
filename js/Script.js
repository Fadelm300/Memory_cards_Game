// Get all card elements
const cards = document.querySelectorAll('.card');

// Data
let flipped = false; // Indicates if a card has been flipped
let Prevents_flipping = false; // Prevents further flipping of cards when true
let first_Card; // Stores the first flipped card
let second_Card; // Stores the second flipped card
let flipCount = 0; // Count the number of flips
let timerInterval; // Store the setInterval for the timer
let matchedPairs = 0; // Track the number of matched pairs
const totalPairs = cards.length / 2; // Total number of pairs
const initialTime = 60; // Initial countdown time
let timeLeft = initialTime; // Time left for the countdown

// Modal elements 
//pop Message
const modal = document.getElementById('winModal');
const closeModal = document.querySelector('.close');
const restartButton = document.getElementById('restartButton');

// Declare the flipCard function
function flipCard() {
  if (Prevents_flipping) return; // Exit if the board is locked
  if (this === first_Card) return; // Exit if the same card is clicked again

  this.classList.add('flip'); // Add 'flip' class to the clicked card
  incrementFlipCount(); // Increment the flip count

  if (!flipped) {
    flipped = true; // Set flipped to true if it's the first card
    first_Card = this; // Store the first flipped card
    startTimer(); // Start the timer on the first flip
    return;
  }

  second_Card = this; // Store the second flipped card
  checkForMatch(); // Check if the two flipped cards match
}

// This function checks if the cards match using the data-framework from the HTML and flips the cards back if not
function checkForMatch() {
  let cardMatch = first_Card.dataset.framework === second_Card.dataset.framework; // Compare data-framework attributes
  if (cardMatch) {
    disableCards(); // Disable cards if they match
  } else {
    unflipCards(); // Otherwise, unflip them
  }
}

function disableCards() {
  first_Card.removeEventListener('click', flipCard); // Remove click event listener from the first card
  second_Card.removeEventListener('click', flipCard); // Remove click event listener from the second card
  
  matchedPairs++; // Increment the matched pairs count
  
  if (matchedPairs === totalPairs) {
    stopTimer();
    showModal("Congratulations! You've matched all pairs."); // Show the modal with a message
  }
  resetBoard(); // Reset the board state
}

function unflipCards() {
  Prevents_flipping = true; // Lock the board to prevent further flips
  setTimeout(() => {
    first_Card.classList.remove('flip'); // Remove 'flip' class from the first card
    second_Card.classList.remove('flip'); // Remove 'flip' class from the second card
    resetBoard(); // Reset the board state
  }, 1500); // Wait for 1.5 seconds before unflipping
}

function resetBoard() {

  [flipped, Prevents_flipping] = [false, false]; // Reset flipped and Prevents_flipping variables

  [first_Card, second_Card] = [null, null]; // Reset first_Card and second_Card variables

}

// Shuffle the cards
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); // Generate a random position
    card.style.order = randomPos; // Assign the card a random order
  });
}

// Add event listener to each card
cards.forEach(card => card.addEventListener('click', flipCard)); // Attach flipCard function to the click event of each card

// Function to reset the game
function resetGame() {
  // Flip all cards back to their original position
  cards.forEach(card => card.classList.remove('flip'));

  // Re-enable event listeners for all cards
  cards.forEach(card => card.addEventListener('click', flipCard));

  // Shuffle the cards again
  shuffle();
  
  // Reset the board state
  resetBoard();

  // Reset flip count and timer
  resetFlipCount();
  resetTimer();

  // Reset matched pairs count
  matchedPairs = 0;
}

// Add event listener to the reset button
document.getElementById('Reset').addEventListener('click', resetGame); // Attach resetGame function to the click event of the reset button

// Function to increment the flip count and update the HTML
function incrementFlipCount() {
  flipCount++;
  document.querySelector('.flips span b').textContent = flipCount;
}

// Function to start the timer
function startTimer() {
  if (timerInterval) return; // Timer already started
  timeLeft = initialTime; // Reset the countdown time
  document.querySelector('.time span b').textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--; // Decrement the countdown time
    document.querySelector('.time span b').textContent = timeLeft;

  

    if (timeLeft <= 0) {
      stopTimer();
      showModal("Time's up! Try again."); // Show the modal with a message when time runs out
    }
  }, 1000); // Update the timer every second
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval); // Stop the timer
  timerInterval = null;
}

// Function to reset the flip count
function resetFlipCount() {
  flipCount = 0;
  document.querySelector('.flips span b').textContent = flipCount;
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timerInterval); // Stop the timer
  timerInterval = null;
  document.querySelector('.time span b').textContent = initialTime;
}

// Function to show the modal with a message
function showModal(message) {
  document.getElementById('modalMessage').textContent = message; // Set the modal message
  modal.style.display = "block";
}

// Function to close the modal
function closeModalFunction() {
  modal.style.display = "none";
  resetGame();
}

// Close modal when the user clicks on <span> (x)
closeModal.addEventListener('click', closeModalFunction);

// Close modal when the user clicks anywhere outside of the modal
window.addEventListener('click', function(event) {
  if (event.target === modal) {
    closeModalFunction();
  }
});

// Restart the game when the restart button is clicked
restartButton.addEventListener('click', closeModalFunction);