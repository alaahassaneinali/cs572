let EventEmitter = require('events');

class Gym extends EventEmitter {
    constructor() {
        super();
        let gym = this;
        setInterval(function () {
            gym.emit('boom');
        }, 1000);
    }
}

let object = new Gym();

object.on('boom', function () {
    console.log("boom");

});


