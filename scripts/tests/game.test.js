/**
 * @jest-environment jsdom
 */

const {
    game,
    newGame
} = require("../game");

beforeAll(() => {
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
        newGame();

    })
    test("should set the game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should clear the currentGame array", () => {
        expect(game.currentGame).toEqual([]);
    });
    test("should clear the playerMoves array", () => {
        expect(game.playerMoves).toEqual([]);
    });
});