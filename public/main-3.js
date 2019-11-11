let canvas = new Pebble.Canvas(document.body, 400, 400, "1px solid black");
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();

assets.load(["fonts/Lobster-Regular.ttf"]).then(() => setup());

let platforms = [];
let player;


Pebble.interpolationData.FPS = 30;

function setup() {


    Animate();
}

function Animate(timestamp) {
    animator = requestAnimationFrame(Animate);

    Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update));
}

function update() {

}