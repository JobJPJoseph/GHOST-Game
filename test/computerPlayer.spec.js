const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;

const { Board } = require('../class/board');
const { ComputerPlayer } = require('../class/computer');

describe('ComputerPlayer Class', function () {

    it('should create a class called ComputerPlayer', function () {
        expect(ComputerPlayer).to.exist;
    });

    context('ComputerPlayer(ES5) should extend from the Board(ES6) class but use Object.prototype', function () {

        it('should assign the ComputerPlayer.prototype to the Board.prototype', function () {
            expect(ComputerPlayer.prototype instanceof Board).to.be.true;
        });

    });

    let computerPlayer;

    before(function () {
        computerPlayer = new ComputerPlayer();
    });

    describe('Player.contructor', function () {

        it('should declare a property called name and record', function () {
            expect(player.name).to.equal('ComputerPlayer');
            expect(player.record).to.equal('');
        });

    });

    describe('ComputerPlayer.getInput', function () {

        it('should return a letter from a-z', function () {
            const alpha = [
                'a','b','c','d','e',
                'f','g','h','i','j',
                'k','l','m','n','o',
                'p','q','r','s','t',
                'u','v','w','x','y','z'
            ];

            const actual = computerPlayer.getInput();

            expect(alpha.includes(actual)).to.be.true;
        });

    });

});
