import React, { useState, useEffect, useRef } from "react";
import Board from "../components/Board";
import GenerateShips from "../functions/GenerateShips";
import { Ship, ShipNames } from "../interfaces/types";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Game = () => {
  const opponentRef = useRef<HTMLDivElement>(null);
  const [opponentBoard, setOpponentBoard] = useState<number[][]>([]);
  const [playerBoard, setPlayerBoard] = useState<number[][]>([]);

  const testShip: Ship = {
    //enum = length
    type: ShipNames["Destroyer"],
  };

  const width = 10;

  // make empty board for both players
  function createBoard() {
    return Array(width)
      .fill(0)
      .map(() => Array(width).fill(0));
  }

  // x=col y=row
  // Add a thing to check for user's coordinate outside the grid
  const placeShip = (ship: Ship, x: number, y: number) => {
    let orientation: string =
      Math.round(Math.random()) >= 0.5 ? "horizontal" : "vertical";

    const updateBoard: number[][] = [...opponentBoard];
    if (orientation === "horizontal") {
      for (let i = x; i < x + ship["type"]; i++) {
        updateBoard[i][y] = ship["type"];
      }
    } else if (orientation === "vertical") {
      for (let j = y; j < y + ship["type"]; j++) {
        updateBoard[x][j] = ship["type"];
      }
    }
    setOpponentBoard(updateBoard);
  };

  function handleStart() {
    //Suppose I click on (0,0)
    placeShip(
      testShip,
      Math.floor(Math.random() * 9),
      Math.floor(Math.random() * 9)
    );
    // console.table(opponentBoard);
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
