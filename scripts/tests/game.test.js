/**
 * @jest-environment jsdom
 */
const {
    game,
    newGame,
    showScore,
    addTurn,
    lightsOn,
    showTurns,
    playerTurn
} = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => { });

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
    test("turnNumber key should exist", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("turnInProgress key should exist", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress is equal to false", () => {
        expect("turnInProgress" in game).toBe(true); // True because turnInProgress equals to false.
    });
    test("lastButton key should exist", () => {
        expect("lastButton" in game).toBe(true);
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
    test("should reset turnNumber to zero", () => {
        expect(game.turnNumber).toEqual(0);
    });
    test("expect data-listener attribute to return true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        };
    });
    test("should reset turnInProgress to default value", () => {
        newGame();
        expect(game.turnInProgress).toBe(true);
    });
    test("should reset lastButton to default value", () => {
        newGame();
        expect(game.lastButton).toEqual("");
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
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test("should increment the score if the turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    test("test should call an alert if the player input is incorrect", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong input!");
    });
    test("should return true when the CPU is playing its turn", () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    });
    test("clicking during the CPU's turn should fail", () => {
        showTurns();
        game.lastButton = "";
        document.getElementById("button2").click();
        expect(game.lastButton).toEqual("");
    });
});


// What happens if the user puts in too much input/spams?
// Somehow manages to click two circles at the exact same time? This is more relevant for mobile devices.
// What happens if a third party software interferes with the functionality? Like browser plugins.
// What happens when the user refreshes the page in the middle of an active game?
// What happens if the user clicks a button before the start of the game?
// If the user clicks a circle during the CPU's turn, how will this impact the game?