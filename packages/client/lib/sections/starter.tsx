import type { NextPage } from "next";
import React, { useState, useRef } from "react";
import Board from "../components/Board";
import boardWithRandomlyPlacedShips from "../functions/generateRandomPlacements";
import { playerData } from "../interfaces/types";
// import ServerTest from "../lib/components/ServerTest";
import Ship from "../components/Ship";
import { initialData, shipLengths } from "../constants";
import generateRandomPlacements from "../functions/generateRandomPlacements";

//Conditions 'Sunk' | 'Hit' | 'Miss' | 'Ship' | 'Empty'

export interface Props {
  playerData: playerData;
  opponentData: playerData;
  setGameStart: React.Dispatch<React.SetStateAction<boolean>>;
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>;
  setOpponentData: React.Dispatch<React.SetStateAction<playerData>>;
}

const Starter = (props: Props) => {
  const width = 10;
  const [placementOrientation, setPlacementOrientation] = useState<
    "vertical" | "horizontal"
  >("vertical");
  const [isShipSelected, setIsShipSelected] = useState(false);
  const [selectedShipIndex, setSelectedShipIndex] = useState<number>(-1);
  const dragConstraintsRef = useRef(null);

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

  function handleReset() {
    props.setPlayerData(() => {
      let prev = { ...props.playerData };
      prev.board = newBoard();
      prev.shipInfo.map(
        (info) => (
          (info.placed = false),
          (info.parts = [
            {
              hit: false,
              location: [],
            },
          ])
        )
      );
      console.log(prev);
      return prev;
    });
  }

  function randomPlacement() {
    handleReset();
    generateRandomPlacements(props.playerData.board, props.setPlayerData);
  }

  //stored in server?

  return (
    <div className="main-container" ref={dragConstraintsRef}>
      <div className="game-container">
        <div className="grid-value battleship-grid">
          <Board
            orientation={placementOrientation}
            isShipSelected={isShipSelected}
            setIsShipSelected={setIsShipSelected}
            selectedShipIndex={selectedShipIndex}
            setPlayerData={props.setPlayerData}
            playerData={props.playerData}
          ></Board>
        </div>
      </div>

      {/* <ServerTest /> */}
      <div className="interaction-panel">
        <div className="button-wrapper">
          <button
            className="temp-button"
            onClick={() => {
              rotateShips();
            }}
          >
            Rotate
          </button>
          <button className="temp-button" onClick={() => handleReset()}>
            Reset
          </button>
          <button className="temp-button" onClick={() => randomPlacement()}>
            Random
          </button>
        </div>
        {/* asd */}
        <div className="ships-container">
          {props.playerData.shipInfo.map(
            (ship, index) =>
              !ship.placed && (
                <Ship
                  key={index}
                  dragConstraints={dragConstraintsRef}
                  onDragStart={() => {
                    setIsShipSelected(true);
                    setSelectedShipIndex(() => {
                      console.log(
                        "name: ",
                        props.playerData.shipInfo[index].shipType
                      );
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
      </div>
    </div>
  );
};

export default Starter;
