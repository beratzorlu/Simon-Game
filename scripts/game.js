//game
//newgame
//addturn
//showturns
//lightson
//playerturn
//showscore
//------------------

let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
};

function newGame() {
    /**
     * Reset the score to zero.
     * Clear the playerMoves array.
     * Clear the currentGame array.
     */
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
};

module.exports = {
    game,
    newGame
}; //This is because we will be exporting more than one object from this file.