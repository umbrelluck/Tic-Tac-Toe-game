$(function() {
  chooseOponent();
});

function chooseOponent(){
$(".endgame").css("display","none");
$(".oponentSelect").css("display","block");
$("table").css("display","none");
$(".ai").click(function(){
  oponent="ai";
  opClick();
});
$(".hum").click(function(){
  oponent="hum";
  opClick();
});
}

function opClick(){
  if (oponent=="ai"){
    $(".oponentSelect").css("display","none");
    levelSelect();
  }
  if (oponent=="hum"){
    $(".oponentSelect").css("display","none");
    startGame();
    level=null;
}
}

function levelSelect(){
  $(".levelSelect").css("display","block");
  $(".endgame").css("display","none");
  $("table").css("display","none");
  $(".easy").click(function(){
   level="easy";
   console.log(level);
   startGame();
  });
  $(".hard").click(function(){
    level="hard";
    console.log(level);
    startGame();
   });
   $(".insane").click(function(){
    level="insane";
    console.log(level);
    startGame();
   });
}

function startGame() {
  who=0;
  $(".levelSelect").css("display","none");
  $("table").css("display","block");
  $(".endgame").css("display", "none");
  origBoard = Array.from(Array(borderSize).keys());
  for (var i = 0; i <= cells.length; i++) {
    $(cells[i]).html("");
    $(cells[i]).css("background-color", "transparent");
    $(cells[i]).click(turnClick);
  }
}

function turnClick(elem) {
  var id = $(this).attr("id");
  if (typeof origBoard[id] == "number") {
    if(oponent=="ai"){
    turn(id, humPlayer);
      if (!checkTie()) {
        if(level=="easy") turn(bestSpotEasy(), aiPlayer);
        if(level=="hard") { turn(bestSpotHard(), aiPlayer)};
        if(level=="insane") turn(bestSpotIns(), aiPlayer);
      }
    } else if(oponent=="hum"){
      who++;
      console.log(who);
      if(who%2==1)
      turn(id, humPlayer);
      else  turn(id, anPlayer);
      checkTie()
    }
  }
}

function turn(id, player) {
  origBoard[id] = player;
  $("#" + id).html(player);
  // checkTie();//prosto tak
  let gameWone = checkWin(origBoard, player);
  if (gameWone) gameOver(gameWone);
}

function checkTie() {
  if (emptySquares(origBoard).length == 0) {
    for (var i=0; i < cells.length; i++) {
      $("#" + i).css("background-color", "#FFFF00");
      $(cells[i]).off("click");
    }
    if( (!(checkWin(origBoard, humPlayer) || checkWin(origBoard, aiPlayer)||checkWin(origBoard, anPlayer)))
    ||(checkWin(origBoard, humPlayer)&&checkWin(origBoard, aiPlayer))){
      declareWinner("Tie game!");
      return true;
    }
  }
  return false;
}

function checkWin(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {
        index: index,
        player: player
      };
      break;
    }
  }
  return gameWon;
}

function emptySquares(board) {
  return board.filter(s => typeof s == "number");
}

function gameOver(gameWon) {
  for (let index of winCombos[gameWon.index]) {
    if(oponent=="ai"){
      let color = gameWon.player == humPlayer ? "green" : "red";
      $("#" + index).css("background-color", color);
    } else $("#" + index).css("background-color", "green");
  }
  for (var i = 0; i < cells.length; i++) {
    $(cells[i]).off("click");
  }
  if (oponent=="ai")
  declareWinner(gameWon.player == humPlayer ? "You win!" : "You loose!");
  else declareWinner(gameWon.player == humPlayer ? "O win!" : "X win!");
}

function declareWinner(who) {
  $(".endgame").css("display", "block");
  $(".lvl").css("display","inline-block");
  if(oponent=="hum")
  $(".lvl").css("display","none");
  $(".endgame .text").html(who);
}