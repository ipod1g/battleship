import React from "react";
import placeShip from "../functions/placeShip";
import { playerData } from "../interfaces/types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  playerData: playerData;
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>;
  selectedShipIndex: number | -1; // I want to make this optional too
  setIsShipSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  isShipSelected?: boolean;
  orientation?: "horizontal" | "vertical";
  setUserTurn?: React.Dispatch<React.SetStateAction<boolean>>;
  setUserFireLocation?: React.Dispatch<React.SetStateAction<number[]>>;
  coords: number[];
}

const Cell = (props: Props) => {
  return (
    <div
      id={`row-${props.coords[1]}`}
      onMouseUp={() => {
        if (
          !props.isShipSelected ||
          !props.setIsShipSelected ||
          !props.orientation
        )
          return;
        placeShip(
          props.selectedShipIndex,
          props.coords,
          props.orientation,
          props.playerData.shipInfo
        );
        props.setIsShipSelected(false);
      }}
      onMouseDown={() => {
        // This is to prevent type error of null provoke
        if (!props.setUserFireLocation || !props.setUserTurn) return;
        //send clicked coord to a function that checks
        props.setUserFireLocation(props.coords);
      }}
    >
      {props.children}
    </div>
  );
};

export default Cell;
