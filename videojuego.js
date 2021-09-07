let canvas = document.createElement('canvas')
let context = canvas.getContext('2d');
let instrucciones = document.getElementById('instrucciones');

const startGameButtom = document.getElementById('inicio');

if (startGameButtom) {
  startGameButtom.addEventListener('click', e =>{
    while (instrucciones.hasChildNodes()) {
    instrucciones.removeChild(instrucciones.firstChild)
    }
    myGameArea.board();
    myGameArea.start();
  })
}

//Objeto que almacena la función de aparición del canvas, datos de las imagenes, así como la frecuencia de imagenes
const myGameArea = {
  canvas : canvas,
  context : context,
  frameAppleRed : 0,
  frameAppleGold : 0,
  frameAppleRotten : 0,
  imgBasket : './images/basket.png',
  imgAppleRed : './images/manzana.png',
  imgAppleRotten : './images/badapple.png',
  imgAppleGold : './images/golden-apple.png',
  imgCanvasBack : './images/fondo.png',
  imgLives : './images/heart.png',
  lives : 5,
  board : function () {
    this.canvas.width = 1200;
    this.canvas.height = 600;
    canvas.setAttribute('id', 'canvas1')
    instrucciones.appendChild(this.canvas);
  },
  start : function () {
    this.interval = setInterval(updateGameArea, 1000/60);
  },

  clear : function () {
    context.clearRect(0, 0, canvas.width, canvas.height );
  },
}

class Components {
  constructor (x, y, imgLink, width, height) {
    this.width = width;
    this.height = height;
    this.imgLink = imgLink;
    this.x = x;
    this.y = y;
    this.speedX = 0;
  }
   //Metodos para la impresión de imagenes en el canvas.
  update () {
    const ctx = myGameArea.context;
    let img = new Image();
    img.src = this.imgLink;
    ctx.drawImage(img, this.x, this.y, this.width, this.height);
  }

  //Movimiento de la canasta (horizontal)
  newPos () {
    this.x += this.speedX;
  }
  
}

//Motor del juego
function updateGameArea () {
  myGameArea.clear(); //Limpia canvas
  imgCanvasBack.update();//inserta imagen de inicio en el fondo
  drawLives(myGameArea.lives)//llama a función con # de vidas
  imgBasketObj.update();//inserta imagen a una frecuencia determinada
  imgBasketObj.newPos();//Actualiza la posición de la canasta
  ApplesRandom();
}

//Generación de manzanas

const myApples = [];
function ApplesRandom () {
  for (let i = 0; i < myApples.length; i++) {
    myApples[i].y += 1;
    myApples[i].update();
  }
  myGameArea.frameAppleRed += 1;
  if (myGameArea.frameAppleRed % 100 == 0) {
    let minWidth = 0;
    let maxWidth = 1150;
    let width =  Math.floor(Math.random() * (maxWidth - minWidth));

    myApples.push (new Components(width, -50, myGameArea.imgAppleRed, 50, 50))
  }
}

//Generador de imágenes de vidas
function drawLives(lives) {
for (let i = 0; i < lives; i++ ) {
const imgLivesObj = new Components (1150-i*50 ,0, myGameArea.imgLives, 50, 50);
imgLivesObj.update()
}
}

//Inicialización de clase Constructor con imágenes
const imgCanvasBack = new Components (0, 0, myGameArea.imgCanvasBack, 1200, 600)
const imgBasketObj = new Components (500, 490, myGameArea.imgBasket, 100, 100);
//const imgLivesObj = new Components (1100, 0, myGameArea.imgLives, 50, 50);



//Movimiento de la canasta

document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    //Mueve a izquierda
    case 37:
      imgBasketObj.speedX -= 2;
  console.log('siiii');

    break;
    case 39:
      imgBasketObj.speedX += 2;
    break;
  }
});

//Paro en seco al desoprimir flechas

document.addEventListener('keyup', (e) => {
  imgBasketObj.speedX = 0;
})
