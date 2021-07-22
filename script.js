let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
let direction = "right";
let food = {
    x:Math.floor(Math.random()*23+1)*box,
    y:Math.floor(Math.random()*23+1)*box,
};
let jogo;
let pontos = 0;
let count = 0;
let velocidade = 300;
let lvl = 1;
let pointsPerLevel = 100;
let pointsPerComida = 10;

let buttonPlayGame = document.getElementById("playGame");

const atualizaTelaPontos = () => {
    document.getElementById("placarNumber").innerHTML= pontos;
}

const atualizaLevel = () => {
    if(count === pointsPerLevel){
        count = 0;
        lvl +=1;
        velocidade -=30;
        document.getElementById("levelNumber").innerHTML = lvl;
        setInterval(iniciarJogo, velocidade)
    }
}


const buttonHide = () => {
    buttonPlayGame.classList.add("d-none");
    jogo = setInterval(iniciarJogo, velocidade);
    pontos = 0;
    atualizaTelaPontos();
}


buttonPlayGame.addEventListener('click', buttonHide);

snake[0] = {
    x:8*box,
    y:8*box
}

const criarBG = () => {
    context.fillStyle = "lightgreen";
    context.fillRect(0,0,24*box, 24*box);
}

const criaCobrinha = () =>{
    for (i=0; i< snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

const drawFood = () => {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}



const update = (event) => {
    if(event.keyCode === 37 && direction !== "right") direction = "left";
    if(event.keyCode === 38 && direction !== "down") direction = "up";
    if(event.keyCode === 39 && direction !== "left") direction = "right";
    if(event.keyCode === 40 && direction !== "up") direction = "down";
}


const iniciarJogo = () => {


    if (snake[0].x > 23*box && direction === "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction === "left") snake[0].x = 24 * box;
    if (snake[0].y > 23*box && direction === "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction === "up") snake[0].y = 24*box;

    for (i=1; i< snake.length; i++){
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y){
            clearInterval(jogo);
            buttonPlayGame.classList.remove("d-none");
            alert('Game over :(');
        }
    }

    criarBG();
    criaCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY =  snake[0].y;

    if (direction==="right") snakeX += box;
    if (direction==="left") snakeX -= box;
    if (direction==="up") snakeY -= box;
    if (direction==="down") snakeY += box;

    if(snakeX !== food.x || snakeY !== food.y){
        snake.pop();
    }else{
        pontos+=pointsPerComida;
        count+=pointsPerComida;
        atualizaTelaPontos();
        food.x = Math.floor(Math.random()*23+1)*box;
        food.y = Math.floor(Math.random()*23+1)*box;
    }

    atualizaLevel();

    let newHead = {
            x: snakeX,
            y: snakeY,
    }

    snake.unshift(newHead);

}




document.addEventListener('keydown', update);