import type { NextPage } from "next";
import React, { useState, useRef } from "react";
import Board from "../components/Board";
import boardWithRandomlyPlacedShips from "../functions/boardWithRandomlyPlacedShips";
import { playerData } from "../interfaces/types";
// import ServerTest from "../lib/components/ServerTest";
import Ship from "../components/Ship";
import { shipLengths } from "../constants";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

export interface Props {
  playerData: playerData;
  opponentData: playerData;
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>;
  setOpponentData: React.Dispatch<React.SetStateAction<playerData>>;
}

const Game = (props: Props) => {
  const width = 10;
  const [placementOrientation, setPlacementOrientation] = useState("vertical");
  const [isShipSelected, setIsShipSelected] = useState(false);
  const [selectedShipIndex, setSelectedShipIndex] = useState<number>(-1);
  const dragConstraintsRef = useRef(null);

  function newBoard() {
    return Array(width)
      .fill(0)
      .map(() => Array(width).fill(0));
  }
  // add updater for board ?

  //stored in server?
  const [userFireLocation, setUserFireLocation] = useState<number[]>([-1, -1]);
  const [userTurn, setUserTurn] = useState(true);

  return (
    <div className="main-container" ref={dragConstraintsRef}>
      <div className="game-container">
        <div className="grid-value battleship-grid">
          <Board
            orientation={placementOrientation}
            isShipSelected={isShipSelected}
            setIsShipSelected={setIsShipSelected}
            selectedShipIndex={selectedShipIndex}
            setPlayerData={props.setPlayerData}
            playerData={props.playerData}
            setUserTurn={setUserTurn}
            setUserFireLocation={setUserFireLocation}
          ></Board>
        </div>
        <div className="grid-value battleship-grid">
          <Board
            orientation={placementOrientation}
            isShipSelected={isShipSelected}
            setIsShipSelected={setIsShipSelected}
            selectedShipIndex={selectedShipIndex}
            setPlayerData={props.setOpponentData}
            playerData={props.opponentData}
            setUserTurn={setUserTurn}
            setUserFireLocation={setUserFireLocation}
          ></Board>
        </div>
      </div>
      {/* <ServerTest /> */}
    </div>
  );
};

export default Game;
