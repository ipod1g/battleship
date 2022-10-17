export interface IStartProps {
  handleStart: ([]) => void;
}

export interface IFinishedProps {
  name: string;
  restart: () => void;
}

export interface Ship {
  name: string,
  directions: number[][];
}