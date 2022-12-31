import type { NextPage } from "next";
import React, { useState, useRef } from "react";
import Board from "../lib/components/Board";
import boardWithRandomlyPlacedShips from "../lib/functions/boardWithRandomlyPlacedShips";
import { shipLength } from "../lib/interfaces/types";
// import ServerTest from "../lib/components/ServerTest";
import Ship from "../lib/components/Ship";
import Starter from "../lib/sections/starter";
import Game from "../lib/sections/game";
import { initialData, shipLengths } from "../lib/constants";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Home: NextPage = () => {
  const width = 10;
  const [gameStart, setGameStart] = useState(false);

  const [opponentBoard, setOpponentBoard] = useState<number[][]>(newBoard());
  const [playerBoard, setPlayerBoard] = useState<number[][]>(newBoard());

  const [playerData, setPlayerData] = useState({
    board: playerBoard,
    shipInfo: initialData,
  });

  const [opponentData, setOpponentData] = useState({
    board: opponentBoard,
    shipInfo: initialData,
  });

  function newBoard() {
    return Array(width)
      .fill(0)
      .map(() => Array(width).fill(0));
  }

  /** Resets the board with zero populated array & places ships randomly on it */
  function handleStart() {
    // Can comment away the below condition if you want to debug
    if (!playerData.shipInfo.every((ship) => ship.placed === true)) {
      return alert("please place all ships");
    }
    setOpponentBoard(() => newBoard());
    shipLengths.map((length) => {
      setOpponentData({
        ...opponentData,
        board: boardWithRandomlyPlacedShips(length, opponentBoard),
      });
    });
    setGameStart(true);
    console.table(opponentData.board);
  }

  return (
    <div className="starter-container">
      {!gameStart && (
        <>
          <Starter
            setGameStart={setGameStart}
            playerData={playerData}
            opponentData={opponentData}
            setPlayerData={setPlayerData}
            setOpponentData={setOpponentData}
          />
          <button onClick={() => handleStart()}>Start</button>
        </>
      )}
      {gameStart && (
        <Game
          playerData={playerData}
          opponentData={opponentData}
          setPlayerData={setPlayerData}
          setOpponentData={setOpponentData}
        />
      )}
    </div>
  );
};

export default Home;
