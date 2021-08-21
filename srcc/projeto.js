
const imgRanger = new Image();
imgRanger.src = 'https://i.ibb.co/585DtRg/black-Rangers.png';
// https://www.pngfind.com/pngs/m/403-4030351_white-ranger-by-cyrus-annihilator-power-rangers-snes.png
const backgroundTheme = new Image();
backgroundTheme.src = 'https://i.ibb.co/74QDm8B/background.png';
// https://www.spriters-resource.com/resources/sheets/57/60579.png?updated=1460962551
const backgroundStart = new Image();
backgroundStart.src = "https://jogoveio.com.br/wp-content/uploads/2017/01/power-rangers-movie-snes.jpg";
//


const themeSound = new Audio();
themeSound.src = "https://tecnologiaidp-my.sharepoint.com/:u:/g/personal/davi_vale_idp_edu_br/ETfjNRYwDplNr0pX_IzGjKgBMCyV7fWdV2Swv7SX1mHB4g?e=ixtwPf"

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let frames = 0;
let punch = 0;
let score = 0;


const ranger = {
  //imgRangerX: 20,
  //imgRangerY: 150,
  level: 0,
  largura: 52,
  altura: 70,
  xCanvas: 30,
  yCanvas: canvas.height*0.58,
  //punch: [],
  refresh() {},
  positionDown() {
    //console.log('seta baixo!')
    if (statePosition === 1) {
      ranger.yCanvas += 85;
      ranger.level = 0;
      //console.log(ranger.level);
    }
    statePosition = 0;
  },
  positionUp() {
    //console.log('seta cima!')
    if (statePosition === 0) {
      ranger.yCanvas -= 85;
      ranger.level = 1;
      //console.log(ranger.level);
    }
    statePosition = 1;
  },
  positionRight() {
    //console.log('seta direita!')
      ranger.xCanvas += 85;
    //statePosition = 0;
  },
  positionLeft() {
    //console.log('seta esquerda!')
      ranger.xCanvas -= 85;
    //statePosition = 1;
  },

  movements: [
    {imgRangerX:0,imgRangerY:85,},
    {imgRangerX:52,imgRangerY:85,},
    {imgRangerX:116,imgRangerY:85,},
    {imgRangerX:187,imgRangerY:85,},
    {imgRangerX:233,imgRangerY:85,},
    {imgRangerX:302,imgRangerY:85,},
  ],

  punchButton() {
    console.log('punch!')
    ranger.punch = 1;
    imgRangerX = 160;
    imgRangerY = 1050;
    //statePosition = 1;
  },

  frameNow: 0,
  attFrameNow() {

    const intervalFrames = 13;
    const intervalPassed = frames % intervalFrames ===0;

   if (intervalPassed) {
    const incrementSize = 1;
    const increment = incrementSize + ranger.frameNow;
    const repetition = ranger.movements.length;
    ranger.frameNow = increment%repetition;
   }

  },
  draw() {
    //console.log(ranger.punch);
    ranger.attFrameNow();
    
    const {imgRangerX,imgRangerY} = ranger.movements[ranger.frameNow];

    if (ranger.punch) {

      const passed200Frames = frames % 20 === 0;
    if (passed200Frames){
      ranger.punch = 0;
    }
      console.log('punch!!!')
      ctx.drawImage(
        imgRanger,
        160,1048,
        ranger.largura+50,ranger.altura,
        ranger.xCanvas,ranger.yCanvas,
        ranger.largura+100,ranger.altura+100,
      ); 
    } else {
      ctx.drawImage(
        imgRanger,
        imgRangerX,imgRangerY,
        ranger.largura,ranger.altura,
        ranger.xCanvas,ranger.yCanvas,
        ranger.largura+55,ranger.altura+100,
    );}
    
  }
}

const background = {
  x: 0,
  speed: 4,
  imgBackgroundX: 0,
  imgBackgroundY: 180,
  largura: 1800,
  altura: 200,
  xCanvas: 0,
  yCanvas: 0,
  move: function () {
    background.imgBackgroundX += background.speed;
    background.imgBackgroundX %= 1400;
  },
  draw: function () {
      ctx.drawImage(
        backgroundTheme,
        background.imgBackgroundX,background.imgBackgroundY,
        background.largura, background.altura,
        background.xCanvas,background.yCanvas,
        canvas.width, canvas.height,
    );
  }
}

