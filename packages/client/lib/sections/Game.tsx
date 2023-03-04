import React, { useState, useRef, useEffect } from "react";
import Board from "../components/Board";
import { playerData } from "../interfaces/types";
// import ServerTest from "../lib/components/ServerTest";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

export interface Props {
  playerData: playerData;
  opponentData: playerData;
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>;
  setOpponentData: React.Dispatch<React.SetStateAction<playerData>>;
}

const Game = (props: Props) => {
  const [selectedShipIndex, setSelectedShipIndex] = useState<number>(-1);

  const [userFireLocation, setUserFireLocation] = useState<number[]>([-1, -1]);
  const [userTurn, setUserTurn] = useState(true);

  /** update board array after checking with placed location */
  function updateHit(
    location: number[],
    playerData: playerData,
    setPlayerData: React.Dispatch<React.SetStateAction<playerData>>
  ) {
    // condition for userturn

    const x = location[0];
    const y = location[1];

    // If location already shot, alert pick another location

    // const hitStatus = checkHit(location, props.playerData);
    const { index, shipHit } = checkHit(location, playerData);
    console.log("index of the placedLocation: " + index);
    console.log("shipType hit: " + shipHit);

    // IF MISS

    if (index === -1) {
      //first number as row
      console.log("miss");

      // Make this piece of code reusable -> updates board and placedlocation
      setPlayerData((prev) => {
        // const updatedBoard = prev.board.map((row, i) => {
        //   if (i === x) {
        //     return row.map((cell, j) => (j === y ? -1 : cell));
        //   }
        //   return row;
        // });
        // const updatedMissedShotsArray = prev.shipInfo.map((ship, i) =>
        //   i === index
        //     ? {
        //         ...ship,
        //         placedLocation: [...ship.placedLocation, [-1, -1]],
        //       }
        //     : ship
        // );
        return {
          ...prev,
          // shipInfo: updatedMissedShotsArray,
        };
      });
    } else {
      console.log(props.playerData.shipInfo[shipHit]?.shipType + "-" + index);

      setPlayerData((prev) => {
        // const updatedBoard = prev.board.map((row, i) => {
        //   if (i === x) {
        //     return row.map((cell, j) => (j === y ? -9 : cell));
        //   }
        //   return row;
        // });

        // prev.shipInfo[shipHit].placedLocation[index] = [-x, -y];

        console.log("PLZ: " + JSON.stringify(prev.shipInfo));
        return { ...prev, shipInfo: prev.shipInfo };
      });
    }
  }

  /** Returns the index of the part of ship hit
   * This code initializes indexAndShipType with [-1, -1] to represent the case where the location is not found
   */
  function checkHit(location: number[], board: playerData) {
    const indexAndShipType = board.shipInfo.reduce(
      (result, info, shipType) => {
        const index = info.partArray.findIndex(
          (locations) => JSON.stringify(locations) === JSON.stringify(location)
        );
        if (index >= 0) {
          result = [index, shipType];
        }
        return result;
      },
      [-1, -1]
    );

    // return indexAndShipType;
    return { index: indexAndShipType[0], shipHit: indexAndShipType[1] };
  }

  useEffect(() => {
    console.log(userFireLocation);
    if (userTurn) {
      updateHit(userFireLocation, props.opponentData, props.setOpponentData);
      console.log(userTurn);
    } else {
      console.log(userTurn);
      // updateHit(userFireLocation, props.playerData, props.setPlayerData);
    }
    // updateHit(userFireLocation);
    console.log(props.opponentData);

    return () => {};
  }, [userFireLocation]);

  useEffect(() => {
    console.log("playerdata changed");

    return () => {};
  }, [props.playerData]);

  return (
    <div className="main-container">
      <div className="game-container">
        <Board
          selectedShipIndex={selectedShipIndex}
          setPlayerData={props.setPlayerData}
          playerData={props.playerData}
          setUserTurn={setUserTurn}
          setUserFireLocation={setUserFireLocation}
        />

        <Board
          selectedShipIndex={selectedShipIndex}
          setPlayerData={props.setOpponentData}
          playerData={props.opponentData}
          setUserTurn={setUserTurn}
          setUserFireLocation={setUserFireLocation}
        />
      </div>
      {/* <ServerTest /> */}
    </div>
  );
};

export default Game;
