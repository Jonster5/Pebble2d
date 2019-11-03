let canvas = new Pebble.CanvasObject(document.body, 400, 400);
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();


let colors = [
    "#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"

];

let balls = [];

for (let i = 0; i < 10; i++) {
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

Pebble.interpolationData.fps = 30;

function Animate(timestamp) {
    requestAnimationFrame(Animate);

    Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update));
    console.log(space.isDown);
    // update();
    // Pebble.render(canvas.domElement, stage, false);

}

Animate();