import React, { useState, useEffect, useRef } from "react";
import Board from "../components/Board";
import boardWithRandomlyPlacedShips from "../functions/boardWithRandomlyPlacedShips ";
import { ShipNames } from "../interfaces/types";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Game = () => {
  const [opponentBoard, setOpponentBoard] = useState<number[][]>([]);
  const [playerBoard, setPlayerBoard] = useState<number[][]>([]);

  const Ships = [
    ShipNames.Destroyer,
    ShipNames.Carrier,
    ShipNames.Battleship,
    ShipNames.Submarine,
    ShipNames.Cruiser,
  ];

  const width = 10;

  /** Resets the board with zero populated array & places ships randomly on it */
  function handleStart() {
    setOpponentBoard((prev) => prev.map((column) => column.fill(0)));
    Ships.map((length) =>
      setOpponentBoard(() =>
        boardWithRandomlyPlacedShips(length, opponentBoard)
      )
    );

    console.table(opponentBoard);
  }

  useEffect(() => {
    /** Make new width*width zero populated board for both players  */
    function newBoard(): number[][] {
      return Array(width)
        .fill(0)
        .map(() => Array(width).fill(0));
    }

    setOpponentBoard(() => newBoard());
    setPlayerBoard(() => newBoard());
  }, []);

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
