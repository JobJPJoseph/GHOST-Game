const { Dictionary } = require("../class/dictionary");

class Board {

    constructor() {

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, Board);
        }

        if(!Dictionary.isInitialized) {
            Dictionary.initialize();
            Board.dictionary = Dictionary.dictionary;
        } else {
            throw new Error('Requires a dictionary text file');
        }


    }

    static players = [];
    static fragment = "";
    static dictionary;

    getPlayer() {
        return Board.players[0];
    }

    getComputerPlayer() {
        return Board.players[1];
    }

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

    rotateTurn() {
        [Board.players[0], Board.players[1]] = [Board.players[1], Board.players[0]];
    }

    currentPlayer() {
        return Board.players[0];
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

            let result = this.isWord(letter);

            if (typeof result === 'string') winningLetters.push(result);
            if (typeof result === 'boolean' && result === true) winningLetters.push(letter);
        }

        return winningLetters;
    }

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
        this.displayStandings();
        this.printFragment();

        const input = await this.currentPlayer().getInput();

        if (input) {
            Board.fragment += input;
            if ((typeof input === 'string') && (input.length > 1)) this.reset();
        } else {
            this.currentPlayer().isGhost();
        }

        this.rotateTurn();
        console.clear();
    }

    isWin() {
        for (let i = 0; i < Board.players.length; i++) {
            const player = Board.players[i];

            if (player.name === 'Computer' && player.record === "GHOST") {
                console.log(`You Win!!!`);
                return true;
            }
        }

        return false;
    }

    isLose() {
        for (let i = 0; i < Board.players.length; i++) {
            const player = Board.players[i];

            if (player.name === 'Player' && player.record === "GHOST") {
                console.log(`You Lose!!!`);
                return true;
            }
        }

        return false;
    }

}

module.exports = {
    Board
}
