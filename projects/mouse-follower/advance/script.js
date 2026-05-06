const mouseFollower = document.querySelector(".mouse-follower");
const smallMouseFollower = document.querySelector(".small-mouse-follower");

let mouseX = 0;
let mouseY = 0;

let currentX1 = 0;
let currentY1 = 0;

let currentX2 = 0;
let currentY2 = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  //Smooth follow effect
  currentX1 += (mouseX - currentX1) * 0.06;
  currentY1 += (mouseY - currentY1) * 0.06;
  
  mouseFollower.style.transform = `
  translate(${currentX1}px, ${currentY1}px)
  translate(-50%, -50%)`;6


  currentX2 += (mouseX - currentX2) * 0.04;
  currentY2 += (mouseY - currentY2) * 0.04;

  smallMouseFollower.style.transform = `
  translate(${currentX2}px, ${currentY2}px)
  translate(-50%, -50%)`;

  requestAnimationFrame(animate);
}

animate();
