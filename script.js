```javascript
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


let player = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    color: 'blue',
    speed: 5,
    health: 100,
    weapon: 'pistol',
    ammo: {
        pistol: 10,
        shotgun: 5,
        flamethrower: 100
    },
    reloading: false
};


let bullets = [];
let aliens = [];
let alienHealth = 100;


function drawBean(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + width / 2, y);
    ctx.bezierCurveTo(x + width, y, x + width, y + height, x + width / 2, y + height);
    ctx.bezierCurveTo(x, y + height, x, y, x + width / 2, y);
    ctx.fill();
}


function drawPlayer() {
    drawBean(player.x, player.y, player.width, player.height, player.color);
}


function drawBullets() {
    ctx.fillStyle = 'yellow';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}


function drawAliens() {
    aliens.forEach(alien => {
        drawBean(alien.x, alien.y, alien.width, alien.height, alien.color);
    });
}


function drawHealth() {
    ctx.fillStyle = 'white';
    ctx.fillText(Health: ${player.health}, 10, 20);
}


function updateBullets() {
    bullets.forEach((bullet, bulletIndex) => {
        bullet.x += bullet.speed;
        if (bullet.x > canvas.width) {
            bullets.splice(bulletIndex, 1);
        }
    });
}


function updateAliens() {
    aliens.forEach((alien, alienIndex) => {
        alien.x -= alien.speed;
        if (alien.x < 0) {
            player.health -= 5; // Lose health when alien reaches the left side
            aliens.splice(alienIndex, 1);
        }
    });
}


function spawnAlien() {
    const type = Math.floor(Math.random() * 3); // 0, 1, or 2
    let alien = {
        x: canvas.width,
        y: Math.random() * (canvas.height - 30),
        width: 30,
        height: 30,
        health: alienHealth,
        color: type === 0 ? 'green' : type === 1 ? 'orange' : 'purple', // Different colors for different aliens
        speed: type === 0 ? 1 : type === 1 ? 3 : 2 // Slow, fast, or normal
    };
    aliens.push(alien);
}


function shoot() {
    if (player.ammo[player.weapon] > 0) {
        let bullet = {
            x: player.x + player.width,
            y: player.y + 10,
            width: 10,
            height: 5,
            speed: player.weapon === 'shotgun' ? 5 : 10 // Shotgun bullets are slower
        };
        bullets.push(bullet);
        playerundefined
