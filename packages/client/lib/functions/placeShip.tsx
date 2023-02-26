import React from "react";
import { playerData } from "../interfaces/types";
import { shipLengths } from "../constants";

/**Places down ship on drag ending point respective to the cursor position
 *
 * @param index is the index of selected Ship
 * Working with index here because there are 2 diff ships with same length of 3
 * @returns updated board: number[][] after placement
 */
const placeShip = (
  board: number[][],
  index: number | -1,
  x: number,
  y: number,
  orientation: "horizontal" | "vertical" | undefined,
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>
) => {
  //   if (x === -1 || y === -1) return -1;
  const xrange = x + shipLengths[index];
  const yrange = y + shipLengths[index];

  const goesOutsideGrid = () => {
    if (orientation === "horizontal" && xrange > 10) {
      console.log("goesOutsideGrid");
      return true;
    }
    if (orientation === "vertical" && yrange > 10) {
      console.log("goesOutsideGrid");
      return true;
    }
    return false;
  };

  /** True if neighbouring x or y + ... ship length coordinates is not occupied + !isOutsideGrid */
  const isLocationPlaceable = (x: number, y: number) => {
    if (goesOutsideGrid()) return false;

    if (orientation === "horizontal") {
      for (let i = x; i < xrange; i++) {
        if (board[i][y] !== 0) {
          return false;
        }
      }
    }
    if (orientation === "vertical") {
      for (let j = y; j < yrange; j++) {
        if (board[x][j] !== 0) {
          return false;
        }
      }
    }
    return true;
  };

  /** Updates both the placedLocation and the board */
  const updateShipPlacement = (x: number, y: number) => {
    setPlayerData((prev) => {
      const updatedBoard = prev.board.map((row, i) => {
        if (i === x) {
          return row.map((cell, j) => (j === y ? shipLengths[index] : cell));
        }
        return row;
      });
      const updatedShipInfo = prev.shipInfo.map((ship, i) =>
        i === index
          ? {
              ...ship,
              placed: true,
              placedLocation: [...ship.placedLocation, [x, y]],
            }
          : ship
      );
      return { ...prev, board: updatedBoard, shipInfo: updatedShipInfo };
    });
  };

  if (orientation === "horizontal" && isLocationPlaceable(x, y)) {
    if (xrange > 10) return -1;
    for (x; x < xrange; x++) {
      updateShipPlacement(x, y);
    }
  } else if (orientation === "vertical" && isLocationPlaceable(x, y)) {
    if (yrange > 10) return -1;
    for (y; y < yrange; y++) {
      updateShipPlacement(x, y);
    }
  }

  console.log("PLACABLE: " + isLocationPlaceable(x, y));

  return isLocationPlaceable(x, y) ? board : false;
};

export default placeShip;
