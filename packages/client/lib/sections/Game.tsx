import type { NextPage } from "next";
import React, { useState, useRef, useEffect } from "react";
import Board from "../components/Board";
import boardWithRandomlyPlacedShips from "../functions/generateRandomPlacements";
import { playerData } from "../interfaces/types";
// import ServerTest from "../lib/components/ServerTest";
import Ship from "../components/Ship";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

export interface Props {
  playerData: playerData;
  opponentData: playerData;
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>;
  setOpponentData: React.Dispatch<React.SetStateAction<playerData>>;
}

const Game = (props: Props) => {
  const [selectedShipIndex, setSelectedShipIndex] = useState<number>(-1);
  const [mounted, setMounted] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [userFireLocation, setUserFireLocation] = useState<number[] | null>(
    null
  );
  const [userTurn, setUserTurn] = useState(true);
  const [playerMissedShotsArray, setPlayerMissedShotsArray] = useState<
    number[][]
  >([]);
  const [opponentMissedShotsArray, setOpponentMissedShotsArray] = useState<
    number[][]
  >([]);

  /** Update board array after checking with ship's partArray locations */
  function updateHit(
    location: number[],
    playerData: playerData,
    setPlayerData: React.Dispatch<React.SetStateAction<playerData>>,
    setMissedShotsArray: React.Dispatch<React.SetStateAction<number[][]>>
  ) {
    const { shipPart, shipHit } = checkHit(location, playerData);
    console.log(checkHit(location, playerData));
    console.log("shipPart: " + shipPart);
    console.log("shipType hit: " + shipHit);

    // IF MISS
    if (shipPart === -1) {
      //first number as row
      console.log("miss");

      setMissedShotsArray((prev) => {
        prev = [...prev, location];
        return prev;
      });
      console.log("missed shots: " + playerMissedShotsArray);
    } else {
      console.log(
        props.playerData.shipInfo[shipHit]?.shipType + "-" + shipPart
      );

      setPlayerData((prev) => {
        prev.shipInfo[shipHit].partArray[shipPart].hit = true;

        return { ...prev, shipInfo: prev.shipInfo };
      });
    }
  }

  /** Returns the index of the part of ship hit
   * This code initializes indexAndShipType with [-1, -1] to represent the case where the location is not found
   */
  function checkHit(checkLocation: number[], playerData: playerData) {
    const shipPartAndShipType = playerData.shipInfo.reduce(
      (result, info, shipType) => {
        const shipPart = info.partArray.findIndex(
          (part) =>
            JSON.stringify(part.location) === JSON.stringify(checkLocation)
        );
        if (shipPart >= 0) {
          result = [shipPart, shipType];
        }
        return result;
      },
      [-1, -1]
    );

    return {
      shipPart: shipPartAndShipType[0],
      shipHit: shipPartAndShipType[1],
    };
  }

  const missedLocationClickCheck = (userFireLocation: number[]) => {
    return playerMissedShotsArray.some(
      (arr) => arr[0] === userFireLocation[0] && arr[1] === userFireLocation[1]
    );
  };

  const areAllShipHit = (data: playerData) => {
    return data.shipInfo.every((ship) =>
      ship.partArray.every((partStatus) => partStatus.hit === true)
    );
  };

  const duplicateLocationClickCheck = (
    userFireLocation: number[],
    playerData: playerData
  ) => {
    return playerData.shipInfo.some(
      (ship) =>
        ship.placed &&
        ship.partArray.some(
          (part) =>
            part.location[0] === userFireLocation[0] &&
            part.location[1] === userFireLocation[1] &&
            part.hit === true
        )
    );
  };

  /**
   * For User's turn
   */
  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }
    if (!userFireLocation) return;

    if (
      missedLocationClickCheck(userFireLocation) ||
      duplicateLocationClickCheck(userFireLocation, props.opponentData)
    ) {
      alert("You have already clicked this location");
    } else {
      updateHit(
        userFireLocation,
        props.opponentData,
        props.setOpponentData,
        setPlayerMissedShotsArray
      );

      setUserTurn(false);
    }
    setUserFireLocation(null);

    //Game end
    if (areAllShipHit(props.playerData)) {
      alert("AI WIN");
    } else if (areAllShipHit(props.opponentData)) {
      alert("USER WIN");
    }
  }, [userFireLocation]);

  /**
   * This useEffect is used to update the userTurn after the async code above completes
   * Actions here are only for the AI / opponent
   * Put code for opponent's response here
   */
  useEffect(() => {
    if (!userTurn) {
      setTimeout(() => {
        let validTargetFound = false;
        while (!validTargetFound) {
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          if (
            !missedLocationClickCheck([x, y]) &&
            !duplicateLocationClickCheck([x, y], props.playerData)
          ) {
            updateHit(
              [x, y],
              props.playerData,
              props.setPlayerData,
              setOpponentMissedShotsArray
            );
            console.log("Valid Target Found: " + [x, y]);
            validTargetFound = true;
          }
        }
        setUserTurn(true);
      }, 500);
    }
  }, [userTurn]);

  return (
    <div className="main-container">
      <div className="game-container">
        <Board
          selectedShipIndex={selectedShipIndex}
          setPlayerData={props.setPlayerData}
          playerData={props.playerData}
          userTurn={userTurn}
          setUserTurn={setUserTurn}
          setUserFireLocation={setUserFireLocation}
          missedShotsArray={opponentMissedShotsArray}
        />

        <Board
          selectedShipIndex={selectedShipIndex}
          setPlayerData={props.setOpponentData}
          playerData={props.opponentData}
          userTurn={userTurn}
          setUserTurn={setUserTurn}
          setUserFireLocation={setUserFireLocation}
          missedShotsArray={playerMissedShotsArray}
          isClickble
        />
      </div>
      {/* <ServerTest /> */}
    </div>
  );
};

export default Game;
