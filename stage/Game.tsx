import React, { useState, useEffect, useRef, useMemo } from "react";
import Board from "../components/Board";
import boardWithRandomlyPlacedShips from "../functions/boardWithRandomlyPlacedShips ";
import { shipLength } from "../interfaces/types";
import { motion } from "framer-motion";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

const Game = () => {
  const width = 10;
  const [opponentBoard, setOpponentBoard] = useState<number[][]>(newBoard());
  const [playerBoard, setPlayerBoard] = useState<number[][]>(newBoard());
  const [orientation, setOrientation] = useState("vertical");
  const [isShipSelected, setIsShipSelected] = useState(false);
  const [currentGridXLocation, setCurrentGridXLocation] = useState<number>();
  const [currentGridYLocation, setCurrentGridYLocation] = useState<number>();
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
   * @returns updated board after placement
   */
  function placeShip(
    board: number[][],
    index: number,
    x: number | undefined,
    y: number | undefined
  ) {
    if (x === undefined || y === undefined) return;
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
      if (xrange > 10) return;
      for (x; x < xrange; x++) {
        board[x][y] = shipLengths[index];
        updateShipPlaced(index);
      }
    } else if (orientation === "vertical" && isLocationPlaceable(x, y)) {
      if (yrange > 10) return;
      for (y; y < yrange; y++) {
        board[x][y] = shipLengths[index];
        updateShipPlaced(index);
      }
    }

    return board;
  }

  // For debugging atm
  useEffect(() => {
    console.log(isShipPlaced);
    return () => {};
  }, [isShipPlaced]);

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
        <div className="grid-user battleship-grid">
          <Board
            board={playerBoard}
            orientation={orientation}
            isShipSelected={isShipSelected}
            setCurrentGridXLocation={setCurrentGridXLocation}
            setCurrentGridYLocation={setCurrentGridYLocation}
          ></Board>
        </div>
        <div className="grid-computer battleship-grid">
          <Board
            board={opponentBoard}
            orientation={orientation}
            isShipSelected={false}
            setCurrentGridXLocation={setCurrentGridXLocation}
            setCurrentGridYLocation={setCurrentGridYLocation}
          ></Board>
        </div>
      </div>
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
                key={index}
                id={`type-${shipLengths[index]}--${orientation}`}
                whileDrag={{ scale: 1.1, opacity: 0.4 }}
                dragConstraints={dragConstraintsRef}
                dragMomentum={false}
                onDragStart={() => {
                  setIsShipSelected(true);
                }}
                onDragEnd={() => {
                  setIsShipSelected(false),
                    placeShip(
                      playerBoard,
                      index,
                      currentGridXLocation,
                      currentGridYLocation
                    );
                }}
                dragSnapToOrigin={true}
                onDrag={() =>
                  console.log(currentGridXLocation, currentGridYLocation)
                }
              ></motion.div>
            )
        )}
      </div>
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
