let canvas = new Pebble.Canvas(document.body, window.innerWidth, window.innerHeight, "none", "url('images/SpaceBg.jpg')");
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();
let data = new Pebble.Storage();

let animator;
let pause = false;

assets.load([
    "fonts/Lobster-Regular.ttf",
    "images/ship.png",
    "images/shipfire.png",
    "images/shipfire-1.png",
    "ship.js",
], true).then(() => setup());

let pointer = Pebble.Pointer(canvas.domElement);

Pebble.interpolationData.FPS = 60;

let leftArrow = Pebble.Keyboard(37),
    rightArrow = Pebble.Keyboard(39),
    upArrow = Pebble.Keyboard(38),
    downArrow = Pebble.Keyboard(40),
    spaceKey = Pebble.Keyboard(32);

function setup() {
    assets["ship.js"].execute();

    leftArrow.press = () => {
        ship.rotationSpeed = -0.1;
        ship.trailR.visible = true;
    }
    leftArrow.release = () => {
        if (!rightArrow.isDown) ship.rotationSpeed = 0;
        ship.trailR.visible = false;
    }

    rightArrow.press = () => {
        ship.rotationSpeed = 0.1;
        ship.trailL.visible = true;
    }
    rightArrow.release = () => {
        if (!leftArrow.isDown) ship.rotationSpeed = 0;
        ship.trailL.visible = false;
    }

    upArrow.press = () => {
        ship.moveForward = true;
        ship.exhaust.visible = true;
    }
    upArrow.release = () => {
        ship.moveForward = false;
        ship.exhaust.visible = false;
    }

    spaceKey.press = () => {

        Pebble.shoot(ship, ship.rotation, 0, (ship.vx + ship.vy) + 5, ship.missiles, () => Pebble.Circle(4, "red", "none"));
    }

    Animate();
}

function update() {
    ship.rotation += ship.rotationSpeed;

    if (ship.moveForward) {
        ship.vx += ship.accelerationX * Math.cos(ship.rotation);
        ship.vy += ship.accelerationY * Math.sin(ship.rotation);
    } else {
        ship.vx *= ship.frictionX;
        ship.vy *= ship.frictionY;
    }

    ship.x += ship.vx;
    ship.y += ship.vy;

    Pebble.contain(ship, stage.localBounds, true);

    ship.missiles.forEach(bullet => {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
    });
}

function Animate(timestamp) {
    animator = requestAnimationFrame(Animate);
    if (!pause) Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update));
}