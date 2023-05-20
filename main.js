
const { Engine, World, Bodies, Mouse, MouseConstraint, Constraint } = Matter;
let ground;
const boxes = [];
let player;
let world,engine;
let mConstraint;
let catapult;
let enemy;

let rockImg;
let blockImg;
let bkgImg;
let grassImg;
let kills = 0;
var counter = 60;
let counteron = true;

function preload() {
    rockImg = loadImage("assets/rock.png");
    blockImg = loadImage("assets/block.png");
    bkgImg = loadImage("assets/background.jpg");
    grassImg = loadImage("assets/grass.jpg");
    enemyImg = loadImage("assets/alive.png");
    deadImg = loadImage("assets/dead.png")
}
function setup() {
    const canvas = createCanvas(711, 400);
    //background(198, 232, 231);
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(width /2 , height - 10, width*20, 20);
    for (let i = 0; i < 3; i ++ ) {
        boxes[i] = new Block(500, 360 - i * 50 , 50, 50);
    }
    player = new Player(150, 250, 15);
    enemy = new Enemy(500, 250, 15);
    catapult = new Catapult(150, 250, player.body)
    const mouse = Mouse.create(canvas.elt);
    const options = {
    mouse: mouse
    };
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
    mouse.pixelRatio = pixelDensity();
    mConstraint = MouseConstraint.create(engine, options);
    World.add(world, mConstraint);
}
function keyPressed() {
    if (key == ' ') {
    World.remove(world, player.body);
    player = new Player(150, 250, 15);
    catapult.attach(player.body);
    }
}

function mouseReleased() {
    setTimeout(() => {
    catapult.fly();
    }, 80);
}


function draw() {
    background(bkgImg);
    Matter.Engine.update(engine);
    ground.show();
    for (let box of boxes) {
        box.show();
    }
    player.show();
    enemy.show();
    catapult.show();
    if (counteron) {
        counter -= 1/60;
    }
    textSize(10);
    text("Drag Rock to Throw.", 110, 200);
    text("Space Key for new Rock", 110, 220);
    textSize(20);
    text("Time Remaining:", 170, 18);
    text(round(counter), 330, 20);
    if(counter <= 0 && counteron ) {
        counter = 0;
        textSize(50);
        text("GAMEOVER", 210, 220)
    }
    checkdeath();
    checkwin();
}

function checkdeath() {
    if(enemy.body.position.y > 250) {
        enemy.dead = true;
        kills++;
    }
}

function checkwin() {
    if(kills >= 1) {
        textSize(50);
        text("You Win!", 210, 220)
        counteron = false;
        textSize(30);
        text("Score: ", 240, 250);
        textSize(30);
        text(round(counter), 330, 250);
    }
}


