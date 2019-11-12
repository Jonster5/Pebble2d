let canvas = new Pebble.Canvas(document.body, 400, 400, "1px solid black");
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();
let data = new Pebble.Data();

assets.load(["fonts/Lobster-Regular.ttf"]).then(() => setup());

let text;

function setup() {
    if (data.databases[0] === undefined) {
        data.createDB("mydb");
        data.open("mydb", db => {
            db.age = 30;
            db.name = "John Doe";
            db.info = {
                email: "example@gmail.com",
                address: "45 example st, NYC",
                phones: ["+1(234) 567-7890", "+0(987) 654-4321"]
            };
        });
        data.close("mydb");
    }
    
    data.open("mydb", db => {
       text = Pebble.Text(db.name, "20px Lobster-Regular", "black", 32, 32);
       stage.add(text);
       data.closeAll(); 
    });

    Animate();
}

function Animate(timestamp) {
    animator = requestAnimationFrame(Animate);

    Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update));
}

function update() {

}