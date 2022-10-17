import React, { useState, useEffect, useRef } from "react";
import Board from "../components/Board";
import GenerateShips from "../functions/GenerateShips";
import { Ship } from "../interfaces/types";
// import useGenerateShips from '../hooks/GenerateShips';

interface IGame {
  boardArray: JSX.Element[];
  shipArray: Ship[];
}

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Game = () => {
  const [userSquares, setUserSquares] = useState<IGame["boardArray"]>([]);
  const [opponentSquares, setOpponentSquares] = useState<IGame["boardArray"]>(
    []
  );
  const opponentRef = useRef<HTMLDivElement>(null);

  const width = 10;
  const [shipArray, setShipArray] = useState<IGame["shipArray"]>([
    {
      name: "destroyer",
      directions: [
        [0, 1],
        [0, width],
      ],
    },
    {
      name: "submarine",
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: "cruiser",
      directions: [
        [0, 1, 2],
        [0, width, width * 2],
      ],
    },
    {
      name: "battleship",
      directions: [
        [0, 1, 2, 3],
        [0, width, width * 2, width * 3],
      ],
    },
    {
      name: "carrier",
      directions: [
        [0, 1, 2, 3, 4],
        [0, width, width * 2, width * 3, width * 4],
      ],
    },
  ]);

  //
  function handleStart() {
    GenerateShips(opponentSquares, shipArray[0], opponentRef);
    GenerateShips(opponentSquares, shipArray[1], opponentRef);
    GenerateShips(opponentSquares, shipArray[2], opponentRef);
    GenerateShips(opponentSquares, shipArray[3], opponentRef);
    GenerateShips(opponentSquares, shipArray[4], opponentRef);
  }

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <div className="container">
        <div className="grid-user battleship-grid">
          <Board width={10} setSquares={setUserSquares}></Board>
        </div>
        <div className="grid-computer battleship-grid" ref={opponentRef}>
          <Board width={10} setSquares={setOpponentSquares}></Board>
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
