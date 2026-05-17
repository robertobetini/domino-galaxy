const MAX_PLAYERS = 4;

class Game {
    constructor() {
        this.players = [];
        this.board = new Uint8Array();
    }

    addPlayer(player) {
        if (this.players.length < MAX_PLAYERS) {
            this.players.push(player);
            return true;
        }

        return false;
    }
}

export { MAX_PLAYERS, Game };
