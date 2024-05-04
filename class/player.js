const { Board } = require('../class/board');
const readline = require('readline');

function Player () {
    this.name = "Player";
    this.record = "";
}

Player.prototype = Object.create(Board.prototype);

Player.prototype.isValid = async function () {
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
                    this.isValid();
                }

            });

        };

        askForInput();

    });

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

    return (!alpha.includes(letter.toLowerCase())) ? false : letter;
}

Player.prototype.getInput = async function () {
    const input = await this.isValid();

    const result = this.isWord(input);

    if (typeof result === 'string') return result;

    if (result) {
        return input;
    } else {
        return false;
    }

}

module.exports = {
    Player
}
