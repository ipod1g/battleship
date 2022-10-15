export interface ICreateBoardProps {
  width: number;
  setSquares?: (squares: any[]) => void;
}

export interface IStartProps {
  handleStart: ([]) => void;
}

export interface IFinishedProps {
  name: string;
  restart: () => void;
}

export interface IGenerateShipsArguments {
  ship: { name: string; directions: number[][] };
  opponentSquares: any[];
  setShipArray?: (shipArray: any[]) => void;
}
