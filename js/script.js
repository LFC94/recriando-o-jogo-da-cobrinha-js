var can_snake = document.getElementById("can_snake");
var context = can_snake.getContext("2d");
var box = 32;
var mutiplicadorTela = 16;
var snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
};

var food = {
    x: Math.floor(Math.random()* 15 + 1) * box ,
    y: Math.floor(Math.random()* 15 + 1) * box
}

let direcao = "r";

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, mutiplicadorTela * box, mutiplicadorTela * box);
}

function criarSnake() {
    for (let index = 0; index < snake.length; index++) {
        context.fillStyle = "green";
        context.fillRect(snake[index].x, snake[index].y, box, box);
    }
}

function criarFood() {
    context.fillStyle = "red food";
    context.fillRect(food.x, food.y, box-1, box-1)
}

function iniciarJogo() {

    if (snake[0].x > ((mutiplicadorTela - 1) * box) && direcao == "r") {
        snake[0].x = 0;
    } else if (snake[0].x < 0 && direcao == "l") {
        snake[0].x = mutiplicadorTela * box;
    } else if (snake[0].y > ((mutiplicadorTela - 1) * box) && direcao == "d") {
        snake[0].y = 0;
    } else if (snake[0].y < 0 && direcao == "u") {
        snake[0].y = mutiplicadorTela * box;
    }

    criarBG();
    criarSnake();
    criarFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direcao == "r") {
        snakeX += box;
    } else if (direcao == "l") {
        snakeX -= box;

    } else if (direcao == "u") {
        snakeY -= box;
    } else if (direcao == "d") { 
        snakeY += box; 
    }

    snake.pop();

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    snake.unshift(newHead);
}

function movimentar(event) {
    if (event.keyCode == 37 && direcao != "r") direcao = "l";
    if (event.keyCode == 38 && direcao != "d") direcao = "u";
    if (event.keyCode == 39 && direcao != "l") direcao = "r";
    if (event.keyCode == 40 && direcao != "u") direcao = "d";
}

document.addEventListener("keydown", movimentar);

let jogo = setInterval(iniciarJogo, 100);
