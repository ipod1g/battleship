import React, { useState, useEffect, useRef } from "react";
import Board from "../components/Board";
import placeShipsRandom from "../functions/placeShipsRandom";
import { Ship, ShipNames } from "../interfaces/types";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Game = () => {
  const opponentRef = useRef<HTMLDivElement>(null);
  const [opponentBoard, setOpponentBoard] = useState<number[][]>([]);
  const [playerBoard, setPlayerBoard] = useState<number[][]>([]);

  const Ships: Ship[] = [
    {
      type: ShipNames["Destroyer"],
    },
    {
      type: ShipNames["Submarine"],
    },
    {
      type: ShipNames["Cruiser"],
    },
    {
      type: ShipNames["Battleship"],
    },
    {
      type: ShipNames["Carrier"],
    },
  ];

  const width = 10;

  // make empty board for both players
  function createBoard(): number[][] {
    return Array(width)
      .fill(0)
      .map(() => Array(width).fill(0));
  }

  function handleStart() {
    //resets the board everytime this function is called
    setOpponentBoard((prev) => prev.map((column) => column.fill(0)));
    setTimeout(() => {
      Ships.map((_, i) =>
        placeShipsRandom(Ships[i], opponentBoard, setOpponentBoard)
      );
      console.table(opponentBoard);
    }, 5);
  }

  useEffect(() => {
    setOpponentBoard(() => createBoard());
    setPlayerBoard(() => createBoard());
  }, []);

  return (
    <div className="main-container">
      <div className="game-container">
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
