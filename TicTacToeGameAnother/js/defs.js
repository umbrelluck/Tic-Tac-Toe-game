var origBoard;
var level;
var who=0;
var oponent;
var humPlayer = "O";
var aiPlayer = "X";
var anPlayer = "X";
const borderSize = 9;
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cells = $(".cell");
