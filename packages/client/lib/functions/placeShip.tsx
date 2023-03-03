import React from "react";
import { playerData, ShipInfo, ShipPart } from "../interfaces/types";
import { shipLengths } from "../constants";
import { shipsInCoord } from "./shipsInCoord";

/**Places down ship on drag ending point respective to the cursor position
 *
 * @param selectedShipIndex is the index of selected Ship
 * Working with index here because there are 2 diff ships with same length of 3
 * @returns updated board: number[][] after placement
 */
const placeShip = (
  selectedShipIndex: number | -1,
  cellCoords: number[],
  orientation: "horizontal" | "vertical",
  shipInfo: playerData["shipInfo"]
) => {
  // Create a deep copy of shipInfo to avoid mutating state

  const shipLength = shipLengths[selectedShipIndex];
  const [x, y] = cellCoords;
  const xrange = x + shipLength;
  const yrange = y + shipLength;

  const goesOutsideGrid = () => {
    if (orientation === "horizontal" && xrange > 10) {
      console.log("goesOutsideGrid");
      return true;
    }
    if (orientation === "vertical" && yrange > 10) {
      console.log("goesOutsideGrid");
      return true;
    }
    return undefined;
  };

  /** True if neighbouring x or y + ... ship length coordinates is not occupied + !isOutsideGrid */
  const isLocationPlaceable = (x: number, y: number) => {
    if (orientation === "horizontal") {
      for (let i = x; i < xrange; i++) {
        console.log("Checking for ship at " + i + ", " + y);
        const foundShips = shipsInCoord(shipInfo, [i, y]);
        if (foundShips) {
          console.log("shipsFound", foundShips);
          return undefined;
        }
      }
    } else {
      for (let j = y; j < yrange; j++) {
        const foundShips = shipsInCoord(shipInfo, [x, j]);
        if (foundShips) {
          console.log("shipsFound", foundShips);

          return undefined;
        }
      }
    }

    return true;
  };

  if (goesOutsideGrid() || !isLocationPlaceable(x, y)) {
    console.log("PLACABLE: " + false);
    return undefined;
  }

  const partArray: ShipPart[] = Array(shipLength);

  for (let i = 0; i < shipLength; i++) {
    partArray[i] = {
      location: orientation === "horizontal" ? [x + i, y] : [x, y + i],
      hit: false,
    };
  }

  shipInfo[selectedShipIndex].partArray = partArray;
  shipInfo[selectedShipIndex].placed = true;

  console.log("PLACABLE: " + true);
  return shipInfo;
};

export default placeShip;
