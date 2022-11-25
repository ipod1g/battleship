export enum shipLength {
  Destroyer = 2,
  Submarine = 3,
  Cruiser = 3,
  Battleship = 4,
  Carrier = 5,
}

export type playerData = {
  board: number[][];
  shipInfo: {
    shipType: string;
    placed: boolean;
    status: string;
  }[];
};
