import { initialData, shipLengths } from "../constants";
import { playerData, ShipInfo } from "../interfaces/types";
import placeShip from "./placeShip";

/**Places ships from randomly generated coordinates that is not outside the grid or already occupied on any provided 10*10 grid*/
const generateRandomPlacements = (
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>,
  playerData: playerData
) => {
  let shipInfo: ShipInfo[] = JSON.parse(JSON.stringify(playerData.shipInfo));
  let finalShipInfo: ShipInfo[];

  for (let shipIndex = 0; shipIndex < initialData.length; shipIndex++) {
    const width = 10;
    let placed: ShipInfo[] | undefined = undefined;
    while (!placed) {
      const orientation =
        Math.round(Math.random()) >= 0.5 ? "horizontal" : "vertical";

      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * width);

      console.log(
        "Placing ship of length",
        shipLengths[shipIndex],
        orientation
      );
      console.log("[" + x, y + "]");

      placed = placeShip(shipIndex, [x, y], orientation, shipInfo);
    }
    if (placed) {
      finalShipInfo = placed;
    } else {
      throw new Error("No ship placed");
    }
  }

  setPlayerData((prev) => ({ ...prev, shipInfo: finalShipInfo }));
};

export default generateRandomPlacements;
