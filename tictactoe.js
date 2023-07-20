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

function setupCell(cells, game) {

   // X / 0 stay on click
  cells.forEach(cell => {
    cell.addEventListener('click', e => {
      const target = e.target;
      const cellValue = target.dataset.value;

      if (!target.classList.contains("disabled")) {
        target.classList.add("disabled");
        game.xTurn ? game.xState.push(cellValue) : game.oState.push(cellValue);
        target.classList.add(game.xTurn ? 'x' : 'o');
        game.xTurn = !game.xTurn;
      }
    });

    // X / O appear on hover
    cell.addEventListener('mouseover', e => {
      const target = e.target;
      if (!target.classList.contains("disabled")) {
        target.classList.add(game.xTurn ? 'x' : 'o');
      }
    });

    cell.addEventListener('mouseout', e => {
      const target = e.target;
      if (!target.classList.contains("disabled")) {
        target.classList.remove('x', 'o');
      }
    });
  });
  

}

setupCell(cells, game);


/////////////* // 1 v CPU // */////////////


/////////////* // GAME OVER // */////////////