import React, { useEffect } from "react";

export interface IBoard {
  width: number;
  setSquares?: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
}

//Creates the board for placement and for the opponent
const Board = (props: IBoard) => {
  const { width } = props;

  const setSquaresDefined = (array: JSX.Element[]) => {
    props.setSquares?.(array);
  };

  const squaresArray = Array.from({ length: width * width }, (_, i) => (
    <div key={i} id={`${i}`}></div>
  ));

  useEffect(() => {
    setSquaresDefined(squaresArray);
    return () => {};
  }, []);

  return <>{squaresArray}</>;
};

export default Board;
