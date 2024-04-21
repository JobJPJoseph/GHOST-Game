const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;

const { Dictionary } = require('../class/dictionary');

describe('Dictionary Class', function () {

    it('should create the dictionary class', function () {
        expect(Dictionary).to.exist;
    });


    before(function () {
        Dictionary.initialize();
    });

    describe('Initialize', function () {

        context('should fill the dictionary property', function () {

            it('should have dictionary property be a object', function () {
                expect(Dictionary.dictionary).to.be.an('Object');
            });

            it('should have a total of 26 keys', function () {
                expect(Object.keys(Dictionary.dictionary).length).to.equal(26);
            });

            it(`should have each key's value be an array type`, function () {
                const words = Dictionary.dictionary;

                for (let letter in words) {
                    expect(words[letter]).to.be.an('array');
                }

            });

        });

    });

});
