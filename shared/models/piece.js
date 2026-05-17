const TOTAL_PIECES = 28;

class Pieces {
    static EMPTY_SLOT = 0x00;
    static PIECE_0_0 = 0x01;
    static PIECE_0_1 = 0x02;
    static PIECE_0_2 = 0x03;
    static PIECE_0_3 = 0x04;
    static PIECE_0_4 = 0x05;
    static PIECE_0_5 = 0x06;
    static PIECE_0_6 = 0x07;
    static PIECE_1_1 = 0x08;
    static PIECE_1_2 = 0x09;
    static PIECE_1_3 = 0x0a;
    static PIECE_1_4 = 0x0b;
    static PIECE_1_5 = 0x0c;
    static PIECE_1_6 = 0x0d;
    static PIECE_2_2 = 0x0e;
    static PIECE_2_3 = 0x0f;
    static PIECE_2_4 = 0x10;
    static PIECE_2_5 = 0x11;
    static PIECE_2_6 = 0x12;
    static PIECE_3_3 = 0x13;
    static PIECE_3_4 = 0x14;
    static PIECE_3_5 = 0x15;
    static PIECE_3_6 = 0x16;
    static PIECE_4_4 = 0x17;
    static PIECE_4_5 = 0x18;
    static PIECE_4_6 = 0x19;
    static PIECE_5_5 = 0x1a;
    static PIECE_5_6 = 0x1b;
    static PIECE_6_6 = 0x1c;

    static isValid(piece) {
        if (!piece instanceof Number) {
            return false;
        }

        return piece > 0 && piece <= Pieces.PIECE_6_6
    }
}

export { Pieces, TOTAL_PIECES };