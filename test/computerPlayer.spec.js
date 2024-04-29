// const chai = require('chai');
// const spies = require('chai-spies');

// chai.use(spies);

// const expect = chai.expect;

// const { Board } = require('../class/board');
// const { ComputerPlayer } = require('../class/computer');

// describe('ComputerPlayer Class', function () {

//     it('should create a class called ComputerPlayer', function () {
//         expect(ComputerPlayer).to.exist;
//     });

//     context('ComputerPlayer(ES5) should extend from the Board(ES6) class but use Object.prototype', function () {

//         it('should assign the ComputerPlayer.prototype to the Board.prototype', function () {
//             expect(ComputerPlayer.prototype instanceof Board).to.be.true;
//         });

//     });

//     let board;
//     let computerPlayer;

//     before(function () {
//         board = new Board();
//         computerPlayer = new ComputerPlayer();
//     });

//     describe('ComputerPlayer.contructor', function () {

//         it('should declare a property called name and record', function () {
//             expect(computerPlayer.name).to.equal('Computer');
//             expect(computerPlayer.record).to.equal('');
//         });

//     });

//     describe('ComputerPlayer.getInput', function () {

//         it('should call Math.random', function () {
//             const randomSpy = chai.spy.on(Math, 'random');

//             computerPlayer.getInput();

//             expect(randomSpy).to.have.been.called;
//             chai.spy.restore(Math, 'random');
//         });

//         it('should call Board.winningLetter or Board.losingLetter', function () {
//             const boardStub = chai.spy.interface({
//                 winningLetter: 'a',
//                 losingLetter: 'b'
//             });

//             Object.setPrototypeOf(ComputerPlayer.prototype, boardStub);

//             computerPlayer.getInput();

//             expect(boardStub.winningLetter).to.have.been.called.once;
//             expect(boardStub.losingLetter).to.have.been.called.once;

//             Object.setPrototypeOf(ComputerPlayer.prototype, Board.prototype);
//         });

//         it('should return a letter from the alphabet (a-z)', function () {
//             const alpha = [
//                         'a','b','c','d','e',
//                         'f','g','h','i','j',
//                         'k','l','m','n','o',
//                         'p','q','r','s','t',
//                         'u','v','w','x','y','z'
//                     ];

//             const actual = computerPlayer.getInput();

//             expect(alpha.includes(actual)).to.be.true;
//         });

//     });

//     // We are going to make a significant change
//         // The computerPlayer class has access to the Board class methods
//         // We noticed that in Board class 'Board.takeTurn' and 'Board.possibleLetters' are dead code
//         // From here we will refactor to save us from future confusion.

//     // We will refactor ComputerPlayer.prototype.getInput
//         // We will call Math.floor(Math.random() * 2) which will give us 0 or 1
//             // This is based off Truth Tables
//         // This will decide whether we pick a winning letter or a losing letter.

// });
