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
            chai.spy.restore(Board, 'isWord');
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

});
