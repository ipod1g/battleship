import React, { useState, useEffect, useRef } from "react";
import Board from "../components/Board";
import GenerateShips from "../functions/GenerateShips";
import { Ship, ShipNames } from "../interfaces/types";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Game = () => {
  const opponentRef = useRef<HTMLDivElement>(null);
  const [opponentBoard, setOpponentBoard] = useState<number[][]>([]);
  const [playerBoard, setPlayerBoard] = useState<number[][]>([]);

  const width = 10;

  function createBoard() {
    return Array(width)
      .fill(0)
      .map(() => Array(width).fill(0));
  }

  // make board for both players

  function handleStart() {
    // GenerateShips(shipArray[0], opponentRef);
    // GenerateShips(shipArray[1], opponentRef);
    // GenerateShips(shipArray[2], opponentRef);
    // GenerateShips(shipArray[3], opponentRef);
    // GenerateShips(shipArray[4], opponentRef);
  }

  useEffect(() => {
    setOpponentBoard(() => createBoard());
    setPlayerBoard(() => createBoard());
  }, []);

  return (
    <div>
      <div className="container">
        <div className="grid-user battleship-grid">
          <Board board={playerBoard}></Board>
        </div>
        <div className="grid-computer battleship-grid" ref={opponentRef}>
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
