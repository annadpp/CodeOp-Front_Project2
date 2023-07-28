/////////////* // MENU // */////////////

const oneVsOne = document.getElementById("one-vs-one")
const oneVsCPU = document.getElementById("one-vs-CPU")
const gameTable = document.getElementById("game-table")
const gameStart = document.getElementById("start")

oneVsOne.addEventListener("click", oneVsOneStart)
oneVsCPU.addEventListener("click", oneVsCPUStart)


function oneVsOneStart() {
  gameStart.classList.add("hidden")
  gameTable.classList.remove("hidden")
  gameOneVsOne(cells, game);
}

function oneVsCPUStart() {
  gameStart.classList.add("hidden")
  gameTable.classList.remove("hidden")
  gameOneVsCPU(cells, game)
}


/////////////* //GAME GENERIC// *///////////

const cells = document.querySelectorAll("[data-cell]");
const body = document.querySelector("body")
const gameOver = document.getElementById("game-over")
const reset = document.getElementById("reset")

//Keeps track of game and sets winning combinations
const game = {
    xTurn: true,
    oTurn: false,
    xState: [],
    oState: [],
    winningCombs: [
        // Rows
        ["0", "1", "2"],
        ["3", "4", "5"],
        ["6", "7", "8"],

        // Columns
        ["0", "3", "6"],
        ["1", "4", "7"],
        ["2", "5", "8"],

        // Diagonal
        ["0", "4", "8"],
        ["2", "4", "6"]
    ]
}

//Counters
let xWinsCount = 0
let drawsCount = 0
let oWinsCount = 0
let roundsCount = 1
let turnsCount = "X"

const xWinsCounter = document.getElementById("wins-X");
const drawsCounter = document.getElementById("draws");
const oWinsCounter = document.getElementById("wins-O");
const roundsCounter = document.getElementById("rounds")
const turnsCounter = document.getElementById("turns")

function counters() {
 xWinsCounter.textContent = xWinsCount
 drawsCounter.textContent = drawsCount
 oWinsCounter.textContent = oWinsCount
 roundsCounter.textContent = roundsCount
 turnsCounter.textContent = turnsCount
}

function resetGame() {
  //Resets game.xState and game.oState arrays
  game.xState = [];
  game.oState = [];
  game.xTurn = true
  game.oTurn = false;
  turnsCount = "X"

  //Clears the disabled class from all cells
  cells.forEach(cell => cell.classList.remove("disabled", "x", "o"));
}

reset.addEventListener("click", resetGame)

//Checks winner
function checkGameOver() {
    //Checks if there are any playable cells left in the game -> means draw
    if (!document.querySelectorAll("[data-cell]:not(.disabled)").length) {
      gameOver.classList.remove("hidden");
      firstParagraph.textContent = "The game of Schrödinger...";
      secondParagraph.textContent = "Draw!";
      drawsCount += 1
      roundsCount += 1

      //Makes background dark
      body.style.backgroundColor = "#0b131a"
      gameTable.style.opacity = "0.2"
    }

    //Check for winning combinations comparing xState/oState arrays with game.winningCombs
    game.winningCombs.forEach(winningComb => {
      const xWins = winningComb.every(state => game.xState.includes(state));
      const oWins = winningComb.every(state => game.oState.includes(state));

      if (xWins || oWins) {
        document.querySelectorAll("[data-cell]").forEach(cell => cell.classList.add("disabled"));
        gameOver.classList.remove("hidden");

        if (xWins) {
        firstParagraph.textContent = "You win!";
        secondParagraph.textContent = "X wins";
        xWinsCount += 1
        roundsCount += 1
        } else {
        firstParagraph.textContent = "You lose";
        secondParagraph.textContent = "O wins";
        oWinsCount += 1
        roundsCount += 1
        }

        //Makes background dark
        body.style.backgroundColor = "#0b131a"
        gameTable.style.opacity = "0.2"

        //Changes winning combination bg color
      }
    });
  }



/////////////* // 1 v 1 // */////////////

const gameOverText = document.getElementById("game-over-text");
const firstParagraph = gameOverText.querySelector("p:first-child");
const secondParagraph = gameOverText.querySelector("p:nth-child(2)");


