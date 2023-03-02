import type { NextPage } from "next";
import React, { useState, useRef, createContext, useMemo } from "react";
import Board from "../lib/components/Board";
import generateRandomPlacements from "../lib/functions/generateRandomPlacements";
import { shipLength } from "../lib/interfaces/types";
// import ServerTest from "../lib/components/ServerTest";
import Ship from "../lib/components/Ship";
import Starter from "../lib/sections/starter";
import Game from "../lib/sections/game";
import { initialData, shipLengths } from "../lib/constants";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

// export const UserDataContext = createContext({
//   playerData: {
//     board: [[]],
//     shipInfo: {
//       shipType: "destroyer",
//       placed: false,
//       placedLocation: [],
//     },
//   },
//   setPlayerData: (data: any) => {},
// });

// UserDataContext.displayName = "UserDataContext";

const Home: NextPage = () => {
  const width = 10;
  const [gameStart, setGameStart] = useState(false);

  const [playerData, setPlayerData] = useState({
    board: newBoard(),
    shipInfo: initialData,
  });

  const [opponentData, setOpponentData] = useState({
    board: newBoard(),
    shipInfo: initialData,
  });

  // const userdata = useMemo(() => ({ playerData, setPlayerData }), [playerData]);

  function newBoard() {
    return Array(width)
      .fill(0)
      .map(() => Array(width).fill(0));
  }

  /** Resets the board with zero populated array & places ships randomly on it */
  function handleStart() {
    if (!playerData.shipInfo.every((ship) => ship.placed === true)) {
      return alert("please place all ships");
    }

    generateRandomPlacements(opponentData.board, setOpponentData);
    setGameStart(true);
    console.table(playerData.board);
  }

  return (
    <div className="starter-container">
      {/* <UserDataContext.Provider value={userdata}> */}
      {/* {useMemo(
          () => */}
      {!gameStart ? (
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
      ) : (
        <Game
          playerData={playerData}
          opponentData={opponentData}
          setPlayerData={setPlayerData}
          setOpponentData={setOpponentData}
        />
      )}
      {/*, [] */}
      {/* )} */}
      {/* </UserDataContext.Provider> */}
    </div>
  );
};

export default Home;
