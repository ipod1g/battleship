import { shipLength } from "../interfaces/types";

export const initialData = [
  {
    shipType: "destroyer",
    placed: false,
    parts: [
      {
        hit: false,
        location: [],
      },
    ],
  },
  {
    shipType: "submarine",
    placed: false,
    parts: [
      {
        hit: false,
        location: [],
      },
    ],
  },
  {
    shipType: "cruiser",
    placed: false,
    parts: [
      {
        hit: false,
        location: [],
      },
    ],
  },
  {
    shipType: "battleship",
    placed: false,
    parts: [
      {
        hit: false,
        location: [],
      },
    ],
  },
  {
    shipType: "carrier",
    placed: false,
    parts: [
      {
        hit: false,
        location: [],
      },
    ],
  },
];

export const shipLengths = [
  shipLength.Destroyer,
  shipLength.Submarine,
  shipLength.Cruiser,
  shipLength.Battleship,
  shipLength.Carrier,
];
