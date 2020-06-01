if (typeof Pebble.DisplayObject === 'undefined' || Pebble.DisplayObject === null) {
    throw new Error('You must execute Pebble-2d.js before you can use this');
}

class VOXEL_GRID_BASE extends Pebble.DisplayObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.rotation;

        this.children = [];
        this.parent = null;
    }
    addChild(voxel = VOXEL_GRID_BASE) {
        if (voxel instanceof VOXEL_GRID_BASE) {
            if (voxel.parent == this) {
                throw new Error('This voxel is already bound to this grid parent');
            } else {
                this.children.push(voxel);
                voxel.parent = this;
            }
        } else {
            throw new Error('You can only add voxel objects to this grid');
        }
    }
    removeChild(voxel = VOXEL_GRID_BASE) {
        if (voxel.parent == this) {
            this.children.forEach(child => {
                if (child == voxel) {
                    let index = this.children.indexOf(voxel);
                    this.children.splice(index, 1);
                    voxel.parent = null;
                }
            });
        } else {
            throw new Error('You cannot remove this voxel object from this grid base because this voxel is not part of this grid base');
        }
    }
    addChildArray(array = []) {
        if (array.length > 0) {
            array.forEach(voxel => {
                if (voxel instanceof VOXEL_GRID_BASE) {
                    this.children.push(voxel);
                } else {
                    throw new Error('You cannot add objects that are not voxels to a voxel grid');
                }
            });
        } else {
            throw new Error('This array must contain at least 1 voxel object');
        }
    }
    removeChildArray(array = []) {
        if (array.length > 0) {
            array.forEach(voxel => {
                if (voxel.parent == this) {
                    let index = this.children.indexOf(voxel);
                    this.children.splice(index, 1);
                    voxel.parent = null;
                } else {
                    throw new Error('you cannot remove voxels that are not part of this grid');
                }
            });
        } else {
            throw new Error('This array must contain at least 1 voxel object');
        }
    }
}

class VOXEL_GRID extends VOXEL_GRID_BASE {
    constructor(x, y, size, ) {
        super(x, y);

        this.velocity = { x: 0, y: 0 };
        this.rotation = 0;


    }
    get velocity() {
        return this.velocity;
    }
    set xvel(value) {
        this.velocity.x = value;
    }
    set yvel(value) {
        this.velocity.y = value
    }
}

class VOXEL extends VOXEL_GRID_BASE {

}