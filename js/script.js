var can_snake = document.getElementById("can_snake");
var context = can_snake.getContext("2d");
var box = 32;
var snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
};

let direcao = "right";

function criarBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarSnake() {
  for (let index = 0; index < snake.length; index++) {
    context.fillStyle = "green";
    context.fillRect(snake[index].x, snake[index].y, box, box);
  }
}

function iniciarJogo(params) {
  criarBG();
  criarSnake();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direcao == "right") snakeX += box;
  if (direcao == "left") snakeX -= box;
  if (direcao == "up") snakeY -= box;
  if (direcao == "down") snakeY += box;

  snake.pop();

  let newHead = {
      x: snakeX,
      y: snakeY
  }
  
  snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);