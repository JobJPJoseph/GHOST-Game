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

        let piece = Board.fragment + letter;

        if (Board.fragment === "") return piece;

        let words = Board.dictionary[piece[0]];

        const binarySearch = function (arr, word, start=0, end=arr.length) {
            if (start === end) return -1;

            let mid = Math.floor((end + start) / 2);

            if (arr[mid] === word) return arr[mid];

            if (arr[mid].startsWith(word)) return word;

            let hash = (arg1, arg2) => {
                let wordSum = 0;
                let pieceSum = 0;

                for (let i = 0; i < arg2.length; i++) {

                    wordSum += arg1.charCodeAt(i);
                    pieceSum += arg2.charCodeAt(i);
                }

                return pieceSum > wordSum;
            }


            let bool = hash(arr[mid], word);
            let result;

            if (bool) {
                // When bigger
                let newStart = mid + 1;
                result = binarySearch(words, word, newStart, end);
            } else {
                let newEnd = mid - 1;
                result = binarySearch(words, word, start, newEnd);
            }

            return result;
        }

        let result = binarySearch(words, piece);

        return (result === -1) ? false : result;
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
        let pause = ms => new Promise((resolve) => {

            console.log('Switching turns')
            setTimeout(resolve, ms);
        });

        this.displayStandings();
        this.printFragment();

        const input = await this.currentPlayer().getInput();
        console.log('The player chose: ', input);
        await pause(4000);

        if (input) {
            Board.fragment += input;
            if ((typeof input === 'string') && (input.length > 1)) this.reset();
        } else {
            this.currentPlayer().isGhost();
        }

        console.clear();
        await pause(3000);
        this.rotateTurn();
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
