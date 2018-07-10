const body = document.querySelector("body");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// ** For resizing the canvas depending on the window size.**
const setDisplay=()=>{
	const headerHeight = document.querySelector('header').offsetHeight;
	const footerHeight = document.querySelector('header').offsetHeight;
	canvas.height = window.innerHeight -headerHeight -footerHeight;
	canvas.width = window.innerWidth;
}
window.addEventListener('load', setDisplay);
window.addEventListener('resize', setDisplay);

const generateSnake = () => {
	const initialSnakeWidth = 30;
	const initialSnakeHeight = 30;
	const xPos = (window.innerWidth - initialSnakeWidth) / 2 ;
	const yPos = (window.innerHeight - initialSnakeHeight) / 2;
	ctx.fillStyle = "#FF0";
	//creating snake of length 1 in the middle.
	ctx.fillRect(xPos, yPos, initialSnakeWidth, initialSnakeHeight);
}

const generateApple = () => {
	const appleWidth = 30;
	const appleHeight = 30;
	let randXPos = Math.floor(Math.random() * (window.innerWidth - appleWidth));
	let randYPos = Math.floor(Math.random() * (window.innerHeight - appleHeight));
	ctx.fillStyle = "#FF0F00";
	ctx.fillRect(randXPos, randYPos, appleWidth, appleHeight);
}

//Triggers for initiation and restart
const play = () => {
	console.log('Play');
	generateApple();
	generateSnake();
}
window.addEventListener('load', play);

// listening for arrow keys and escape to end the game.
document.addEventListener("keydown", (event) => {
	console.log(event.which);
	var key = event.which || event.keyCode;
  	switch(key) {
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

//After collision condition and escape
const gameOverRun = () => {
	alert('Game Over! Play Again?');
	play();
} 
