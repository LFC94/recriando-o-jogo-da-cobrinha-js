var can_snake = document.getElementById("can_snake");
var smal_pontuacao = document.getElementById("pontuacao");
var divIniciarGame = document.getElementById("inicio_game");
var tituloInicio = document.getElementById("tituloInicio");
var btnReset = document.getElementById("btnReset");
var context = can_snake.getContext("2d");
var box = 32;
var mutiplicadorTela = 16;

var timeJogo, valPoint, snake, point;

var jogoRodando = false;

let direcao = "r";

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, mutiplicadorTela * box, mutiplicadorTela * box);
}

function criarSnake() {
    for (let index = 0 ; index < snake.length; index++) {
        scala = 1 - (index * (parseInt(snake.length/5) * 0.01));
        console.log(index, (parseInt(snake.length/5) * 0.01), (index * (parseInt(snake.length/5) * 0.01)));
        // context.fillStyle = index==0 ? "red" : "green";
        context.fillStyle = 'rgba(0, 128, 0, ' + scala+ ')';        
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

function criarObjetos() {
    criarBG();
    criarSnake();
    criarPoint();
}

function gamerOver() {
    tituloInicio.innerHTML = "GAMER OVER";
    document.getElementById("pontuacao_over").innerHTML = "Pontuação:" + parseInt(valPoint);
    criarBG();
    divIniciarGame.removeAttribute("style")
    smal_pontuacao.innerHTML = "";    
    jogoRodando = false;
    btnReset.style.display = 'none';
}

function iniciarJogo() {

    if (!jogoRodando) {
        return
    }

    if (snake[0].x > ((mutiplicadorTela - 1) * box) && direcao != "l") {
        snake[0].x = 0;
    } else if (snake[0].x < 0 && direcao != "r") {
        snake[0].x = mutiplicadorTela * box;
    } else if (snake[0].y > ((mutiplicadorTela - 1) * box) && direcao != "u") {
        snake[0].y = 0;
    } else if (snake[0].y < 0 && direcao != "d") {
        snake[0].y = mutiplicadorTela * box;
    }

    for (let index = 1; index < snake.length; index++) {
        if (snake[0].x == snake[index].x && snake[0].y == snake[index].y) {
            gamerOver()
            return;
        }   
    }

    criarObjetos();

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

    smal_pontuacao.innerHTML = "Pontuação:" + parseInt(valPoint);

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

function start() {
    divIniciarGame.style.display = 'none';
    jogoRodando = true;

    snake = [{
        x: 8 * box,
        y: 8 * box,
    }];

    point = {
        x: 0,
        y: 0
    };
    valPoint = 0;
    btnReset.removeAttribute("style");
    iniciarPonto();
    iniciarJogo();  
}

criarBG();


var params = window.location.search.substring(1).split('&');

//Criar objeto que vai conter os parametros
var paramArray = {};

//Passar por todos os parametros
for(var i=0; i<params.length; i++) {
    //Dividir os parametros chave e valor
    var param = params[i].split('=');

    if(param[0] == "telalimpa" && (+param[1]) == 1){
        document.getElementById("div_head").style.display='none';
        document.getElementById("div_food").style.display='none';
    }

}
