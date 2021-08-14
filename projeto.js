
const imgRanger = new Image();
const backgroundTheme = new Image();
imgRanger.src = 'https://www.pngfind.com/pngs/m/403-4030351_white-ranger-by-cyrus-annihilator-power-rangers-snes.png';
backgroundTheme.src = 'https://www.spriters-resource.com/resources/sheets/55/57816.png?updated=1460961976';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ranger = {
  imgRangerX: 20,
  imgRangerY: 145,
  largura: 41,
  altura: 62,
  xCanvas: 10,
  yCanvas: 260,
  draw() {
      ctx.drawImage(
        imgRanger,
        ranger.imgRangerX,ranger.imgRangerY,
        ranger.largura,ranger.altura,
        ranger.xCanvas,ranger.yCanvas,
        ranger.largura+75,ranger.altura+150,
    );
    ranger.xCanvas +=1
  }
}

const background = {
  imgBackgroundX: 30,
  imgBackgroundY: 50,
  largura: 1580,
  altura: 180,
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


function loop() {
  background.draw();
  ranger.draw();
  requestAnimationFrame(loop);
}

loop();