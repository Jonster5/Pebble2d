class World {
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