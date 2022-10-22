import React from "react";
import { Ship } from "../interfaces/types";

/**Places ships from randomly generated coordinates that is not outside the grid or already occupied on any provided 10*10 grid*/
const placeShipsRandom = (
  ship: Ship,
  Board: number[][],
  setBoard: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  const width = 10;
  const orientation: string =
    Math.round(Math.random()) >= 0.5 ? "horizontal" : "vertical";

  const updatedBoard: number[][] = [...Board];
  /** random column x between 0 to 9*/
  const x: number = Math.floor(Math.random() * width);
  /** random row y between 0 to 9*/
  const y: number = Math.floor(Math.random() * width);

  /** True if the random x,y coordinate is outside the grid */
  const isOutsideGrid = (x: number, y: number, orientation: string) => {
    if (orientation === "horizontal" && x + ship.type > width) {
      return true;
    }
    if (orientation === "vertical" && y + ship.type > width) {
      return true;
    }
    return false;
  };

  /** True if neighbouring x or y + ... ship length coordinates is not occupied + !isOutsideGrid */
  const isLocationPlaceable = (x: number, y: number) => {
    if (isOutsideGrid(x, y, orientation)) return false;

    if (orientation === "horizontal") {
      for (let i = x; i < x + ship.type; i++) {
        if (updatedBoard[i][y] !== 0) {
          return false;
        }
      }
    }

    if (orientation === "vertical") {
      for (let j = y; j < y + ship.type; j++) {
        if (updatedBoard[x][j] !== 0) {
          return false;
        }
      }
    }
    return true;
  };

  // Main task (placement) of the function
  if (orientation === "horizontal" && isLocationPlaceable(x, y)) {
    for (let i = x; i < x + ship.type; i++) {
      console.log(
        `Ship:${ship["type"]}, ${orientation} ${"\n"} x=${x}, y=${y}`
      );
      updatedBoard[i][y] = ship.type;
    }
  } else if (orientation === "vertical" && isLocationPlaceable(x, y)) {
    for (let j = y; j < y + ship.type; j++) {
      console.log(
        `Ship:${ship["type"]}, ${orientation} ${"\n"} x=${x}, y=${y}`
      );
      updatedBoard[x][j] = ship.type;
    }
  } else {
    console.log("Re-running");
    placeShipsRandom(ship, Board, setBoard);
  }
  setBoard(updatedBoard);
};

export default placeShipsRandom;
