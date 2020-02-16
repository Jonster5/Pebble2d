let canvas = new Pebble.Canvas(document.body, 600, 600); //this creates the canvas where everything is drawn
let stage = new Pebble.Stage(canvas.width, canvas.height); //this creates the parent object that everything is based on. sorta like the origin in a graph
let assets = new Pebble.AssetLoader(); //this is a utility that i made which can load shit like images and sounds

let colors = [
    "#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"
]; //this is just a list of colors for the balls

let space = Pebble.Keyboard(32); //this binds the key with a code of 32 (spacebar) to the variable called "space"
space.press = () => {
    stage.remove(balls[0]);
    balls.shift();
}; //this says what to do once space is pressed

let pointer = Pebble.Pointer(); //this creates a new pointer, which is what your mouse controls
pointer.press = () => createBall(pointer.x, pointer.y); //this will say what to do when the pointer is pressed

let fps = Pebble.Text("FPS: ", "12px sans-serif", "black", 16, 16); //this is the FPS counter in the top right
stage.add(fps); //this adds to fps counter to the stage so it can be rendered

let balls = []; //this will be the list where all the balls are stored

for (let i = 0; i < 50; i++) {
    //Create a ball

    createBall();
} //this runs the function "createBall" 50 times

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
} // i dont want to explain this, but this function will create a single ball, add the ball to the list of balls, and add it to the stage

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
} //when called, this update function will run the physics for each ball, and update the fps counter

Pebble.interpolationData.fps = 30; //this sets the game to run at 30 fps. the game will be rendered a lot faster, but in short words, this means that you wont notice any lag unless the fps counter drops below 30

function Animate(timestamp) {
    requestAnimationFrame(Animate); //this will start running the Animate function at the screen refresh rate

    Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update)); //this is the crown jewl of the program
    // this function will render the stage onto the canvas, and then update the game logic (such as the physics and positioning of the balls)
    // at 30 fps while compensating for lag
    //so unless the fps of the rendering drops below 30, you wont notice a difference
}

Animate(); // this starts the Animate function