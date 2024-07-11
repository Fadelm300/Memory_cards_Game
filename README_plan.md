# Project Plan -Memory cards Game

## overview
 [memory card match](https://www.petercollingridge.co.uk/blog/mathematics-toys-and-games/memory-game/) 
The game contains one player or more each player will flip two cards and that will try to match the cards, and the one who will match the most will win , also if it was one player he needs to match the cards all before the time finish  .


## user story 

* As a user, I want to see a game board with cards faced down so I can start the game.


* As a user, I want to click on a card to reveal it, so I can try to find its matching pair.

* As a user, I want visual feedback when I find a matching pair so that I know I've made a correct match.


* As a user, I want visual feedback when I do not find a matching pair so that I can try again.

* As a user, I want to be notified when I match all pairs within the time limit so I can see that I have won.


* As a user, I want to be notified when the time runs out so I can see that I have lost.

* As a user, I want the option to play again after the game ends so I can try to improve my performance.

## Pseudocode

1-	Variables

>// we need to define constant for the cards   
// we need to define constant for the timetag  
// we need to define constant for the  fliptag  
// we need to define constant for the refresh button 


2-	Define the app's state variables, but don't assign values to them.

>//max time   
>//time left  
//flips  
//matchCards  
//disable 
//playing 
//card 1 , card 2  
>//timer 

3-	Select and save (cache) elements in variables that need to be accessed in the JavaScript code more than once
>//match cards   
//update the number of flips cards 

4-	Add event listeners - use delegated event listeners to listen to multiple elements with a single listener.
>//flip cards   
//refresh button 

5-	Invoke the init function used to initialize all state variables.

>//timer for in and timer for out  
//flip cards   
//match cards  


6-	Invoke the primary render function that transfers all state variables to the DOM.
>//timerDisplay   
 //resultMessage           
//playAgain((restart ))     

7-	Wait for the user to click on a button.
>//card IF the user click on cards will flip it  and match 2 of them if they are same  
//restart IF the user click on restart will restart the game 
  
8-	Wait for the user to click the "Play Again" button.
>//playAgain((restart ))








