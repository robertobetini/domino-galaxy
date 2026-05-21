import utils from "../../shared/utils.js";

class Spectator {
    constructor({ id=0, name="" } = {}) {
        this.id = id;
        this.name = name;

        if (this.id === 0) {
            this.id = utils.randomNumber();
        }
    }
}

export { Spectator };
