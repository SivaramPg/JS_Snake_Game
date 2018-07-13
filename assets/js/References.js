//1
generateSnakeBody = () => {
	let bodyXStartPos = currentPos.snakeX; // separately caching and tracking the position of the head to calculate the body positions without changing the head position.
  let bodyYStartPos = currentPos.snakeY;

  switch (direction) {
    case ("up"):
        generateBlock(
          bodyXStartPos,
          (bodyYStartPos += canvasElementsDim),
          "blue"
        );
        console.log(bodyXStartPos, bodyYStartPos);
      break;
    case ("down"):
        generateBlock(
          bodyXStartPos,
          (bodyYStartPos -= canvasElementsDim),
          "blue"
        );
        console.log(bodyXStartPos, bodyYStartPos);
      break;
    case ("right"):
        generateBlock(
          (bodyXStartPos -= canvasElementsDim),
          bodyYStartPos,
          "blue"
        );
        console.log(bodyXStartPos, bodyYStartPos);
      break;
    case ("left"):
        generateBlock(
          (bodyXStartPos += canvasElementsDim),
          bodyYStartPos,
          "blue"
        );
        console.log(bodyXStartPos, bodyYStartPos);
      break;
  }
}

//2
const checkAndUpdatePosition = () => {
  if (speed.x || speed.y) {
    ctx.clearRect(
      currentPos.snakeX,
      currentPos.snakeY,
      canvasElementsDim,
      canvasElementsDim
    );
    currentPos.snakeX += speed.x;
    currentPos.snakeY += speed.y;
    ctx.fillStyle = 'green';
    ctx.fillRect(
      currentPos.snakeX,
      currentPos.snakeY,
      canvasElementsDim,
      canvasElementsDim
    );
    createAnimatedBody();
  }
};

const createAnimatedBody = () => {
  let xBody = currentPos.snakeX - speed.x;
  let yBody = currentPos.snakeY - speed.y;
  for (i = 1; i < score; i++) {
    ctx.clearRect(
      xBody,
      yBody,
      canvasElementsDim,
      canvasElementsDim
    );
    ctx.fillStyle = 'blue';
    ctx.fillRect(
      xBody,
      yBody,
      canvasElementsDim,
      canvasElementsDim
    );
  }
}