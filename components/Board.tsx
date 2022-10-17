import React, { useEffect } from "react";

export interface Board {
  board: number[][];
}

//Creates the board for placement and for the opponent
const Board = (props: Board) => {
  return (
    <>
      {props.board.map((row, i) => (
        <div key={i} id={`row-${i}`}>
          {row.map((value, j) => (
            <div key={j} id={`column-${j}`}>
              {value}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Board;
