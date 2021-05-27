var can_snake = document.getElementById("can_snake");
var smal_pontuacao = document.getElementById("pontuacao");
var context = can_snake.getContext("2d");
var box = 32;
var mutiplicadorTela = 16;

var valPoint = 0;

var snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box,
};

var point = {
    x: 0,
    y: 0
};

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

function criarPoint() {
    context.fillStyle = "red";
    context.fillRect(point.x, point.y, box - 1, box - 1)
}

function iniciarPonto() {
    point = {
        x: Math.floor(Math.random() * 15 + 1) * box,
        y: Math.floor(Math.random() * 15 + 1) * box
    }
}

function iniciarJogo() {

    if (snake[0].x > ((mutiplicadorTela - 1) * box) && direcao != "l") {
        snake[0].x = 0;
    } else if (snake[0].x < 0 && direcao != "r") {
        snake[0].x = mutiplicadorTela * box;
    } else if (snake[0].y > ((mutiplicadorTela - 1) * box) && direcao != "u") {
        snake[0].y = 0;
    } else if (snake[0].y < 0 && direcao != "d") {
        snake[0].y = mutiplicadorTela * box;
    }

    criarBG();
    criarSnake();
    criarPoint();

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

    if (snakeX == point.x && snakeY == point.y) {
        iniciarPonto();
        valPoint += 100 ;
    }else{
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    // a cada 10 atualizacao (iniciando a cada 1 seguendo) aumeta 10 pontos
    if(Math.floor((valPoint-parseInt(valPoint)) * 100) == 99){
        valPoint = parseInt(valPoint) + 10;
    }else{
        valPoint +=  0.01;
    } 

    smal_pontuacao.innerHTML = parseInt(valPoint);

    snake.unshift(newHead);

    //Quanto mais ponto mais rapido a cobriva vai
    setTimeout(iniciarJogo, 100 - ((valPoint/100) ) );
}

function movimentar(event) {
    if (event.keyCode == 37 && direcao != "r") direcao = "l";
    if (event.keyCode == 38 && direcao != "d") direcao = "u";
    if (event.keyCode == 39 && direcao != "l") direcao = "r";
    if (event.keyCode == 40 && direcao != "u") direcao = "d";
}

document.addEventListener("keydown", movimentar);

iniciarPonto();

iniciarJogo()
