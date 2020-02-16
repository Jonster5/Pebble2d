let canvas = new Pebble.Canvas(document.body, 600, 600, "none", "url('images/SpaceBg.jpg')");
let stage = new Pebble.Stage(canvas.width * 2, canvas.height);
let assets = new Pebble.AssetLoader();
let data = new Pebble.DataLoader();

let animator;
let pause = false;

assets.load([
    "fonts/Lobster-Regular.ttf",
    "images/ship.png",
    "images/shipfire.png",
    "images/shipfire-1.png",
]).then(() => setup());

let ship, exhaust;
let trailR, trailL;
let pointer = Pebble.Pointer(canvas.domElement);

Pebble.interpolationData.FPS = 60;

function setup() {
    ship = Pebble.Sprite(assets["images/ship.png"]);
    ship.width = 32;
    ship.height = 24;
    ship.pivotX = 0.5;


    exhaust = Pebble.Sprite([
        assets["images/shipfire.png"],
        assets["images/shipfire-1.png"],
    ]);
    Pebble.addStatePlayer(exhaust);
    exhaust.fps = 12;
    exhaust.play();
    exhaust.width = 32;
    exhaust.height = 24;
    exhaust.rotation = Math.PI * 2 - Math.PI / 2;
    ship.putLeft(exhaust, 9, -4.5);
    exhaust.visible = false;
    ship.add(exhaust);

    trailR = Pebble.Sprite([
        assets["images/shipfire.png"]
    ]);
    trailR.width = 8;
    t
    trailR.height = 12;
    trailR.rotation = Math.PI;
    ship.putBottom(trailR, 10, -10);
    trailR.visible = false;
    ship.add(trailR);

    trailL = Pebble.Sprite([
        assets["images/shipfire-1.png"]
    ]);
    trailL.width = 8;
    trailL.height = 12;
    ship.putTop(trailL, 10, 10);
    trailL.visible = false;
    ship.add(trailL);

    stage.putCenter(ship);

    ship.vx = 0;
    ship.vy = 0;
    ship.accelerationX = 0.2;
    ship.accelerationY = 0.2;
    ship.frictionX = 0.999;
    ship.frictionY = 0.999;
    ship.mass = 5;

    ship.rotationSpeed = 0;
    ship.moveForward = false;

    let leftArrow = Pebble.Keyboard(37),
        rightArrow = Pebble.Keyboard(39),
        upArrow = Pebble.Keyboard(38),
        downArrow = Pebble.Keyboard(40);

    leftArrow.press = () => {
        ship.rotationSpeed = -0.1;
        trailR.visible = true;
    }
    leftArrow.release = () => {
        if (!rightArrow.isDown) ship.rotationSpeed = 0;
        trailR.visible = false;
    }

    rightArrow.press = () => {
        ship.rotationSpeed = 0.1;
        trailL.visible = true;
    }
    rightArrow.release = () => {
        if (!leftArrow.isDown) ship.rotationSpeed = 0;
        trailL.visible = false;
    }

    upArrow.press = () => {
        ship.moveForward = true;
        exhaust.visible = true;
    }
    upArrow.release = () => {
        ship.moveForward = false;
        exhaust.visible = false;
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



}

function Animate(timestamp) {
    animator = requestAnimationFrame(Animate);
    if (!pause) Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update));
}