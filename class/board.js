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

}

module.exports = {
    Board
}
