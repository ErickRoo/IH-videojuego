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
  applesTotal : 0,
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
  score: function () {
    this.context.font = '20px serif',
    this.context.fillStyle = 'black',
    this.context.fillText(`${this.applesTotal}`, 0, 0)
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

  //Métodos para colisión (atrapar manzanas)
  left() {
    return this.x
  }

  right() {
    return this.x + this.width
  }

  top() {
    return this.y
  }

  bottom() {
    return this.y + this.height 
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
  imgCanvasBack.update();//inserta imagen de inicio en el fondo
  drawLives(myGameArea.lives)//llama a función con # de vidas
  // imgApple.update();
  imgBasketObj.update();//inserta imagen a una frecuencia determinada
  imgBasketObj.newPos();//Actualiza la posición de la canasta
  ApplesRandom();//Función imprime manzanas aleatoramiente
  RottenRandom(); //Caen manzanas podridas del cielo
  GoldenRandom() //Caen manzanas doradas del cielo
  deleteApples(myApples);
  applesCatches(myApples, imgBasketObj);
  // console.log(myGameArea.applesTotal);
}

//Generación de manzanas

const myApples = [];
function ApplesRandom () {
  for (let i = 0; i < myApples.length; i++) {
    myApples[i].y += 1;
    myApples[i].update();
  }
  myGameArea.frameAppleRed += 1;
  if (myGameArea.frameAppleRed % 150 == 0) {
    let minWidth = 0;
    let maxWidth = 1150;
    let width =  Math.floor(Math.random() * (maxWidth - minWidth));

    myApples.push (new Components(width, -10, myGameArea.imgAppleRed, 50, 50))
  }
}
//Generación de manzanas podridas
const rottenApples = [];
function RottenRandom () {
  for (let i = 0; i < rottenApples.length; i++) {
    rottenApples[i].y += 1;
    rottenApples[i].update();
  }
  myGameArea.frameAppleRotten += 1;
  if (myGameArea.frameAppleRotten % 200 === 0) {
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
    if (arrApples[i].y + arrApples[i].height + 10 > myGameArea.canvas.height) {
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
 const appleInBasket = [];
function applesCatches (arrApples, imgObj) {
    let collisionCount = 0;
    for(let i=0; i< arrApples.length;) {
      applesCatches.removeChild(myApples[i]);
}
}
/*  const touch = arrApples.some((apples) => {
      return imgObj.crashWith(apples)
  })
  for (let i = 0; i < arrApples.length; i++) {
    if (touch) {
      appleInBasket.push(arrApples[i])
      arrApples.splice(i, 1)
      console.log(appleInBasket.length)
    }
  }
}
*/

//Inicialización de clase Constructor con imágenes
const imgCanvasBack = new Components (0, 0, myGameArea.imgCanvasBack, 1200, 600)
const imgBasketObj = new Components (500, 490, myGameArea.imgBasket, 100, 100);



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

