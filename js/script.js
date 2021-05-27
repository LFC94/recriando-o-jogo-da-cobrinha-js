var can_snake = document.getElementById('can_snake');
var context = can_snake.getContext("2d");
var box = 32;
var snake = [];

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

criarBG();