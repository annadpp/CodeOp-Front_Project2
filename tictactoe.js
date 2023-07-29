/////////////* // MENU // */////////////
const oneVsOne = document.getElementById("one-vs-one");
const oneVsCPU = document.getElementById("one-vs-CPU");
const gameTable = document.getElementById("game-table");
const gameStart = document.getElementById("start");

oneVsOne.addEventListener("click", oneVsOneStart);
oneVsCPU.addEventListener("click", oneVsCPUStart);

//Triggers gameOneVsOne
function oneVsOneStart() {
  gameStart.classList.add("hidden");
  gameTable.classList.remove("hidden");
  gameOneVsOne(cells, game);
}


//Trigers gameOneVsCPU
function oneVsCPUStart() {
  gameStart.classList.add("hidden");
  gameTable.classList.remove("hidden");
  gameOneVsCPU(cells, game);
}


/////////////* //GAME GENERIC// *///////////

const cells = document.querySelectorAll("[data-cell]");
const body = document.querySelector("body")
const gameOver = document.getElementById("game-over")
const reset = document.getElementById("reset")
const gameOverText = document.getElementById("game-over-text");
const firstParagraph = gameOverText.querySelector("p:first-child");
const secondParagraph = gameOverText.querySelector("p:nth-child(3)");
const imgGameOver = gameOverText.querySelector("img")

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
let xWinsCount = 0;
let drawsCount = 0;
let oWinsCount = 0;
let roundsCount = 1;
let turnsCount = "./img/culo.png";

const xWinsCounter = document.getElementById("wins-X");
const drawsCounter = document.getElementById("draws");
const oWinsCounter = document.getElementById("wins-O");
const roundsCounter = document.getElementById("rounds")
const turnsCounter = document.getElementById("turns")

//Adds text to counters
function counters() {
 xWinsCounter.textContent = xWinsCount;
 drawsCounter.textContent = drawsCount;
 oWinsCounter.textContent = oWinsCount;
 roundsCounter.textContent = roundsCount;
 turnsCounter.src = turnsCount;
}

//Resets game status
function resetGame() {
  game.xState = [];
  game.oState = [];
  game.xTurn = true;
  game.oTurn = false;

  //Sets turnsCount to the default image for the first turn (player X)
  turnsCount = "./img/culo.png";

  //Clears the disabled class from all cells
  cells.forEach(cell => cell.classList.remove("disabled", "x", "o"));

  //Calls counters to update the display
  counters();
}

//Triggers resetGame
reset.addEventListener("click", resetGame);

//Checks winner
function checkGameOver() {
    //Checks if there are any playable cells left in the game -> means draw
    if (!document.querySelectorAll("[data-cell]:not(.disabled)").length) {
      gameOver.classList.remove("hidden");
      firstParagraph.textContent = "¡Empate!";
      imgGameOver.src = "./img/651804.png";
      secondParagraph.textContent = "El juego de Schrödinger...";
      drawsCount += 1;
      roundsCount += 1;

      //Makes background dark on game over
      body.style.backgroundColor = "#0b131a";
      gameTable.style.opacity = "0.2";
    }

    //Check for winning combinations comparing xState/oState arrays with game.winningCombs
    game.winningCombs.forEach(winningComb => {
      const xWins = winningComb.every(state => game.xState.includes(state));
      const oWins = winningComb.every(state => game.oState.includes(state));

      if (xWins || oWins) {
        document.querySelectorAll("[data-cell]").forEach(cell => cell.classList.add("disabled"));
        gameOver.classList.remove("hidden");

        if (xWins) {
        firstParagraph.textContent = "¡El jugador 1 gana!";
        imgGameOver.src = "./img/651793.png";
        secondParagraph.textContent = "¡Miau!";
        xWinsCount += 1
        roundsCount += 1
        } else {
        firstParagraph.textContent = "¡El jugador 2 gana!";
        imgGameOver.src = "./img/651796.png";
        secondParagraph.textContent = "¡Miau!";
        oWinsCount += 1
        roundsCount += 1
        }

        //Makes background dark
        body.style.backgroundColor = "#0b131a";
        gameTable.style.opacity = "0.2";

      }
    });
  }



/////////////* // 1 v 1 // */////////////

