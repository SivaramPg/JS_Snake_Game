const body = document.querySelector("body");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const headerHeight = document.querySelector("header").offsetHeight;
const footerHeight = document.querySelector("footer").offsetHeight;

// creating a const with canvas elements (snake and apple) dimensions so it can be altered easily without affecting code.
const canvasElementsDim = 30;
let id = 0,
  score = 1,
  direction = "";

//Can be used later to create gap b/w new snake blocks.
//const sizeOfGrid = 30;
//const sizeOfObject = 28;

const currentPos = {
  snakeX: "",
  snakeY: "",
  appleX: "",
  appleY: ""
};

const speed = {
  x: 0,
  y: 0
};
//For resizing the canvas depending on the window size
const setDisplay = () => {
  canvas.height = window.innerHeight - headerHeight - footerHeight;
  canvas.width = window.innerWidth;
  canvas.height -= canvas.height % canvasElementsDim;
  canvas.width -= canvas.width % canvasElementsDim;
};

//Dividing the canvas into pseudo grids.

// Number of X positions possible at intervals of 30: (0,30,60,90,.....)
const xGridPositions = () => {
  return (xPositions = Math.floor(canvas.width / canvasElementsDim));
};

// Number of Y positions possible at intervals of 30: (0, 30, 60, 90, ......)
const yGridPositions = () => {
  return (yPositions = Math.floor(canvas.height / canvasElementsDim));
};

const generateBlock = (xPos, yPos, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(xPos, yPos, canvasElementsDim, canvasElementsDim);
};

const generateSnakeHead = () => {
  let xPos = Math.floor(Math.random() * xGridPositions()) * canvasElementsDim;
  let yPos = Math.floor(Math.random() * yGridPositions()) * canvasElementsDim;
  currentPos.snakeX = xPos;
  currentPos.snakeY = yPos;
  generateBlock(xPos, yPos, "green"); // setting different colors for dev purposed only
};

const generateSnakeBody = () => {
};

const generateApple = () => {
  let randXPos = Math.floor(Math.random() * xGridPositions()) * canvasElementsDim;
  let randYPos = Math.floor(Math.random() * yGridPositions()) * canvasElementsDim;
  generateBlock(randXPos,randYPos,"#FF0F00");
  currentPos.appleX = randXPos;
  currentPos.appleY = randYPos;
};

//Triggers for initiation and restart
const play = () => {
  if (id) {
    //For resize
    clearInterval(id);
    score = 1;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  generateSnakeHead();
  generateApple();
  console.log(currentPos);
  id = setInterval(update, 90);
};

//After collision conditione or escape
const gameOverRun = () => {
  clearInterval(id);
  id = 0;
  speed.x = 0;
  speed.y = 0;
  const playAgain = confirm(`Game Over! Your score is ${score}! Play Again?`); // check if user wants to play again, confirm returns either true or false on selection.
  if (playAgain) {
    score = 1; // if yes then only clear canvas & restart the game
    play();
  } else {
    alert("Thanks for playing");
  }
};

const checkBounds = () => {
  const x = currentPos.snakeX;
  const y = currentPos.snakeY;
  if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) {
    gameOverRun();
  }
};

const checkAndUpdatePositions = () => {
  if (speed.x || speed.y) {
    ctx.clearRect(
      currentPos.snakeX,
      currentPos.snakeY,
      canvasElementsDim,
      canvasElementsDim
    );
    currentPos.snakeX += speed.x;
    currentPos.snakeY += speed.y;
    generateBlock(currentPos.snakeX, currentPos.snakeY, 'green');
  }
};

const updateScore = () => {
  score += 5;
};

const updateSnake = () => {};

const checkAndUpdateApple = () => {
  if (
    currentPos.snakeX === currentPos.appleX &&
    currentPos.snakeY === currentPos.appleY
  ) {
    updateScore();
    generateSnakeBody();
    generateApple();
  }
};

//Runs continously, updates and checks
const update = () => {
  checkAndUpdatePositions();
  checkAndUpdateApple();
  checkBounds();
};

//Functions for movement
const moveUp = () => {
  speed.y = -30;
  speed.x = 0;
  direction = "up";
};
const moveDown = () => {
  speed.y = 30;
  speed.x = 0;
  direction = "down";
};
const moveLeft = () => {
  speed.y = 0;
  speed.x = -30;
  direction = "left";
};
const moveRight = () => {
  speed.y = 0;
  speed.x = 30;
  direction = "right";
};

//Event Listeners
window.addEventListener("load", setDisplay);
window.addEventListener("load", play);
window.addEventListener("resize", setDisplay);
window.addEventListener("resize", play);

document.addEventListener("keydown", event => {
  let key = event.which || event.keyCode;
  switch (key) {
    case 37:
      moveLeft();
      break;
    case 38:
      moveUp();
      break;
    case 39:
      moveRight();
      break;
    case 40:
      moveDown();
      break;
    case 27:
      gameOverRun();
      break;
  }
});
