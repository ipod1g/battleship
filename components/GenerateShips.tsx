import React, { RefObject, useEffect, useState } from "react";
import { IGenerateShipsArguments } from "../interfaces/types";

export default function GenerateShips(
  opponentSquares: any[],
  ship: IGenerateShipsArguments["ship"],
  opponentRef: RefObject<HTMLDivElement>
  // setShipArray: IArguments['setShipArray']
) {
  // const setShipArrayDefined = (array: any[]) => {
  //   setShipArray?.(array);
  // };

  const width = 10;
  let randomDirection = Math.floor(Math.random() * ship.directions.length);
  let currentShipDirection = ship.directions[randomDirection];
  let direction: number = 0;

  if (randomDirection === 0) {
    //Horizontal
    direction = 1;
  } else if (randomDirection === 1) {
    //Vertical
    direction = 10;
  }

  let randomStart = Math.abs(
    Math.floor(
      Math.random() * opponentSquares.length -
        ship.directions[0].length * direction
    )
  );

  console.log(
    `Ship direction of ${JSON.stringify(ship)} and ` + currentShipDirection
  );
  // console.log(`Referring to` + opponentRef.current?.children[0]);
  console.log(randomStart);

  const isTaken = currentShipDirection.some((index) =>
    opponentRef.current?.children[randomStart + index].classList.contains(
      "placed"
    )
  );

  const isAtRightEdge: boolean = currentShipDirection.some(
    (index) => (randomStart + index) % width === width - 1
  );
  const isAtLeftEdge: boolean = currentShipDirection.some(
    (index) => (randomStart + index) % width === 0
  );

  if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
    currentShipDirection.forEach((index) => {
      opponentRef.current?.children[randomStart + index].classList.add(
        "placed",
        ship.name
      );
      console.log("RANDOM NUMBER IS " + (randomStart + index) + "\n");
      // set a counter to increment
    });
  }
  // When it is vertical but at the left and right edge
  else if (!isTaken && direction % 10 === 0) {
    currentShipDirection.forEach((index) => {
      opponentRef.current?.children[randomStart + index].classList.add(
        "placed",
        ship.name
      );
      console.log("RANDOM NUMBER IS " + (randomStart + index) + "\n");
    });
  }

  // LOOP THE GENERATION UNTIL THERE IS NO SHIP WITH NOT TAKEN
  // IF THE SHIP NAME IS NOW TAKEN, THEN STOP THE LOOP

  // else if (ship.name,) {
  // }
  // else GenerateShips(opponentSquares, ship, opponentRef);

  // return { isAtLeftEdge, isAtRightEdge, randomStart, currentShipDirection };
}
