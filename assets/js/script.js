const body = document.querySelector("body");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
let gameOver = false;

// ** For resizing the canvas depending on the window size.**
const setDisplay=()=>{
	const headerHeight = document.querySelector('header').offsetHeight;
	const footerHeight = document.querySelector('header').offsetHeight;
	canvas.height = window.innerHeight -headerHeight -footerHeight;
	canvas.width = window.innerWidth;
}
window.addEventListener('load', setDisplay);
window.addEventListener('resize', setDisplay);

// creating a box of fixed dimension and color that will be added to the center as the snake and subsequently added to it as it eats the apples.
// variable values can be refactored directly into the code if need be 
const generateSnake = () => {

}
//creating snake of length 1 in the middle.
let initialSnakeWidth = 25;
let initialSnakeHeight = 25;
let xPos = (window.innerWidth - initialSnakeWidth) / 2 ;
let yPos = (window.innerHeight - initialSnakeHeight) / 2;
ctx.fillStyle = "#FF0";
//creating snake of length 1 in the middle.
ctx.fillRect(xPos, yPos, initialSnakeWidth, initialSnakeHeight);

//Creating an Apple 
// TO BE PLACED INSIDE A FUNCTION AND TRIGGERED IF SNAKE EATS IT.
const generateApple = () => {
  const appleWidth = 30;
  const appleHeight = 30;
  let randXPos = Math.floor(Math.random() * (window.innerWidth - appleWidth));
  let randYPos = Math.floor(Math.random() * (window.innerHeight - appleHeight));
  ctx.fillStyle = "#FF0F00";
  ctx.fillRect(randXPos, randYPos, appleWidth, appleHeight);
}
generateApple();
// listening for arrow keys and escape to end the game.
document.addEventListener("keydown", (event) => {
  switch(event) {
    // Use either which or keyCode, depending on browser support
    case (event.which === 37 || event.keyCode === 37):
      const goLeft = () => {
        
      };
      break;
    case (event.which === 38 || event.keyCode === 38):
      goUp();
      break;
    case (event.which === 39 || event.keyCode === 39):
      goRight();
      break;
    case (event.which === 40 || event.keyCode === 40):
      goDown();
      break;
    case (event.which === 27 || event.keyCode === 27):
      gameOver = true;
    default:
     
    }
  }
);

//Collision
const outOfBounds = () => {

}

if (!gameOver) {

} 
else {
  // Ask player if they want to play again if yes then reset gameOver and start main function.
  playAgain ();
}
