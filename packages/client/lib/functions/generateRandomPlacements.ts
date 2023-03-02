import { initialData } from "../constants";
import { playerData } from "../interfaces/types";
import placeShip from "./placeShip";

/**Places ships from randomly generated coordinates that is not outside the grid or already occupied on any provided 10*10 grid*/
const generateRandomPlacements = (
  board: number[][],
  setPlayerData: React.Dispatch<React.SetStateAction<playerData>>
): number[][] => {
  for (let shipIndex = 0; shipIndex < initialData.length; shipIndex++) {
    const width = 10;
    let placed = false;
    while (!placed) {
      const orientation =
        Math.round(Math.random()) >= 0.5 ? "horizontal" : "vertical";

      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * width);

      console.log(shipIndex);
      console.log("[" + x, y + "]");

      if (
        placeShip(board, shipIndex, x, y, orientation, setPlayerData) === false
      ) {
        placed = false;
      } else placed = true;
    }
  }

  return board;
};

export default generateRandomPlacements;
