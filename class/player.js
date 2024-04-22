const { Board } = require('../class/board');

function Player () {
    Board.call();
    this.record = "";
}

Player.prototype = Object.create(Board.prototype);

Player.prototype.getInput = function (dictionary) {
    // This will be Asynchronous

}

Player.prototype.isSingleLetter = function () {

}

module.exports = {
    Player
}
