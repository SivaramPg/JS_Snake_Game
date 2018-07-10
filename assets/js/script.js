const body = document.querySelector("body");
const canvas = document.getElementById("myCanvas");

const ctx = canvas.getContext("2d");


// ** For resizing the canvas depending on the window size.**
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// creating a box of fixed dimension and color that will be added to the center as the snake and subsequently added to it as it eats the apples.
// variable values can be refactored directly into the code if need be 
let initialSnakeWidth = 25;
let initialSnakeHeight = 25;
let xpos = (window.innerWidth - initialSnakeWidth) / 2 ;
let ypos = (window.innerHeight - initialSnakeHeight) / 2;
ctx.fillStyle = "#FF0";

//creating snake of length 1 in the middle.
ctx.fillRect(xpos, ypos, initialSnakeWidth, initialSnakeHeight);

//Creating an Apple 
// TO BE PLACED INSIDE A FUNCTION AND TRIGGERED IF SNAKE EATS IT.
let appleWidth = 35;
let appleHeight = 35;
let randXPos = Math.floor(Math.random() * (window.innerWidth - appleWidth));
let randYPos = Math.floor(Math.random() * (window.innerHeight - appleHeight));
ctx.fillStyle = "#FF0F00";
ctx.fillRect(randXPos, randYPos, appleWidth, appleHeight);


// Page scrolls to canvas element on load... Works fine on Edge and chrome when tab closed and reopened but bugs out on refresh.
window.addEventListener('load', () => {
  canvas.scrollIntoView({behavior: "smooth", block: "start"})
});
