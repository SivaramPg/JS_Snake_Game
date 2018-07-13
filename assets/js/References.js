generateSnakeBody = () => {
	 let bodyXStartPos = currentPos.snakeX; // separately caching and tracking the position of the head to calculate the body positions without changing the head position.
  let bodyYStartPos = currentPos.snakeY;

  switch (direction) {
    case ("up"):
      for (let i = 0; i < 5; i++) {
        generateBlock(
          bodyXStartPos,
          (bodyYStartPos += canvasElementsDim),
          "blue"
        );
        console.log(bodyXStartPos, bodyYStartPos);
      }
      break;
    case ("down"):
      for (let i = 0; i < 5; i++) {
        generateBlock(
          bodyXStartPos,
          (bodyYStartPos -= canvasElementsDim),
          "blue"
        );
        console.log(bodyXStartPos, bodyYStartPos);
      }
      break;
    case ("right"):
      for (let i = 0; i < 5; i++) {
        generateBlock(
          (bodyXStartPos -= canvasElementsDim),
          bodyYStartPos,
          "blue"
        );
        console.log(bodyXStartPos, bodyYStartPos);
      }
      break;
    case ("left"):
      for (let i = 0; i < 5; i++) {
        generateBlock(
          (bodyXStartPos += canvasElementsDim),
          bodyYStartPos,
          "blue"
        );
        console.log(bodyXStartPos, bodyYStartPos);
      }
      break;
  }
}


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