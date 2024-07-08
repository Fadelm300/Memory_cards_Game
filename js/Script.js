// Get all card elements
const cards = document.querySelectorAll('.card');

// Data
let Flipped = false; // Indicates if a card has been flipped
let lockBoard = false; // Prevents further flipping of cards when true
let first_Card; // Stores the first flipped card
let second_Card; // Stores the second flipped card
let flipCount = 0; // Count the number of flips
let startTime; // Track the start time of the game
let timerInterval; // Store the setInterval for the timer
let matchedPairs = 0; // Track the number of matched pairs
const totalPairs = cards.length / 2; // Total number of pairs

// Declare the flipCard function
function flipCard() {
  if (lockBoard) return; // Exit if the board is locked
  if (this === first_Card) return; // Exit if the same card is clicked again

  this.classList.add('flip'); // Add 'flip' class to the clicked card
  incrementFlipCount(); // Increment the flip count

  if (!Flipped) {
    Flipped = true; // Set Flipped to true if it's the first card
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
    stopTimer(); // Stop the timer if all pairs are matched
  }
  resetBoard(); // Reset the board state
}

function unflipCards() {
  lockBoard = true; // Lock the board to prevent further flips
  setTimeout(() => {
    first_Card.classList.remove('flip'); // Remove 'flip' class from the first card
    second_Card.classList.remove('flip'); // Remove 'flip' class from the second card
    resetBoard(); // Reset the board state
  }, 1500); // Wait for 1.5 seconds before unflipping
}

function resetBoard() {
  [Flipped, lockBoard] = [false, false]; // Reset Flipped and lockBoard variables
  [first_Card, second_Card] = [null, null]; // Reset first_Card and second_Card variables
}

// Shuffle the cards
function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); // Generate a random position
    card.style.order = randomPos; // Assign the card a random order
  });
};

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
  if (startTime) return; // Timer already started
  startTime = Date.now();

  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
    document.querySelector('.time span b').textContent = elapsedTime;
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
  console.log("resetFlipCount work");
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timerInterval); // Stop the timer
  startTime = null;
  document.querySelector('.time span b').textContent = '0';
  console.log("resetTimer work");
}