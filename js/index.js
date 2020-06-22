window.onload = (event) => {
  console.log(event);
};

const canvas = document.querySelector("#canvas");
const cxt = canvas.getContext("2d");
let road = new Image();
road.src = "../images/spacebg2.jpg";
let sprite = new Image();
sprite.src = "../images/zooeysprite.png";
let yPositionSprite = 0;
let xPositionSprite = 0;
let imageX = 0;
let imageY = 96 * 2;
let animationID;
let canvasY2 = 0;
let canvasY = -canvas.height;
function animationLoop() {
  cxt.clearRect(0, 50, canvas.width, canvas.height);
    cxt.drawImage(road, 0, ++canvasY, canvas.width, canvas.height);
    cxt.drawImage(road, 0, ++canvasY2, canvas.width, canvas.height);
    if(canvasY >= canvas.height) canvasY = -canvas.height
    if(canvasY2 >= canvas.height) canvasY2 = -canvas.height
  cxt.drawImage(
    sprite,
    imageX,
    imageY,
    96,
    96,
    xPositionSprite,
    yPositionSprite,
    96,
    96
  ); // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
    animationID = window.requestAnimationFrame(animationLoop);
}

animationLoop();

function moveZooey(e) {
  console.log(e);
}
