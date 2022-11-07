/**Places ships from randomly generated coordinates that is not outside the grid or already occupied on any provided 10*10 grid*/
const boardWithRandomlyPlacedShips = (
  shipLength: number,
  board: number[][],
): number[][] => {
  const width = 10;
  const orientation =
    Math.round(Math.random()) >= 0.5 ? "horizontal" : "vertical";

  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * width);

  /** True if the random x,y coordinate is outside the grid */
  const isOutsideGrid = (x: number, y: number, orientation: string) => {
    if (orientation === "horizontal" && x + shipLength > width) {
      return true;
    }
    if (orientation === "vertical" && y + shipLength > width) {
      return true;
    }
    return false;
  };

  /** True if neighbouring x or y + ... ship length coordinates is not occupied + !isOutsideGrid */
  const isLocationPlaceable = (x: number, y: number) => {
    if (isOutsideGrid(x, y, orientation)) return false;

    if (orientation === "horizontal") {
      for (let i = x; i < x + shipLength; i++) {
        if (board[i][y] !== 0) {
          return false;
        }
      }
    }

    if (orientation === "vertical") {
      for (let j = y; j < y + shipLength; j++) {
        if (board[x][j] !== 0) {
          return false;
        }
      }
    }
    return true;
  };

  // Main task (placement) of the function
  if (orientation === "horizontal" && isLocationPlaceable(x, y)) {
    for (let i = x; i < x + shipLength; i++) {
      console.log(
        `Ship:${shipLength}, ${orientation} ${"\n"} x=${x}, y=${y}`
      );
      board[i][y] = shipLength;
    }
  } else if (orientation === "vertical" && isLocationPlaceable(x, y)) {
    for (let j = y; j < y + shipLength; j++) {
      console.log(
        `Ship:${shipLength}, ${orientation} ${"\n"} x=${x}, y=${y}`
      );
      board[x][j] = shipLength;
    }
  } else {
    console.log("Re-running");
    return boardWithRandomlyPlacedShips(shipLength, board);
  }
  return board;
};

export default boardWithRandomlyPlacedShips;
