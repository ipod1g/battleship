import { shipLength } from "../interfaces/types";

export const initialData = [
  {
    shipType: "destroyer",
    placed: false,
    partArray: [],
  },
  {
    shipType: "submarine",
    placed: false,
    partArray: [],
  },
  {
    shipType: "cruiser",
    placed: false,
    partArray: [],
  },
  {
    shipType: "battleship",
    placed: false,
    partArray: [],
  },
  {
    shipType: "carrier",
    placed: false,
    partArray: [],
  },
];

export const shipLengths = [
  shipLength.Destroyer,
  shipLength.Submarine,
  shipLength.Cruiser,
  shipLength.Battleship,
  shipLength.Carrier,
];
