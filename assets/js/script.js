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

// creating a box of fixed dimension and color that will be added to the center as the snake and subsequently added to it as it eats the apples.
// variable values can be refactored directly into the code if need be 
const initialSnakeHeight = 30;
const initialSnakeWidth= 30;
let xpos = (window.innerWidth - initialSnakeWidth) / 2 ;
let ypos = (window.innerHeight - initialSnakeHeight) / 2;
ctx.fillStyle = "#FF0";
//creating snake of length 1 in the middle.
ctx.fillRect(xpos, ypos, initialSnakeWidth, initialSnakeHeight);

//Creating an Apple 
// TO BE PLACED INSIDE A FUNCTION AND TRIGGERED IF SNAKE EATS IT.
const appleHeight= 30;
const appleWidth= 30;
let randXPos = Math.floor(Math.random() * (window.innerWidth - appleWidth));
let randYPos = Math.floor(Math.random() * (window.innerHeight - appleHeight));
ctx.fillStyle = "#FF0F00";
ctx.fillRect(randXPos, randYPos, appleWidth, appleHeight);

