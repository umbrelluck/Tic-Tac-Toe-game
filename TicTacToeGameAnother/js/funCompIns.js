function bestSpotIns() {
  return minimaxIns(origBoard, aiPlayer).index;
}

function minimaxIns(newBoard, player) {
  var availSpots = emptySquares(newBoard);
  if (checkWin(newBoard, humPlayer))
    return {
      score: -10
    };
  else if (checkWin(newBoard, aiPlayer)) {
    return {
      score: 10
    };
  } else if (availSpots.length === 0) {
    return {
      score: 0
    };
  }
  var moves = [];
  for (var i = 0; i < availSpots.length; i++) {
    var move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      var result = minimaxIns(newBoard, humPlayer);
      move.score = result.score;
    } else {
      var result = minimaxIns(newBoard, aiPlayer);
      move.score = result.score;
    }
    newBoard[availSpots[i]] = move.index;
    moves.push(move);
  }
  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

