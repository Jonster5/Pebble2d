let canvas = new Pebble.Canvas(document.body, 512, 512, "5px solid black");
let stage = new Pebble.Stage(canvas.width, canvas.height);
let assets = new Pebble.AssetLoader();

assets.load([
    "fonts/Lobster-Regular.ttf",
    "images/th-1.json"
]).then(() => setup());

let animator;
let world, player, treasure,
    enemies, chimes, exit, healthBar,
    message, gameScenes = [],
    titleScene,
    dungeon;
let up = Pebble.Keyboard(38),
    right = Pebble.Keyboard(39),
    down = Pebble.Keyboard(40),
    left = Pebble.Keyboard(37);

let w = Pebble.Keyboard(87),
    a = Pebble.Keyboard(65),
    s = Pebble.Keyboard(83),
    d = Pebble.Keyboard(68);


Pebble.interpolationData.FPS = 30;

function setup() {
    dungeon = Pebble.Sprite(assets["dungeon.png"]);


    exit = Pebble.Sprite(assets["door.png"]);
    exit.x = 32;


    player = Pebble.Sprite([
        assets["explorer-0.png"],
        assets["explorer-1.png"]
    ]);
    Pebble.addStatePlayer(player);

    stage.putCenter(player, -164);


    treasure = Pebble.Sprite(assets["treasure.png"]);
    stage.putRight(treasure, -64);


    gameScenes[0] = Pebble.Group();
    gameScenes[0].add(dungeon, exit, player, treasure);


    let numberOfEnemies = 6,
        spacing = 48,
        xOffset = 150,
        speed = 2,
        direction = 1;

    enemies = [];

    for (let i = 0; i < numberOfEnemies; i++) {
        let enemy = Pebble.Sprite(assets["blob.png"]);

        let x = spacing * i + xOffset;

        let y = Pebble.randomInt(0, canvas.height - enemy.height);

        enemy.x = x;
        enemy.y = y;

        enemy.vy = speed * direction;

        direction *= -1;

        enemies.push(enemy);

        gameScenes[0].addChild(enemy);
    }


    let outerBar = Pebble.Rectangle(128, 8, "black");
    let innerBar = Pebble.Rectangle(128, 8, "red");
    healthBar = Pebble.Group();
    healthBar.add(outerBar, innerBar)

    healthBar.inner = innerBar;
    healthBar.x = canvas.width - 164;
    healthBar.y = 4;

    gameScene.addChild(healthBar);

    message = Pebble.Text("Game Over!", "64px Lobster-Regular", "black", 20, 20);
    message.x = 120;
    message.y = canvas.height / 2 - 64;

    titleScene = Pebble.Group();
    titleScene.addChild(message);

    titleScene.visible = false;

    left.press = () => {
        if (right.isUp) player.vx = -3;
        else player.vx = 0;
        player.play();
    };
    left.release = () => {
        if (right.isUp) player.vx = 0;
        else player.vx = 3;
        player.stop();
    };
    right.press = () => {
        if (left.isUp) player.vx = 3;
        else player.vx = 0;
        player.play();
    };
    right.release = () => {
        if (left.isUp) player.vx = 0;
        else player.vx = -3;
        player.stop();
    };
    up.press = () => {
        if (down.isUp) player.vy = -3;
        else player.vy = 0;
        player.play();
    };
    up.release = () => {
        if (down.isUp) player.vy = 0;
        else player.vy = 3;
        player.stop();
    };
    down.press = () => {
        if (up.isUp) player.vy = 3;
        else player.vy = 0;
        player.play();
    };
    down.release = () => {
        if (up.isUp) player.vy = 0;
        else player.vy = -3;
        player.stop();
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

    Pebble.render(canvas.domElement, stage, true, Pebble.getLagOffset(timestamp, update));
}

function update() {
    player.x += player.vx;
    player.y += player.vy;

    Pebble.contain(player, {
        x: 32,
        y: 16,
        width: canvas.width - 32,
        height: canvas.height - 32
    });

    for (i in enemies) {
        let enemy = enemies[i];
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;

        Pebble.contain(enemy, {
            x: 32,
            y: 32,
            width: canvas.width - 32,
            height: canvas.height - 32
        }, true);

        if (Pebble.hit(player, enemy)) {
            player.blendMode = "lighter";
            healthBar.inner.width -= 5;
            break;
        } else {
            player.blendMode = "none";
        }
    }

    if (Pebble.hit(player, treasure)) {
        treasure.x = player.x + 8;
        treasure.y = player.y + 8;
        treasure.alpha = 0.8;
    }

    if (Pebble.hit(treasure, exit)) {
        gameScene.visible = false;
        titleScene.visible = true;
        stage.putCenter(message);
        message.content = "You Won!";
    }

    if (healthBar.inner.width <= 0) {
        gameScene.visible = false;
        titleScene.visible = true;
        stage.putCenter(message);
        message.content = "You Lost!";
    }

};