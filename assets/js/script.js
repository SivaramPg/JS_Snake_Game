const body = document.querySelector("body");
const canvas = document.getElementById("myCanvas");

//
// ** For resizing the canvas depending on the window size.**
//
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

// Placeholder content

// Create gradient
const  grd = ctx.createLinearGradient(0, 0, 200, 0);
grd.addColorStop(0, "red");
grd.addColorStop(1, "white");

// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 80);

// Page scrolls to canvas element on load... Works fine on Edge and chrome when tab closed and reopened but bugs out on refresh.
window.addEventListener('load', () => {
  canvas.scrollIntoView({behavior: "smooth", block: "start"})
});
