const { Board } = require('../class/board');

function Player () {
    this.record = "";
}

Player.prototype = Object.create(Board.prototype);

Player.prototype.getInput = function (dictionary) {
    // This will be Asynchronous

}

Player.prototype.isSingleLetter = function (letter) {

    if (typeof letter !== 'string') return false;
    if (letter.length !== 1) return false;

    const alpha = [
        'a','b','c','d','e',
        'f','g','h','i','j',
        'k','l','m','n','o',
        'p','q','r','s','t',
        'u','v','w','x','y','z'
    ];

    return (!alpha.includes(letter.toLowerCase())) ? false : true;
}

module.exports = {
    Player
}