const start = {
  imgBackgroundX: 0,
  imgBackgroundY: 0,
  largura: 1500,
  altura: 2000,
  xCanvas: 0,
  yCanvas: 0,
  draw() {
      ctx.drawImage(
        backgroundStart,
        start.imgBackgroundX,start.imgBackgroundY,
        start.largura, start.altura,
        start.xCanvas,start.yCanvas,
        canvas.width, 3200,
    );
  }
}

const enemy = {
  imgBackgroundX: 340,
  imgBackgroundY: 760,
  largura: 50,
  altura: 60,
  xCanvas: 2000,
  level: 0,
  //yCanvas: canvas.height*0.63,
  draw() {
    enemy.enemies.forEach(function (enemyPosition) {
      const xx = enemyPosition.y
      if (enemyPosition.x===0) {
         yEnemy = canvas.height*0.42;
         enemy.level = 1;
         //console.log(enemy.level);
      } 
      if (enemyPosition.x===1) {
         yEnemy = canvas.height*0.61;
         enemy.level = 0;
         //console.log(enemy.level);
      }
      //xCanvas = 2000;
      //const yEnemy = canvas.height*0.63;
      ctx.drawImage(
          imgRanger,
          enemy.imgBackgroundX,enemy.imgBackgroundY,
          enemy.largura, enemy.altura,
          xx,yEnemy,
          enemy.largura+50, enemy.altura+100,
      )
     
      //enemy.xCanvas -= 2;
    })
  },

  colision(enemyPosition){
    if (enemyPosition.y+100>ranger.xCanvas & ranger.xCanvas+60 >= enemyPosition.y && ranger.level===enemy.level) {
      console.log('Colidiu!')
      changeToScreen(Screen.START);
      
    }
    
  },

  enemies: [], // fazer random correto 
  refresh(){
    const passed100Frames = frames % 280 === 0;
    if (passed100Frames) {
      // adicionar novo enemy na lista, 
      enemy.enemies.push({x: Math.floor(Math.random()*2),y: 3200});
      //console.log('passou 100 frames')
      //console.log(enemy.enemies);
    }
    enemy.enemies.forEach(function (enemyPosition) {
      enemyPosition.y = enemyPosition.y -10-frames*0.01;
      if (enemy.colision(enemyPosition)) {
        
      }
      if (enemyPosition.y+50 <= 0) { // não encher memória de inimigos infinitos
        score += 1;console.log(score);
        enemy.enemies.shift();
      }
      
    });
  },
}

function drawScore() {
  ctx.font = "80px Arial";
  ctx.fillStyle = "#ff0000";
  
  ctx.fillText("Score: "+score, 20, 70);
}

// SCREENS
let screenActive = {};
function changeToScreen(newScreen) {
  screenActive = newScreen;
}

const Screen = {
  START: {
    draw() {
      start.draw();
      drawScore();
    },
    refresh(){
    }
  },
  GAME: {
    draw() {
      //ranger.refresh();
      background.move();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      background.draw();
      ranger.draw();
      enemy.draw();
      drawScore();
    },
    keyDown() {
      ranger.positionDown()
    },
    keyUp() {
      ranger.positionUp()
    },
    keyRight() {
      ranger.positionRight()
    },
    keyLeft() {
      ranger.positionLeft()
    },
    keySpace() {
      ranger.punchButton()
    },
    refresh() {
    ranger.refresh();
    enemy.refresh();
    }
  }
};

function loop() {
  screenActive.draw();
  screenActive.refresh();
  frames = frames + 1;
  requestAnimationFrame(loop);
}
changeToScreen(Screen.START);
themeSound.play();
loop();

let button = document.querySelector('.startButton')
let restartButton = document.querySelector('.restartButton')

button.onclick = function () {
  changeToScreen(Screen.GAME);
    //console.log('teste click')
  }

restartButton.onclick = function () {
      //console.log('teste click')
    } 


statePosition = 0;
window.addEventListener('keydown', function (e) {
  switch(e.keyCode) {
    case 32:
        screenActive.keySpace();// left key pressed
        //ranger.punch();
        break;
    case 37:
        screenActive.keyLeft();// left key pressed
        break;
    case 38:
        screenActive.keyUp();// up key pressed
        break;
    case 39:
        screenActive.keyRight();// right key pressed
        break;
    case 40:
        screenActive.keyDown();// down key pressed
        break;  
  }   
})

