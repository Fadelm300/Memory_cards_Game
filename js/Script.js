
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
