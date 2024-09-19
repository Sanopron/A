const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    color: 'blue',
    speed: 5
};

let bullets = [];
let aliens = [];
let alienSpeed = 2;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = 'yellow';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

function drawAliens() {
    ctx.fillStyle = 'red';
    aliens.forEach(alien => {
        ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
    });
}

function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.x += bullet.speed;
        if (bullet.x > canvas.width) {
            bullets.splice(index, 1);
        }
    });
}

function updateAliens() {
    aliens.forEach((alien, index) => {
        alien.x -= alienSpeed;
        if (alien.x < 0) {
            aliens.splice(index, 1);
        }
    });
}

function spawnAlien() {
    const alien = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 30),
        width: 30,
        height: 30
    };
    aliens.push(alien);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawAliens();
    updateBullets();
    updateAliens();

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && player.y > 0) {
        player.y -= player.speed;
    } else if (event.key === 'ArrowDown' && player.y < canvas.height - player.height) {
        player.y += player.speed;
    } else if (event.key === ' ') {
        bullets.push({ x: player.x + player.width, y: player.y + 10, width: 10, height: 5, speed: 10 });
    }
});

setInterval(spawnAlien, 1000);
gameLoop();
