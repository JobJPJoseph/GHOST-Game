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
        // My thoughts:
            /*
            This can be easily done. We could iterate through each element of the array of that particauler key. We could
            test if the fragment + letter creates the word itself. If true, return the word. If it creates a piece of the word
            then return true, else return false. This will be explicit, no need to iterate through the whole data set each time.

            Note: This does not follow SRP (Single Responsibility Principle) but this right saves us time
            */

        if (!letter) return false;

        const piece = this.fragment + letter;

        for(let i = 0; i < this.dictionary[piece[0]].length; i++) {
            const word = this.dictionary[piece[0]][i];

            if (piece === word) return word;

            if (word.startsWith(piece)) return true;
        }

        return false;
    }

}

module.exports = {
    Board
}
