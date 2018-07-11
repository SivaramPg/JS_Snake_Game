const body = document.querySelector("body");
const canvas = document.getElementById("myCanvas");
const headerHeight = document.querySelector('header').offsetHeight;
const footerHeight = document.querySelector('footer').offsetHeight;
const ctx = canvas.getContext("2d");
const currentPos = {
	snakeX: '',
	snakeY: '',
	appleX: '',
	appleY: '',
}

// ** For resizing the canvas depending on the window size.**
const setDisplay=()=>{
	canvas.height = window.innerHeight -headerHeight -footerHeight;
	canvas.width = window.innerWidth;
}

const generateSnake = () => {
	const initialSnakeWidth = 30;
	const initialSnakeHeight = 30;
	const xPos = (canvas.width - initialSnakeWidth) / 2 ;
	const yPos = (canvas.height - initialSnakeHeight) / 2;
	ctx.fillStyle = "#FF0";
	ctx.fillRect(xPos, yPos, initialSnakeWidth, initialSnakeHeight);
	currentPos.snakeX = xPos;
	currentPos.snakeY = yPos;
}

const generateApple = () => {
	const appleWidth = 30;
	const appleHeight = 30;
	let randXPos, randYPos;
	//Loop for checking if snake head exists at expected place for apple
	//Realocate apple if true.
	do {
		randXPos = Math.floor(Math.random() * (canvas.width - appleWidth));
		randYPos = Math.floor(Math.random() * (canvas.height - appleHeight));
	}
	while (randXPos===currentPos.snakeX && randYPos===currentPos.snakeY);

	ctx.fillStyle = "#FF0F00";
	ctx.fillRect(randXPos, randYPos, appleWidth, appleHeight);
	currentPos.appleX = randXPos;
	currentPos.appleY = randYPos;
}

//Triggers for initiation and restart
const play = () => {
	console.log('Play');
	generateSnake();
	generateApple();
}

const insideBounds = () => {
  if (currentPos.snakeX !== 0 || currentPos.snakeX !== canvas.width || currentPos.snakeY !== 0 || currentPos.snakeY !== canvas.height) {

  } else {
    gameOverRun();
  }
}

//After collision condition or escape
const gameOverRun = () => {
  const playAgain = confirm('Game Over! Play Again?');  // check if user wants to play again, confirm returns either true or false on selection.
  if (playAgain) {                                      // if yes then only clear canvas & restart the game
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    play();
  } else {
    // Restart the game after 1 min of inactivity
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      play(); 
    },10000)
  }
} 

window.addEventListener('load', setDisplay);
window.addEventListener('load', play);
window.addEventListener('resize', setDisplay);

// listening for arrow keys and escape to end the game.
document.addEventListener("keydown", (event) => {
  console.log(event.which);
  var key = event.which || event.keyCode;
  switch (key) {
    case 37:
      console.log('Left');
      goLeft();
      break;
    case 38:
      console.log('Up');
      goUp();
      break;
    case 39:
      console.log('Right');
      goRight();
      break;
    case 40:
      console.log('Down');
      goDown();
      break;
    case 27:
      gameOverRun();
      break;
  }
});