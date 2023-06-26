var board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
var currentPlayer = 'X';
var statusElement = document.getElementById('status');
var cells = document.getElementsByClassName('cell');

function makeMove(row, col) {
  if (board[row][col] === '') {
    board[row][col] = currentPlayer;
    cells[row * 3 + col].innerText = currentPlayer;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    checkWinner();
  }
}

function checkWinner() {
  var winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (var i = 0; i < winningCombinations.length; i++) {
    var [a, b, c] = winningCombinations[i];
    if (
      board[Math.floor(a / 3)][a % 3] !== '' &&
      board[Math.floor(a / 3)][a % 3] === board[Math.floor(b / 3)][b % 3] &&
      board[Math.floor(a / 3)][a % 3] === board[Math.floor(c / 3)][c % 3]
    ) {
      statusElement.innerText = 'Parabéns! O jogador ' + board[Math.floor(a / 3)][a % 3] + ' venceu!';
      disableCells();
      return;
    }
  }

  if (isBoardFull()) {
    statusElement.innerText = 'Empate! O jogo acabou.';
    disableCells();
    return;
  }

  statusElement.innerText = 'É a vez do jogador ' + currentPlayer;
}

function isBoardFull() {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === '') {
        return false;
      }
    }
  }
  return true;
}

function disableCells() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].removeAttribute('onclick');
  }
}

function resetBoard() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = 'X';
  statusElement.innerText = 'É a vez do jogador X';
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].setAttribute('onclick', 'makeMove(' + Math.floor(i / 3) + ',' + i % 3 + ')');
  }
}

resetBoard();
