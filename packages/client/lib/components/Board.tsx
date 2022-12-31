import React from "react";
import { playerData } from "../interfaces/types";
import { shipLengths } from "../constants";

export interface Board {
  playerData: playerData;
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>;
  selectedShipIndex: number; // I want to make this optional too
  setIsShipSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  isShipSelected?: boolean;
  orientation?: string;
  setUserTurn?: React.Dispatch<React.SetStateAction<boolean>>;
  setUserFireLocation?: React.Dispatch<React.SetStateAction<number[]>>;
}

/** Creates the board for placement and for the opponent */
const Board = (props: Board) => {
  /**Places down ship on drag ending point respective to the cursor position
   *
   * @param index is the index of selected Ship
   * Working with index here because there are 2 diff ships with same length of 3
   * @returns updated board after placement
   */
  function placeShip(board: number[][], index: number, x: number, y: number) {
    if (x === -1 || y === -1) return -1;
    const xrange = x + shipLengths[index];
    const yrange = y + shipLengths[index];

    /** True if neighbouring x or y + ... ship length coordinates is not occupied + !isOutsideGrid */
    const isLocationPlaceable = (x: number, y: number) => {
      if (props.orientation === "horizontal") {
        for (let i = x; i < x + shipLengths[index]; i++) {
          if (board[i][y] !== 0) {
            return false;
          }
        }
      }
      if (props.orientation === "vertical") {
        for (let j = y; j < y + shipLengths[index]; j++) {
          if (board[x][j] !== 0) {
            return false;
          }
        }
      }
      return true;
    };

    const updateShipPlaced = (index: number) => {
      props.setPlayerData((prev) => {
        prev.shipInfo.map((info, idx) =>
          idx === index ? (info.placed = true) : info
        );
        return prev;
      });
    };

    if (props.orientation === "horizontal" && isLocationPlaceable(x, y)) {
      if (xrange > 10) return -1;
      for (x; x < xrange; x++) {
        board[x][y] = shipLengths[index];
      }
      updateShipPlaced(index);
    } else if (props.orientation === "vertical" && isLocationPlaceable(x, y)) {
      if (yrange > 10) return -1;
      for (y; y < yrange; y++) {
        board[x][y] = shipLengths[index];
      }
      updateShipPlaced(index);
    }

    return board;
  }
  return (
    <>
      {props.playerData.board.map((column, i) => (
        <div key={i} id={`column-${i}`}>
          {column.map((value, j) => (
            <div
              key={j}
              id={`row-${j}`}
              onMouseUp={() => {
                if (!props.isShipSelected || !props.setIsShipSelected) return;
                placeShip(
                  props.playerData.board,
                  props.selectedShipIndex,
                  i,
                  j
                );
                props.setIsShipSelected(false);
              }}
              onMouseDown={() => {
                if (!props.setUserFireLocation || !props.setUserTurn) return;
                //send clicked coord to a function that checks

                props.setUserFireLocation([i, j]);
                props.setUserTurn(!false);
              }}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Board;
