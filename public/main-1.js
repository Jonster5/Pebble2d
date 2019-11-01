let canvas = new Pebble.CanvasObject(document.body, 400, 400);
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();

let colors = [
    "#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"

];

let balls = [];

for (let i = 0; i < 5; i++) {
    //Create a ball
    let ball = Pebble.Circle(32, colors[Pebble.randomInt(0, 4)]);
    //Set the ball to a random color
    //Set a random position and veloctiy
    ball.x = Pebble.randomInt(0, canvas.width - ball.diameter);
    ball.y = Pebble.randomInt(0, canvas.height - ball.diameter);
    ball.vx = Pebble.randomInt(-10, 10);
    ball.vy = Pebble.randomInt(-10, 10);
    //Physics properties
    ball.gravity = 0.3;
    ball.frictionX = 1;
    ball.frictionY = 0;
    ball.mass = 1.3;
    //Acceleration and friction properties
    ball.accelerationX = Pebble.randomFloat(-0.2, 0.2);
    ball.accelerationY = Pebble.randomFloat(-0.2, 0.2);
    ball.frictionX = 1;
    ball.frictionY = 1;
    //Push the ball into the `balls` array
    stage.addChild(ball);
    balls.push(ball);
}

function update() {
    balls.forEach(ball => {
        ball.vy += ball.gravity;
        ball.vx *= ball.frictionX;
        ball.x += ball.vx;
        ball.y += ball.vy;
        let collision = Pebble.contain(ball, stage.localBounds, true);
        if (collision === "bottom") {
            ball.frictionX = 0.96;
        } else {
            ball.frictionX = 1;
        }
    });
}

Pebble.fps = 60;
let previous = 0,
    frameDuration = 1000 / Pebble.fps,
    lag = 0;

function Animate(timestamp) {
    requestAnimationFrame(Animate);

    if (!timestamp) timestamp = 0;
    let elapsed = timestamp - previous;

    if (elapsed > 1000) elapsed = Pebble.frameDuration;

    lag += elapsed;

    while (lag >= frameDuration) {
        Pebble.capturePreviousPositions(stage);
        update();
        lag -= frameDuration;
    }

    let lagOffset = lag / frameDuration;

    Pebble.render(canvas.domElement, stage, true, lagOffset);

    previous = timestamp;
}

Animate();