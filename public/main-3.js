let canvas = new Pebble.Canvas(document.body, 512, 512, "5px solid black");
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();

assets.load([
    "fonts/Lobster-Regular.ttf",
    "images/th-1.json",
    "images/titleButton.json"
]).then(() => setup());

let animator;

let world;

let up, right, down, left,
    w, a, s, d;


Pebble.interpolationData.FPS = 30;

function setup() {
    world = new World({
        dungeon: Pebble.Sprite(assets["dungeon.png"]),
        exit: Pebble.Sprite(assets["door.png"]),
        treasure: Pebble.Sprite(assets["treasure.png"]),
        player: Pebble.Sprite([
            assets["explorer-0.png"],
            assets["explorer-1.png"]
        ]),
    });
    //title scene
    world.addNewScene(function(world) {
        let background = Pebble.Sprite(assets["title.png"]);
        this.group.addChild(background);

        let title = Pebble.Text("Treasure Hunt!", "64px Lobster-Regular", "lightblue");
        title.textBaseline = "middle";
        stage.putCenter(title, -180, -100);
        this.group.addChild(title);

        let playButton = Pebble.Button([
            assets["titleButton.png"],
            assets["titleButton (1).png"],
            assets["titleButton (2).png"],
        ]);
        stage.putCenter(playButton, 0, 100);
        this.group.addChild(playButton);

    }, function(world) {


    });

    //lvl 1
    world.addNewScene(function(world) {
        stage.putCenter(world.player, -164);
        world.exit.x = 32;
        stage.putRight(world.treasure, -64);
        world.treasure.layer = 2;

        let numberOfEnemies = 6,
            spacing = 48,
            xOffset = 150,
            speed = 2,
            direction = 1;

        let enemies = [];
        for (let i = 0; i < numberOfEnemies; i++) {
            let enemy = Pebble.Sprite(assets["blob.png"]);

            let x = spacing * i + xOffset;

            let y = Pebble.randomInt(0, canvas.height - enemy.height);

            enemy.x = x;
            enemy.y = y;

            enemy.vy = speed * direction;

            direction *= -1;

            enemies.push(enemy);
        }
        this.enemies = enemies;

        let outerBar = Pebble.Rectangle(128, 8, "black", "gold", 4);
        let innerBar = Pebble.Rectangle(128, 8, "red", );
        world.healthBar = Pebble.Group();
        world.healthBar.add(outerBar, innerBar)

        world.healthBar.inner = innerBar;
        world.healthBar.x = canvas.width - 164;
        world.healthBar.y = 4;

        this.group.add(world.dungeon, world.exit, world.treasure, world.player, world.healthBar);
        this.group.addArray(enemies);

    }, function(world) {
        world.player.x += world.player.vx;
        world.player.y += world.player.vy;

        if (world.player.vx === 0 && world.player.vy === 0) world.player.stop();
        else world.player.play();

        Pebble.contain(world.player, {
            x: 32,
            y: 16,
            width: canvas.width - 32,
            height: canvas.height - 32
        });

        for (enemy of this.enemies) {
            enemy.x += enemy.vx;
            enemy.y += enemy.vy;

            Pebble.contain(enemy, {
                x: 32,
                y: 32,
                width: canvas.width - 32,
                height: canvas.height - 32
            }, true);

            if (Pebble.hit(world.player, enemy)) {
                world.player.blendMode = "lighter";
                world.healthBar.inner.width -= 10;
                break;
            } else {
                world.player.blendMode = "none";
            }
        }

        if (Pebble.hit(world.player, world.treasure)) {
            world.treasure.x = world.player.x + 8;
            world.treasure.y = world.player.y + 8;
        }
    });




    up = Pebble.Keyboard(38);
    right = Pebble.Keyboard(39);
    down = Pebble.Keyboard(40);
    left = Pebble.Keyboard(37);
    w = Pebble.Keyboard(87),
        a = Pebble.Keyboard(65),
        s = Pebble.Keyboard(83),
        d = Pebble.Keyboard(68);
    left.press = () => {
        if (right.isUp) world.player.vx = -3;
        else world.player.vx = 0;
    };
    left.release = () => {
        if (right.isUp) world.player.vx = 0;
        else world.player.vx = 3;
    };
    right.press = () => {
        if (left.isUp) world.player.vx = 3;
        else world.player.vx = 0;
    };
    right.release = () => {
        if (left.isUp) world.player.vx = 0;
        else world.player.vx = -3;
    };
    up.press = () => {
        if (down.isUp) world.player.vy = -3;
        else world.player.vy = 0;
    };
    up.release = () => {
        if (down.isUp) world.player.vy = 0;
        else world.player.vy = 3;
    };
    down.press = () => {
        if (up.isUp) world.player.vy = 3;
        else world.player.vy = 0;
    };
    down.release = () => {
        if (up.isUp) world.player.vy = 0;
        else world.player.vy = -3;
    };
    w.press = () => up.press();
    w.release = () => up.release();
    a.press = () => left.press();
    a.release = () => left.release();
    s.press = () => down.press();
    s.release = () => down.release();
    d.press = () => right.press();
    d.release = () => right.release();

    Animate();
}

function Animate(timestamp) {
    animator = requestAnimationFrame(Animate);

    Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, world.Scene.update));
}