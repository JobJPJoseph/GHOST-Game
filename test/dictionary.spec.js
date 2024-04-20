const chai = require('chai');
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;

const { dictionary } = require('../class/dictionary');

describe('Dictionary Class', function () {

    it('should initialize the dictionary class', function () {
        expect(dictionary).to.exist;
    });


    // We need to test for a dictionary class exist
    // Then check the keys length to make sure its from A to Z.
});
