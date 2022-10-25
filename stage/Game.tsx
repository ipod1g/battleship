import React, { useState, useEffect, useRef } from "react";
import Board from "../components/Board";
import boardWithRandomlyPlacedShips from "../functions/boardWithRandomlyPlacedShips ";
import { shipLength } from "../interfaces/types";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Game = () => {
  const width = 10;
  const [opponentBoard, setOpponentBoard] = useState<number[][]>(newBoard());
  const [playerBoard, setPlayerBoard] = useState<number[][]>(newBoard());

  function newBoard() {
    return Array(width)
      .fill(0)
      .map(() => Array(width).fill(0));
  }

  const shipLengths = [
    shipLength.Destroyer,
    shipLength.Carrier,
    shipLength.Battleship,
    shipLength.Submarine,
    shipLength.Cruiser,
  ];

  /** Resets the board with zero populated array & places ships randomly on it */
  function handleStart() {
    setOpponentBoard(() => newBoard());
    shipLengths.map((length) =>
      setOpponentBoard((prev) => boardWithRandomlyPlacedShips(length, prev))
    );

    console.table(opponentBoard);
  }

  return (
    <div className="main-container">
      <div className="game-container">
        <div className="grid-user battleship-grid">
          <Board board={playerBoard}></Board>
        </div>
        <div className="grid-computer battleship-grid">
          <Board board={opponentBoard}></Board>
        </div>
      </div>
      <button
        style={{ height: "100px", width: "100px" }}
        onClick={() => handleStart()}
      >
        Generate
      </button>
    </div>
  );
};

export default Game;
