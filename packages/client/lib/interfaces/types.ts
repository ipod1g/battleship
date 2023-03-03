export enum shipLength {
  Destroyer = 2,
  Submarine = 3,
  Cruiser = 3,
  Battleship = 4,
  Carrier = 5,
}

export type ShipPart = {
  location: number[];
  hit: boolean;
};

export type ShipInfo = {
  shipType: string;
  placed: boolean;
  partArray: ShipPart[];
};

export type playerData = {
  shipInfo: ShipInfo[];
};
