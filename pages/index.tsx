import type { NextPage } from "next";
import React, { useState, useRef } from "react";
import Board from "../lib/components/Board";
import boardWithRandomlyPlacedShips from "../lib/functions/boardWithRandomlyPlacedShips";
import { shipLength } from "../lib/interfaces/types";
import ServerTest from "../lib/components/ServerTest";
import Ship from "../lib/components/Ship";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Home: NextPage = () => {
  const width = 10;
  const [opponentBoard, setOpponentBoard] = useState<number[][]>(newBoard());
  const [playerBoard, setPlayerBoard] = useState<number[][]>(newBoard());
  const [orientation, setOrientation] = useState("vertical");
  const [isShipSelected, setIsShipSelected] = useState(false);
  const [selectedShipIndex, setSelectedShipIndex] = useState<number>(-1);
  const dragConstraintsRef = useRef(null);
  const [isShipPlaced, setIsShipPlaced] = useState([
    false, // Destroyer
    false, // Submarine
    false, // Cruiser
    false, // Battleship
    false, // Carrier
  ]);

  const shipLengths = [
    shipLength.Destroyer,
    shipLength.Submarine,
    shipLength.Cruiser,
    shipLength.Battleship,
    shipLength.Carrier,
  ];

  function newBoard() {
    return Array(width)
      .fill(0)
      .map(() => Array(width).fill(0));
  }

  function rotateShips() {
    return orientation === "vertical"
      ? setOrientation("horizontal")
      : setOrientation("vertical");
  }

  /** Resets the board with zero populated array & places ships randomly on it */
  function handleStart() {
    setOpponentBoard(() => newBoard());
    shipLengths.map((length) =>
      setOpponentBoard((prev) => boardWithRandomlyPlacedShips(length, prev))
    );

    console.table(opponentBoard);
  }

  return (
    <div className="main-container" ref={dragConstraintsRef}>
      <div className="game-container">
        <div className="grid-value battleship-grid">
          <Board
            board={playerBoard}
            orientation={orientation}
            isShipSelected={isShipSelected}
            setIsShipSelected={setIsShipSelected}
            selectedShipIndex={selectedShipIndex}
            setIsShipPlaced={setIsShipPlaced}
            isShipPlaced={isShipPlaced}
            shipLengths={shipLengths}
          ></Board>
        </div>
        {/* grid-value class for computer-side is for debugging (to view values) */}
        <div className="grid-value battleship-grid">
          <Board
            board={opponentBoard}
            orientation={orientation}
            isShipSelected={false}
            setIsShipSelected={setIsShipSelected}
            selectedShipIndex={selectedShipIndex}
            setIsShipPlaced={setIsShipPlaced}
            isShipPlaced={isShipPlaced}
            shipLengths={shipLengths}
          ></Board>
        </div>
      </div>
      {/* Placeholder function testing button */}
      <button
        style={{ height: "50px", width: "100px" }}
        onClick={() => handleStart()}
      >
        Generate
      </button>

      <ServerTest />

      <div className="ships-container">
        {shipLengths.map(
          (shipLength, index) =>
            !isShipPlaced[index] && (
              <Ship
                key={index}
                dragConstraints={dragConstraintsRef}
                onDragStart={() => {
                  setIsShipSelected(true);
                  setSelectedShipIndex(() => {
                    console.log("selected: ", index);
                    return index;
                  });
                  // For debugging atm
                }}
                orientation={orientation}
                shipLength={shipLength}
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
          bottom: "70px",
        }}
        onClick={() => rotateShips()}
      >
        Rotate
      </button>
    </div>
  );
};

export default Home;
