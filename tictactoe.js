const game = {
    // booleà per controlar el canvi de torns
    xTurn: true,
    // estat de X, matriu de strings
    xState: [],
    // estat de O, matriu de strings
    oState: [],
    // possibles combinacions que guanyen la partida
    winningStates: [
        // Files
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8'],

        // Columnes
        ['0', '3', '6'],
        ['1', '4', '7'],
        ['2', '5', '8'],

        // Diagonal
        ['0', '4', '8'],
        ['2', '4', '6']
    ]
}

// El teu codi aquí

document.addEventListener('click', event => {
    // Accedeix als elements html necessaris

    // El jugador fa click a una casella buida
        // Aconsegueix el valor de la casella clicada
        // Afegeix el valor de la casella a la matriu del jugador que li toca
        // Dona les classes adients a la casella clicada
        // Canvia de torn

    // Comprova si és empat

    // Comprova si hi ha guanyador

});


// Botó de restart
document.querySelector('.restart').addEventListener('click', () => {
    // Treu totes les classes afegides

    // Torna els estats i torn al seu estat inicial
    
});

