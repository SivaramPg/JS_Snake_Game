const body = document.querySelector("body");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const header = document.querySelector("header");
const headerHeight = document.querySelector("header").offsetHeight;
const footer = document.querySelector("footer");
const footerHeight = document.querySelector("footer").offsetHeight;
const dispScore = document.getElementById("score");

// creating a const with canvas elements (snake and apple) dimensions so it can be altered easily without affecting code.
const canvasElementsDim = 20;
let id = 0,
  score = 1,
  direction = "",
  pending = 0,
  bodyPositions = [];

//Can be used later to create gap b/w new snake blocks.
// const sizeOfGrid = 30;
const sizeOfObject = 28;

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
  canvas.height = window.innerHeight - headerHeight - footerHeight - 80; // Subtracting the padding applied on both sides
  canvas.width = window.innerWidth - 80;
  canvas.height -= canvas.height % canvasElementsDim;
  canvas.width -= canvas.width % canvasElementsDim;
  header.style.height = `${headerHeight +
    ((window.innerHeight - headerHeight - footerHeight - 80) %
      canvasElementsDim) /
      2}px`;
  footer.style.height = `${footerHeight +
    ((window.innerHeight - headerHeight - footerHeight - 80) %
      canvasElementsDim) /
      2}px`;
  canvas.style.marginRight = `${(window.innerWidth - canvas.width) / 2}px`;
  canvas.style.marginLeft = `${(window.innerWidth - canvas.width) / 2}px`;
  canvas.style.marginTop = `${(window.innerHeight -
    headerHeight -
    canvas.height -
    footerHeight) /
    2}px`;
  canvas.style.marginBottom = `${(window.innerHeight -
    headerHeight -
    canvas.height -
    footerHeight) /
    2}px`;

  dispScore.innerHTML = `Score: ${score}`;
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
  borderThickness = 1;
  ctx.fillStyle = color;
<<<<<<< HEAD
  ctx.fillRect(xPos+1, yPos+1, sizeOfObject, sizeOfObject);
=======
  ctx.fillRect(xPos, yPos, canvasElementsDim, canvasElementsDim);
  // Adding border to the blocks ... They should be within the footprint of the block ie inside 30x30 otherwise they will not be cleared. giving them the same dimensions as that of the block will also not work
  // ctx.strokeRect(xPos+borderThickness, yPos+borderThickness, canvasElementsDim-(2*borderThickness), canvasElementsDim-(2*borderThickness));
>>>>>>> 20ee86876289528d779b663f1296e17491b10071
};

const generateSnakeHead = () => {
  let xPos = Math.floor(Math.random() * xGridPositions()) * canvasElementsDim;
  let yPos = Math.floor(Math.random() * yGridPositions()) * canvasElementsDim;
  currentPos.snakeX = xPos;
  currentPos.snakeY = yPos;
  generateBlock(xPos, yPos, "green"); // setting different colors for dev purposed only
};

generateSnakeBody = () => {
  let bodyXStartPos = currentPos.snakeX;
  let bodyYStartPos = currentPos.snakeY;
  console.log(currentPos);
  switch (direction) {
    case "up":
      generateBlock(bodyXStartPos, bodyYStartPos, "blue");
      console.log(bodyXStartPos, bodyYStartPos);
      break;
    case "down":
      generateBlock(bodyXStartPos, bodyYStartPos, "blue");
      console.log(bodyXStartPos, bodyYStartPos);
      break;
    case "right":
      generateBlock(bodyXStartPos, bodyYStartPos, "blue");
      console.log(bodyXStartPos, bodyYStartPos);
      break;
    case "left":
      generateBlock(bodyXStartPos, bodyYStartPos, "blue");
      console.log(bodyXStartPos, bodyYStartPos);
      break;
  }
  bodyPositions.push([bodyXStartPos, bodyYStartPos]);
};

const checkNewApplePosition = (x, y) => {
  for (i = 0; i < bodyPositions.length; i++) {
    if (x === bodyPositions[i][0] && y === bodyPositions[i][1]) return false;
  }
  return true;
};

