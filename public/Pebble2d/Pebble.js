class Pebble {
    static info() {
        return `visit www.slidemations.com for info on the Pebble API`;
    }
    static randomInt(min = 0, max = 10) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    static randomFloat(min = 0, max = 0, precision) {
        if (typeof(precision) == 'undefined') {
            precision = 2;
        }
        return parseFloat(Math.min(min + (Math.random() * (max - min)), max).toFixed(precision));
    }
}