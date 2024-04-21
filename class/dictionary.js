const fs = require('fs');
const path = require('path');


class Dictionary {

    static dictionary = {};

    static dictionaryImport() {
        return path.join(__dirname, '../Dictionary/dictionary.txt');
    }

    static initialize() {

        const file = this.dictionaryImport();

        const data = fs.readFileSync(file, 'utf8');
        const lines = data.split('\n');

        for (let i = 0; i < lines.length - 1; i++) {
            const word = lines[i].trim();

            if(this.dictionary[word[0]] === undefined) {
                this.dictionary[word[0]] = [];
            }

            this.dictionary[word[0]].push(word);
        }

    }

}

module.exports = {
    Dictionary
}
