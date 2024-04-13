let randomPoints = [] // Cria uma lista vazia
let currentPointX // Cria variável para armasenar a coordenada X onde ouve colisão com a mina
let currentPointY // Cria variável para armasenar a coordenada Y onde ouve colisão com a mina
let andarX = -64
let andarY = -64
let personagem
let grama
let numPoints = 5
let button1, button2, button3

const cols = 9  // Número de colunas da matriz
const rows = 9  // Número de linha da matriz
const cellSize = 64 // Tamanho da célula da matriz



// set up - executado 1x
function setup() {
  createCanvas(cols * cellSize, rows * cellSize)
    
  // cria elementos do jogo
  personagem = loadImage('person.png')
  grama = loadImage('grass.png')
  mina = loadImage('bomb.png')
  explosao = loadImage('explosion.jpg')
}




// Gera uma lista de coordenadas aleatórias x, y
function generateRandomPoints(numPoints) {
  randomPoints = []
  for (let i = 0; i < numPoints; i++) {
    let x = floor(random(cols)) * cellSize  // Coordenada X aleatória
    let y = floor(random(rows)) * cellSize  // Coordenada Y aleatória
    randomPoints.push(createVector(x, y))
    andarX = 0
    andarY = 0
    loop()
  }
}


function dificultMenu() {
  //Cria o menu dificuldade
  noStroke()
  fill(0, 100, 110)
  rect(576/2-60, 576/2-60, 180, 180, 30, 10)
  stroke(0,0,0)
  fill(255, 100, 110)
  rect(576/2-64, 576/2-64, 180, 180, 30, 10)
  
  fill(0, 0, 0)
  textSize(15)
  text('Dificuldade do jogo', 576/2-36, 250)
  
  // Cria botões de opção
  button1 = createButton('Mamão com açucar')
  button1.position(576/2-40, 576/2-10)
  button1.style('background-color', '#FF5733')
  button1.mousePressed(easyLevel)
  
  button2 = createButton('Osso Duro')
  button2.position(576/2-40, 576/2+30)
  button2.style('background-color', '#FF5733')
  button2.mousePressed(normalLevel)
  
  button3 = createButton('Souls like')
  button3.position(576/2-40, 576/2+70)
  button3.style('background-color', '#FF5733')
  button3.mousePressed(hardLevel)
}



// draw executado em loop
function draw() {
  // Cria o fundo gramado usando um figura
  for (let x = 0; x < 9; x++){
    for (let y = 0; y < 9; y++)
      image(grama, x*64, y*64, 64, 64)
  }
  
  //Carrega e posiciona personagem
  image(personagem, andarX, andarY, 64, 64)
  
  // Cria linhas de grades
  stroke('gray')
  for (let y=0; y < 9; y++){
    line(0, y*64, 576, y*64)
  }  
  for (let x=0; x < 9; x++){
    line(x*64, 0, x*64, 576)
  }
  
  // Exibe Menu de dificuldade
  if (andarX == -64 && andarY == -64){
    dificultMenu()
    
    noLoop()
  }
  
  // Cria regra de colisão personagem + minas ocultas no campo e mensagem de fim de jogo
  for (let i = 0; i < randomPoints.length; i++) {
    if (randomPoints[i].x + cellSize === andarX && randomPoints[i].y + cellSize === andarY) {
      currentPointX = randomPoints[i].x + cellSize
      currentPointY = randomPoints[i].y + cellSize
      image(mina, randomPoints[i].x + cellSize + 10, randomPoints[i].y + cellSize, 64, 64)
      
      noStroke()
      fill(0, 100, 110)
      rect(160, 240, 256, 100, 5)
      stroke(0,0,0)
      fill(255, 100, 110)
      rect(164, 244, 256, 100, 5)
    
      noStroke()
      fill(0, 0, 0)
      textSize(40)
      text('Você perdeu!', 180, 300)
      textSize(20)
      text('Tecle Enter para recomeçar.', 180, 330)
      noLoop()
    }
  }

  // Cria regra para fim do jogo quando jogador chega a extremidade oposta do campo mas mensagem da vitória
  if (andarX >= 512 && andarY >= 512) {
    noStroke()
    fill(0, 100, 110)
    rect(160, 240, 256, 100, 5)
    stroke(0,0,0)
    fill(255, 100, 110)
    rect(164, 244, 256, 100, 5)
    
    noStroke()
    fill(0, 0, 0)
    textSize(40)
    text('Ganhou!!!', 210, 300)
    textSize(20)
    text('Tecle Enter para recomeçar.', 180, 330)
    noLoop()
  }
}
 



// Funções para determinar a dificuldade do jogo
function easyLevel() {
  generateRandomPoints(5)
  removeButtons()
}

function normalLevel() {
  generateRandomPoints(8)
  removeButtons()
}

function hardLevel() {
  generateRandomPoints(11)
  removeButtons()
}

// Remover os botões do campo
function removeButtons() {
  button1.remove()
  button2.remove()
  button3.remove()
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
  
  // Quando jogador perde o jogo reposiciona personagem na posição inicial fora do campo
  if (keyIsDown(ENTER)) {
    andarX = -64
    andarY = -64
    generateRandomPoints(numPoints) // Chama a função para gerar novas coordenadas aleatórias
    // Modo para resetar os antigor ponto de colisão para sair do campo
    currentPointX = -1
    currentPointY = -1
   
    loop()
  }
  
  // Jogador ganhou o jogo 
  if (keyIsDown(ENTER) && andarX == 512 && andarY == 512){
    andarX = -64
    andarY = -64    
    loop()
  }
}
