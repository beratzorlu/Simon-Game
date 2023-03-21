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
    showScore();
    addTurn();
};

function showScore() {
    /**
     * Insert game score value to the HTML
     */
    document.getElementById("score").innerText = game.score;
};

function addTurn() {
    /**
     * Clear the playerMoves() array.
     * Randomly add a button ID to the currentGame array.
     * Call showTurns() function.
     */
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random()*4))]);
    //showTurns();

};

module.exports = {
    game,
    newGame,
    showScore,
    addTurn
}; //This is because we will be exporting more than one object from this file.