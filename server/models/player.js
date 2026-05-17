import utils from "../../shared/utils.js";
import { Pieces } from "../../shared/models/piece.js";

class Player {
    constructor({ id=0, name="" }) {
        this.id = id;
        this.name = name;
        this.hand = new Uint8Array(28);

        if (this.id === 0) {
            this.id = utils.randomNumber();
        }
    }

    addPiece(newPiece) {
        if (!Pieces.isValid(newPiece)) {
            return;
        }

        for (let i = 0; i < this.hand.length; i++) {
            const piece = this.hand[i];

            if (piece === Pieces.EMPTY_SLOT) {
                this.hand[i] = newPiece;
                break;
            }
        }
    }
}