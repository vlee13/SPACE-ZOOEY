window.onload = (e) => {
  console.log(e)
};

const canvas = document.querySelector("#canvas");
const cxt = canvas.getContext("2d");
let road = new Image();
road.src = "../images/spacebg2.jpg";
let zooey = new Image();
zooey.src = "../images/zooey.png";
let yPositionZooey = canvas.height-120;
let xPositionZooey = canvas.width/2-50;
let imageX = 0;
let imageY = 96 * 2;
let animationID;
let canvasY2 = 0;
let canvasY = -canvas.height;
let alien = new Image();
alien.src = "../images/monsters3.png";
let xPositionAlien = 0;
let yPositionAlien = 0;
let aliens = []

function animationLoop() {
  cxt.clearRect(0, 50, canvas.width, canvas.height);
  cxt.drawImage(road, 0, ++canvasY, canvas.width, canvas.height);
  cxt.drawImage(road, 0, ++canvasY2, canvas.width, canvas.height);
    if(canvasY >= canvas.height) canvasY = -canvas.height
    if(canvasY2 >= canvas.height) canvasY2 = -canvas.height
  cxt.drawImage(zooey, imageX, imageY, 96, 96, xPositionZooey, yPositionZooey, 120, 100); // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)  
  aliens.forEach(alien =>{
    cxt.drawImage(alien, imageX, imageY+=10, 58.5, 39.40, xPositionAlien, yPositionAlien, 120, 100); // this doesnt work how do i make rows of aliens?

  })
  animationID = window.requestAnimationFrame(animationLoop);
}

animationLoop()

function moveZooey(e) {
  if(e.onmousemove)
  }

function createAlien(){
  let newAliens = {
    x: 0,
    y: 0,
    width: 58.50,
    height: 39.40
  }
  aliens.push(newAliens)
}

setInterval(createAlien, 2000)

