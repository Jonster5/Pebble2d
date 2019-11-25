let canvas = new Pebble.Canvas(document.body, 400, 400, "1px solid black");
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();
let data = new Pebble.DataLoader();

let animator;
let pause = false;

assets.load(["fonts/Lobster-Regular.ttf"]).then(() => setup());

let tank, ball;
let bullets = [];
let pointer = Pebble.Pointer(canvas.domElement);

Pebble.interpolationData.FPS = 60;

function setup() {
    let box = Pebble.Rectangle(32, 32, "gold", "goldenrod", 2);
    let turret = Pebble.Line("goldenrod", 4, 0, 0, 32, 0);
    turret.x = 16;
    turret.y = 16;
    tank = Pebble.Group();
    tank.add(box, turret);
    stage.putCenter(tank);

    tank.vx = 0;
    tank.vy = 0;
    tank.accelerationX = 0.2;
    tank.accelerationY = 0.2;
    tank.frictionX = 0.96;
    tank.frictionY = 0.96;

    tank.rotationSpeed = 0;
    tank.moveForward = false;

    let leftArrow = Pebble.Keyboard(37),
        rightArrow = Pebble.Keyboard(39),
        upArrow = Pebble.Keyboard(38);

    leftArrow.press = () => tank.rotationSpeed = -0.1;
    leftArrow.release = () => {
        if (!rightArrow.isDown) tank.rotationSpeed = 0;
    }

    rightArrow.press = () => tank.rotationSpeed = 0.1;
    rightArrow.release = () => {
        if (!leftArrow.isDown) tank.rotationSpeed = 0;
    }

    upArrow.press = () => tank.moveForward = true;
    upArrow.release = () => tank.moveForward = false;




    Animate();
}

function update() {
    tank.rotation += tank.rotationSpeed;

    if (tank.moveForward) {
        tank.vx += tank.accelerationX * Math.cos(tank.rotation);
        tank.vy += tank.accelerationY * Math.sin(tank.rotation);
        if (Math.abs(tank.vx) > 5) tank.vx -= tank.accelerationX * Math.cos(tank.rotation);
        if (Math.abs(tank.vy) > 5) tank.vy -= tank.accelerationY * Math.sin(tank.rotation);
    } else {
        tank.vx *= tank.frictionX;
        tank.vy *= tank.frictionY;
    }

    tank.x += tank.vx;
    tank.y += tank.vy;

    Pebble.contain(tank, stage.localBounds, false);

    bullets.forEach(bullet => {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
    });

}

function Animate(timestamp) {
    animator = requestAnimationFrame(Animate);
    if (!pause) Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update));
}