import { shipLengths } from "../constants";
import { ShipInfo } from "../interfaces/types";

export const shipsInCoord = (shipInfo: ShipInfo[], coords: number[]) => {
  const [x, y] = coords;

  return shipInfo.find((ship, index) => {
    console.log(
      `Comparing with ship of length ${shipLengths[index]}, ${
        ship.placed ? "which is placed" : "but it's not placed"
      }`
    );
    return (
      ship.placed &&
      ship.partArray.find((part) => {
        console.log(`Comparing with cell ${part.location}`);
        return part.location[0] === x && part.location[1] === y;
      })
    );
  });
};
