let canvas = Pebble.createCanvas(document.body, 256, 256);
let stage = Pebble.createStage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();

let ball = Pebble.Circle(32, "gray", "black", 2, 96, 128);
stage.addChild(ball);

ball.vx = 3;
ball.vy = 2;

function Animate() {
    requestAnimationFrame(Animate);

    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.x < 0 || ball.x + ball.diameter > canvas.width) {
        ball.vx = -ball.vx;
    }

    if (ball.y < 0 || ball.y + ball.diameter > canvas.height) {
        ball.vy = -ball.vy;
    }
    console.log(ball.x);
    Pebble.render(canvas);
}

Animate();