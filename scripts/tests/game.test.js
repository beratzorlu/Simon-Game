/**
 * @jest-environment jsdom
 */
const {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn
} = require("../game");

beforeAll(() => { //This runs before all of the tests run.
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close(); //This code will be the same for every HTML file to be tested.
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contains the correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

describe("newGame works as expected", () => {
    beforeAll(() => { //We do this to provide some values beforehand to see if the function will be able to reset the values.
        game.score = 42;
        game.currentGame = ["test1"];
        game.playerMoves = ["test2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set the game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should clear the playerMoves array", () => {
        expect(game.playerMoves).toEqual([]);
    });
    test("should display zero for the element with id of 'score'", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});

describe("gameplay functions as expected", () => {
    beforeEach(() => { //This runs before each individual test that follows run.
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn() adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add the correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
});