import React, { useEffect } from "react";
import { playerData } from "../interfaces/types";
import Cell from "./Cell";

export interface Board {
  playerData: playerData;
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>;
  selectedShipIndex: number; // I want to make this optional too
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
    <div className="grid-value battleship-grid">
      {Array(10)
        .fill(0)
        .map((val, i) => (
          <div key={i} id={`column-${i}`}>
            {Array(10)
              .fill(0)
              .map((val, j) => {
                const test = props.playerData.shipInfo.find(
                  (ship) =>
                    ship.placed &&
                    ship.partArray.find(
                      (part) => part.location[0] === i && part.location[1] === j
                    )
                );

                return (
                  <Cell
                    key={j}
                    playerData={props.playerData}
                    setPlayerData={props.setPlayerData}
                    selectedShipIndex={props.selectedShipIndex}
                    setIsShipSelected={props.setIsShipSelected}
                    isShipSelected={props.isShipSelected}
                    orientation={props.orientation}
                    setUserTurn={props.setUserTurn}
                    setUserFireLocation={props.setUserFireLocation}
                    coords={[i, j]}
                  >
                    {test ? test.partArray.length : 0}
                  </Cell>
                );
              })}
          </div>
        ))}
    </div>
  );
};

export default Board;
