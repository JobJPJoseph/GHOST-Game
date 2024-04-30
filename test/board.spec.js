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
            // A boolean must not be return but instead the word that was formed since it still true

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

    // describe('Board.printFragment', function () {

    //     it('should print out fragment in a particular way', function () {
    //         const consoleSpy = chai.spy.on(console, 'log');

    //         board.fragment = 'ancesto';
    //         const expected = [
    //             "-".repeat(42),
    //             board.fragment,
    //             "-".repeat(42)
    //         ];

    //         board.printFragment();

    //         expect(consoleSpy).to.have.been.called.with(...expected);
    //         chai.spy.restore(console, 'log');

    //         board.fragment = "";
    //     });

    // });

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

        it('should return a array that contains letters that result in false of making up a word', function () {
            Board.fragment = 'ancestor';
            const actual = board.losingPlay();
            Board.fragment = "";

            expect(actual).to.be.an('array');
        });

    });

});
