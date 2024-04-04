let cols = 9  // Número de colunas da matriz
let rows = 9
let cellSize = 64
let randomPoints = []
let currentPointX
let currentPointY
let personagem
let grama
let andarX = 0
let andarY = 0



// set up - executado 1x
function setup() {
  createCanvas(cols * cellSize, rows * cellSize)
  generateRandomPoints(5)  // Gera uma lista de coordenadas x, y
  
  personagem = loadImage('person.png')
  grama = loadImage('grass.png')
  mina = loadImage('bomb.png')
  explosao = loadImage('explosion.jpg') 
}



function generateRandomPoints(numPoints) {
  randomPoints = []
  for (let i = 0; i < numPoints; i++) {
    let x = floor(random(cols)) * cellSize  // Coordenada X aleatória
    let y = floor(random(rows)) * cellSize  // Coordenada Y aleatória
    randomPoints.push(createVector(x, y))
  }
}



// draw executado em loop
function draw() {
  background(100, 150, 250);
  
  for (let x = 0; x < 9; x++){
    for (let y = 0; y < 9; y++)
      image(grama, x*64, y*64, 64, 64)
  }
  
  image(personagem, andarX, andarY, 64, 64)
  
  stroke('gray')
  
  for (let y=0; y < 9; y++){
    line(0, y*64, 576, y*64)
  }
  
  for (let x=0; x < 9; x++){
    line(x*64, 0, x*64, 576)
  }
  
  for (let i = 0; i < randomPoints.length; i++) {
    if (randomPoints[i].x + cellSize === andarX && randomPoints[i].y + cellSize === andarY) {
      currentPointX = randomPoints[i].x + cellSize
      currentPointY = randomPoints[i].y + cellSize
      image(mina, randomPoints[i].x + cellSize + 10, randomPoints[i].y + cellSize, 64, 64)
      // rect(160, 240, 256, 100)
      textSize(40)
      text('Você perdeu!', 180, 300)
      textSize(20)
      text('Tecle Enter para recomeçar.', 180, 330)
      noLoop()
    }
  }
 
  if (andarX >= 512 && andarY >= 512) {
    rect(160, 240, 256, 100)
    textSize(40)
    text('Ganhou!!!', 210, 300)
    textSize(20)
    text('Tecle Enter para recomeçar.', 180, 330)
    noLoop()
  }
}
 



// keyPressed chama um evento do teclado
function keyPressed(numPoints) {
  if (keyIsDown(RIGHT_ARROW) && andarX < 512){
    andarX += 64
  } 
  if (keyIsDown(LEFT_ARROW) && andarX > 0){
    andarX -= 64    
  } 
  if (keyIsDown(DOWN_ARROW) && andarY < 512){
    andarY += 64
  }
  if (keyIsDown(UP_ARROW) && andarY > 0){
    andarY -= 64
  }
  
  if (keyIsDown(ENTER) || currentPointX === andarX && currentPointY === andarY) {
    andarX = 0
    andarY = 0
    generateRandomPoints(4)
    currentPointX = -1
    currentPointY = -1
   
    loop()
  }
  
  if (keyIsDown(ENTER) && andarX == 512 && andarY == 512){
    andarX = 0
    andarY = 0    
    loop()
  }
}
