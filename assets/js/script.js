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
	canvas.height = window.innerHeight -headerHeight -footerHeight - 9;
	canvas.width = window.innerWidth;
}

//Dividing the canvas into pseudo grids.
// Testing incrementing x and y pos of apple in increments of 30;

// Number of X positions possible at intervals of 30: (0,30,60,90,.....)
const xGridPositions = () => {
  if (canvas.width / 30 !== Math.floor(canvas.width / 30)) {    // Checking if the canvas width is exactly divisible by 30
    xPositions = Math.floor(canvas.width / 30) - 1;             // If not then 30px box can't fit without overflow, we remove 1 position to make sure the box fits even if there is extra space at the right and bottom sides.
                                                                // Ex: canvas width = 1545 then if condition becomes true since a box cannot fit in 15 px we have xGridPostions as 50 - 1 to accomodate the last box. 
                                                                // The total usable canvas width now becomes 1530px;
  } else {
    xPositions = Math.floor(canvas.width / 30);
  }
  return xPositions;
};
// Number of Y positions possible at intervals of 30: (0, 30, 60, 90, ......)
const yGridPositions = () => {
  if (canvas.height / 30 !== Math.floor(canvas.height / 30)) {   // Same concept as for xGridPostions.
    yPositions = Math.floor(canvas.height / 30) - 1;
  } else {
    yPositions = Math.floor(canvas.height / 30);
  }
  return yPositions;
};

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
	// Just track apple position outside this function and if condition matched then call the function again.
  // don't check conditions here.
	let randXPos = Math.floor(Math.random() * xGridPositions()) * 30;
	let randYPos = Math.floor(Math.random() * yGridPositions()) * 30;
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
    // Need to add or call the entire play code inside here so as to check if inside bounds on snake movement.
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
      console.log('Escape');
      gameOverRun();
      break;
  }
});



