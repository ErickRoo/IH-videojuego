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
  applesRedTotal : 0,
  applesRottenTotal : 0,
  applesGoldTotal : 0,
  imgBasket : './images/basket.png',
  imgAppleRed : './images/manzana.png',
  imgAppleRotten : './images/badapple.png',
  imgAppleGold : './images/golden-apple.png',
  imgCanvasBack : './images/fondo.png',
  imgLives : './images/heart.png',
  imgGO : './images/perdiste.png',
  lives : 5,
  nivel1Red : 0,
  nivel2Red : 2,
  nivel3Red : 4,
  nivel4Red : 8,
  nivel1Rotten : 0,
  nivel2Rotten : 3,
  nivel3Rotten : 5,
  nivel4Rotten : 10,
  board : function () {
    this.canvas.width = 1200;
    this.canvas.height = 600;
    canvas.setAttribute('id', 'canvas1')
    instrucciones.appendChild(this.canvas);
  },
  start : function () {
    this.interval = setInterval(updateGameArea, 1000/60);
  },
  start : function () {
    this.interval = setInterval(updateGameArea, 1000/60);
  },
  stop : function () {
    clearInterval(this.interval);
  },
  clear : function () {
    context.clearRect(0, 0, canvas.width, canvas.height );
  },
  score : function () {
    this.context.font = '30px serif',
    this.context.fillStyle = 'white',
    this.context.fillText(` x ${this.applesRedTotal}`, 0, 60)
  },
  gameOver : function () {
    if (this.lives == 0) {
      return true
    }else {
      return false
    }
  }
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

  //Métodos para colisión (atrapar manzanas)
  left() {
    return this.x +15
  }

  right() {
    return this.x + this.width -15
  }

  top() {
    return this.y + 25
  }

  bottom() {
    return this.y + this.height -25
  }

  //Metodo para conteo de manzanas
  crashWith(apples) {
    return !(
      this.bottom() < apples.top() ||
      this.top() > apples.bottom() ||
      this.right() < apples.left() ||
      this.left() > apples.right());
  }
}

//Motor del juego
function updateGameArea () {
  myGameArea.clear(); //Limpia canvas
  drawLives(myGameArea.lives)//llama a función con # de vidas
  imgBasketObj.update();//inserta imagen a una frecuencia determinada
  imgBasketObj.newPos();//Actualiza la posición de la canasta
  niveles();
  GoldenRandom(); //Caen manzanas doradas del cielo
  deleteApples(myApples);
  deleteApples(rottenApples);
  deleteApples(goldenApples);
  applesCatches(myApples, imgBasketObj);
  applesCatches(rottenApples, imgBasketObj);
  applesCatches(goldenApples, imgBasketObj);
  imgOneAppleRed.update();
  myGameArea.score();
  gameOver();
}

//Función niveles

function niveles () {
  if (myGameArea.applesRedTotal < 5) {
    ApplesRandom(myGameArea.nivel1Red);//Función imprime manzanas aleatoramiente
    RottenRandom(myGameArea.nivel1Rotten); //Caen manzanas podridas del cielo
  }else if (myGameArea.applesRedTotal > 4 && myGameArea.applesRedTotal < 10) {
    ApplesRandom(myGameArea.nivel2Red);//Función imprime manzanas aleatoramiente
    RottenRandom(myGameArea.nivel2Rotten); //Caen manzanas podridas del cielo
  }else if (myGameArea.applesRedTotal > 9 && myGameArea.applesRedTotal < 14) {
    ApplesRandom(myGameArea.nivel3Red);//Función imprime manzanas aleatoramiente
    RottenRandom(myGameArea.nivel3Rotten); //Caen manzanas podridas del cielo
  }else if (myGameArea.applesRedTotal > 13 ) {
    ApplesRandom(myGameArea.nivel4Red);//Función imprime manzanas aleatoramiente
    RottenRandom(myGameArea.nivel4Rotten); //Caen manzanas podridas del cielo
  }
}

//Generación de manzanas

