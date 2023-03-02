import type { NextPage } from "next";
import React, { useState, useRef } from "react";
import Board from "../lib/components/Board";
import generateRandomPlacements from "../lib/functions/generateRandomPlacements";
import { shipLength } from "../lib/interfaces/types";
// import ServerTest from "../lib/components/ServerTest";
import Ship from "../lib/components/Ship";
import Starter from "../lib/sections/Starter";
import Game from "../lib/sections/Game";
import { initialData, shipLengths } from "../lib/constants";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Home: NextPage = () => {
  const width = 10;
  const [gameStart, setGameStart] = useState(false);

  // const [playerBoard, setPlayerBoard] = useState<number[][]>(newBoard());
  // const [opponentBoard, setOpponentBoard] = useState<number[][]>(newBoard());

  const [playerData, setPlayerData] = useState({
    board: newBoard(),
    shipInfo: initialData,
  });

  const [opponentData, setOpponentData] = useState({
    board: newBoard(),
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
    // if (!playerData.shipInfo.every((ship) => ship.placed === true)) {
    //   return alert("please place all ships");
    // }

    // setOpponentBoard(() => newBoard());
    // shipLengths.map((length) => {
    //   setOpponentData({
    //     ...opponentData,
    //     board: boardWithRandomlyPlacedShips(length, opponentBoard),
    //   });
    // });
    // setGameStart(true);
    // console.table(opponentData.board);

    // shipLengths.map((length) => {
    //   setPlayerData({
    //     ...playerData,
    //     board: boardWithRandomlyPlacedShips(length, playerBoard),
    //   });
    // });

    generateRandomPlacements(opponentData.board, setOpponentData);
    setGameStart(true);
    console.table(playerData.board);
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
