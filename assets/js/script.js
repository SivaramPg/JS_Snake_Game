const body = document.querySelector("body");
const canvas = document.getElementById("myCanvas");

//
// ** For resizing the canvas depending on the window size.**
//
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

//creating a box of fixed dimension and color that will be added to the center as the snake and subsequently added to it as it eats the apples.


//creating snake of length 1 in the middle.


// Page scrolls to canvas element on load... Works fine on Edge and chrome when tab closed and reopened but bugs out on refresh.
window.addEventListener('load', () => {
  canvas.scrollIntoView({behavior: "smooth", block: "start"})
});
