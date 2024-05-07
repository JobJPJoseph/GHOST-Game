const { Board } = require('./class/board');
const { Player } = require('./class/player');
const { ComputerPlayer } = require('./class/computer');

const player = new Player();
const computerPlayer = new ComputerPlayer();
const board = new Board();
Board.players.push(player, computerPlayer);

async function playGame() {
    while(!(board.isWin() || board.isLose())) {
        await board.playRound();
    }
}

playGame();