//Handles click events on OneVsOne
function callEventsOneVsOne(e) {
  const target = e.target;
  const cellValue = target.dataset.value;

  //Checks if the clicked cell is not already disabled
  if (!target.classList.contains("disabled")) {
    target.classList.add("disabled");
    //Adds the clicked cell value to X or O
    game.xTurn ? game.xState.push(cellValue) : game.oState.push(cellValue);
    //Adds the X or O symbol to the cell
    target.classList.add(game.xTurn ? "x" : "o");
    //Switches turn
    game.xTurn = !game.xTurn;

    //Checks winning combinations
    checkGameOver(); 

    //Updates turnsCount and call counters after each move
    const currentPlayer = game.xTurn ? "./img/culo.png" : "./img/cara.png";
    turnsCount = currentPlayer;

    //Updates counters
    counters();
  }
}

//1 vs 1 game
function gameOneVsOne(cells, game) {
  cells.forEach(cell => {
    //Adds X/O on click by triggering callEventsOneVsOne
    cell.addEventListener("click", callEventsOneVsOne);

    //Adds X/O on hover
    cell.addEventListener("mouseover", e => {
      const target = e.target;
      if (!target.classList.contains("disabled")) {
        target.classList.add(game.xTurn ? "x" : "o");
      }
    });

    //Removes X/O on hover
    cell.addEventListener("mouseout", e => {
      const target = e.target;
      if (!target.classList.contains("disabled")) {
        target.classList.remove("x", "o");
      }
    });
  });

  counters(); 
}



/////////////* // 1 v CPU // */////////////

//Handles click events on OneVsCPU
function callEventsOneVsCPU(e) {
      const target = e.target;
      const cellValue = target.dataset.value;

      //Checks if the clicked cell is not already disabled
      if (!target.classList.contains("disabled")) {
        target.classList.add("disabled");
        //Adds the clicked cell value to X or O
        game.xTurn ? game.xState.push(cellValue) : game.oState.push(cellValue);
        //Adds the X or O symbol to the cell
        target.classList.add(game.xTurn ? "x" : "o");
        //Switches turn
        game.xTurn = !game.xTurn;

        //Checks winning combinations
        checkGameOver(); 

        //Updates turnsCount and call counters after each move
        turnsCount = game.xTurn ? "./img/culo.png" : "./img/cara.png";

        //Updates counters
        counters();

        //Adds delay to CPU
        if (!game.xTurn) {
          setTimeout(() => makeCPUMove(game), 1000); 
        }
    };
}

//1 vs. CPU game
function gameOneVsCPU(cells, game) {
  cells.forEach((cell) => {
    //Adds X/O on click by triggering callEventsOneVsCPU
    cell.addEventListener("click", callEventsOneVsCPU);

    //Adds X/O on hover
    cell.addEventListener("mouseover", (e) => {
      const target = e.target;
      if (!target.classList.contains("disabled")) {
        if (game.xTurn) {
          target.classList.add("x");
  }
}
    });

    //Removes X/O on hover
    cell.addEventListener("mouseout", (e) => {
      const target = e.target;
      if (!target.classList.contains("disabled")) {
        target.classList.remove("x");
      }
    });
  });

  // Update turnsCount and call counters initially to display "Turn: X"
  turnsCount = "./img/culo.png";
  counters();
}

//"Brain" of the CPU
function makeCPUMove(game) {
  //Gets all available cells (not yet disabled)
  const availableCells = Array.from(cells).filter((cell) => !cell.classList.contains("disabled"));

  //Checks if there are any available cells to make a move
  if (availableCells.length > 0) {

    //Generates a random index to select a random available cell
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const selectedCell = availableCells[randomIndex];
    const cellValue = selectedCell.dataset.value;

    //Simulates the CPU's move by adding the corresponding class and updating the game state
    selectedCell.classList.add("disabled", "o");
    game.oState.push(cellValue);
    game.xTurn = true; // Switch back to X's turn

    //Checks for game over after the CPU's move
    checkGameOver();

    //Updates turnsCount and call counters after the CPU's move
    turnsCount = "./img/culo.png";
    counters();
  }
}


/////////////* // GAME OVER // */////////////
const exit = document.getElementById("exit");
const next = document.getElementById("next-round");

exit.addEventListener("click", exitGame);
next.addEventListener("click", nextRound);

//How the game behaves when asked to exit
function exitGame() {
  //Hides the game-over message and show the game table
  gameOver.classList.add("hidden");
  gameTable.classList.add("hidden");
  gameStart.classList.remove("hidden");

  resetGame();

  //Resets background color and opacity
  body.style.backgroundColor = "";
  gameTable.style.opacity = "";

  //Resets counters
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

//How the game behaves when asked to play next round
function nextRound() {
  //Hides the game-over message and show the game table
  gameOver.classList.add("hidden");
  gameTable.classList.remove("hidden");

  resetGame();

  counters();

  //Resets background color and opacity
  body.style.backgroundColor = "";
  gameTable.style.opacity = "";
}
