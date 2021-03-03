/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ]
const pieces = {
    '-1': "O",
    '1': "X",
    'null': null,
}
  
  /*----- app's state (variables) -----*/
  let board, turn, winner
  
  /*----- cached element references -----*/
  const messageEl = document.getElementById('msg');
  const resetButton = document.getElementById('reset');
  const gameEl = document.getElementById('game');
  
  /*----- event listeners -----*/
  gameEl.addEventListener('click', handClick);
  resetButton.addEventListener('click',init);
  /*----- functions -----*/

  function init() {
      board = new Array(9).fill(null);
      turn = 1;
      winner = null;
      render();
  }
  
  function render() {
    board.forEach(function(block, idx){
      document.getElementById(idx).innerText = pieces[block]
    })
     resetButton.style.display = 'none';
     if (winner === 'Tie') {
         messageEl.textContent = "It's a Draw!";
         resetButton.style.display = 'block';
     } else if (winner) {
         messageEl.textContent = `player ${turn < 0 ? 1 : 2} wins!`;
         resetButton.style.display = 'block';
     } else {
         messageEl.textContent = `player ${turn > 0 ? 1 : 2}`;
     }
  } 


  function checkWinner() {
    winningCombos.forEach(function(cmb) {
      if (Math.abs(board[cmb[0]] + board[cmb[1]] + board[cmb[2]]) === 3) {
        winner = turn;
      } 
    })
    if (!winner && !board.includes(null)) winner = 'T';
  }

  function handClick(event) {
      if (board[event.target.id]) return;
      if (winner) return;
      board[event.target.id] =turn;
        checkWinner();
        turn *= -1;
        render();
  }
   init();