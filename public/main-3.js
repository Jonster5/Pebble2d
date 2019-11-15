let canvas = new Pebble.Canvas(document.body, 400, 400, "1px solid black");
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();

assets.load([
    "fonts/Lobster-Regular.ttf",
    "images/things.json"
]).then(() => setup());

let yes;

Pebble.interpolationData.FPS = 30;

function setup() {
    yes = Pebble.Sprite([
        assets["css3-logo-8724075274-seeklogo.com.png"],
        assets["dir_bg_1.png"],
        assets["slidemations_GC9_icon.ico"]
    ]);
    stage.putCenter(yes);
    stage.addChild(yes);

    Animate();
}

function Animate(timestamp) {
    animator = requestAnimationFrame(Animate);

    Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update));
}

function update() {

}