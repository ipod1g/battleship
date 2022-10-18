export interface IStartProps {
  handleStart: ([]) => void;
}

export interface IFinishedProps {
  name: string;
  restart: () => void;
}

export type Ship = {
  type: ShipNames;
};

export enum ShipNames {
  Destroyer = 2,
  Submarine = 3,
  Cruiser = 3,
  Battleship = 4,
  Carrier = 5,
}
