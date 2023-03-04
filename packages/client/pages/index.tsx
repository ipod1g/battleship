import type { NextPage } from "next";
import React, { useState } from "react";
import generateRandomPlacements from "../lib/functions/generateRandomPlacements";
import { playerData } from "../lib/interfaces/types";
// import ServerTest from "../lib/components/ServerTest";
import Starter from "../lib/sections/Starter";
import Game from "../lib/sections/Game";
import { initialData } from "../lib/constants";

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

  // const [playerBoard, setPlayerBoard] = useState<number[][]>(newBoard());
  // const [opponentBoard, setOpponentBoard] = useState<number[][]>(newBoard());

  const [playerData, setPlayerData] = useState<playerData>({
    shipInfo: initialData,
  });

  const [opponentData, setOpponentData] = useState<playerData>({
    shipInfo: initialData,
  });

  /** Resets the board with zero populated array & places ships randomly on it */
  function handleStart() {
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

    generateRandomPlacements(setOpponentData, opponentData);
    setGameStart(true);
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
