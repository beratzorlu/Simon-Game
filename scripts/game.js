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
    turnNumber: 0,
    turnInProgress: false,
    lastButton: "",
    playerMoves: [],
    lastButton: [],
    choices: ["button1", "button2", "button3", "button4"],
};

function newGame() {
    /**
     * Reset the score to zero.
     * Clear the playerMoves array.
     * Clear the currentGame array.
     */
    game.score = 0;
    game.turnNumber = 0;
    game.currentGame = [];
    game.playerMoves = [];
    game.turnInProgress = false;
    game.lastButton = "";
    for (let circle of document.getElementsByClassName("circle")) { //If you want to confirm that an even listener has been attached to the DOM, then you need to use an attribute or global state to do it.
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                };
            });
            circle.setAttribute("data-listener", "true");
        };
    };
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
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();

};

function lightsOn(circ) {
    /**
     * Add light class to one of the passed circles.
     * After a period of time, remove the light class from the current circle.
     */
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
};

function showTurns() {
    /**
     * Step through currentGame.
     * Turn on the light.
     * Turn off the light.
     */
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        };
    }, 800);
};

function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length == game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        };
    } else {
        alert("Wrong input!");
        newGame();
    };
};

module.exports = {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurn
}; //This is because we will be exporting more than one object from this file.