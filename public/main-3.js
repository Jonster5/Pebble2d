let canvas = new Pebble.Canvas(document.body, 400, 400, "1px solid black");
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();

assets.load(["fonts/Lobster-Regular.ttf"]).then(() => setup());

let tc = 20,
	gs = 20;

let score = 0;

let left = Pebble.Keyboard(37);
let up = Pebble.Keyboard(38);
let right = Pebble.Keyboard(39);
let down = Pebble.Keyboard(40);


let scoreTxt,
	apple;

let tail = [];
let prev = [];
let tLength;
let head;

let txt

let animator;

Pebble.interpolationData.FPS = 10;

function setup() {
	head = Pebble.Rectangle(20, 20, "green", "none", "none", 10 * gs, 10 * gs);

	tail.push(Pebble.Rectangle(20, 20, "green", "none", "none", 10 * gs, 11 * gs));
	tail.push(Pebble.Rectangle(20, 20, "green", "none", "none", 10 * gs, 12 * gs));
	stage.addChild(head);
	stage.addArray(tail);

	txt = Pebble.Text("hello", "20px sans-serif", "black", 20, 20);
	stage.add(txt);

	for (let i = 0; i < tc; i++) {
		if (i > 0) stage.add(Pebble.Rectangle(1, 400, "black", "none", "none", i * gs, 0));
	}
	for (let i = 0; i < tc; i++) {
		if (i > 0) stage.add(Pebble.Rectangle(400, 1, "black", "none", "none", 0, i * gs));
	}

	right.press = () => {
		head.vx = gs;
		head.vy = 0;
	}
	up.press = () => {
		head.vx = 0;
		head.vy = -gs;
	}
	left.press = () => {
		head.vx = -gs;
		head.vy = 0;
	}
	down.press = () => {
		head.vx = 0;
		head.vy = gs;
	}

	Animate();
}

function Animate(timestamp) {
	animator = requestAnimationFrame(Animate);

	Pebble.contain(head, stage.globalBounds, false, (collision) => {
		if (collision === "right" || collision === "left") head.vx = 0;
		if (collision === "up" || collision === "down") head.vy = 0;
	});

	Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update));
}

function update() {
	let pos = [];

	for (let i = 0; i < tail.length + 1; i++) {
		if (i === 0) {
			pos.push({
				x: head.x,
				y: head.y
			});
		} else {
			pos.push({
				x: tail[i].x,
				y: tail[i].y 
			});
		}
	}

	head.x += head.vx;
	head.y += head.vy;

	for (i = 1; i < pos.length; i++) {
		tail[i].x = pos[i-1].x;
		tail[i].y = pos[i-1].y;
	}
}