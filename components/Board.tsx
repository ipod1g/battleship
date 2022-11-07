import React from "react";

export interface Board {
  board: number[][];
  orientation: string;
  isShipSelected: boolean;
  setIsShipSelected: React.Dispatch<React.SetStateAction<boolean>>;
  placeShip: (
    board: number[][],
    index: number,
    x: number,
    y: number
  ) => number[][] | -1;
  selectedShip: number;
}

/** Creates the board for placement and for the opponent */
const Board = (props: Board) => {
  return (
    <>
      {props.board.map((column, i) => (
        <div key={i} id={`column-${i}`}>
          {column.map((value, j) => (
            <div
              key={j}
              id={`row-${j}`}
              onMouseUp={() => {
                if (!props.isShipSelected) return;
                props.placeShip(props.board, props.selectedShip, i, j);
                props.setIsShipSelected(false);
              }}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Board;