const myApples = [];
function ApplesRandom (nivel) {
  for (let i = 0; i < myApples.length; i++) {
    myApples[i].y += 1 + nivel;
    myApples[i].update();
  }
  myGameArea.frameAppleRed += 1;
  if (myGameArea.frameAppleRed % 100 == 0) {
    let minWidth = 0;
    let maxWidth = 1150;
    let width =  Math.floor(Math.random() * (maxWidth - minWidth));

    myApples.push (new Components(width, -10, myGameArea.imgAppleRed, 50, 50))
  }
}
//Generación de manzanas podridas
const rottenApples = [];
function RottenRandom (nivel) {
  for (let i = 0; i < rottenApples.length; i++) {
    rottenApples[i].y += 1 + nivel;
    rottenApples[i].update();
  }
  myGameArea.frameAppleRotten += 1;
  if (myGameArea.frameAppleRotten % 150 === 0) {
    let minWidth = 0;
    let maxWidth = 1150;
    let width =  Math.floor(Math.random() * (maxWidth - minWidth));

    rottenApples.push (new Components(width, -10, myGameArea.imgAppleRotten, 50, 50))
  }
}
// Generación manzanas doradas
const goldenApples = [];
function GoldenRandom () {
  for (let i = 0; i < goldenApples.length; i++) {
    goldenApples[i].y += 1;
    goldenApples[i].update();
  }
  myGameArea.frameAppleGold += 1;
  if (myGameArea.frameAppleGold % 2100 === 0) {
    let minWidth = 0;
    let maxWidth = 1150;
    let width =  Math.floor(Math.random() * (maxWidth - minWidth));

    goldenApples.push (new Components(width, -10, myGameArea.imgAppleGold, 50, 50))
  }
}


//Función borrar manzanas fuera del canvas

function deleteApples (arrApples) {
  for (let i = 0; i < arrApples.length; i++) {
    if (arrApples[i].y > myGameArea.canvas.height) {
      arrApples.splice(i, 1)
    }
  }
}


//Generador de imágenes de vidas
function drawLives(lives) {
  for (let i = 0; i < lives; i++ ) {
    const imgLivesObj = new Components (1150 - i * 50 , 0, myGameArea.imgLives, 50, 50);
    imgLivesObj.update()
  }
}

//Función conteo de manzanas atrapadas
function applesCatches (arrApples, imgObj) {
  for (let i = 0; i < arrApples.length; i++) {
    if (imgObj.crashWith(arrApples[i])) {
      arrApples.splice(i, 1)

      switch (arrApples) {
        case myApples:
          myGameArea.applesRedTotal += 1;
        break;

        case rottenApples:
          myGameArea.applesRottenTotal +=1;
          myGameArea.lives -= 1;
        break;

        case goldenApples:
          myGameArea.applesGoldTotal +=1;
          if (myGameArea.lives < 5) {
            myGameArea.lives += 1;
          }
        break;
      }
    }
  }
}

function gameOver () {
  if (myGameArea.lives == 0) {
    imgGameOver.update();
  }else if (myGameArea.lives < 0) {
    myGameArea.stop();
    imgGameOver.update();
  }
}

//Inicialización de clase Constructor con imágenes
const imgBasketObj = new Components (500, 490, myGameArea.imgBasket, 100, 100);
const imgOneAppleRed = new Components (0, 0, myGameArea.imgAppleRed, 80, 80);
const imgGameOver = new Components(0, 0, myGameArea.imgGO, 1200, 600)



//Movimiento de la canasta
document.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    //Mueve a izquierda
    case 37:
      if (imgBasketObj.x < 2) {
        imgBasketObj.speedX = 0;
        imgBasketObj.x = 0;
      }else {
        imgBasketObj.speedX -= 2;
      }

    break;
    case 39:
      if (imgBasketObj.x > myGameArea.canvas.width -102) {
        imgBasketObj.speedX = 0;
        imgBasketObj.x = myGameArea.canvas.width - 100;
      }else {
        imgBasketObj.speedX += 2;
      }
    break;
  }
});

//Paro en seco al desoprimir flechas
document.addEventListener('keyup', (e) => {
  imgBasketObj.speedX = 0;
})
