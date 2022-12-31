import { shipLength } from "../interfaces/types";

export const initialData = [
  {
    shipType: "destroyer",
    placed: false,
    status: "",
  },
  {
    shipType: "submarine",
    placed: false,
    status: "",
  },
  {
    shipType: "cruiser",
    placed: false,
    status: "",
  },
  {
    shipType: "battleship",
    placed: false,
    status: "",
  },
  {
    shipType: "carrier",
    placed: false,
    status: "",
  },
];

export const shipLengths = [
  shipLength.Destroyer,
  shipLength.Submarine,
  shipLength.Cruiser,
  shipLength.Battleship,
  shipLength.Carrier,
];
