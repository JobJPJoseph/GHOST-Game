const fs = require('fs');
// const dictionary = require('../dictionary'); import from a different file

class Dictionary {

    static dictionary = {};

    static initialize(file) {

        const data = fs.readFileSync(file, 'utf8');
        const lines = data.split('\n');

        // We need to create a hash where the defualt values is an empty array as the value

        for (let i = 0; i < lines.length; i++) {
            const word = lines[i];

            if (this.dictionary[word[0]] === undefined) {
                this.dictionary[word[0]] = [];
                this.dictionary[word[0]].push(word);
            } else {
                this.dictionary[word[0]].push(word);
            }
        }

    }

}

Dictionary.initialize('../Dictionary/dictionary.txt');
console.log(Dictionary.dictionary); // Check if the dictionary has been initialized properly

module.exports = {
    Dictionary
}
