const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;

const { Board } = require('../class/board');
const { Player } = require('../class/player');


describe('Player class', function () {

    it('should successfully create the Player class', function () {
        expect(Player).to.exist;
    });

    context('Player(ES5) should extend from the Board(ES6) class but use Object.prototype', function () {

        it('should assign the Player.prototype to the Board.prototype', function () {
            expect(Player.prototype instanceof Board).to.be.true;
        });

    });

    let player;

    before(function () {
        player = new Player();
    });

    describe('Player.isSingleLetter', function () {

        it(`should return false when the player's input is not valid`, function () {
            const num = 5
            const letter = 'djj';
            const numAndLetter = 's5';
            const numStr = '5';

            const actual = player.isSingleLetter(num);
            const actual2 = player.isSingleLetter(letter);
            const actual3 = player.isSingleLetter(numAndLetter);
            const actual4 = player.isSingleLetter(numStr);

            expect(actual).to.equal(false);
            expect(actual2).to.equal(false);
            expect(actual3).to.equal(false);
            expect(actual4).to.equal(false);

        });

        it(`should return true when the player's input is not valid`, function () {
            const input = "J";
            const input2 = "j";

            const actual = player.isSingleLetter(input);
            const actual2 = player.isSingleLetter(input2);

            expect(actual).to.equal(true);
            expect(actual2).to.equal(true);
        });

    });
});
