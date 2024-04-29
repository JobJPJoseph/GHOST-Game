const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;

const { Dictionary } = require('../class/dictionary');
const { Board } = require('../class/board');
const { Player } = require('../class/player');
const { ComputerPlayer } = require('../class/computer');

describe('Board Class', function () {

    it('should successfully create the Board class', function () {
        expect(Board).to.exist;
    });

    let player;
    let computerPlayer;
    let board;


    before(function () {
        player = new Player();
        computerPlayer = new ComputerPlayer;
        board = new Board(player, computerPlayer);
    });

    describe('Board.constructor', function () {

        it('should initialize a array called players that have an instance of computerPlayer and player', function () {
            expect(board.players.includes(player)).to.be.true;
            expect(board.players.includes(computerPlayer)).to.be.true;
        });

        it('should initialize a empty string called fragment', function () {
            expect(board.fragment).to.equal("");
        });

        // We need to test and initialize the Screen class.

        it('should have the Dictionary.isInitialized set to false by defualt', function () {

        });

        context('Dictionary class is initialized', function () {

            it('should initialize an already filled object called dictionay', function () {
                expect(board.dictionary).to.exist;
                expect(board.dictionary).to.be.an('Object');
            });

        });

    });

    describe('Board.isWord', function () {

        it(`should accept a single argument that represent the player's input`, function () {
            const isWordSpy = chai.spy.on(Board.prototype, 'isWord');

            board.isWord('a');

            expect(isWordSpy).to.have.been.called.with('a');
            chai.spy.restore(Board.prototype, 'isWord');
        });

        context('When it continues to create a piece of a word' , function () {

            it('should return true when it forms a piece of a word', function () {
                let saveWords = board.dictionary;

                board.dictionary = {
                    a: [
                        'ancestor',
                        'apples',
                        'application',
                        'applicable',
                        'axe'
                    ]
                };

                expect(board.isWord('a')).to.be.true;
                board.dictionary = saveWords;
            });

        });

        context('When it nolonger creates a word', function () {

            it('should return false when it does not form a piece of a word', function () {
                let saveWords = board.dictionary;

                board.fragment = "ancesto";
                board.dictionary = {
                    a: [
                        'ancestor',
                        'apples',
                        'application',
                        'applicable',
                        'axe'
                    ]
                };

                expect(board.isWord('b')).to.be.false;
                board.dictionary = saveWords;
                board.fragment = "";
            });

        });

        context('When it forms the word itself', function () {
            // A boolean must not be return but instead the word that was formed since it still true

            it('should return the word if letter now forms w word', function () {
                let saveWords = board.dictionary;

                board.fragment = 'ancesto';
                board.dictionary = {
                    a: [
                        'ancestor',
                        'apples',
                        'application',
                        'applicable',
                        'axe'
                    ]
                };

                expect(board.isWord('r')).to.equal('ancestor');
                board.fragment = "";
                board.dictionary = saveWords;
            });

        });

    });

    describe('Board.currentPlayer', function () {

        it('should return the first index of Board.players', function () {
            expect(board.currentPlayer()).to.deep.equal(board.players[0]);
        });

    });

    describe('Board.rotateTurn', function () {

        it('should rotate Board.players', function () {
            const playerOne = board.players[0];
            const playerTwo = board.players[1];

            expect(board.currentPlayer()).to.deep.equal(playerOne);

            board.rotateTurn();

            expect(board.currentPlayer()).to.deep.equal(playerTwo);

            board.rotateTurn();
        });

    });

    describe('Board.reset', function () {

        it('should set Board.fragment to an empty string', function () {
            board.fragment = "ancest";
            board.reset();

            expect(board.fragment).to.equal("");
        });

    });

    describe('Board.printFragment', function () {

        it('should print out fragment in a particular way', function () {
            const consoleSpy = chai.spy.on(console, 'log');

            board.fragment = 'ancesto';
            const expected = [
                "-".repeat(42),
                board.fragment,
                "-".repeat(42)
            ];

            board.printFragment();

            expect(consoleSpy).to.have.been.called.with(...expected);
            chai.spy.restore(console, 'log');

            board.fragment = "";
        });

    });

    describe('Board.isGhost', function () {

        context('Forms GHOST', function () {

            it(`should return true when the player's record === GHOST`, function () {
                player.record = "GHOS";
                player.isGhost();
                expect(player.record).to.equal('GHOST');
                expect(player.isGhost()).to.be.true;
                player.record = "";
            });

        });

        context('Does not form GHOST', function () {

            it(`should progressively add a letter from the word GHOST to record`, function () {
                expect(player.isGhost()).to.be.false;
                expect(player.record).to.equal('G');
                player.record = "";
            });

        });

    });

    describe('winningPlay / losingPlay', function () { // This is time consuming!!!

        it('should call Board.isWord', function () {
            const isWordSpy = chai.spy.on(Board.prototype, 'isWord');

            board.fragment = 'ance';
            board.winningPlay();
            board.fragment = "";

            expect(isWordSpy).to.have.been.called;
            chai.spy.restore(Board.prototype, 'isWord');
        });

        it('should return a array that contains letters that result in true of making up a word', function () {
            board.fragment = 'ancestor';
            const actual = board.winningPlay();
            board.fragment = "";

            expect(actual).to.be.an('array');
        });

        it('should return a array that contains letters that result in false of making up a word', function () {
            board.fragment = 'ancestor';
            const actual = board.losingPlay();
            board.fragment = "";

            expect(actual).to.be.an('array');
        });

    });

    // We are going to make a significant change
        // The computerPlayer class has access to the Board class methods
        // We noticed that in Board class 'Board.takeTurn' and 'Board.possibleLetters' are dead code
        // From here we will refactor to save us from future confusion.

    // We will refactor ComputerPlayer.prototype.getInput
        // We will call Math.floor(Math.random() * 2) which will give us 0 or 1
            // This is based off Truth Tables
        // This will decide whether we pick a winning letter or a losing letter.


});
