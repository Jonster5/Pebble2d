Pebble.Data = class {
    constructor() {
        this.databases = [];
        this.openDBs = [];
    }
    createDB(name = "") {
        this.databases.forEach(db => {
            if (db.name === name) {
                throw new Error("This name has already been chosen");
            }
        });
        let db = { id: name, data: {} };
        this.databases.push(db);
        window.localStorage.setItem(name, JSON.stringify(db));
        return true;
    }
    open(database = "", callback) {
        let db = JSON.parse(window.localStorage.getItem(database));
        this.openDBs.push(db);
        let index = this.openDBs.indexOf(db);
        callback(db.id, this.openDBs[index].data);
    }
    close(database = "") {
        let db = this.openDBs.find(x => x.id === database);
        window.localStorage.setItem(db.id, JSON.stringify(db));
    }
}