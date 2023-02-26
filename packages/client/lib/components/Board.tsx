import React, { useEffect } from "react";
import { playerData } from "../interfaces/types";
import { shipLengths } from "../constants";
import placeShip from "../functions/placeShip";

export interface Board {
  playerData: playerData;
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>;
  selectedShipIndex: number | -1; // I want to make this optional too
  setIsShipSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  isShipSelected?: boolean;
  orientation?: "horizontal" | "vertical";
  setUserTurn?: React.Dispatch<React.SetStateAction<boolean>>;
  setUserFireLocation?: React.Dispatch<React.SetStateAction<number[]>>;
}

/** Creates the board for placement and for the opponent */
const Board = (props: Board) => {
  // Update board after every fire trigger

  useEffect(() => {
    console.log("update");

    return () => {};
  }, []);

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
                  j,
                  props.orientation,
                  props.setPlayerData
                );
                props.setIsShipSelected(false);
              }}
              onMouseDown={() => {
                // This is to prevent type error of null provoke
                if (!props.setUserFireLocation || !props.setUserTurn) return;
                //send clicked coord to a function that checks
                props.setUserFireLocation([i, j]);
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
