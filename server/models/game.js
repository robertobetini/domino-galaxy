const MAX_PLAYERS = 4;
const MAX_SPECTATORS = 20;

class Game {
    constructor() {
        this.players = [];
        this.spectators = [];
        this.board = new Uint8Array();
    }

    addPlayer(player) {
        if (this.players.find(p => p.id == player.id)) {
            return false;
        }
        
        if (this.players.length < MAX_PLAYERS) {
            this.players.push(player);
            return true;
        }

        return false;
    }

    removePlayer(playerId) {
        const index = this.players.findIndex(p => p.id == playerId);
        if (index === -1) {
            return false;
        }

        this.players.splice(index, 1);
        return true;
    }

    addSpectator(spectator) {
        if (this.spectators.find(s => s.id == spectator.id)) {
            return false;
        }

        if (this.spectators.length < MAX_SPECTATORS) {
            this.spectators.push(spectator);
            return true;
        }

        return false;
    }

    removeSpectator(spectatorId) {
        const index = this.spectators.findIndex(s => s.id == spectatorId);
        if (index === -1) {
            return false;
        }
        
        this.spectators.splice(index, 1);
        return true;
    }
}

export { MAX_PLAYERS, Game };
