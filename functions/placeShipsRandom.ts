import React from "react";
import { Ship } from "../interfaces/types";

// x=col y=row
// Add a thing to check for coordinate outside the grid
const placeShipsRandom = (
  ship: Ship,
  Board: number[][],
  setBoard: React.Dispatch<React.SetStateAction<number[][]>>
) => {
  const orientation: string =
    Math.round(Math.random()) >= 0.5 ? "horizontal" : "vertical";
  // "horizontal";

  const updatedBoard: number[][] = [...Board];
  // Since array extends from 0 to 9 in row and column
  const x: number = Math.floor(Math.random() * 10);
  const y: number = Math.floor(Math.random() * 10);

  const isOutsideGrid = (x: number, y: number, orientation: string) => {
    if (orientation === "horizontal" && x + ship["type"] > 10) {
      return true;
    }
    if (orientation === "vertical" && y + ship["type"] > 10) {
      return true;
    }
    return false;
  };

  const isLocationPlaceable = (x: number, y: number) => {
    if (isOutsideGrid(x, y, orientation) || undefined) return false;

    //make it check x or y + ... ship length
    if (orientation === "horizontal") {
      for (let i = x; i < x + ship["type"]; i++) {
        if (updatedBoard[i][y] !== 0) {
          return false;
        }
      }
    }

    if (orientation === "vertical") {
      for (let j = y; j < y + ship["type"]; j++) {
        if (updatedBoard[x][j] !== 0) {
          return false;
        }
      }
    }
    return true;
  };

  //Main task (placement) of the function
  if (orientation === "horizontal" && isLocationPlaceable(x, y)) {
    for (let i = x; i < x + ship["type"]; i++) {
      console.log(
        `Ship:${ship["type"]}, ${orientation} ${"\n"} x=${x}, y=${y}`
      );
      updatedBoard[i][y] = ship["type"];
    }
  } else if (orientation === "vertical" && isLocationPlaceable(x, y)) {
    for (let j = y; j < y + ship["type"]; j++) {
      console.log(
        `Ship:${ship["type"]}, ${orientation} ${"\n"} x=${x}, y=${y}`
      );
      updatedBoard[x][j] = ship["type"];
    }
  } else {
    console.log("rerunning");
    placeShipsRandom(ship, Board, setBoard);
  }
  setBoard(updatedBoard);
};

export default placeShipsRandom;
