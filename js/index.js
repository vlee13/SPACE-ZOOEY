document.getElementById('start-button').onload = (event) => {
    console.log(event)
};

const canvas = document.querySelector('#canvas')
const cxt = canvas.getContext('2d')
let road = new Image()
road.src = '../images/spacebg2.jpg'
let sprite = new Image()
sprite.src = '../images/zooeysprite.png'
let yPositionSprite = 0
let xPositionSprite = 0
let imageX = 0
let imageY = 64*2
let animationID;
let canvasX = 0

function animationLoop() {
    animationID = window.requestAnimationFrame(animationLoop)
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    cxt.drawImage(road, 0, 0, canvas.width, canvas.height)
    cxt.drawImage(sprite, imageX, imageY, 64, 64, xPositionSprite, yPositionSprite, 64, 64) // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
}
animationLoop()