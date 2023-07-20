const game = {
    xTurn: true,
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
/////////////* // MENU // */////////////


/////////////* // 1 v 1 // */////////////

const cells = document.querySelectorAll("[data-cell]");

const gameOverText = document.getElementById("game-over-text");
const firstParagraph = gameOverText.querySelector("p:first-child");
const secondParagraph = gameOverText.querySelector("p:nth-child(2)");

function checkGameOver() {

    //Checks if there are any playable cells left in the game -> means draw
    if (!document.querySelectorAll("[data-cell]:not(.disabled)").length) {
      document.getElementById("game-over").classList.remove("hidden");
      firstParagraph.textContent = "The game of Schrödinger...";
        secondParagraph.textContent = "Draw!";
    }

    //Check for winning combinations comparing xState/oState arrays with game.winningCombs
    game.winningCombs.forEach(winningComb => {
      const xWins = winningComb.every(state => game.xState.includes(state));
      const oWins = winningComb.every(state => game.oState.includes(state));

      if (xWins || oWins) {
        document.querySelectorAll("[data-cell]").forEach(cell => cell.classList.add("disabled"));
        document.getElementById("game-over").classList.remove("hidden");

        if (xWins) {
        firstParagraph.textContent = "You win!";
        secondParagraph.textContent = "X wins";
        } else {
        firstParagraph.textContent = "You lose";
        secondParagraph.textContent = "Y wins";
        }

        //Make background dark
        //Change winning combination bg color
      }
    });
  }

function setupCell(cells, game) {
  cells.forEach(cell => {

    //Add X/O on click
    cell.addEventListener("click", e => {
      const target = e.target;
      const cellValue = target.dataset.value;

      if (!target.classList.contains("disabled")) {
        target.classList.add("disabled");
        game.xTurn ? game.xState.push(cellValue) : game.oState.push(cellValue);
        target.classList.add(game.xTurn ? "x" : "o");
        game.xTurn = !game.xTurn;

        checkGameOver(); // Call the function to check for game over condition after every click
      }
    });

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

}

setupCell(cells, game);


/////////////* // 1 v CPU // */////////////


/////////////* // GAME OVER // */////////////