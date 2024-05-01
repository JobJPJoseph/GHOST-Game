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

    let board;
    let computerPlayer;

    before(function () {
        board = new Board();
        computerPlayer = new ComputerPlayer();
    });

    describe('ComputerPlayer.contructor', function () {

        it('should declare a property called name and record', function () {
            expect(computerPlayer.name).to.equal('Computer');
            expect(computerPlayer.record).to.equal('');
        });

    });

    describe('ComputerPlayer.getInput', function () {

        it('should call Math.random', function () {
            const randomSpy = chai.spy.on(Math, 'random');

            computerPlayer.getInput();

            expect(randomSpy).to.have.been.called;
            chai.spy.restore(Math, 'random');
        });

        context('When we successfully choose a letter', function () {

            it('should return a letter from the alphabet (a-z)', function () {
                const alpha = [
                            'a','b','c','d','e',
                            'f','g','h','i','j',
                            'k','l','m','n','o',
                            'p','q','r','s','t',
                            'u','v','w','x','y','z'
                        ];

                Board.fragment = 'ancesto';
                const actual = computerPlayer.getInput();
                Board.fragment = '';


                expect(alpha.includes(actual)).to.be.true;
            });

        });

        context('When we unseccefully choose a letter', function () {

            it('should return false', function () {
                const alpha = [
                            'a','b','c','d','e',
                            'f','g','h','i','j',
                            'k','l','m','n','o',
                            'p','q','r','s','t',
                            'u','v','w','x','y','z'
                        ];

                Board.fragment = 'ancesto';
                const actual = computerPlayer.getInput();
                Board.fragment = '';


                expect(alpha.includes(actual)).to.be.false;
            });

        });


    });


});
