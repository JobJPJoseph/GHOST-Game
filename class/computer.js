const { Board } = require('../class/board');

function ComputerPlayer () {
    this.name = 'Computer';
    this.record = "";
}

ComputerPlayer.prototype = Object.create(Board.prototype);

ComputerPlayer.prototype.getInput = function () {
    const alpha = [
        'a','b','c','d','e',
        'f','g','h','i','j',
        'k','l','m','n','o',
        'p','q','r','s','t',
        'u','v','w','x','y','z'
    ];

    const index = Math.floor(Math.random() * alpha.length);

    return alpha[index];
}

module.exports = {
    ComputerPlayer
}
