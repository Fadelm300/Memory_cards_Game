
// Get all card elements
const cards = document.querySelectorAll('.card');

// Data
let Flipped = false; // Indicates if a card has been flipped
let lockBoard = false; // Prevents further flipping of cards when true
let first_Card; // Stores the first flipped card
let second_Card; // Stores the second flipped card

// Declare the flipCard function
function flipCard() {
  if (lockBoard) return; // Exit if the board is locked
  if (this === first_Card) return; // Exit if the same card is clicked again

  this.classList.add('flip'); // Add 'flip' class to the clicked card

  if (!Flipped) {
    Flipped = true; // Set Flipped to true if it's the first card
    first_Card = this; // Store the first flipped card
    return;
  }

  second_Card = this; // Store the second flipped card
  checkForMatch(); // Check if the two flipped cards match
}

// This function checks if the cards match using the data-framework from the HTML and flips the cards back if not
function checkForMatch() {
  let cardMatch = first_Card.dataset.framework === second_Card.dataset.framework; // Compare data-framework attributes
  cardMatch ? disableCards() : unflipCards(); // Disable cards if they match, otherwise unflip them
}

function disableCards() {
  first_Card.removeEventListener('click', flipCard); // Remove click event listener from the first card
  second_Card.removeEventListener('click', flipCard); // Remove click event listener from the second card
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
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); // Generate a random position
    card.style.order = randomPos; // Assign the card a random order
  });
})();

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
}

// Add event listener to the reset button
document.getElementById('Reset').addEventListener('click', resetGame); // Attach resetGame function to the click event of the reset button



