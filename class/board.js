const { Dictionary } = require("../class/dictionary");

class Board {

    constructor(player1, player2) {
        this.players = [player1, player2];
        this.fragment = "";
        this.dictionary;

        if(!Dictionary.isInitialized) {
            Dictionary.initialize();
            this.dictionary = Dictionary.dictionary;
        }
    }

    isWord(letter) {

        if (!letter) return false;

        const piece = this.fragment + letter;

        for(let i = 0; i < this.dictionary[piece[0]].length; i++) {
            const word = this.dictionary[piece[0]][i];

            if (piece === word) return word;

            if (word.startsWith(piece)) return true;
        }

        return false;
    }

    currentPlayer() {
        return this.players[0];
    }

    rotateTurn() {
        [this.players[0], this.players[1]] = [this.players[1], this.players[0]];
    }

    reset() {
        this.fragment = "";
    }

    printFragment() {
        const dash = "-".repeat(42);
        console.log(dash);
        console.log(this.fragment);
        console.log(dash);
    }

}

module.exports = {
    Board
}
