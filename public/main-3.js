let canvas = new Pebble.Canvas(document.body, 400, 400, "1px solid black");
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();

assets.load([
    "fonts/Lobster-Regular.ttf",
    "images/animals.json"
]).then(() => setup());

let player;
let animator;

let right = Pebble.Keyboard(37);
let left = Pebble.Keyboard(39);
let space = Pebble.Keyboard(32);

Pebble.interpolationData.FPS = 30;

function setup() {
    player = Pebble.Sprite(assets["cat.png"]);
    player.width = 20;
    player.height = 20;
    player.vx = 0;
    player.vy = 0;
    player.accelerationX = 0;
    player.accelerationY = 0;
    player.frictionX = 1;
    player.frictionY = 1;
    player.gravity = 0.3;
    player.mass = 1;
    player.isOnGround = false;
    player.jumpForce = -6.8;
    stage.putCenter(player);
    stage.add(player);

    left.press = () => {
        if (right.isUp) player.accelerationX = 1;
    };
    left.release = () => {
        if (right.isUp) player.accelerationX = 0;
    };
    right.press = () => {
        if (left.isUp) player.accelerationX = -1;
    };
    right.release = () => {
        if (left.isUp) player.accelerationX = 0;
    };
    space.press = () => {
        if (player.isOnGround) {
            player.accelerationY += player.jumpForce;
            player.isOnGround = false;
            player.frictionX = 1;
        }
    };

    Animate();
}

function Animate(timestamp) {
    animator = requestAnimationFrame(Animate);

    Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update));
}

function update() {
    player.vx += player.accelerationX;
    player.vy += player.accelerationY;
    player.accelerationY += player.gravity;
    player.vx *= player.frictionX;
    player.vy *= player.frictionY;

    player.x += player.vx;
    player.y += player.vy;
    Pebble.contain(player, stage.localBounds, false, c => {
        if (c === "bottom" || c === "top") {
            player.frictionX = 0.96;
            if (c === "bottom") player.isOnGround = true;
        } else {
            player.frictionX = 1;
        }
        if (c === "right" || c === "left") {
            player.frictionY = 0.96;
        } else {
            player.frictionY = 1;
        }
    });

}