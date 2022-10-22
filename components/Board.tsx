import React, { useEffect } from "react";

export interface Board {
  board: number[][];
}

//Creates the board for placement and for the opponent
const Board = (props: Board) => {
  return (
    <>
      {props.board.map((column, i) => (
        <div key={i} id={`column-${i}`}>
          {column.map((value, j) => (
            <div key={j} id={`row-${j}`}>
              {value}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Board;
