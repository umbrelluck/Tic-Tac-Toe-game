function bestSpotEasy() {
    let length = emptySquares(origBoard).length;
    let index = Math.floor(Math.random() * length);
    return emptySquares(origBoard)[index];
  }