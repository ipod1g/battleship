import React, { useEffect } from "react";
import { ICreateBoardProps } from "../interfaces/types";

//Creates the board for placement and for the opponent
const CreateBoard = (props: ICreateBoardProps) => {
  const { width } = props;

  const setSquaresDefined = (array: any[]) => {
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

export default CreateBoard;
