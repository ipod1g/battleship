export interface IStartProps {
  handleStart: ([]) => void;
}

export interface IFinishedProps {
  name: string;
  restart: () => void;
}

export interface Ship {
  type: ShipNames;
}

export enum ShipNames {
  Destroyer = 1,
}
