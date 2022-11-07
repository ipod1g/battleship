import React, { useState, useEffect, useRef, useMemo } from "react";
import Board from "../components/Board";
import boardWithRandomlyPlacedShips from "../functions/boardWithRandomlyPlacedShips";
import { shipLength } from "../interfaces/types";
import { motion } from "framer-motion";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Game = () => {
  const width = 10;
  const gridSize = "4.6vmin";
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

  /**Places down ship on drag ending point respective to the cursor position
   *
   * @param index is the index of selected Ship
   * I am working with index here because there are 2 diff ships with same length of 3
   * @returns updated board after placement
   */
  function placeShip(board: number[][], index: number, x: number, y: number) {
    if (x === -1 || y === -1) return -1;
    const xrange = x + shipLengths[index];
    const yrange = y + shipLengths[index];

    /** True if neighbouring x or y + ... ship length coordinates is not occupied + !isOutsideGrid */
    const isLocationPlaceable = (x: number, y: number) => {
      if (orientation === "horizontal") {
        for (let i = x; i < x + shipLengths[index]; i++) {
          if (board[i][y] !== 0) {
            return false;
          }
        }
      }
      if (orientation === "vertical") {
        for (let j = y; j < y + shipLengths[index]; j++) {
          if (board[x][j] !== 0) {
            return false;
          }
        }
      }
      return true;
    };

    const updateShipPlaced = (idx: number | null) => {
      setIsShipPlaced(
        isShipPlaced.map((item, index) => (index === idx ? true : item))
      );
    };

    if (orientation === "horizontal" && isLocationPlaceable(x, y)) {
      if (xrange > 10) return -1;
      for (x; x < xrange; x++) {
        board[x][y] = shipLengths[index];
        updateShipPlaced(index);
      }
    } else if (orientation === "vertical" && isLocationPlaceable(x, y)) {
      if (yrange > 10) return -1;
      for (y; y < yrange; y++) {
        board[x][y] = shipLengths[index];
        updateShipPlaced(index);
      }
    }

    return board;
  }

  // For debugging atm
  useEffect(() => {
    console.log("selected: " + shipLengths[selectedShipIndex]);
    return () => {};
  }, [selectedShipIndex]);

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
            placeShip={placeShip}
            selectedShip={selectedShipIndex}
          ></Board>
        </div>
        {/* grid-value class for computer-side is for debugging (to view values) */}
        <div className="grid-value battleship-grid">
          <Board
            board={opponentBoard}
            orientation={orientation}
            isShipSelected={false}
            setIsShipSelected={setIsShipSelected}
            placeShip={placeShip}
            selectedShip={selectedShipIndex}
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
      <div className="ships-container">
        {shipLengths.map(
          (shipLength, index) =>
            !isShipPlaced[index] && (
              <motion.div
                drag
                id={`type-${shipLengths[index]}--${orientation}`}
                key={index}
                style={
                  orientation === "vertical"
                    ? { height: `calc( ${gridSize} * ${shipLength})` }
                    : { width: `calc( ${gridSize} * ${shipLength})` }
                }
                whileDrag={{ scale: 1.1, opacity: 0.4 }}
                dragConstraints={dragConstraintsRef}
                dragMomentum={false}
                onDragStart={() => {
                  setIsShipSelected(true);
                  setSelectedShipIndex(index);
                }}
                dragSnapToOrigin={true}
              ></motion.div>
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

export default Game;
