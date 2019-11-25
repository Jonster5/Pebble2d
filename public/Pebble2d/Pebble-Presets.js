if (typeof Pebble.DisplayObject === 'undefined' || Pebble.DisplayObject === null) {
    throw new Error('You must have Pebble-2d installed before you can use this');
}

Pebble.World = class {
    constructor(gameObjects = {}) {
        this.scenes = [];
        this.currentScene = 0;
        Object.assign(this, gameObjects);
    }
    addNewScene(setup = function(world) {}, onUpdate = function(world) {}) {
        let obj = {
            group: Pebble.Group(),

            prepare: undefined,
            update: undefined,
        };

        obj.prepare = setup.bind(obj, world);
        obj.update = onUpdate.bind(obj, world);

        this.scenes.push(obj);
        obj.group.visible = this.scenes.indexOf(obj) === 0 ? true : false;
        if (obj.group.visible) {
            obj.prepare();
        }
    }

    nextScene() {
        if (this.currentScene < this.scenes.length - 1) {
            this.scenes[this.currentScene].group.visible = false;

            this.currentScene++;

            let scene = this.scenes[this.currentScene].group.visible = true;
            this.scenes[this.currentScene].prepare();
        } else {
            this.scenes[this.currentScene].group.visible = false;

            this.currentScene = 0;

            this.scenes[this.currentScene].prepare();
            this.scenes[this.currentScene].group.visible = true;
        }
    }
    gotoScene(index) {
        if (Number.isInteger(index) && index >= 0 && index < this.scenes.length) {
            this.Scene.group.visible = false;
            this.currentScene = index;
            this.scenes[this.currentScene].prepare();
            this.scenes[this.currentScene].group.visible = true;
        }
    }
    get Scene() {
        return this.scenes[this.currentScene];
    }
}

Pebble.shoot = function shoot(
    shooter, angle, offsetFromCenter,
    bulletSpeed, bulletArray, bulletSprite
) {

    let bullet = bulletSprite();

    bullet.x = shooter.centerX - bullet.halfWidth +
        (offsetFromCenter * Math.cos(angle));
    bullet.y = shooter.centerY - bullet.halfHeight +
        (offsetFromCenter * Math.sin(angle));

    bullet.vx = Math.cos(angle) * bulletSpeed;
    bullet.vy = Math.sin(angle) * bulletSpeed;

    bulletArray.push(bullet);
}