function callEventsOneVsOne(e) {
  const target = e.target;
  const cellValue = target.dataset.value;

  if (!target.classList.contains("disabled")) {
    target.classList.add("disabled");
    game.xTurn ? game.xState.push(cellValue) : game.oState.push(cellValue);
    target.classList.add(game.xTurn ? "x" : "o");
    game.xTurn = !game.xTurn;

    checkGameOver(); // Calls the function to check for game over condition after every click

    // Updates turnsCount and call counters after each move
    const currentPlayer = game.xTurn ? "X" : "O";
    turnsCount = currentPlayer;

    counters();
  }
}


function callEventsOneVsCPU(e) {
      const target = e.target;
      const cellValue = target.dataset.value;

      if (!target.classList.contains("disabled")) {
        target.classList.add("disabled");
        game.xTurn ? game.xState.push(cellValue) : game.oState.push(cellValue);
        target.classList.add(game.xTurn ? "x" : "o");
        game.xTurn = !game.xTurn;

        checkGameOver(); // Calls the function to check for game over condition after every click

        // Update turnsCount and call counters after each move
        turnsCount = game.xTurn ? "X" : "O";
        counters();

        // If it's the CPU's turn, make a move after a short delay
        if (!game.xTurn) {
          setTimeout(() => makeCPUMove(game), 1000); // 1000ms delay before CPU move
        }
    };
}

//1 vs 1 game
function gameOneVsOne(cells, game) {

  cells.forEach(cell => {
    //Add X/O on click
    cell.addEventListener("click", callEventsOneVsOne);

    //Add X/O on hover
    cell.addEventListener("mouseover", e => {
      const target = e.target;
      if (!target.classList.contains("disabled")) {
        target.classList.add(game.xTurn ? "x" : "o");
      }
    });

    cell.addEventListener("mouseout", e => {
      const target = e.target;
      if (!target.classList.contains("disabled")) {
        target.classList.remove("x", "o");
      }
    });
  });

  counters(); // Call counters initially to display "Turn: X"
}



/////////////* // 1 v CPU // */////////////

function gameOneVsCPU(cells, game) {
  
  cells.forEach((cell) => {
    // Add X/O on click
    cell.addEventListener("click", callEventsOneVsCPU);

    // Add X/O on hover
    cell.addEventListener("mouseover", (e) => {
      const target = e.target;
      if (!target.classList.contains("disabled")) {
        if (game.xTurn) {
          target.classList.add("x");
  }
}
    });

    cell.addEventListener("mouseout", (e) => {
      const target = e.target;
      if (!target.classList.contains("disabled")) {
        target.classList.remove("x");
      }
    });
  });

  // Update turnsCount and call counters initially to display "Turn: X"
  turnsCount = "X";
  counters();
}

function makeCPUMove(game) {
  // Get all available cells (not yet disabled)
  const availableCells = Array.from(cells).filter((cell) => !cell.classList.contains("disabled"));

  // Check if there are any available cells to make a move
  if (availableCells.length > 0) {
    // CPU is thinking, set the flag to true

    // Generate a random index to select a random available cell
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const selectedCell = availableCells[randomIndex];
    const cellValue = selectedCell.dataset.value;

    // Simulate the CPU's move by adding the corresponding class and updating the game state
    selectedCell.classList.add("disabled", "o");
    game.oState.push(cellValue);
    game.xTurn = true; // Switch back to X's turn

    // Check for game over after the CPU's move
    checkGameOver();

    // Update turnsCount and call counters after the CPU's move
    turnsCount = "X";
    counters();
  }
}


/////////////* // GAME OVER // */////////////
const exit = document.getElementById("exit")
const next = document.getElementById("next-round")

exit.addEventListener("click", exitGame)
next.addEventListener("click", nextRound)

function exitGame() {
  // Hides the game-over message and show the game table
  gameOver.classList.add("hidden");
  gameTable.classList.add("hidden");
  gameStart.classList.remove("hidden");

  resetGame();

  // Resets background color and opacity
  body.style.backgroundColor = "";
  gameTable.style.opacity = "";

  // Resets counters
  xWinsCount = 0;
  drawsCount = 0;
  oWinsCount = 0;
  roundsCount = 1;

  cells.forEach((cell) => {
    cell.removeEventListener("click", callEventsOneVsOne);
  });

  cells.forEach((cell) => {
    cell.removeEventListener("click", callEventsOneVsCPU);
  });

  counters();
}

function nextRound() {
  // Hide the game-over message and show the game table
  gameOver.classList.add("hidden");
  gameTable.classList.remove("hidden");

  resetGame();

  counters();

  // Reset background color and opacity
  body.style.backgroundColor = "";
  gameTable.style.opacity = "";
}
