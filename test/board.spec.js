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


});
