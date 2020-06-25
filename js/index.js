window.onload = (e) => {
  console.log(e);
};


// LOGIC
//difficulty 


// AESTHETICS
// rectangles bullets to sprite bullets
// change rectangle obstacles to alien sprites
// collision from alert to sprite animation
// get aliens to explode

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
let zWidth = 130;
let zHeight =100;
let imageX = 0;
let imageY = 96 * 2;
let animationID;
let canvasY2 = 0;
let canvasY = -canvas.height;
let alien = new Image();
alien.src = "../images/monsters3.png";
let coinImage = new Image()
coinImage.src = "../images/coinimage.png";
let aliens = [];
let bullets = [];
let coins = [];
let fireballs = [];
let currentScore = 0;


/*******ANIMATION***********/
function animationLoop() {
  animationID = window.requestAnimationFrame(animationLoop);
  ctx.clearRect(0, 50, canvas.width, canvas.height);
  ctx.drawImage(road, 0, ++canvasY, canvas.width, canvas.height);
  ctx.drawImage(road, 0, ++canvasY2, canvas.width, canvas.height);
  if (canvasY >= canvas.height) canvasY = -canvas.height;
  if (canvasY2 >= canvas.height) canvasY2 = -canvas.height;
  ctx.drawImage(zooey, imageX, imageY, 96, 96, xPositionZooey, yPositionZooey, zWidth, zHeight);
  // ctx.strokeStyle = "red"
  // ctx.strokeRect(xPositionZooey, yPositionZooey, zWidth, zHeight);
  // (imageObj, imageX, imageY, imageWidth, imageHeight, xCanvas, yCanvas, widthCanvas, heightCanvas)  
  drawAlien();
  drawBullet();
  drawCoin();
  drawFireball();
  detectCollision();
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

function drawFireball(){
  fireballs.forEach(fireball =>{
    ctx.fillStyle = fireball.color;
    ctx.fillRect(fireball.x, (fireball.y+=10), fireball.width, fireball.height)
 })
}

function shootFireball(){
  let fireball = {
    x: xPositionZooey + zWidth/2,
    y: 0,
    color: "red",
    width: 25,
    height: 40
  }
  fireballs.push(fireball)
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
  console.log('create alien', rowSpeed)
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

let rowSpeed = 3000

function difficulty(){
  if(rowSpeed-500 >= 500){
    rowSpeed-=500
    console.log('faster', rowSpeed)
  }

}

setInterval(difficulty, 1000)
setInterval(createAlien, 1000);
setInterval(shootBullets, 50);
setInterval(shootFireball, 5000);

function drawBullet(){
  bullets.forEach(bullet =>{
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, bullet.y-=15, bullet.width, bullet.height)
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
function drawCoin(){
  coins.forEach((coin, enemy)=>{
    ctx.fillStyle = "yellow"
    ctx.fillRect(coin.x, coin.y+=5, 20, 20)
    // ctx.drawImage(coinImage, coin.x, coin.y+=5, 46, 46, enemy.x, enemy.y, 46, 46)

  })
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
          
            let newCoin = {
              x: aliens[i].x, 
              y: aliens[i].y, 
              width: 20,
              height: 20
            }
            coins.push(newCoin)
            aliens.splice(i,1)
          }
          bullets.splice(j,1)
        }
      // if(obs.y >canvas.height +1000){
      //   aliens.splice(i,1)
      // } 
      if(bullet.y<0){
        bullets.splice(j,1)
      } 
    })
    

    if(xPositionZooey < obs.x + obs.width -45 && //left of zooey
      xPositionZooey + zWidth > obs.x + 40 &&     //right of zooey
      yPositionZooey < obs.y + obs.height &&
      yPositionZooey + zHeight > obs.y) {
        ctx.clearRect(xPositionZooey, yPositionZooey, zWidth, zHeight)
        ctx.drawImage(road, xPositionZooey, yPositionZooey, canvas.width, canvas.height);
        console.log('collision')
        window.cancelAnimationFrame(animationID)
        alert("You were eaten by aliens")
        window.location.href="index.html" 
        // location.reload()
    }
  })

  fireballs.forEach((fireball,h)=>{
    if(xPositionZooey < fireball.x + fireball.width &&
      xPositionZooey + zWidth > fireball.x &&
      yPositionZooey < fireball.y + fireball.height &&
      yPositionZooey + zHeight > fireball.y) {
        ctx.clearRect(xPositionZooey, yPositionZooey, zWidth, zHeight)
        ctx.drawImage(road, xPositionZooey, yPositionZooey, canvas.width, canvas.height);
        window.cancelAnimationFrame(animationID)
        alert("Fireball killed you!")
        window.location.href="index.html" 
        // location.reload()
      }
  })

    coins.forEach((coin,k)=>{ 
      if (xPositionZooey < coin.x + coin.width &&
        xPositionZooey + zWidth > coin.x &&
        yPositionZooey < coin.y + coin.height &&
        yPositionZooey + zHeight > coin.y) {
         console.log('got coin')
         coins.splice(k,1) 
         currentScore++
          document.querySelector("#currentScore").innerHTML = `Points: ${currentScore}`


        }  
      if(coin.y > canvas.height){
        coins.splice(k,1)
      } 
    })
      
}