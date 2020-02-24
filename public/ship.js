let ship = Pebble.Sprite(assets["images/ship.png"]);
ship.width = 32;
ship.height = 24;
ship.pivotX = 0.5;

ship.missiles = [];

ship.exhaust = Pebble.Sprite([
    assets["images/shipfire.png"],
    assets["images/shipfire-1.png"],
]);
Pebble.addStatePlayer(ship.exhaust);
ship.exhaust.fps = 12;
ship.exhaust.play();
ship.exhaust.width = 32;
ship.exhaust.height = 24;
ship.exhaust.rotation = Math.PI * 2 - Math.PI / 2;
ship.putLeft(ship.exhaust, 9, -4.5);
ship.exhaust.visible = false;
ship.add(ship.exhaust);

ship.trailR = Pebble.Sprite([
    assets["images/shipfire.png"]
]);
ship.trailR.width = 8;
ship.trailR.height = 12;
ship.trailR.rotation = Math.PI;
ship.putBottom(ship.trailR, 10, -10);
ship.trailR.visible = false;
ship.add(ship.trailR);

ship.trailL = Pebble.Sprite([
    assets["images/shipfire-1.png"]
]);
ship.trailL.width = 8;
ship.trailL.height = 12;
ship.putTop(ship.trailL, 10, 10);
ship.trailL.visible = false;
ship.add(ship.trailL);

stage.putCenter(ship);



ship.vx = 0;
ship.vy = 0;
ship.accelerationX = 0.2;
ship.accelerationY = 0.2;
ship.frictionX = 0.999;
ship.frictionY = 0.999;
ship.mass = 5;

ship.rotationSpeed = 0;
ship.moveForward = false;