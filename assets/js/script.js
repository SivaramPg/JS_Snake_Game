const canvas = document.getElementById("myCanvas");

//
// ** For resizing the canvas depending on the window size.**
//
// canvas width manipulated to prevent horizontal scrolling and to compensate for the vertical scroll bar
// In future if header and footer are removed then REMOVE THE SUBTRACTION OF 27 FROM THE canvas.width.

canvas.width = window.innerWidth - 27;
canvas.height = window.innerHeight;

const ctx = myCanvas.getContext("2d");

// Create gradient
const  grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 80);

