const body = document.querySelector("body");
const canvas = document.getElementById("myCanvas");
const headerHeight = document.querySelector('header').offsetHeight;
const footerHeight = document.querySelector('footer').offsetHeight;

// creating a const with canvas elements (snake and apple) dimensions so it can be altered easily without affecting code.
const canvasElementsDim = 30;

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

// Number of X positions possible at intervals of 30: (0,30,60,90,.....)
const xGridPositions = () => {
  return xPositions = Math.floor(canvas.width / canvasElementsDim) - 1;
};

// Number of Y positions possible at intervals of 30: (0, 30, 60, 90, ......)
const yGridPositions = () => {
  return yPositions = Math.floor(canvas.height / canvasElementsDim) - 1;
};

const generateSnake = () => {
	// const xPos = (canvas.width - canvasElementsDim) / 2 ;
  // const yPos = (canvas.height - canvasElementsDim) / 2;
  let xPos = Math.floor(Math.random() * xGridPositions()) * canvasElementsDim;
	let yPos = Math.floor(Math.random() * yGridPositions()) * canvasElementsDim;
	ctx.fillStyle = "#FF0";
	ctx.fillRect(xPos, yPos, canvasElementsDim, canvasElementsDim);
	currentPos.snakeX = xPos;
  currentPos.snakeY = yPos;
  console.log(xPos, yPos);
}

const generateApple = () => {
	// Just track apple position outside this function and if condition matched then call the function again.
  // don't check conditions here.
	let randXPos = Math.floor(Math.random() * xGridPositions()) * canvasElementsDim;
	let randYPos = Math.floor(Math.random() * yGridPositions()) * canvasElementsDim;
	ctx.fillStyle = "#FF0F00";
	ctx.fillRect(randXPos, randYPos, canvasElementsDim, canvasElementsDim);
	currentPos.appleX = randXPos;
  currentPos.appleY = randYPos;
  console.log(randXPos, randYPos);
}

//Triggers for initiation and restart
const play = () => {
	console.log('Play');
	generateSnake();
	generateApple();
}

const insideBounds = () => {
  if (currentPos.snakeX !== 0 || currentPos.snakeX !== (canvas.width - (canvas.width % canvasElementsDim))  || currentPos.snakeY !== 0 || currentPos.snakeY !== (canvas.height - (canvas.height % canvasElementsDim))) {
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
window.addEventListener('resize', play);
window.addEventListener('resize', setDisplay);

// listening for arrow keys and escape to end the game.
document.addEventListener("keydown", (event) => {
  console.log(event.which);
  let key = event.which || event.keyCode;
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



