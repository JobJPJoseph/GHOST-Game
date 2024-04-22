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

});
