const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = 20;
const snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 10 };
let dx = 0;
let dy = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    moveSnake();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }
}

function keyDownEvent(event) {
    const keyPressed = event.key;

    if (keyPressed === 'ArrowUp' && dy === 0) {
        dy = -1;
        dx = 0;
    }
    if (keyPressed === 'ArrowDown' && dy === 0) {
        dy = 1;
        dx = 0;
    }
    if (keyPressed === 'ArrowLeft' && dx === 0) {
        dy = 0;
        dx = -1;
    }
    if (keyPressed === 'ArrowRight' && dx === 0) {
        dy = 0;
        dx = 1;
    }
}

document.addEventListener('keydown', keyDownEvent);

setInterval(draw, 100);
