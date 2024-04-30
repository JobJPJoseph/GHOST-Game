const { Dictionary } = require("../class/dictionary");

class Board {

    constructor() {
        if(!Dictionary.isInitialized) {
            Dictionary.initialize();
            Board.dictionary = Dictionary.dictionary;
        }
    }

    static players = [];
    static fragment = "";
    static dictionary;



    isWord(letter) {

        if (!letter) return false;

        const piece = Board.fragment + letter;

        for(let i = 0; i < Board.dictionary[piece[0]].length; i++) {
            const word = Board.dictionary[piece[0]][i];

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
        Board.fragment = "";
    }

    printFragment() {
        const dash = "-".repeat(42);
        console.log(dash);
        console.log(Board.fragment);
        console.log(dash);
    }

    isGhost() {
        const ghost = 'GHOST';
        this.record = ghost.slice(0, this.record.length + 1);

        if (this.record === ghost) {
            return true;
        } else {
            return false;
        }
    }

    winningPlay() {
        const winningLetters = [];
        const alpha = [
            'a','b','c','d','e',
            'f','g','h','i','j',
            'k','l','m','n','o',
            'p','q','r','s','t',
            'u','v','w','x','y','z'
        ];

        for (let i = 0; i < alpha.length; i++) {
            const letter = alpha[i];

            if (this.isWord(letter)) winningLetters.push(letter);
        }

        return winningLetters;
    }

    losingPlay() {
        const winningLetters = [];
        const alpha = [
            'a','b','c','d','e',
            'f','g','h','i','j',
            'k','l','m','n','o',
            'p','q','r','s','t',
            'u','v','w','x','y','z'
        ];

        for (let i = 0; i < alpha.length; i++) {
            const letter = alpha[i];

            if (!this.isWord(letter)) winningLetters.push(letter);
        }

        return winningLetters;
    }

}

module.exports = {
    Board
}
