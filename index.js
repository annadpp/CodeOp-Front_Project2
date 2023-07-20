const game = {
    xTurn: true,
    xState: [],
    oState: [],
    winningCombs: [
        // Rows
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        // Columns
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // Diagonal
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}
/////////////* // MENU // */////////////

/////////////* // 1 v 1 // */////////////

const cells = document.querySelectorAll("[data-cell]");

cells.forEach(cell => {
  cell.addEventListener('click', event => {
    const target = event.target;
    target.style.color = "blue";
  });
});


/////////////* // 1 v CPU // */////////////


/////////////* // GAME OVER // */////////////