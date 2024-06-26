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

    let board;
    let player;

    before(function () {
        board = new Player();
        player = new Player();
    });

    describe('Player.contructor', function () {

        it('should declare a property called name and record', function () {
            expect(player.name).to.equal('Player');
            expect(player.record).to.equal('');
        });

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

            expect(actual).to.equal(input);
            expect(actual2).to.equal(input2);
        });

    });

    describe('Player.isValid', function () {

        context('Asynchronous', function () {

            it(`should return the player's input`, async function () {
                const actual = await player.isValid();
                return expect(actual).to.be.a('string');
            });

        });

    });

    describe('Player.getInput', function () {

        it(`should return false when player's input nolonger creates a word`, async function () {
            Board.fragment = 'anscesto';
            expect(await player.getInput('p')).to.be.false;
            Board.fragment = "";
        });

    });

});
