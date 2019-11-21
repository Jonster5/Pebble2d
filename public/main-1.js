let canvas = new Pebble.Canvas(document.body, 600, 600);
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();

let colors = [
    "#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"
];

let space = Pebble.Keyboard(32);
space.press = () => {
    stage.remove(balls[0]);
    balls.shift();
};

let pointer = Pebble.Pointer();
pointer.press = () => createBall(pointer.x, pointer.y);

let fps = Pebble.Text("FPS: ", "12px sans-serif", "black", 16, 16);
stage.add(fps);

let balls = [];

for (let i = 0; i < 50; i++) {
    //Create a ball

    createBall();
}

function createBall(
    x = Pebble.randomInt(0, canvas.width - 32),
    y = Pebble.randomInt(0, canvas.height - 32)
) {

    let ball = Pebble.Circle(32, colors[Pebble.randomInt(0, 4)]);
    // let ball = Pebble.Rectangle(32, 32, colors[Pebble.randomInt(0, 4)]);

    //Set the ball to a random color
    //Set a random position and veloctiy

    ball.x = x;
    ball.y = y;
    // ball.x = Pebble.randomInt(0, canvas.width - ball.width);
    // ball.y = Pebble.randomInt(0, canvas.height - ball.width);

    ball.vx = Pebble.randomInt(-10, 10);
    ball.vy = Pebble.randomInt(-10, 10);
    //Physics properties
    ball.gravity = 0.3;
    ball.frictionX = 1;
    ball.frictionY = 0;
    ball.mass = 1.1;
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

    balls.forEach(ball => {
        let index = balls.indexOf(ball);
        let ba = [];
        if (index == 0) ba = balls.slice(1, ball.length);
        if (index == balls.length) ba = balls.slice(0, balls.length - 1);
        else {
            let foo = balls.slice(0, index);
            let foo2 = balls.slice(index + 1, balls.length);
            ba = foo.concat(foo2);
        }
        Pebble.hit(ball, ba, true, false, true);
    });
    fps.content = "FPS: " + Pebble.frameData.FPS;
}

Pebble.interpolationData.fps = 30;

function Animate(timestamp) {
    requestAnimationFrame(Animate);

    Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update));
    // update();
    // Pebble.render(canvas, stage, false);
}

Animate();