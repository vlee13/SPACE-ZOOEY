let mainAudio = document.querySelector("#audio");
// window.onload = (e) => {
//   console.log(e);
//   console.dir(mainAudio);
mainAudio.loop = true;
mainAudio.volume = 0.1;
mainAudio.controls = false;
//   mainAudio.play();
// };

/*************GLOBAL********/

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let road = new Image();
road.src = "./images/spacebg2.jpg";
let zooey = new Image();
zooey.src = "./images/zooey.png";
let alienImg = new Image();
alienImg.src = "./images/monsters3.png";
let coinImage = new Image();
coinImage.src = "./images/coinimage.png";
let fireballImg = new Image();
fireballImg.src = "./images/fireball.png";
let yPositionZooey = canvas.height - 120;
let xPositionZooey = canvas.width / 2 - 50;
let zWidth = 130;
let zHeight = 100;
let imageX = 0;
let imageY = 96 * 2;
let animationID;
let canvasY2 = 0;
let canvasY = -canvas.height;
let aliens = [];
let bullets = [];
let coins = [];
let fireballs = [];
let currentScore = 0;
let died = false;

/*******ANIMATION***********/
//called resursively aka function called within itself
//callback gets executed ~60x per second (refresh rate of browser)

async function animationLoop() {
  animationID = window.requestAnimationFrame(animationLoop);
  ctx.clearRect(0, 50, canvas.width, canvas.height);
  ctx.drawImage(road, 0, ++canvasY, canvas.width, canvas.height);
  ctx.drawImage(road, 0, ++canvasY2, canvas.width, canvas.height);
  if (canvasY >= canvas.height) canvasY = -canvas.height;
  if (canvasY2 >= canvas.height) canvasY2 = -canvas.height;
  if (!died)
    ctx.drawImage(
      zooey,
      imageX,
      imageY,
      96,
      96,
      xPositionZooey,
      yPositionZooey,
      zWidth,
      zHeight
    );
  drawAlien();
  drawBullet();
  drawCoin();
  drawFireballs();
  if (died) {
    window.cancelAnimationFrame(animationID);
    mainAudio.pause();
  }
  detectCollision();
}

animationLoop();

canvas.onmousemove = moveZooey;

//function declarations

function moveZooey(e) {
  // console.log(e.clientX, e.clientY);
  var w = window.innerWidth;
  let m = (w - canvas.width) / 2;
  if (xPositionZooey > e.clientX - m || xPositionZooey <= canvas.width - 130) {
    xPositionZooey = e.clientX - m;
    if (imageX + 96 === 96 * 4) {
      imageX = 0;
    } else {
      imageX += 96;
    }
  }
}

function shootFireball() {
  const fireball = {
    x: xPositionZooey + 40,
    y: 0,
    width: 30,
    height: 30,
    imgP: 0,
  };
  fireballs.push(fireball);
}

function drawFireballs() {
  fireballs.forEach((fireball) => {
    fireball.imgP = (fireball.imgP + 1) % 3;
    ctx.fillStyle = "yellow";
    ctx.drawImage(
      fireballImg,
      fireball.imgP * 50,
      0,
      50,
      50,
      fireball.x,
      (fireball.y += 5),
      50,
      50
    );
  });
}

function drawAlien() {
  aliens.forEach((alien) => {
    alien.imgYloc = (alien.imgYloc + 0.2) % 3;
    ctx.drawImage(
      alienImg,
      58,
      4.2 + ~~alien.imgYloc * 38,
      58,
      39,
      alien.x,
      (alien.y += 3),
      alien.width,
      alien.height
    );
  });
}

function createAlien() {
  x = 30;

  for (let i = 0; i < 8; i++) {
    let imgYloc = Math.floor(Math.random() * 3);
    let newAliens = {
      x: x + 90 * i,
      y: 0,
      width: 70,
      height: 70,
      strength: 3,
      imgYloc,
      color: "rgb(0,255,0)",
    };
    aliens.push(newAliens);
  }
}

let currentSpeed = 4000; // the current alien speed
let speedChange = 300; // this is how much the speed will "increase" by
let speedChangeFrequency = 8000; // change the speed of the  aliens every 6500 secs
let topSpeed = 400; // the fastest speed the aliens will appear
let alienInterval;
function difficulty() {
  if (currentSpeed - speedChange >= topSpeed) {
    clearInterval(alienInterval);
    currentSpeed -= speedChange;
    alienInterval = setInterval(createAlien, currentSpeed);
  }
}
alienInterval = setInterval(createAlien, currentSpeed);
setInterval(difficulty, speedChangeFrequency);

setInterval(createAlien, 4000);
setInterval(shootBullets, 50);
setInterval(shootFireball, 5000);

function drawBullet() {
  bullets.forEach((bullet) => {
    ctx.fillStyle = bullet.color;
    ctx.fillRect(bullet.x, (bullet.y -= 15), bullet.width, bullet.height);
  });
}

canvas.onclick = shootBullets;

function shootBullets(e) {
  let bullet = {
    x: xPositionZooey + 120 / 2,
    y: yPositionZooey,
    color: "pink",
    width: 25,
    height: 10,
  };
  bullets.push(bullet);
}

function drawCoin() {
  coins.forEach((coin, enemy) => {
    coin.imgP = (coin.imgP + 1) % 10;
    ctx.fillStyle = "yellow";
    ctx.drawImage(
      coinImage,
      coin.imgP * 44,
      0,
      40,
      44,
      coin.x,
      (coin.y += 5),
      30,
      30
    );
  });
}

/*********GIANT COLLISION FUNCTION********/

function detectCollision() {
  aliens.forEach((obs, i) => {
    bullets.forEach((bullet, j) => {
      if (
        bullet.x < obs.x + obs.width &&
        bullet.x + bullet.width > obs.x &&
        bullet.y < obs.y + obs.height &&
        bullet.y + bullet.height > obs.y
      ) {
        aliens[i].strength--;
        if (aliens[i].strength <= 0) {
          let newCoin = {
            x: aliens[i].x,
            y: aliens[i].y,
            width: 20,
            height: 20,
            imgP: 0,
          };
          console.log(newCoin.imgP);
          coins.push(newCoin);
          aliens.splice(i, 1);
        }
        bullets.splice(j, 1);
      }
      // if(obs.y >canvas.height +600){
      //   aliens.splice(i,1)
      // }
      if (bullet.y < 0) {
        bullets.splice(j, 1);
      }
    });

    if (
      xPositionZooey < obs.x + obs.width - 45 && //left of zooey
      xPositionZooey + zWidth > obs.x + 40 && //right of zooey
      yPositionZooey < obs.y + obs.height &&
      yPositionZooey + zHeight > obs.y
    ) {
      died = true;
      mainAudio.pause();
    }
  });

  fireballs.forEach((fireball, h) => {
    if (
      xPositionZooey < fireball.x + fireball.width &&
      xPositionZooey + zWidth > fireball.x &&
      yPositionZooey < fireball.y + fireball.height &&
      yPositionZooey + zHeight > fireball.y
    ) {
      died = true;
    }
  });

  coins.forEach((coin, k) => {
    if (
      xPositionZooey < coin.x + coin.width &&
      xPositionZooey + zWidth > coin.x &&
      yPositionZooey < coin.y + coin.height &&
      yPositionZooey + zHeight > coin.y
    ) {
      console.log("got coin");
      coins.splice(k, 1);
      currentScore += 10;
      document.querySelector(
        "#currentScore"
      ).innerHTML = `Points: ${currentScore}`;
    }
    if (coin.y > canvas.height) {
      coins.splice(k, 1);
    }
  });
}
