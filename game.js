const { Board } = require('./class/board');
const { Player } = require('./class/player');
const { ComputerPlayer } = require('./class/computer');

const player = new Player();
const computerPlayer = new ComputerPlayer();
const board = new Board();
Board.players.push(player, computerPlayer);

// We need way to keep the game going
    /*
    We could try to test for players record
    We could try a Win/Lose situation

    Win:
        We can see this if computerPlayer.record === GHOST return true, else return false
    Lose:
        We can see this if player.record === GHOST return true, else return false

    Of couse we want both to be false. If any of these are true than the game is over.
    */
