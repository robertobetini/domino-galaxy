import utils from "../../shared/utils.js";

class Spectator {
    constructor({ id=0, name="" } = {}) {
        this.id = id == 0 ? utils.randomNumber() : id;
        this.name = name;
    }
}

export { Spectator };
