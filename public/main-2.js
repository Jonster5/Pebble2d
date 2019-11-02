let canvas = new Pebble.CanvasObject(document.body, 400, 400);
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();

let colors = [
    "#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"

];

let balls = [];

for (let i = 0; i < 1; i++) {
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

const times = [];
let FPS;

function refreshLoop() {
    window.requestAnimationFrame(() => {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        FPS = times.length;
        console.log(FPS);
        refreshLoop();
    });
}

// refreshLoop();


function capturePreviousPositions(stage) {
    //Loop through all the children of the stage
    stage.children.forEach(sprite => {
        setPreviousPosition(sprite);
    });

    function setPreviousPosition(sprite) {
        //Set the sprite’s `previousX` and `previousY`
        sprite.previousX = sprite.x;
        sprite.previousY = sprite.y;
        //Loop through all the sprite's children
        if (sprite.children && sprite.children.length > 0) {
            sprite.children.forEach(child => {
                //Recursively call `setPosition` on each sprite
                setPreviousPosition(child);
            });
        }
    }
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


let fps = 24,
    previous = 0,
    frameDuration = 1000 / fps,
    lag = 0;

function Animate(timestamp) {
    requestAnimationFrame(Animate);

    if (!timestamp) timestamp = 0;
    let elapsed = timestamp - previous;

    if (elapsed > 1000) elapsed = frameDuration;

    lag += elapsed;

    while (lag >= frameDuration) {
        capturePreviousPositions(stage);
        update();
        lag -= frameDuration;
    }

    let lagOffset = lag / frameDuration;

    Pebble.render(canvas.domElement, stage, true, lagOffset);

    previous = timestamp;
}

Animate();