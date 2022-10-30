import React, { useEffect, useState } from "react";

export interface Board {
  board: number[][];
  orientation: string;
  isShipSelected: boolean;
  setCurrentGridXLocation: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  setCurrentGridYLocation: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
}

/** Creates the board for placement and for the opponent */
const Board = (props: Board) => {
  return (
    <>
      {props.board.map((column, i) => (
        <div
          key={i}
          id={`column-${i}`}
          onMouseOverCapture={() => {
            if (!props.isShipSelected) return;
            else props.setCurrentGridXLocation(i);
          }}
        >
          {column.map((value, j) => (
            <div
              key={j}
              id={`row-${j}`}
              onMouseOverCapture={() => {
                if (!props.isShipSelected) return;
                else props.setCurrentGridYLocation(j);
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
