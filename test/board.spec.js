const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;

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
        board = new Board();
        Board.players.push(player, computerPlayer);
    });

    describe('Board.constructor', function () {

        it('should initialize a array called players that have an instance of computerPlayer and player', function () {
            expect(Board.players.includes(player)).to.be.true;
            expect(Board.players.includes(computerPlayer)).to.be.true;
        });

        it('should initialize a empty string called fragment', function () {
            expect(Board.fragment).to.equal("");
        });

        context('Dictionary class is initialized', function () {

            it('should initialize an already filled object called dictionay', function () {
                expect(Board.dictionary).to.exist;
                expect(Board.dictionary).to.be.an('Object');
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
                let saveWords = Board.dictionary;

                Board.dictionary = {
                    a: [
                        'ancestor',
                        'apples',
                        'application',
                        'applicable',
                        'axe'
                    ]
                };

                expect(board.isWord('a')).to.be.true;
                Board.dictionary = saveWords;
            });

        });

        context('When it nolonger creates a word', function () {

            it('should return false when it does not form a piece of a word', function () {
                let saveWords = Board.dictionary;

                Board.fragment = "ancesto";
                Board.dictionary = {
                    a: [
                        'ancestor',
                        'apples',
                        'application',
                        'applicable',
                        'axe'
                    ]
                };

                expect(board.isWord('b')).to.be.false;
                Board.dictionary = saveWords;
                Board.fragment = "";
            });

        });

        context('When it forms the word itself', function () {

            it('should return the word if letter now forms w word', function () {
                let saveWords = Board.dictionary;

                Board.fragment = 'ancesto';
                Board.dictionary = {
                    a: [
                        'ancestor',
                        'apples',
                        'application',
                        'applicable',
                        'axe'
                    ]
                };

                expect(board.isWord('r')).to.equal('ancestor');
                Board.fragment = "";
                Board.dictionary = saveWords;
            });

        });

    });

    describe('Board.currentPlayer', function () {

        it('should return the first index of Board.players', function () {
            expect(board.currentPlayer()).to.deep.equal(Board.players[0]);
        });

    });

    describe('Board.rotateTurn', function () {

        it('should rotate Board.players', function () {
            const playerOne = Board.players[0];
            const playerTwo = Board.players[1];

            expect(board.currentPlayer()).to.deep.equal(playerOne);

            board.rotateTurn();

            expect(board.currentPlayer()).to.deep.equal(playerTwo);

            board.rotateTurn();
        });

    });

    describe('Board.reset', function () {

        it('should set Board.fragment to an empty string', function () {
            Board.fragment = "ancest";
            board.reset();

            expect(Board.fragment).to.equal("");
        });

    });

    describe('Board.isGhost', function () {

        it('should call String.slice', function () {
            const sliceSpy = chai.spy.on(String, 'slice');

            player.isGhost();
            player.record = "";

            expect(sliceSpy).to.have.been.called;
        });

        it(`should add to the player's record`, function () {
            player.isGhost();
            expect(player.record).to.equal('G');
            player.record = "";
        });

    });

    describe('winningPlay / losingPlay', function () {

        it('should call Board.isWord', function () {
            const isWordSpy = chai.spy.on(Board.prototype, 'isWord');

            Board.fragment = 'ance';
            board.winningPlay();
            Board.fragment = "";

            expect(isWordSpy).to.have.been.called;
            chai.spy.restore(Board.prototype, 'isWord');
        });

        it('should return a array that contains letters that result in true of making up a word', function () {
            Board.fragment = 'ancestor';
            const actual = board.winningPlay();
            Board.fragment = "";

            expect(actual).to.be.an('array');
        });

    });

    // Make sure to refactor the return word case.
        // We don't actually want to return the word but reset the word.

    describe('Board.playRound', function () {

        it('should Board.displayStandings', async function () {
            const standingsSpy = chai.spy.on(Board.prototype, 'displayStandings');

            await board.playRound();

            return expect(standingsSpy).to.have.been.called;
        });

        it('should call Board.rotateTurn', async function () {
            const rotateSpy = chai.spy.on(Board.prototype, 'rotateTurn');

            await board.playRound();

            return expect(rotateSpy).to.have.been.called;
        });

        context('When it creates a piece of a word', async function () {

            it('should add input to Board.fragment', async function () {
                Board.fragment = "";
                await board.playRound();
                return expect(Board.fragment.length).to.equal(1);
            });

        });

        context('When it nolonger creates any words', async function () {

            it(`should add to the current player's record`, async function () {
                computerPlayer.record = "";
                Board.fragment = "ancesto";
                const input = await board.playRound();
                return expect(Board.players[1].record).to.equal('G');
            });

        });

        context('When it creates an actual word', function () {

            it('should call Board.reset', async function () {
                const resetSpy = chai.spy.on(Board.prototype, 'reset');

                Board.fragment = "ancesto";
                await board.playRound();

                expect(resetSpy).to.have.been.called;
                chai.spy.restore(Board.prototype, 'reset');
                return;
            });

            it('should reset Board.fragment to an empty string', async function () {
                Board.fragment = "ancesto";
                await board.playRound();
                return expect(Board.fragment).to.equal('');
            });

        });

    });

});
