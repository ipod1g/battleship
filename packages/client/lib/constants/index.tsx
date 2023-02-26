import { shipLength } from "../interfaces/types";

export const initialData = [
  {
    shipType: "destroyer",
    placed: false,
    placedLocation: [],
  },
  {
    shipType: "submarine",
    placed: false,
    placedLocation: [],
  },
  {
    shipType: "cruiser",
    placed: false,
    placedLocation: [],
  },
  {
    shipType: "battleship",
    placed: false,
    placedLocation: [],
  },
  {
    shipType: "carrier",
    placed: false,
    placedLocation: [],
  },
];

export const shipLengths = [
  shipLength.Destroyer,
  shipLength.Submarine,
  shipLength.Cruiser,
  shipLength.Battleship,
  shipLength.Carrier,
];