const generateApple = () => {
  let randXPos =
    Math.floor(Math.random() * xGridPositions()) * canvasElementsDim;
  let randYPos =
    Math.floor(Math.random() * yGridPositions()) * canvasElementsDim;
  if (checkNewApplePosition(randXPos, randYPos)) {
    //True for okay. False for not okay
    generateBlock(randXPos, randYPos, "#FF0F00");
    currentPos.appleX = randXPos;
    currentPos.appleY = randYPos;
  } else generateApple();
};

const reset = () => {
  id = 0;
  score = 1;
  direction = "";
  pending = 0;
  bodyPositions = [];
  currentPos.snakeX = "";
  currentPos.snakeY = "";
  currentPos.appleX = "";
  currentPos.appleY = "";
};

//Triggers for initiation and restart
const play = () => {
  if (id) {
    //For resize
    clearInterval(id);
    reset();
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
    reset();
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

const checkSnakeCollision = () => {
  const x = currentPos.snakeX;
  const y = currentPos.snakeY;
  for (i = 0; i < bodyPositions.length; i++) {
    if (x === bodyPositions[i][0] && y === bodyPositions[i][1]) {
      gameOverRun();
    }
  }
};

const checkAndUpdatePositions = () => {
  if (speed.x || speed.y) {
    ctx.clearRect(
      currentPos.snakeX+1,
      currentPos.snakeY+1,
      sizeOfObject,
      sizeOfObject
    );
    if (pending) {
      generateSnakeBody();
      pending--;
    } else if (bodyPositions.length) {
      updateSnake();
    }
    currentPos.snakeX += speed.x;
    currentPos.snakeY += speed.y;

    generateBlock(currentPos.snakeX, currentPos.snakeY, "green");
  }
};

const updateScore = () => {
  score += 5;
  pending += 5;
  dispScore.innerHTML = `Score: ${score}`;
};

//First should follow head, rest should follow the next.
const updateSnake = () => {
  let length = bodyPositions.length;
  //For first body element
  let pos = bodyPositions[length - 1];
  let temp = pos;
  ctx.clearRect(pos[0]+1, pos[1]+1, sizeOfObject, sizeOfObject);
  pos = [currentPos.snakeX, currentPos.snakeY];
  generateBlock(pos[0], pos[1], "blue");
  bodyPositions[length - 1] = pos;

  //For subsequent body elements
  for (i = length - 2; i >= 0; i--) {
    let pos = bodyPositions[i];
    ctx.clearRect(pos[0]+1, pos[1]+1, sizeOfObject, sizeOfObject);
    pos = temp;
    generateBlock(pos[0], pos[1], "blue");
    temp = bodyPositions[i];
    bodyPositions[i] = pos;
  }
};

const checkAndUpdateApple = () => {
  if (
    currentPos.snakeX === currentPos.appleX &&
    currentPos.snakeY === currentPos.appleY
  ) {
    generateApple();
    updateScore();
  }
};

//Runs continuously, updates and checks
const update = () => {
  checkAndUpdatePositions();
  checkAndUpdateApple();
  checkSnakeCollision();
  checkBounds();
};

//Functions for movement
const moveUp = () => {
  if (direction !== "down" || !bodyPositions.length) {
    speed.y = -canvasElementsDim;
    speed.x = 0;
    direction = "up";
  }
};
const moveDown = () => {
  if (direction !== "up" || !bodyPositions.length) {
    speed.y = canvasElementsDim;
    speed.x = 0;
    direction = "down";
  }
};
const moveLeft = () => {
  if (direction !== "right" || !bodyPositions.length) {
    speed.y = 0;
    speed.x = -canvasElementsDim;
    direction = "left";
  }
};
const moveRight = () => {
  if (direction !== "left" || !bodyPositions.length) {
    speed.y = 0;
    speed.x = canvasElementsDim;
    direction = "right";
  }
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
