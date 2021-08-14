
const imgRanger = new Image();
const backgroundTheme = new Image();
const backgroundStart = new Image();
imgRanger.src = 'https://www.pngfind.com/pngs/m/403-4030351_white-ranger-by-cyrus-annihilator-power-rangers-snes.png';
backgroundTheme.src = 'https://www.spriters-resource.com/resources/sheets/57/60579.png?updated=1460962551';
backgroundStart.src = "https://jogoveio.com.br/wp-content/uploads/2017/01/power-rangers-movie-snes.jpg";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ranger = {
  imgRangerX: 20,
  imgRangerY: 150,
  largura: 41,
  altura: 52,
  xCanvas: 10,
  yCanvas: 90,
  refresh() {
    ranger.xCanvas +=1;
  },
  draw() {
      ctx.drawImage(
        imgRanger,
        ranger.imgRangerX,ranger.imgRangerY,
        ranger.largura,ranger.altura,
        ranger.xCanvas,ranger.yCanvas,
        ranger.largura+15,ranger.altura+40,
    );
  }
}

const background = {
  imgBackgroundX: 0,
  imgBackgroundY: 180,
  largura: canvas.width,
  altura: canvas.height,
  xCanvas: 0,
  yCanvas: 0,
  draw() {
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
  altura: 1700,
  xCanvas: 0,
  yCanvas: 0,
  draw() {
      ctx.drawImage(
        backgroundStart,
        start.imgBackgroundX,start.imgBackgroundY,
        start.largura, start.altura,
        start.xCanvas,start.yCanvas,
        2000, 1000,
    );
  }
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
    },
    refresh(){}
  },
  GAME: {
    draw() {
      ranger.refresh();
      background.draw();
      ranger.draw();
    },
    refresh() {
    ranger.refresh();
    }
  }
};

function loop() {
  
  screenActive.draw();
  screenActive.refresh();
  requestAnimationFrame(loop);
}
changeToScreen(Screen.START);
loop();

let button = document.querySelector('.startButton')

button.onclick = function () {
  changeToScreen(Screen.GAME);
    console.log('teste click')
  }