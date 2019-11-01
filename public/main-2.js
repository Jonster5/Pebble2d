let canvas = new Pebble.CanvasObject(document.body, 400, 400);
let stage = new Pebble.Stage(canvas.width, canvas.height);

let rect = Pebble.Rectangle();
stage.addChild(rect);

rect.vx = 5;
rect.vy = 0;

rect.frictionX = 1;
rect.frictionY = 1;
rect.mass = 1.5;
rect.gravity = 0.3;

function update() {
    rect.vx *= rect.frictionX;
    rect.vy *= rect.frictionY;

    rect.vy += rect.gravity;

    rect.x += rect.vx;
    rect.y += rect.vy;

    let collision = Pebble.contain(rect, stage.localBounds, true, (collision) => {
        if (collision === "bottom") {
            rect.frictionX = 0.96;
        } else {
            rect.frictionX = 1;
        }
    });
}

function Animate() {
    requestAnimationFrame(Animate);
    update();
    Pebble.render(canvas.domElement, stage, false);
}

Animate();