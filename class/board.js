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
        return Board.players[0];
    }

    rotateTurn() {
        [Board.players[0], Board.players[1]] = [Board.players[1], Board.players[0]];
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

    // losingPlay() {
    //     const winningLetters = [];
    //     const alpha = [
    //         'a','b','c','d','e',
    //         'f','g','h','i','j',
    //         'k','l','m','n','o',
    //         'p','q','r','s','t',
    //         'u','v','w','x','y','z'
    //     ];

    //     for (let i = 0; i < alpha.length; i++) {
    //         const letter = alpha[i];

    //         if (!this.isWord(letter)) winningLetters.push(letter);
    //     }

    //     return winningLetters;
    // }

    displayStandings() {
        const str = "-".repeat(42);
        const scoreBoard = ' '.repeat(16) + 'SCOREBOARD';
        const nameRecord = ["NAME".padEnd(8), "RECORD"].join(" | ");

        console.log(str);
        console.log(scoreBoard);
        console.log(str);
        console.log(nameRecord);

        for(let i = 0; i < Board.players.length; i++) {
            const player = Board.players[i];

            console.log([player.name.padEnd(8), player.record].join(" | "));
        }

        console.log(str);
    }

    async playRound() {
        // this.displayStandings();

        let input = await this.currentPlayer().getInput();

        console.log(input);
        console.log(this.currentPlayer());
        // We now need to account for the full word.
        if ((typeof input === 'string') && (input.length > 1)) return input;

        if (input) {
            Board.fragment += input;
            // if ((typeof input === 'string') && (input.length > 1)) return input;
        } else {
            this.currentPlayer().isGhost();
        }

        this.displayStandings();


        this.rotateTurn();
    }

}

module.exports = {
    Board
}
