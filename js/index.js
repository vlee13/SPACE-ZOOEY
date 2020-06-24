window.onload = (e) => {
  console.log(e);
};

// GitHub README
// project description
// link to the demo
// technologies used

// LOGIC
// collision detect on zooey- zooey poof/stop animation/alert("game over")
// get aliens to explode and give coins when they die
// score = coins

// AESTHETICS
// rectangles bullets to sprite bullets
// change rectangle obstacles to alien sprites
// collision from alert to sprite animation

// WOULD BE NICE HAVE
// last - socket.io for high score


/*************GLOBAL********/
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let road = new Image();
road.src = "../images/spacebg2.jpg";
let zooey = new Image();
zooey.src = "../images/zooey.png";
let yPositionZooey = canvas.height - 120;
let xPositionZooey = canvas.width / 2 - 50;
let imageX = 0;
let imageY = 96 * 2;
let animationID;
let canvasY2 = 0;
let canvasY = -canvas.height;
let alien = new Image();
alien.src = "../images/monsters3.png";
let aliens = [];
let bullets = [];


/*******ANIMATION***********/
function animationLoop() {
  ctx.clearRect(0, 50, canvas.width, canvas.height);
  ctx.drawImage(road, 0, ++canvasY, canvas.width, canvas.height);
  ctx.drawImage(road, 0, ++canvasY2, canvas.width, canvas.height);
  if (canvasY >= canvas.height) canvasY = -canvas.height;
  if (canvasY2 >= canvas.height) canvasY2 = -canvas.height;
  ctx.drawImage(zooey, imageX, imageY, 96, 96, xPositionZooey, yPositionZooey, 120, 100); 
  // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)
  ctx.fillStyle = "green";
  drawAlien();
  drawBullet();
  detectCollision();
  animationID = window.requestAnimationFrame(animationLoop);
}

animationLoop();

canvas.onmousemove = moveZooey;

function moveZooey(e) {
  // console.log(e.clientX, e.clientY);
  var w = window.innerWidth;
  let m = (w - canvas.width)/2
  if(xPositionZooey > e.clientX - m  || xPositionZooey <= canvas.width-130){
    xPositionZooey = e.clientX - m;
    if (imageX + 96 === 96 * 4) {
      imageX = 0;
    } else {
      imageX += 96;
    }
  }
}

function drawAlien() {
  aliens.forEach((alien) => {
    if(alien.strength===3){
      alien.color="rgb(0,255,0)"
    }
    if(alien.strength===1){
      alien.color="rgb(255,0,0)"
    }
    ctx.fillStyle = alien.color
    ctx.fillRect(alien.x, (alien.y += 3), alien.width, alien.height);
  });
}

function createAlien() {
  x = 30;
  for(let i =0; i < 8; i++) {

    let newAliens = {
      x: x + 90 * i,
      y: 0,
      width: 50,
      height: 50,
      strength: 3,
      color: "rgb(0,255,0)"
    };
    aliens.push(newAliens);
  }
}
setInterval(createAlien, 4000);
setInterval(shootBullets, 100);

function drawBullet(){
  bullets.forEach(bullet =>{
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y-=5, bullet.width, bullet.height)
  })
}
function shootBullets(){
  let bullet = {
    x: xPositionZooey + 120/2,
    y: yPositionZooey,
    color: "pink",
    width: 20,
    height: 10
  }
  bullets.push(bullet)
}

function detectCollision(){
  aliens.forEach((obs,i)=>{
    bullets.forEach((bullet,j)=>{

      if (bullet.x < obs.x + obs.width &&
        bullet.x + bullet.width > obs.x &&
        bullet.y < obs.y + obs.height &&
        bullet.y + bullet.height > obs.y) {
          aliens[i].strength--
          if(aliens[i].strength <= 0){
            aliens.splice(i,1)
          }
            bullets.splice(j,1)
      }
    })
    if (zooey.imageX < obs.x + obs.width &&
      zooey.imageX + zooey.width > obs.x &&
      zooey.imageY < obs.y + obs.height &&
      zooey.imageY + zooey.height > obs.y) {
       console.log('collision')
       window.cancelAnimationFrame(animationID)
          // alert('Game Over') //not detecting collision whyyy
    }
  })
}