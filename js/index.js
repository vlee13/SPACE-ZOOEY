document.getElementById('start-button').onload = (event) => {
    console.log(event)
};

const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
let sprite = new Image()
sprite.src = '../images/zooeysprite.png'
let yPositionSprite = 0
let xPositionSprite = 0
let imageX = 0
let imageY = 65*2
let animationID;
let canvasX = 0

function animationLoop() {
    animationID = window.requestAnimationFrame(animationLoop)
    cxt.clearRect(0, 0, canvas.width, canvas.height)
    cxt.drawImage(sprite, imageX, imageY, 65, 65, xPositionSprite, yPositionSprite, 65, 65) // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
}
