import React, { useEffect } from "react";
import { playerData } from "../interfaces/types";
import Cell from "./Cell";

export interface Board {
  playerData: playerData;
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>;
  selectedShipIndex: number;
  setIsShipSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  isShipSelected?: boolean;
  orientation?: "horizontal" | "vertical";
  userTurn?: boolean;
  setUserTurn?: React.Dispatch<React.SetStateAction<boolean>>;
  setUserFireLocation?: React.Dispatch<React.SetStateAction<number[] | null>>;
  missedShotsArray?: number[][];
  isClickble?: boolean;
}

/** Creates the board for placement and for the opponent */
const Board = (props: Board) => {
  return (
    <div className="grid-value battleship-grid">
      {Array(10)
        .fill(0)
        .map((val, i) => (
          <div key={i} id={`column-${i}`}>
            {Array(10)
              .fill(0)
              .map((val, j) => {
                const shipWithMatchingLocation = props.playerData.shipInfo.find(
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
                    isClickable={props.isClickble}
                    userTurn={props.userTurn}
                  >
                    {/* {shipWithMatchingLocation ? shipWithMatchingLocation.partArray.length : 0} */}
                    {shipWithMatchingLocation
                      ? shipWithMatchingLocation.partArray.find(
                          (part) =>
                            part.location[0] === i && part.location[1] === j
                        )?.hit
                        ? `-${
                            props.playerData.shipInfo.indexOf(
                              shipWithMatchingLocation
                            ) + 1
                            // The addition of 1 is due to the number 0 being occupied by empty board cell
                            // Be aware of this difference in value when identifying ships
                          }`
                        : `${
                            props.playerData.shipInfo.indexOf(
                              shipWithMatchingLocation
                            ) + 1
                          }`
                      : props.missedShotsArray?.some(
                          (location) => location[0] === i && location[1] === j
                        )
                      ? "-9"
                      : "0"}
                  </Cell>
                );
              })}
          </div>
        ))}
    </div>
  );
};

export default Board;
