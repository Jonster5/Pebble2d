let canvas = new Pebble.CanvasObject(document.body, 400, 400);
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();

assets.load(["fonts/Lobster-Regular.ttf"]).then(() => setup());

let pointer;
let message1;
let message2;

function setup() {
    message1 = Pebble.Text("", "30px Lobster-Regular", "black", 16, 16);
    message2 = Pebble.Text("", "30px Lobster-Regular", "black", 16, 48);

    stage.add(message1, message2);

    pointer = Pebble.Pointer(canvas.domElement, 0.4);

    pointer.press = () => console.log("pointer was pressed");
    pointer.release = () => console.log("pointer was released");
    pointer.tap = () => console.log("pointer was tapped");

    Animate();
}

function Animate() {
    requestAnimationFrame(Animate);

    message1.content = `X: ${pointer.x}`;
    message2.content = `Y: ${pointer.y}`;

    Pebble.render(canvas.domElement, stage);
}