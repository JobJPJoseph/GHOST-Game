const { Board } = require('../class/board');

function ComputerPlayer () {
    this.name = 'Computer';
    this.record = "";
}

ComputerPlayer.prototype = Object.create(Board.prototype);

ComputerPlayer.prototype.getInput = function () {
    const cheatEngine = Math.floor(Math.random() * 2);

    if (cheatEngine) {
        const winningLetters = this.winningPlay();
        const index = Math.floor(Math.random() * winningLetters.length);
        return winningLetters[index];
    } else {
        return false;
    }
}

module.exports = {
    ComputerPlayer
}
