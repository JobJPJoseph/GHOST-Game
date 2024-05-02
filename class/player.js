const { Board } = require('../class/board');
const readline = require('readline');

function Player () {
    this.name = "Player";
    this.record = "";
}

Player.prototype = Object.create(Board.prototype);

Player.prototype.getInput = async function () {
    // This will be Asynchronous

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return await new Promise((resolve) => {

        const askForInput = () => {

            rl.question('Enter your letter: ', (input) => {

                const validInput = this.isSingleLetter(input);

                if (validInput) {
                    rl.close();
                    resolve(validInput);
                } else {
                    this.getInput();
                }

            });

        };

        askForInput();

    });

}

Player.prototype.isSingleLetter = function (letter) {

    if (typeof letter !== 'string') return false;
    if (letter.length !== 1) return false;
    if (!this.isWord(letter)) return false;

    const alpha = [
        'a','b','c','d','e',
        'f','g','h','i','j',
        'k','l','m','n','o',
        'p','q','r','s','t',
        'u','v','w','x','y','z'
    ];

    return (!alpha.includes(letter.toLowerCase())) ? false : letter;
}

module.exports = {
    Player
}
