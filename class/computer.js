// const { Board } = require('../class/board');

// function ComputerPlayer () {
//     this.name = 'Computer';
//     this.record = "";
// }

// ComputerPlayer.prototype = Object.create(Board.prototype);

// ComputerPlayer.prototype.getInput = function () {
//     // There is an issue with the isWord context
//         // It based on ComputerPlayer instance not Board instance
//         // In order to fix this we need to change Board.fragment to static so that there
//         // is only one version of it. This will allow us to change the context during the call
//         // of isWord
//     // const cheatEngine = Math.floor(Math.random() * 2);

//     // if (cheatEngine) {
//     //     const winningLetters = this.winningPlay();
//     //     const index = Math.floor(Math.random() * winningLetters.length);
//     //     return winningLetters[index];
//     // } else {
//     //     const losingLetters = this.losingPlay();
//     //     const index = Math.floor(Math.random() * losingLetters.length);
//     //     return losingLetters[index];
//     // }
// }

// module.exports = {
//     ComputerPlayer
// }
