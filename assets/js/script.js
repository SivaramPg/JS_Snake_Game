const body = document.querySelector("body");
const canvas = document.getElementById("myCanvas");
const headerHeight = document.querySelector('header').offsetHeight;
const footerHeight = document.querySelector('footer').offsetHeight;

// creating a const with canvas elements (snake and apple) dimensions so it can be altered easily without affecting code.
const canvasElementsDim = 30;
let id;
//Can be used later to create gap b/w new snake blocks.
//const sizeOfGrid = 30; 
//const sizeOfObject = 28;

const ctx = canvas.getContext("2d");
const currentPos = {
	snakeX: '',
	snakeY: '',
	appleX: '',
	appleY: '',
}
const speed ={
  x: 0,
  y: 0,
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
}

//Triggers for initiation and restart
const play = () => {
  // closeInterval(interval);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
	generateSnake();
	generateApple();
  console.log(currentPos);
  id = setInterval(update, 90);
}

//After collision conditione or escape
const gameOverRun = () => {
  clearInterval(id);
  speed.x=0;
  speed.y=0;
  const playAgain = confirm('Game Over! Play Again?');  // check if user wants to play again, confirm returns either true or false on selection.
  if (playAgain) {                                      // if yes then only clear canvas & restart the game    
    play();
  }
  else {
    prompt('Thanks for playing');
  }
} 

const checkBounds = () => {
  const x = currentPos.snakeX;
  const y = currentPos.snakeY;
  //If outside, gameOverRun();
  if ( x<0 || x>canvas.width || y<0 || y>canvas.height){
    gameOverRun();
  }
}

const checkAndUpdatePosition = () =>{
  if(speed.x || speed.y){
    ctx.clearRect(currentPos.snakeX, currentPos.snakeY, canvasElementsDim,canvasElementsDim);
    currentPos.snakeX += speed.x;
    currentPos.snakeY += speed.y;
    ctx.fillStyle = '#FF0';
    ctx.fillRect(currentPos.snakeX, currentPos.snakeY, canvasElementsDim, canvasElementsDim);
  }
}

const updateScore = () =>{

}

const updateSnake = () =>{

}

const checkAndUpdateApple = () =>{
  if(currentPos.snakeX === currentPos.appleX && currentPos.snakeY === currentPos.appleY){
    updateScore();
    updateSnake();    
    generateApple();
  }
}
//Runs continously, updates and checks
const update =() =>{
  checkAndUpdatePosition();
  checkAndUpdateApple();
  checkBounds();
}
//Functions for movement
const moveUp = () => {
  speed.y = -30;
  speed.x= 0;
}
const moveDown = () => {
  speed.y = 30;
  speed.x= 0;  
}
const moveLeft = () => {
  speed.y = 0;
  speed.x= -30;  
}
const moveRight = () => {
  speed.y = 0;
  speed.x= 30;  
}
//Event Listeners

window.addEventListener('load', setDisplay);
window.addEventListener('load', play);
window.addEventListener('resize', setDisplay);
window.addEventListener('resize', play);

document.addEventListener("keydown", (event) => {
  let key = event.which || event.keyCode;
  switch (key) {
    case 37:
      console.log('Left');
      moveLeft();
      break;
    case 38:
      console.log('Up');
      moveUp();
      break;
    case 39:
      console.log('Right');
      moveRight();
      break;
    case 40:
      console.log('Down');
      moveDown();
      break;
    case 27:
      console.log('Escape');
      gameOverRun();
      break;
  }
});



