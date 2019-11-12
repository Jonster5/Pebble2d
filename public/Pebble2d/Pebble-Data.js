Pebble.Data = class {
    constructor() {
        this.databases = [];
        this.openDatabases = [];

        for (let i = 0; i < window.localStorage.length; i++) {
            let key = window.localStorage.key(i);
            let foo = window.localStorage.getItem(key);
            foo = JSON.parse(foo);
            if (typeof(foo.id) === "string") this.databases.push(foo);
        }
    }
    createDB(name = "") {
        let good;
        this.databases.forEach(db => {
            if (db.id === name) {
                good = false;
            }
        });
        if (good === true) {
            let db = { id: name, data: {} };
            this.databases.push(db);
            window.localStorage.setItem(name, JSON.stringify(db));
            return true;
        } else {
            return false;
        }
    }
    removeDB(name = "") {
        let db = this.databases.find(x => x.id === name);
        let index = this.databases.indexOf(db);
        window.localStorage.removeItem(db.id);
        this.databases.splice(index, 1);
        return true;
    }
    open(database = "", callback) {
        let db = JSON.parse(window.localStorage.getItem(database));
        this.openDatabases.push(db);
        let index = this.openDatabases.indexOf(db);
        callback(this.openDatabases[index].data);
        return true;
    }
    close(database = "") {
        let db = this.openDatabases.find(x => x.id === database);
        window.localStorage.setItem(db.id, JSON.stringify(db));
        let index = this.openDatabases.indexOf(db);
        this.openDatabases.splice(index, 1);
        return true;
    }
    removeAll() {
        this.databases.forEach(db => this.removeDB(db.id));
        return true;
    }
    closeAll() {
        this.openDatabases.forEach(db => this.close(db.id));
        return true;
    }
}