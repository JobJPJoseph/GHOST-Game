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
            const isWordSpy = chai.spy.on(Board, 'isWord');

            board.isWord('a');

            expect(isWordSpy).to.have.been.called.with('a');
        });

        context('When it continues to create a word' , function () {
            // Make sure to create a variable to hold the original dictionary value to reasign it back later
            let saveWords = board.dictionary;
            board.dictionary = [
                { a: 'ancestor',
                a: 'apples',
                a: 'application',
                a: 'applicable',
                a: 'axe'}
            ];

            expect(board.isWord('a')).to.be.true;
            board.dictionary = saveWords;
        });

        context('When it nolonger creates a word', function () {
            let saveWords = board.dictionary;
            board.dictionary = [
                { a: 'ancestor',
                a: 'apples',
                a: 'application',
                a: 'applicable',
                a: 'axe'}
            ];

            expect(board.isWord('b')).to.be.false;
            board.dictionary = saveWords;
        });

    });


});
