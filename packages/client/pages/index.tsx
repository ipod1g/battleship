import type { NextPage } from "next";
import React, { useState, useRef } from "react";
import Board from "../lib/components/Board";
import boardWithRandomlyPlacedShips from "../lib/functions/boardWithRandomlyPlacedShips";
import { shipLength } from "../lib/interfaces/types";
import ServerTest from "../lib/components/ServerTest";
import Ship from "../lib/components/Ship";
import { useForceUpdate } from "framer-motion";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Home: NextPage = () => {
  const width = 10;
  const [opponentBoard, setOpponentBoard] = useState<number[][]>(newBoard());
  const [playerBoard, setPlayerBoard] = useState<number[][]>(newBoard());
  const [placementOrientation, setPlacementOrientation] = useState("vertical");
  const [isShipSelected, setIsShipSelected] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [selectedShipIndex, setSelectedShipIndex] = useState<number>(-1);
  const dragConstraintsRef = useRef(null);

  const shipLengths = [
    shipLength.Destroyer,
    shipLength.Submarine,
    shipLength.Cruiser,
    shipLength.Battleship,
    shipLength.Carrier,
  ];

  const [playerData, setPlayerData] = useState({
    board: playerBoard,
    shipInfo: [
      {
        shipType: "destroyer",
        placed: false,
        status: "",
      },
      {
        shipType: "submarine",
        placed: false,
        status: "",
      },
      {
        shipType: "cruiser",
        placed: false,
        status: "",
      },
      {
        shipType: "battleship",
        placed: false,
        status: "",
      },
      {
        shipType: "carrier",
        placed: false,
        status: "",
      },
    ],
  });

  const [opponentData, setOpponentData] = useState({
    board: opponentBoard,
    shipInfo: [
      {
        shipType: "destroyer",
        placed: false,
        status: "",
      },
      {
        shipType: "submarine",
        placed: false,
        status: "",
      },
      {
        shipType: "cruiser",
        placed: false,
        status: "",
      },
      {
        shipType: "battleship",
        placed: false,
        status: "",
      },
      {
        shipType: "carrier",
        placed: false,
        status: "",
      },
    ],
  });

  function newBoard() {
    return Array(width)
      .fill(0)
      .map(() => Array(width).fill(0));
  }

  function rotateShips() {
    return placementOrientation === "vertical"
      ? setPlacementOrientation("horizontal")
      : setPlacementOrientation("vertical");
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

  function handleReset() {
    setPlayerData(() => {
      let prev = { ...playerData };
      prev.board = newBoard();
      prev.shipInfo.map((info) => (info.placed = false));
      return prev;
    });
  }

  return (
    <div className="main-container" ref={dragConstraintsRef}>
      <div className="game-container">
        <div className="grid-value battleship-grid">
          <Board
            orientation={placementOrientation}
            isShipSelected={isShipSelected}
            setIsShipSelected={setIsShipSelected}
            selectedShipIndex={selectedShipIndex}
            setPlayerData={setPlayerData}
            playerData={playerData}
            shipLengths={shipLengths}
            gameStart={gameStart}
          ></Board>
        </div>
        {/* grid-value class for computer-side is for debugging (to view values) */}
        <div className="grid-value battleship-grid">
          <Board
            orientation={placementOrientation}
            isShipSelected={false}
            setIsShipSelected={setIsShipSelected}
            selectedShipIndex={selectedShipIndex}
            playerData={opponentData}
            setPlayerData={setOpponentData}
            shipLengths={shipLengths}
            gameStart={gameStart}
          ></Board>
        </div>
      </div>
      <ServerTest />
      <div className="ships-container">
        {playerData.shipInfo.map(
          (ship, index) =>
            !ship.placed && (
              <Ship
                key={index}
                dragConstraints={dragConstraintsRef}
                onDragStart={() => {
                  setIsShipSelected(true);
                  setSelectedShipIndex(() => {
                    // console.log("selected idx: ", index);
                    console.log("name: ", playerData.shipInfo[index].shipType);
                    return index;
                  });
                }}
                orientation={placementOrientation}
                shipLength={shipLengths[index]}
                index={index}
              />
            )
        )}
      </div>
      {/* Placeholder function testing button */}
      <button
        style={{
          height: "50px",
          width: "100px",
          position: "absolute",
          bottom: "40px",
        }}
        onClick={() => rotateShips()}
      >
        Rotate
      </button>
      {/* Placeholder function testing button */}
      <button
        style={
          gameStart ? { display: "none" } : { height: "50px", width: "100px" }
        }
        onClick={() => handleStart()}
      >
        Start
      </button>
      <button
        style={{
          height: "50px",
          width: "100px",
          position: "absolute",
          bottom: "40vh",
          left: "150px",
        }}
        onClick={() => handleReset()}
      >
        Reset
      </button>
    </div>
  );
};

export default Home;
