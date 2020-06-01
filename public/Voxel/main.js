const canvas = new Pebble.Canvas(
    document.body,
    1280,
    616,
    "none",
    "black"
);
const stage = new Pebble.Stage(
    canvas.width,
    canvas.height
);
const assets = new Pebble.AssetLoader();
const storage = new Pebble.Storage();
const world = new Pebble.World(stage);
const pointer = new Pebble.Pointer();

canvas.scaleToWindow("grey", pointer);

window.addEventListener("resize", event => { canvas.scaleToWindow("grey", pointer); });

let text = Pebble.Text("fps: 0", "30px Arial", "white");
stage.putCenter(text);

Pebble.refreshLoop();

Pebble.interpolationData.fps = 30;

function Animate(timestamp) {
    requestAnimationFrame(Animate);

    Pebble.render(canvas, stage, true, Pebble.getLagOffset(timestamp, () => {
        // if (world.Scene) world.Scene.update();

        text.content = "fps: " + Pebble.frameData.FPS;
    }));
}
Animate();