var canvasWidth = 640;
var canvasHeight = 480;

var player = 0;
var playerX = 300;
var playerY = 100;
var sprWidth = 64;
var sprHeight = 64;
var speed = 4;


var monsterX = 300;
var monsterY = 300;

var ghost = 0;
var ghostX = 300;
var ghostY = 200;

var enemy = 0;

var projectile = 0;

var direction = 90
function preload() {
    
    playerImg = loadImage("images/player.png");
    bckImg = loadImage("images/First Level.png");
    monsterImg = loadImage("images/monster.png");
    ghostImg = loadImage("images/ghost.png");
    projectileImg = loadImage("images/projectile.png");
    
}   

function setup() {
    
    createCanvas(canvasWidth, canvasHeight);
    player = createSprite(playerX, playerY, sprWidth, sprHeight);
    player.addImage(playerImg, "images/player.png");
    monster = createSprite(monsterX, monsterY, sprWidth, sprHeight);
    monster.addImage(monsterImg, "bad guy.png");
    ghost = createSprite(ghostX, ghostY, sprWidth, sprHeight);
    ghost.addImage(ghostImg, "images/ghost.png");
    
    projectile = new Group();
    
    enemy = new Group();
    enemy.add(monster);
    enemy.add(ghost);
    
    player.setCollider("rectangle", 0, 0, 40, 40);
    monster.setCollider("rectangle", 0, 0, 40, 40);
    ghost.setCollider("rectangle", 0, 0, 40, 40);
}


function playerControls() {
    if (keyIsDown(RIGHT_ARROW)) {
        player.position.x += speed;
        if (player.position.x + sprWidth/2 > canvasWidth) {
            player.position.x = canvasWidth/2;
        }
    } else if (keyIsDown(LEFT_ARROW))  {
        player.position.x -= speed;
        if (player.position.x < 0 + sprWidth/2) {
            player.position.x = 0 + sprWidth/2;
        }
    } else if (keyIsDown(DOWN_ARROW)) {
        player.position.y += speed;
        if (player.position.y + sprHeight/2 > canvasHeight) {
            player.position.y = canvasHeight - sprHeight/2;
        }
    } else if (keyIsDown(UP_ARROW))  {
        player.position.y -= speed;
        if (player.position.y < 0 + sprHeight/2) {
            player.position.y = 0 + sprHeight/2;
        }
    }   
}

function enemyMovements() {
    direction += 2;
    monster.setSpeed(3, direction);
}

function collision() {
    enemy.overlap(projectile, destroyOther);
    player.collide(enemy, gameOver);
}

function destroyOther (destroyed) {
    destroyed.remove();
    projectile.remove();
}

function gameOver() {
    alert("GAME OVER");
    window.location.reload();
    clearInterval(interval);
}
function mousePressed()    
{
    projectile = createSprite(player.postion.x, player.postion.y);
    projectile.addImage(projectileImg, "images/projectile.png");
    projectile.attractionPoint(speed + 10, mouseX, mouseY);
    projectile.setCollider("rectangle", 0, 0, 40, 40);
}

function draw() {
    background("beige");
    playerControls();
    drawSprites();
    collision();
    enemyMovements();
    ghost.attractionPoint(0.2, player.position.x, player.position.y);
    ghost.maxSpeed = 2;
    
}

setInterval(draw,10);